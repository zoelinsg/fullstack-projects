import React, { useEffect, useState } from 'react'; // 從 React 匯入必要的 Hook: useEffect, useState
import MyCalendar6 from './calendars/MyCalendar6'; // 匯入自定義的 MyCalendar6 日曆組件
import AxiosInstance from './AxiosInstance'; // 匯入 AxiosInstance 用於進行 API 請求
import '../App.css'; // 匯入 CSS 樣式
import dayjs from 'dayjs'; // 匯入 dayjs 用於日期操作
import DatePickerForm from './forms/DatePickerForm'; // 匯入自定義日期選擇器組件
import MultiSelectForm from './forms/MultiSelectForm'; // 匯入自定義多選表單組件
import Box from '@mui/material/Box'; // 匯入 MUI 的 Box 元件，用於佈局

// 定義 Calendar6 功能組件
const Calendar6 = () => {
  
  // 定義狀態變數來管理事件、選項、選擇的狀態和日期
  const [events, setEvents] = useState([]); // 保存從後端獲取的事件資料
  const [statusOptions, setStatusOptions] = useState(); // 保存可用的狀態選項
  const [selectedStatus, setSelectedStatus] = useState([]); // 保存選擇的狀態

  const [fromDate, setFromDate] = useState(null); // 保存選擇的開始日期

  // 當用戶選擇新的開始日期時觸發
  const fromDateChange = (newDate) => {
    setFromDate(newDate);
    console.log("選擇的開始日期:", newDate.format('DD-MM-YYYY'));
  }

  const [toDate, setToDate] = useState(null); // 保存選擇的結束日期

  // 當用戶選擇新的結束日期時觸發
  const toDateChange = (newDate) => {
    setToDate(newDate);
    console.log("選擇的結束日期:", newDate.format('DD-MM-YYYY'));
  }

  console.log(selectedStatus); // 在控制台輸出選擇的狀態

  // 過濾事件根據選擇的狀態和日期範圍
  const filteredEvents = events.filter((event) => 
    selectedStatus.includes(event.classNames) && // 只顯示選擇的狀態
    (!fromDate || dayjs(event.start).isAfter(fromDate, 'day')) && // 如果有選擇開始日期，則過濾較早的事件
    (!toDate || dayjs(event.end).isBefore(toDate, 'day')) // 如果有選擇結束日期，則過濾較晚的事件
  );

  const [loading, setLoading] = useState(true); // 狀態管理，用於顯示資料加載中的提示

  // 從後端獲取事件資料
  const GetData = () => {
    AxiosInstance.get(`appointments/`).then((res) => {
      setEvents(res.data); // 設置事件資料
      setStatusOptions([...new Set(res.data.map((event) => event.classNames))]); // 提取唯一的狀態選項
      setSelectedStatus([...new Set(res.data.map((event) => event.classNames))]); // 預設選中所有狀態
      setLoading(false); // 加載完成
      console.log(res.data);
    });
  }

  // 在組件載入時執行 GetData 函式
  useEffect(() => {
    GetData();
  }, []);

  return (
    <div>
      {/* 如果資料在加載，顯示提示；否則顯示過濾器和日曆 */}
      { loading ? <p>正在加載資料...</p> :
        <> 
          <Box sx={{ boxShadow: 3, padding: "20px", display: 'flex', justifyContent: 'space-evenly', marginBottom: '20px' }}> 
            {/* 狀態多選篩選器 */}
            <Box sx={{ width: '30%' }}>
              <MultiSelectForm
                label={"狀態"}
                options={statusOptions}
                setSelectedValue={setSelectedStatus}
                selectedValue={selectedStatus}
              />
            </Box>
            {/* 開始日期選擇器 */}
            <Box sx={{ width: '30%' }}>
              <DatePickerForm label={"開始日期"} value={fromDate} onChange={fromDateChange} />
            </Box>
            {/* 結束日期選擇器 */}
            <Box sx={{ width: '30%' }}>
              <DatePickerForm label={"結束日期"} value={toDate} onChange={toDateChange} />
            </Box>
          </Box>

          {/* 日曆顯示區域 */}
          <Box sx={{ boxShadow: 3, padding: "20px" }}> 
            <MyCalendar6
              myEvents={filteredEvents} // 傳遞過濾後的事件資料
            />
          </Box>
        </>
      }
    </div>
  );
}

export default Calendar6;
