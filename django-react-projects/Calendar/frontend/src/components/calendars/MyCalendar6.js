import React from 'react'; // 從 React 匯入 React 物件
import FullCalendar from '@fullcalendar/react'; // 匯入 FullCalendar 元件
import dayGridPlugin from '@fullcalendar/daygrid'; // 匯入 FullCalendar 的日曆視圖插件
import timeGridPlugin from '@fullcalendar/timegrid'; // 匯入 FullCalendar 的時間網格視圖插件
import listPlugin from '@fullcalendar/list'; // 匯入 FullCalendar 的列表視圖插件
import multiMonthPlugin from '@fullcalendar/multimonth'; // 匯入 FullCalendar 的多月視圖插件

// 定義 MyCalendar6 功能組件
// 參數: myEvents - 要在日曆中顯示的事件資料
const MyCalendar6 = ({ myEvents }) => {

  return (
    <FullCalendar
      // 使用多個插件來提供不同的日曆視圖
      plugins={[dayGridPlugin, timeGridPlugin, listPlugin, multiMonthPlugin]}
      initialView="dayGridMonth" // 設定初始視圖為月曆
      events={myEvents} // 傳入事件資料
      // eventBackgroundColor={'#A020F0'} // 設置事件背景顏色 (這行目前已註解)

      // 定義自訂視圖
      views={{
        multiMonth3: {
          type: 'multiMonth', // 使用多月視圖類型
          duration: { months: 3 }, // 顯示三個月
          titleFormat: { month: 'short', year: 'numeric' }, // 設置標題格式 (如: Jan 2024)
          columnHeaderFormat: { weekday: 'short' }, // 設置列標題格式 (如: Mon, Tue)
          buttonText: "3 Months" // 設置按鈕顯示文字
        }
      }}

      // 設定日曆上方的工具欄
      headerToolbar={{
        left: 'prev,next', // 左側顯示上一個月/下一個月按鈕
        center: 'title', // 中間顯示目前視圖的標題
        right: 'dayGridMonth, timeGridWeek, listDay, multiMonth3' // 右側顯示切換視圖的按鈕
      }}
    />
  )
}

export default MyCalendar6;
