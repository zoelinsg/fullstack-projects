import useAuth from "./useAuth";
import useAxiosPrivate from "./usePrivate";

// 自訂 Hook：用於取得使用者資訊
export default function useUser() {
    const { isLoggedIn, setUser } = useAuth(); // 從 useAuth 取得登入狀態與設置使用者資料的函式
    const axiosPrivateInstance = useAxiosPrivate(); // 使用私有的 axios 實例進行 API 請求

    // 取得使用者資料的函式
    async function getUser() {
        // 若使用者尚未登入，則直接返回
        if (!isLoggedIn) {
            return;
        }

        try {
            // 發送 GET 請求以獲取使用者資訊
            const { data } = await axiosPrivateInstance.get('auth/user');

            // 更新使用者狀態
            setUser(data);
        } catch (error) {
            // 錯誤處理：顯示錯誤回應資訊到控制台
            console.log(error.response);
        }
    }

    // 返回 getUser 函式，以便其他元件可以調用此函式來獲取使用者資料
    return getUser;
}
