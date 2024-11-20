import React, { useEffect, useState } from 'react'; // 從 React 模組匯入必要的 Hook: useEffect, useState
import MyCalendar3 from './calendars/MyCalendar3'; // 匯入自定義的 MyCalendar3 日曆組件
import AxiosInstance from './AxiosInstance'; // 匯入 AxiosInstance 以便進行 API 請求

// 定義 Calendar3 功能組件
// 這個組件會從後端獲取事件資料，並將資料傳遞給 MyCalendar3 組件顯示
const Calendar3 = () => {

  const [events, setEvents] = useState(); // 定義狀態變數 events 來儲存從後端獲取的事件資料

  // GetData 函式負責從後端 API 獲取資料
  const GetData = () => {
    AxiosInstance.get(`appointments/`) // 發送 GET 請求到 'appointments/' 路徑
      .then((res) => {
        setEvents(res.data); // 將獲取到的資料儲存到 events 狀態變數中
        console.log(res.data); // 在控制台輸出獲取的資料，方便除錯
      });
  }

  // 使用 useEffect 在組件載入時執行 GetData 函式，只執行一次
  useEffect(() => {
    GetData();
  }, []); // 空陣列作為第二個參數，確保 useEffect 只在組件第一次載入時執行

  return (
    <div>
      {/* 渲染 MyCalendar3 組件，並將獲取到的事件資料作為 props 傳遞 */}
      <MyCalendar3
        myEvents={events}
      />
    </div>
  );
}

// 匯出 Calendar3 組件，讓其他模組可以引入這個組件使用
export default Calendar3;
