import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/usePrivate';
import useRefreshToken from '../hooks/useRefreshToken';

// 持續登入元件
export default function PersistLogin() {
    const refresh = useRefreshToken(); // 更新存取權杖的函式
    const { accessToken, isLoggedIn, setUser } = useAuth(); // 從自訂的 Auth hook 取得登入狀態
    const [loading, setLoading] = useState(true); // 狀態變數：管理是否處於載入狀態
    const axiosPrivate = useAxiosPrivate(); // 取得經過驗證的 Axios 實例

    useEffect(() => {
        let isMounted = true; // 控制元件掛載狀態，避免非預期的狀態更新

        // 驗證使用者狀態的非同步函式
        async function verifyUser() {
            if (!isLoggedIn) {
                // 如果使用者未登入，設定載入狀態為 false
                isMounted && setLoading(false);
                return;
            }

            try {
                // 嘗試刷新權杖並獲取使用者資料
                await refresh(); // 刷新權杖
                const { data } = await axiosPrivate.get('auth/user'); // 從後端獲取使用者資訊
                setUser(data); // 設定使用者資料
            } catch (error) {
                console.log(error?.response); // 錯誤處理，顯示錯誤回應
            } finally {
                // 無論成功或失敗都設定載入狀態為 false
                isMounted && setLoading(false);
            }
        }

        // 如果沒有存取權杖，則執行使用者驗證
        !accessToken ? verifyUser() : setLoading(false);

        return () => {
            isMounted = false; // 清理函式，在元件卸載時取消掛載
        };
    }, [accessToken, isLoggedIn, refresh, setUser, axiosPrivate]); // 添加依賴，避免警告

    // 根據載入狀態回傳內容，若載入中則顯示 "Loading"，否則顯示 Outlet
    return (
        loading ? "Loading" : <Outlet />
    );
}
