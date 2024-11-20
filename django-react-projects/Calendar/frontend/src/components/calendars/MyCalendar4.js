import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import multiMonthPlugin from '@fullcalendar/multimonth';

// 定義 MyCalendar4 元件
// 接收從父元件傳遞的 myEvents 作為屬性，用於顯示日曆事件
const MyCalendar4 = ({ myEvents }) => {

  return (
    <FullCalendar
      // 設置使用的日曆插件
      plugins={[dayGridPlugin, timeGridPlugin, listPlugin, multiMonthPlugin]}
      
      // 設定初始顯示的視圖為 "月曆"
      initialView="dayGridMonth"
      
      // 使用從父元件接收到的事件資料
      events={myEvents}
      
      // 配置多月視圖 (自定義 3 個月)
      views={{
        multiMonth3: {
          type: 'multiMonth', // 使用 multiMonth 插件的類型
          duration: { months: 3 }, // 設定顯示 3 個月的視圖
          titleFormat: { month: 'short', year: 'numeric' }, // 設定標題格式為 "月 縮寫, 年"
          columnHeaderFormat: { weekday: 'short' }, // 設定列標頭的格式為 "星期縮寫"
          buttonText: "3 Months" // 設定按鈕顯示文字為 "3 Months"
        }
      }}
      
      // 設定日曆的標頭工具欄配置
      headerToolbar={{
        left: 'prev,next', // 左側顯示 "前一個" 和 "下一個" 按鈕
        center: 'title', // 中央顯示標題
        right: 'dayGridMonth,timeGridWeek,listDay,multiMonth3' // 右側顯示不同視圖切換按鈕
      }}
    />
  );
}

// 匯出 MyCalendar4 元件，讓其他模組可以使用
export default MyCalendar4;
