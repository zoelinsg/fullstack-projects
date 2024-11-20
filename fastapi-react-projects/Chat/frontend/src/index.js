import React from 'react';  // 匯入 React 庫，用於構建組件
import ReactDOM from 'react-dom/client';  // 匯入 ReactDOM，用於將 React 組件渲染到真實的 DOM
import './index.css';  // 匯入應用程式的全域 CSS 樣式
import App from './App';  // 匯入主應用程式組件
import reportWebVitals from './reportWebVitals';  // 匯入 Web Vitals，進行性能監控

// 使用 ReactDOM 創建根節點，綁定到 index.html 中的 root ID
const root = ReactDOM.createRoot(document.getElementById('root'));

// 渲染應用程式的主要組件 App
root.render(
  <React.StrictMode>
    <App />  {/* 將 App 組件渲染到根節點中，並使用 StrictMode 檢查潛在問題 */}
  </React.StrictMode>
);

// 如果你想要開始測量應用程式的性能表現，傳遞一個函式來記錄結果
// 例如：reportWebVitals(console.log) 或發送至某個分析端點
// 詳細說明：https://bit.ly/CRA-vitals
reportWebVitals();
