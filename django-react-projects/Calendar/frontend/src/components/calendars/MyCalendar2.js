// 從 React 匯入必要的元件
import React from 'react';
// 從 FullCalendar 匯入核心元件
import FullCalendar from '@fullcalendar/react';
// 匯入 FullCalendar 的各種插件，用於不同的日曆視圖
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import multiMonthPlugin from '@fullcalendar/multimonth';

// 定義 MyCalendar2 元件
// 這個元件展示了一個帶有多種視圖的日曆，包括月曆、時間表和列表
const MyCalendar2 = () => {
  // 可使用的視圖範例：
  // dayGridDay, dayGridWeek, dayGridMonth, dayGridYear - 以天、週、月、年為單位的網格視圖
  // timeGridDay, timeGridWeek - 以天、週為單位的時間表視圖
  // listDay, listWeek, listMonth, listYear - 以天、週、月、年為單位的事件列表視圖
  // multiMonthYear - 多月的年視圖

  return (
    <FullCalendar
      // 設定使用的日曆插件，支持多種視圖類型
      plugins={[dayGridPlugin, timeGridPlugin, listPlugin, multiMonthPlugin]}
      
      // 設定初始顯示的視圖為 "dayGridMonth"（每個方格代表一天的月曆視圖）
      initialView="dayGridMonth"
      
      // 定義日曆中要顯示的事件
      events={[
        // 單日事件，僅在 2024-10-16 顯示
        { title: 'Event #1', start: '2024-10-16' },

        // 多日事件，從 2024-10-19 開始，至 2024-10-21 結束
        { title: 'Event #2', start: '2024-10-19', end: '2024-10-21' },

        // 單一時間事件，2024-10-24 中午 12:00 開始，設定為非整天事件
        { title: 'Event #3', start: '2024-10-24T12:00:00', allDay: false },
      ]}

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

// 匯出 MyCalendar2 元件，讓其他模組可以使用
export default MyCalendar2;
