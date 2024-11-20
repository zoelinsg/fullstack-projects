import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // 確保使用 React Router v6
import Navbar from './components/Navbar'; // 確保 Navbar 路徑大小寫正確
import Home from './components/Home';
import Activity from './components/activity';
import Attraction from './components/attraction';

function App() {
  const drawerWidth = 240; // 側邊欄寬度

  return (
    <Router>
      <div className="App">
        {/* 導航欄組件 */}
        <Navbar drawerWidth={drawerWidth} content={
          <Routes>
            <Route path="/" element={<Home />} />  {/* 設置首頁路由 */}
            <Route path="/activity" element={<Activity />} />  
            <Route path="/attraction" element={<Attraction />} />  
          </Routes>
        } />
      </div>
    </Router>
  );
}

export default App;
