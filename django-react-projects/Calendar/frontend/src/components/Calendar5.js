// 從 React 匯入必要的函式和元件
import React, { useEffect, useState } from 'react';
// 匯入自定義的日曆元件 MyCalendar5
import MyCalendar5 from './calendars/MyCalendar5';
// 匯入 Axios 實例，用於發送 HTTP 請求
import AxiosInstance from './AxiosInstance';
// 匯入 CSS 樣式
import '../App.css';
// 匯入多選表單元件和 MUI 的 Box 元件
import MultiSelectForm from './forms/MultiSelectForm';
import Box from '@mui/material/Box';

// 定義 Calendar5 元件
const Calendar5 = () => {
  
  // 使用 useState 管理事件資料、狀態選項、選中的狀態和加載狀態
  const [events, setEvents] = useState([]); // 儲存從伺服器獲取的事件資料
  const [statusOptions, setStatusOptions] = useState(); // 儲存可供選擇的狀態選項
  const [selectedStatus, setSelectedStatus] = useState([]); // 儲存選中的狀態
  const [loading, setLoading] = useState(true); // 用於控制是否顯示加載訊息

  // 在控制台中打印出選中的狀態選項，方便除錯
  console.log(selectedStatus);

  // 根據選中的狀態篩選出符合條件的事件資料
  const filteredEvents = events.filter((event) =>
    selectedStatus.includes(event.classNames)
  );

  // 定義 GetData 函式，用於從伺服器獲取事件資料
  const GetData = () => {
    AxiosInstance.get(`appointments/`).then((res) => {
      // 將回應資料設置到事件狀態中
      setEvents(res.data);
      // 從事件資料中提取唯一的狀態選項
      setStatusOptions([...new Set(res.data.map((event) => event.classNames))]);
      // 預設將所有狀態設為選中
      setSelectedStatus([...new Set(res.data.map((event) => event.classNames))]);
      // 資料載入完成後，將加載狀態設為 false
      setLoading(false);
      // 打印出回應資料以便除錯
      console.log(res.data);
    });
  };

  // 使用 useEffect 在元件初始化時調用 GetData 函式
  useEffect(() => {
    GetData();
  }, []); // 空的依賴陣列，確保只在元件掛載時執行一次

  // 渲染元件
  return (
    <div>
      {loading ? (
        <p>Loading the data...</p> // 如果仍在加載，顯示加載訊息
      ) : (
        <>
          {/* 外層盒子，用於顯示篩選選項和日曆 */}
          <Box
            sx={{
              boxShadow: 3,
              padding: "20px",
              display: 'flex',
              justifyContent: 'space-evenly',
              marginBottom: '20px',
            }}
          >
            {/* 左側篩選框，用於多選表單 */}
            <Box sx={{ width: '30%' }}>
              <MultiSelectForm
                label={"Status"}
                options={statusOptions}
                setSelectedValue={setSelectedStatus}
                selectedValue={selectedStatus}
              />
            </Box>
            {/* 其他占位的空白框 */}
            <Box sx={{ width: '30%' }}></Box>
            <Box sx={{ width: '30%' }}></Box>
          </Box>

          {/* 日曆展示區域 */}
          <Box sx={{ boxShadow: 3, padding: "20px" }}>
            <MyCalendar5 myEvents={filteredEvents} />
          </Box>
        </>
      )}
    </div>
  );
};

// 匯出 Calendar5 元件，讓其他模組可以使用
export default Calendar5;
