// 從 React 匯入必要的函式和元件
import React, { useEffect, useState } from 'react';
// 匯入自定義的日曆元件
import MyCalendar4 from './calendars/MyCalendar4';
// 匯入自定義的 Axios 實例，用於發送 HTTP 請求
import AxiosInstance from './AxiosInstance';
// 匯入 CSS 樣式
import '../App.css';

// 定義 Calendar4 元件
const Calendar4 = () => {
  
  // 使用 useState 來管理事件資料的狀態
  const [events, setEvents] = useState([]);

  // 定義 GetData 函式，用於從伺服器獲取事件資料
  const GetData = () => {
    // 使用 Axios 實例發送 GET 請求到 'appointments/' 端點
    AxiosInstance.get('appointments/').then((res) => {
      // 將伺服器回應的資料設置到事件狀態中
      setEvents(res.data);
      // 在控制台中顯示回應資料，方便除錯
      console.log(res.data);
    }).catch((error) => {
      // 若請求出現錯誤，顯示錯誤訊息到控制台
      console.error("無法取得事件資料:", error);
    });
  };

  // 使用 useEffect 來在元件載入時執行 GetData 函式
  useEffect(() => {
    GetData();
  }, []); // 空的依賴陣列，確保只在元件初始化時執行一次

  // 返回日曆元件的渲染結果，並將事件資料作為屬性傳入 MyCalendar4
  return (
    <div>
      <MyCalendar4
        myEvents={events}
      />
    </div>
  );
}

// 匯出 Calendar4 元件，讓其他模組可以使用
export default Calendar4;
