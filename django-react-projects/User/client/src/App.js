// App.js
import { BrowserRouter as Router, Routes, Navigate, Route } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext'; // 引入 AuthContextProvider
import AuthMiddleware from './middlewares/AuthMiddleware';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import User from './pages/auth/User';
import PersistLogin from './components/PersistLogin';
import Navbar from "./components/Navbar";

// 應用程式的主要元件
function App() {
  return (
    <AuthContextProvider> {/* 確保所有路由與元件都被 Context Provider 包裹 */}
      <Router>
        {/* 導航列，顯示在所有頁面上方 */}
        <Navbar />

        {/* 路由配置區域 */}
        <Routes>
          {/* 包含需要持續登入檢查的路由，使用 PersistLogin 元件包裹 */}
          <Route path="/" element={<PersistLogin />}>
            {/* 首頁路由 */}
            <Route index element={<Home />} />

            {/* 認證相關的路由 */}
            <Route path="/auth">
              {/* 登入頁面路由 */}
              <Route path="login" element={<Login />} />

              {/* 註冊頁面路由 */}
              <Route path="register" element={<Register />} />

              {/* 使用者頁面路由，需通過 AuthMiddleware 驗證 */}
              <Route path="user" element={<AuthMiddleware />}>
                <Route index element={<User />} />
              </Route>
            </Route>
          </Route>

          {/* 處理所有未匹配的路由，重導向到首頁 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
