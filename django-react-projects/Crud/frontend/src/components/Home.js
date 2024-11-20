// 匯入 React 及相關 Hook 和元件
import { React, useEffect, useMemo, useState } from 'react';
import AxiosInstance from './Axios'; // 引入 Axios 實例，用於發送 HTTP 請求
import { MaterialReactTable } from 'material-react-table'; // 匯入 Material React Table，用於顯示資料表格
import Dayjs from 'dayjs'; // 引入 Dayjs，用於日期格式化
import { Box, IconButton } from '@mui/material'; // 使用 Material-UI 的元件
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'; // 匯入圖示
import { Link } from 'react-router-dom'; // 用於頁面導航的 React 路由組件

// 定義 Home 元件
const Home = () => {
  // 使用 useState Hook 定義狀態
  const [myData, setMydata] = useState(); // 儲存專案資料
  const [loading, setLoading] = useState(true); // 資料加載狀態，預設為 true 表示正在加載

  // 從 API 獲取資料，用於顯示專案列表
  const GetData = () => {
    AxiosInstance.get(`project/`).then((res) => {
      setMydata(res.data); // 設定專案資料
      console.log(res.data); // 將回應資料輸出至控制台（用於除錯）
      setLoading(false); // 加載完成，設定 loading 為 false
    });
  };

  // 使用 useEffect Hook 在元件載入時執行 GetData 函式
  useEffect(() => {
    GetData();
  }, []);

  // 使用 useMemo 定義表格的欄位結構
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name', // 使用欄位名稱作為鍵值
        header: 'Name', // 欄位標題
        size: 150, // 欄位寬度
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 150,
      },
      {
        accessorKey: 'comments',
        header: 'Comments',
        size: 200,
      },
      {
        accessorFn: (row) => Dayjs(row.start_date).format('DD-MM-YYYY'), // 使用 Dayjs 來格式化日期
        header: 'Start date',
        size: 150,
      },
      {
        accessorFn: (row) => Dayjs(row.end_date).format('DD-MM-YYYY'),
        header: 'End date',
        size: 150,
      },
    ],
    [], // 空依賴陣列，表示 columns 不會隨著其他狀態變化而重新生成
  );

  return (
    <div>
      {loading ? (
        <p>Loading data...</p> // 當資料尚未加載完成時顯示 Loading
      ) : (
        <MaterialReactTable
          columns={columns} // 設定表格欄位
          data={myData} // 設定表格資料
          enableRowActions // 啟用列操作功能，如編輯和刪除
          renderRowActions={({ row }) => (
            <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
              {/* 編輯按鈕，導航到編輯頁面 */}
              <IconButton color="secondary" component={Link} to={`edit/${row.original.id}`}>
                <EditIcon />
              </IconButton>

              {/* 刪除按鈕，導航到刪除確認頁面 */}
              <IconButton color="error" component={Link} to={`delete/${row.original.id}`}>
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
        />
      )}
    </div>
  );
};

// 匯出 Home 元件，供其他模組使用
export default Home;
