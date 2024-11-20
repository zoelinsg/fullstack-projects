// 匯入必要的模組和元件
import './App.css'; // 引入應用程式的 CSS 樣式
import { Routes, Route } from 'react-router-dom'; // React Router 用於處理路由
import Home from './components/Home'; // 主頁元件
import About from './components/About'; // 關於頁元件
import Create from './components/Create'; // 新增專案頁元件
import Navbar from './components/NavBar'; // 導航欄元件
import Edit from './components/Edit'; // 編輯專案頁元件
import Delete from './components/Delete'; // 刪除專案頁元件

// 定義主應用程式元件
function App() {
  const myWidth = 220; // 設定側邊欄的寬度

  return (
    <div className="App">
      {/* 導航欄元件，包含側邊欄及主要內容 */}
      <Navbar 
        drawerWidth={myWidth} // 傳遞側邊欄寬度作為屬性
        content={ // 定義應用程式的主要內容區域
          <Routes>
            {/* 定義各個路由及其對應的元件 */}
            <Route path="" element={<Home />} /> {/* 對應首頁 */}
            <Route path="/about" element={<About />} /> {/* 對應關於頁 */}
            <Route path="/create" element={<Create />} /> {/* 對應新增專案頁 */}
            <Route path="/edit/:id" element={<Edit />} /> {/* 對應編輯專案頁，URL 中帶有專案 ID */}
            <Route path="/delete/:id" element={<Delete />} /> {/* 對應刪除專案頁，URL 中帶有專案 ID */}
          </Routes>
        }
      />
    </div>
  );
}

// 匯出 App 元件，供應用程式入口文件使用
export default App;
