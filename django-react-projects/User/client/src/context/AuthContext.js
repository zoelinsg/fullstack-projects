import { useState, useEffect, createContext } from 'react';

// 建立 AuthContext 並定義初始值，用於管理使用者的認證狀態與相關的資料
export const AuthContext = createContext({
    user: {}, // 使用者資料物件
    setUser: () => {}, // 設置使用者資料的函式
    accessToken: null, // 存取權杖
    refreshToken: null, // 刷新權杖
    csrftoken: null, // CSRF 權杖
    setAccessToken: () => {}, // 設置存取權杖的函式
    setRefreshToken: () => {}, // 設置刷新權杖的函式
    setCSRFToken: () => {}, // 設置 CSRF 權杖的函式
    isLoggedIn: false, // 使用者是否已登入
    setIsLoggedIn: () => {}, // 設置登入狀態的函式
});

// 建立 AuthContextProvider 元件，用於提供認證狀態給子元件
export function AuthContextProvider({ children }) {
    const [user, setUser] = useState({}); // 使用者資料的狀態
    const [accessToken, setAccessToken] = useState(); // 存取權杖的狀態
    const [refreshToken, setRefreshToken] = useState(); // 刷新權杖的狀態
    const [csrftoken, setCSRFToken] = useState(); // CSRF 權杖的狀態
    const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem('isLoggedIn')) || false); // 從 localStorage 初始化登入狀態

    // 當登入狀態改變時更新 localStorage
    useEffect(() => {
        localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    }, [isLoggedIn]);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                accessToken,
                setAccessToken,
                refreshToken,
                setRefreshToken,
                csrftoken,
                setCSRFToken,
                isLoggedIn,
                setIsLoggedIn
            }}
        >
            {children} {/* 將子元件包裹在 Provider 中，以便提供認證狀態 */}
        </AuthContext.Provider>
    );
}

export default AuthContext;
