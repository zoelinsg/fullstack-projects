import React from 'react';
import ReactDOM from 'react-dom/client'; // 引入 ReactDOM 用來將 React 組件渲染到網頁中
import App from './App'; // 引入主應用組件 App
import './index.css'; // 引入全局樣式文件
import { BrowserRouter as Router } from 'react-router-dom'; // 引入 React Router 用來管理路由

// 使用 ReactDOM.createRoot() 方法，將 React 組件渲染到網頁的 root 元素中
ReactDOM.createRoot(document.getElementById('root')).render(
  // 使用 Router 來包裹應用，啟用 React Router 的路由功能
  <Router>
    {/* React.StrictMode 用來啟用嚴格模式，幫助檢測潛在問題 */}
    <React.StrictMode>
      <App /> {/* 渲染 App 組件作為應用的主要入口 */}
    </React.StrictMode>
  </Router>
);