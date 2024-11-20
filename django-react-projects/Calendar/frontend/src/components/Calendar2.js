import React from 'react'; // 從 React 模組匯入 React 物件
import MyCalendar2 from './calendars/MyCalendar2'; // 匯入自定義的 MyCalendar2 日曆組件

// 定義 Calendar2 功能組件
// 這個組件用於包裹並顯示 MyCalendar2 組件，方便在其他地方使用
const Calendar2 = () => {
  return (
    <div>
      {/* 渲染 MyCalendar2 組件，顯示自定義日曆 */}
      <MyCalendar2/>
    </div>
  );
}

// 匯出 Calendar2 組件，讓其他模組可以引入這個組件使用
export default Calendar2;
