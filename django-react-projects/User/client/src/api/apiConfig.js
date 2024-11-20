import axios from "axios";

// 定義 API 的基本 URL
const API_URL = "http://127.0.0.1:8000/";

// 公共的 Axios 實例，用於一般的 API 請求
export const axiosInstance = axios.create({
    baseURL: API_URL, // 設置基礎 URL，所有請求會在此基礎上拼接
    withCredentials: true, // 允許跨域請求攜帶 Cookie
    headers: {
        "Content-Type": "application/json" // 設定請求的內容類型為 JSON 格式
    }
});

// 私有的 Axios 實例，用於需要認證的 API 請求
export const axiosPrivateInstance = axios.create({
    baseURL: API_URL, // 同樣設置基礎 URL
    withCredentials: true, // 允許攜帶 Cookie 以支援認證
    headers: {
        "Content-Type": "application/json" // 請求內容為 JSON
    }
});

// 設定攔截器（可選）：處理認證過期、自動刷新 token 或其他私有請求相關邏輯
// axiosPrivateInstance.interceptors.request.use(
//     (config) => {
//         // 在這裡添加認證權杖或其他請求攔截邏輯
//         return config;
//     },
//     (error) => Promise.reject(error)
// );
