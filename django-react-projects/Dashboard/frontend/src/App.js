// 引入樣式檔案
import './App.css';
// 引入 React Router 的 Routes 和 Route，用於設定應用程式的路由
import { Routes, Route } from 'react-router-dom';
// 引入應用程式的兩個主要組件 Dashboard1 和 Dashboard2
import Dashboard1 from './components/Dashboard1';
import Dashboard2 from './components/Dashboard2';
// 引入 Navbar 組件，用於顯示導覽列
import Navbar from './components/Navbar';

function App() {

  return (
    <>
      {/* Navbar 組件，content 屬性接收 Routes 來定義路由 */}
      <Navbar
        content={
          <Routes>
            {/* 根路徑 ("/") 對應的元件為 Dashboard1 */}
            <Route path="" element={<Dashboard1 />} />
            {/* "/dashboard2" 路徑對應的元件為 Dashboard2 */}
            <Route path="/dashboard2" element={<Dashboard2 />} />
          </Routes>
        }
      />
    </>
  );
}

// 將 App 組件匯出，以便在其他檔案中使用
export default App;
