import { axiosInstance } from "../api/apiConfig";
import useAuth from "./useAuth";

// 自訂 Hook：用於刷新存取權杖和 CSRF 權杖
export default function useRefreshToken() {
    const { isLoggedIn, setAccessToken, setCSRFToken } = useAuth(); // 從 useAuth 取得狀態與設定函式

    // 刷新權杖的函式
    const refresh = async () => {
        // 若使用者尚未登入，則直接返回
        if (!isLoggedIn) {
            return;
        }

        // 發送請求以獲取新的存取權杖與 CSRF 權杖
        const response = await axiosInstance.post('auth/refresh-token');

        // 更新存取權杖與 CSRF 權杖到狀態中
        setAccessToken(response.data.access); // 設置新的存取權杖
        setCSRFToken(response.headers["x-csrftoken"]); // 設置新的 CSRF 權杖

        // 返回新的存取權杖和 CSRF 權杖，供其他元件或 Hook 使用
        return { 
            accessToken: response.data.access, 
            csrfToken: response.headers["x-csrftoken"] 
        };
    };

    // 返回 refresh 函式，以便在需要時進行權杖刷新
    return refresh;
}
