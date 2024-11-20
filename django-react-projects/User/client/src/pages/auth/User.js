import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import useLogout from "../../hooks/useLogout";
import useUser from '../../hooks/useUser';

// 使用者資訊頁面元件
export default function User() {
    const { user } = useAuth(); // 取得使用者的資料
    const navigate = useNavigate(); // 用於導航的 Hook
    const logout = useLogout(); // 自訂的登出函式
    const [loading, setLoading] = useState(false); // 控制登出按鈕的加載狀態
    const getUser = useUser(); // 用於獲取使用者資訊的函式

    // 使用 useEffect 在元件掛載時自動獲取使用者資料
    useEffect(() => {
        getUser();
    }, [getUser]);

    // 登出按鈕的點擊事件處理函式
    async function onLogout() {
        setLoading(true); // 設定加載狀態為 true 以禁用登出按鈕
        await logout(); // 執行登出
        navigate('/'); // 導向首頁
    }

    return (
        <div>
            {/* 顯示使用者資訊，若不存在則顯示空值 */}
            <h4>{user?.id}</h4>
            <h4>{user?.username}</h4>
            <h4>{user?.email}</h4>
            <h4>{user?.first_name}</h4>
            <h4>{user?.last_name}</h4>
            <h4>{user?.is_staff ? "Staff" : "User"}</h4>
            <button disabled={loading} type='button' onClick={onLogout}>
                {loading ? 'Logging out...' : 'Logout'}
            </button>
        </div>
    );
}
