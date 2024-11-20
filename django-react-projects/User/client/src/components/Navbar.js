// Navbar.js
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";

// 導航列元件
export default function Navbar() {
  const authContext = useContext(AuthContext); // 確保 Context 存在

  if (!authContext) {
    console.error("AuthContext is null. Please ensure that Navbar is wrapped in an AuthContextProvider.");
    return null; // 若 Context 為 null，顯示為空
  }

  const { isLoggedIn } = authContext;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* 手機或小螢幕上的導航按鈕 */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* 可折疊的導航內容 */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* 主頁連結 */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>

            {/* 若使用者已登入，顯示 User 連結 */}
            {isLoggedIn ? (
              <li className="nav-item">
                <NavLink className="nav-link" to="/auth/user">User</NavLink>
              </li>
            ) : (
              // 若未登入，顯示登入與註冊連結
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/auth/login">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/auth/register">Register</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
