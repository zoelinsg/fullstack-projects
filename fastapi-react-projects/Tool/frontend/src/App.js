import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // 確保使用 React Router v6
import Navbar from './components/Navbar'; // 確保 Navbar 路徑大小寫正確
import Home from './components/Home';
import QRcode from './components/QRcode';
import Calculator from './components/Calculator';

function App() {
  const drawerWidth = 240; // 側邊欄寬度

  return (
    <Router>
      <div className="App">
        {/* 導航欄組件 */}
        <Navbar drawerWidth={drawerWidth} content={
          <Routes>
            <Route path="/" element={<Home />} />  {/* 設置首頁路由 */}
            <Route path="/qrcode" element={<QRcode />} />  {/* 設置 QRcode 路由 */}
            <Route path="/calculator" element={<Calculator />} />  {/* 設置計算機路由 */}
          </Routes>
        } />
      </div>
    </Router>
  );
}

export default App;
