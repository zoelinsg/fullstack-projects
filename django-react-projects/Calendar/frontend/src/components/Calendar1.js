import React from "react"; // 從 React 模組匯入 React 物件
import MyCalendar1 from "./calendars/MyCalendar1"; // 匯入自定義的 MyCalendar1 日曆組件

// 定義 Calendar1 功能組件
// 這個組件用於包裹並顯示 MyCalendar1 組件，方便在其他地方使用
const Calendar1 = () => {
    return (
        <div>
            {/* 渲染 MyCalendar1 組件，顯示自定義日曆 */}
            <MyCalendar1/>
        </div>
    )
}

// 匯出 Calendar1 組件，讓其他模組可以引入這個組件使用
export default Calendar1;
