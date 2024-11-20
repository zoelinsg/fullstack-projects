// 匯入必要的 React Hook 和元件
import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material'; // 匯入 Material-UI 的元件
import AxiosInstance from './Axios'; // 引入 Axios 實例，用於發送 API 請求
import { useNavigate, useParams } from 'react-router-dom'; // 用於頁面導航和取得 URL 參數的 Hook

// 定義 Delete 元件
const Delete = () => {
  const MyParam = useParams(); // 取得 URL 中的參數
  const MyId = MyParam.id; // 從 URL 中提取專案 ID

  // 使用 useState Hook 定義狀態
  const [myData, setMyData] = useState(); // 儲存要刪除的專案資料
  const [loading, setLoading] = useState(true); // 加載狀態，預設為 true 表示正在加載

  // 定義函式 GetData，用於從 API 獲取要刪除的專案資料
  const GetData = () => {
    AxiosInstance.get(`project/${MyId}`).then((res) => {
      setMyData(res.data); // 設定專案資料
      console.log(res.data);
      setLoading(false); // 完成資料加載
    });
  };

  // 使用 useEffect Hook 在元件載入時執行 GetData 函式
  useEffect(() => {
    GetData();
  }, []); // 空依賴陣列表示只在組件初始化時執行一次

  const navigate = useNavigate(); // 用於頁面導航

  // 定義函式 submission，用於執行刪除操作
  const submission = () => {
    AxiosInstance.delete(`project/${MyId}/`).then((res) => {
      navigate(`/`); // 刪除成功後導航至首頁
    });
  };

  // 渲染元件的內容
  return (
    <div>
      {loading ? (
        <p>Loading data...</p> // 如果資料正在加載，顯示 Loading 提示
      ) : (
        <div>
          {/* 顯示專案名稱，告知使用者目前的刪除操作 */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              backgroundColor: '#00003f',
              marginBottom: '10px',
            }}
          >
            <Typography sx={{ marginLeft: '20px', color: '#fff' }}>
              Delete project: {myData.name}
            </Typography>
          </Box>

          {/* 提示使用者確認刪除操作 */}
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              boxShadow: 3,
              padding: 4,
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'start',
                marginBottom: '40px',
              }}
            >
              Are you sure that you want to delete this project: {myData.name}
            </Box>

            {/* 刪除按鈕，點擊後執行刪除操作 */}
            <Box sx={{ width: '30%' }}>
              <Button
                variant="contained"
                onClick={submission}
                sx={{ width: '100%' }}
              >
                Delete the project
              </Button>
            </Box>
          </Box>
        </div>
      )}
    </div>
  );
};

// 匯出 Delete 元件，供其他模組使用
export default Delete;
