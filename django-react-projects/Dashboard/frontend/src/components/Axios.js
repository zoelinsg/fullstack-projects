import axios from 'axios'

// 定義後端 API 的基礎 URL
const myURL = 'http://127.0.0.1:8000/'

// 建立一個 Axios 實例，設定基本配置
const AxiosInstance = axios.create({
    baseURL: myURL,  // 設定 API 請求的基礎 URL
    timeout: 5000,   // 請求超時時間設定為 5000 毫秒 (5 秒)
    headers: {
        "Content-Type": "application/json",  // 設定請求的資料類型為 JSON
        accept: "application/json"           // 設定接受的回應資料類型為 JSON
    }
})

// 匯出這個 Axios 實例，以便在其他模組中使用
export default AxiosInstance