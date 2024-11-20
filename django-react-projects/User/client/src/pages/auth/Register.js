import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../api/apiConfig';

// 註冊元件
export default function Register() {
    const navigate = useNavigate(); // 用於導航到其他頁面的 Hook
    const [loading, setLoading] = useState(false); // 控制加載狀態

    // 使用 useRef 來管理表單輸入的引用
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const password2Ref = useRef();

    // 表單提交處理函式
    async function onSubmitForm(event) {
        event.preventDefault(); // 阻止表單的預設提交行為

        // 組裝表單資料
        const data = {
            first_name: firstNameRef.current.value,
            last_name: lastNameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password2: password2Ref.current.value,
        };

        setLoading(true); // 設定加載狀態為 true

        try {
            // 發送註冊請求
            await axiosInstance.post('auth/register', JSON.stringify(data));

            setLoading(false); // 結束加載狀態

            navigate('/auth/login'); // 導向登入頁面
        } catch (error) {
            setLoading(false); // 結束加載狀態
            console.log(error); // 錯誤處理（此處可加入更多錯誤顯示邏輯）
        }
    }

    return (
        <div className='container'>
            <h2>Register</h2>
            <form onSubmit={onSubmitForm}>
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder='First Name'
                        autoComplete='off'
                        className='form-control'
                        id='first_name'
                        ref={firstNameRef}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder='Last Name'
                        autoComplete='off'
                        className='form-control'
                        id='last_name'
                        ref={lastNameRef}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="email"
                        placeholder='Email'
                        autoComplete='off'
                        className='form-control'
                        id="email"
                        ref={emailRef}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        placeholder='Password'
                        autoComplete='off'
                        className='form-control'
                        id="password"
                        ref={passwordRef}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        placeholder='Confirm Password'
                        autoComplete='off'
                        className='form-control'
                        id="passwordConfirmation"
                        ref={password2Ref}
                    />
                </div>
                <div className="mb-3">
                    <button disabled={loading} className='btn btn-success' type="submit">
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </div>
            </form>
        </div>
    );
}
