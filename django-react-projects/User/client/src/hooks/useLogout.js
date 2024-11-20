import useAuth from "./useAuth";
import { axiosPrivateInstance } from "../api/apiConfig";

// 自訂 Hook：用於執行登出操作
export default function useLogout() {
    // 從 useAuth 中取得設定認證相關狀態的函式
    const { setUser, setAccessToken, setCSRFToken, setIsLoggedIn } = useAuth();

    // 登出函式，清除所有與使用者認證相關的狀態
    const logout = async () => {
        try {
            // 發送 POST 請求至後端登出 API
            await axiosPrivateInstance.post("auth/logout");

            // 清除認證相關狀態
            setAccessToken(null); // 清空存取權杖
            setCSRFToken(null); // 清空 CSRF 權杖
            setUser({}); // 清空使用者資訊
            setIsLoggedIn(false); // 設定為未登入狀態

        } catch (error) {
            // 錯誤處理：若登出請求失敗，顯示錯誤訊息
            console.log(error);
        }
    };

    // 返回登出函式，供元件使用
    return logout;
}
