import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthContext";

// 自訂 Hook：用於方便地存取認證狀態
export default function useAuth() {
    // 從 AuthContext 中取得認證狀態
    const authContext = useContext(AuthContext);

    // 使用 useDebugValue 在 React DevTools 中顯示使用者的登入狀態
    useDebugValue(authContext, auth => auth?.isLoggedIn ? "Logged In" : "Logged Out");

    // 回傳完整的認證上下文，供元件使用
    return authContext;
}
