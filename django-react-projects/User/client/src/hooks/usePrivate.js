import { axiosPrivateInstance } from "../api/apiConfig";
import { useEffect } from 'react';
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

// 自訂 Hook：用於處理具有身份驗證的私有 API 請求
export default function useAxiosPrivate() {
    const { accessToken, setAccessToken, csrftoken } = useAuth(); // 從 useAuth 取得認證相關的狀態
    const refresh = useRefreshToken(); // 用於刷新存取權杖的函式

    useEffect(() => {
        // 設置請求攔截器，處理每個請求的認證標頭
        const requestIntercept = axiosPrivateInstance.interceptors.request.use(
            (config) => {
                // 如果請求未包含 Authorization 標頭，則添加存取權杖和 CSRF 權杖
                if (!config.headers["Authorization"]) {
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                    config.headers['X-CSRFToken'] = csrftoken;
                }
                return config; // 返回修改後的請求設定
            },
            (error) => Promise.reject(error) // 錯誤處理：返回拒絕的請求
        );

        // 設置回應攔截器，處理認證過期情況
        const responseIntercept = axiosPrivateInstance.interceptors.response.use(
            (response) => response, // 如果回應正常，直接返回回應
            async (error) => {
                const prevRequest = error?.config;
                // 若回應狀態碼為 403 或 401，且請求尚未重新發送過
                if ((error?.response?.status === 403 || error?.response?.status === 401) && !prevRequest?.sent) {
                    prevRequest.sent = true; // 標記請求已重新發送
                    // 嘗試刷新存取權杖和 CSRF 權杖
                    const { csrfToken: newCSRFToken, accessToken: newAccessToken } = await refresh();
                    setAccessToken(newAccessToken); // 更新存取權杖
                    // 更新重新發送請求的認證標頭
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    prevRequest.headers['X-CSRFToken'] = newCSRFToken;
                    return axiosPrivateInstance(prevRequest); // 重新發送先前的請求
                }
                return Promise.reject(error); // 如果未滿足條件，返回拒絕的錯誤回應
            }
        );

        // 在元件卸載時移除攔截器，避免內存洩漏
        return () => {
            axiosPrivateInstance.interceptors.request.eject(requestIntercept);
            axiosPrivateInstance.interceptors.response.eject(responseIntercept);
        };
    }, [accessToken, csrftoken, refresh, setAccessToken]);

    // 返回包含攔截器的 axios 實例，用於私有 API 請求
    return axiosPrivateInstance;
}
