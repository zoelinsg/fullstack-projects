// 匯入 axios 模組
import axios from 'axios';

// 設定基礎 URL，指向後端伺服器的 API 端點
const myBaseUrl = 'http://127.0.0.1:8000/';

// 建立一個自定義的 axios 實例
// 可以重複使用相同的配置來發送 HTTP 請求
const AxiosInstance = axios.create({
    // 設定所有請求的基礎 URL
    baseURL: myBaseUrl,
    
    // 設定請求的超時時間為 5000 毫秒（5 秒）
    timeout: 5000,
    
    // 設定預設的 HTTP 標頭
    headers: {
        // 指定傳輸內容類型為 JSON
        "Content-Type": "application/json",
        
        // 接受回應內容為 JSON
        accept: "application/json"
    }
});

// 將自定義的 axios 實例匯出，讓其他模組可以使用
export default AxiosInstance;