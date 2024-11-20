import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { axiosInstance } from '../../api/apiConfig';
import useAuth from '../../hooks/useAuth';

// 登入元件
export default function Login() {
    const { setAccessToken, setCSRFToken, setIsLoggedIn } = useAuth(); // 從 useAuth 中取得設定認證狀態的函式
    const navigate = useNavigate(); // 用於導航的 Hook
    const location = useLocation(); // 取得當前路由位置的 Hook
    const fromLocation = location?.state?.from?.pathname || '/'; // 確定重定向目標，預設為首頁
    const [loading, setLoading] = useState(false); // 控制加載狀態
    const [email, setEmail] = useState(''); // 儲存使用者輸入的 email
    const [password, setPassword] = useState(''); // 儲存使用者輸入的密碼

    // 更新 email 狀態
    function onEmailChange(event) {
        setEmail(event.target.value);
    }

    // 更新 password 狀態
    function onPasswordChange(event) {
        setPassword(event.target.value);
    }

    // 表單提交處理函式
    async function onSubmitForm(event) {
        event.preventDefault(); // 阻止表單的預設提交行為
        setLoading(true); // 設定加載狀態為 true

        try {
            // 發送登入請求
            const response = await axiosInstance.post('auth/login', JSON.stringify({
                email,
                password
            }));

            // 更新認證相關的狀態
            setAccessToken(response?.data?.access_token); // 設置存取權杖
            setCSRFToken(response.headers["x-csrftoken"]); // 設置 CSRF 權杖
            setIsLoggedIn(true); // 更新登入狀態為已登入
            setEmail(''); // 清空 email 欄位
            setPassword(''); // 清空 password 欄位
            setLoading(false); // 結束加載狀態

            navigate(fromLocation, { replace: true }); // 導向至先前頁面或首頁
        } catch (error) {
            setLoading(false); // 結束加載狀態
            console.log(error); // 錯誤處理（此處可加入更多錯誤顯示邏輯）
        }
    }

    return (
        <div className='container'>
            <h2>Login</h2>
            <form onSubmit={onSubmitForm}>
                <div className="mb-3">
                    <input
                        type="email"
                        placeholder='Email'
                        autoComplete='off'
                        className='form-control'
                        id="email"
                        onChange={onEmailChange}
                        value={email}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        placeholder='Password'
                        autoComplete='off'
                        className='form-control'
                        id="password"
                        onChange={onPasswordChange}
                        value={password}
                    />
                </div>
                <div className="mb-3">
                    <button disabled={loading} className='btn btn-success' type="submit">
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </div>
            </form>
        </div>
    );
}
