import useAuth from "../hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

// 認證中介元件：根據使用者的登入狀態決定是否允許訪問子路由
export default function AuthMiddleware() {
    const { accessToken } = useAuth(); // 從 useAuth 中取得存取權杖，以判斷使用者是否已登入
    const location = useLocation(); // 取得當前的路由位置信息

    // 若有存取權杖，則顯示 Outlet (允許訪問子路由)；否則導向首頁並保存當前位置
    return (
        accessToken 
            ? <Outlet /> 
            : <Navigate to="/" state={{ from: location }} replace />
    );
}
