// 從 React 匯入必要的元件
import React from 'react';
// 從 FullCalendar 匯入核心元件
import FullCalendar from '@fullcalendar/react';
// 匯入 FullCalendar 的各種插件，用於不同的日曆視圖
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import multiMonthPlugin from '@fullcalendar/multimonth';

// 定義 MyCalendar3 元件
// 這個元件接受外部傳入的 myEvents 屬性，用來顯示事件資料
const MyCalendar3 = ({ myEvents }) => {

  return (
    <FullCalendar
      // 設定使用的日曆插件，支持多種視圖類型
      plugins={[dayGridPlugin, timeGridPlugin, listPlugin, multiMonthPlugin]}
      
      // 設定初始顯示的視圖為 "dayGridMonth"（每個方格代表一天的月曆視圖）
      initialView="dayGridMonth"
      
      // 使用外部傳入的事件資料 (myEvents) 來顯示日曆中的事件
      events={myEvents}

      // 設定自定義的多月視圖配置 (3 個月)
      views={{
        multiMonth3: {
          type: 'multiMonth', // 使用 multiMonth 插件的類型
          duration: { months: 3 }, // 設定顯示 3 個月的視圖
          titleFormat: { month: 'short', year: 'numeric' }, // 標題格式為 "月縮寫, 年"
          columnHeaderFormat: { weekday: 'short' }, // 列標頭的格式為 "星期縮寫"
          buttonText: "3 Months" // 按鈕顯示文字為 "3 Months"
        }
      }}

      // 設定日曆的標頭工具欄配置
      headerToolbar={{
        left: 'prev,next', // 左側顯示 "前一個" 和 "下一個" 按鈕
        center: 'title', // 中央顯示標題
        right: 'dayGridMonth, timeGridWeek, listDay, multiMonth3' // 右側顯示不同視圖切換按鈕
      }}
    />
  );
}

// 匯出 MyCalendar3 元件，讓其他模組可以使用
export default MyCalendar3;
