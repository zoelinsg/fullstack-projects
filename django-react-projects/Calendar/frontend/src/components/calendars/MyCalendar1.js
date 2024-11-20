// 從 React 匯入必要的元件
import React from "react";
// 從 FullCalendar 匯入核心元件
import FullCalendar from '@fullcalendar/react';
// 匯入 FullCalendar 的日曆插件，用於顯示日曆月視圖
import dayGridPlugin from '@fullcalendar/daygrid';

// 定義 MyCalendar1 元件
// 這個元件展示了一個簡單的日曆，包含一些靜態的事件
const MyCalendar1 = () => {
    return (
        <FullCalendar
            // 設定使用的日曆插件為 dayGridPlugin，顯示月曆視圖
            plugins={[ dayGridPlugin ]}
            
            // 設定初始顯示的視圖為 "dayGridMonth"（每個方格代表一天的月曆視圖）
            initialView="dayGridMonth"
            
            // 定義日曆中要顯示的事件
            events={[
                // 單日事件，僅在 2024-10-18 顯示
                { title: 'Event #1', start: '2024-10-18' },

                // 多日事件，從 2024-10-19 開始，至 2024-10-21 結束
                { title: 'Event #2', start: '2024-10-19', end: '2024-10-21' },

                // 單一時間事件，2024-10-24 上午 11:00 開始，設定為非整天事件
                { title: 'Event #3', start: '2024-10-24T11:00:00', allDay: false },
            ]}
        />
    );
}

// 匯出 MyCalendar1 元件，讓其他模組可以使用
export default MyCalendar1;
