import React, { useState, useEffect } from 'react'; // 從 React 匯入必要的 Hook: useState, useEffect
import { useParams } from 'react-router-dom'; // 匯入 useParams 來獲取 URL 中的參數
import AxiosInstance from './AxiosInstance'; // 匯入 AxiosInstance 用於進行 API 請求
import Box from '@mui/material/Box'; // 匯入 MUI 的 Box 元件，用於佈局

// 定義 EventDetails 功能組件
const EventDetails = () => {

    // 從 URL 中取得參數，獲取事件的 ID
    const MyParam = useParams();
    const MyId = MyParam.id;
    console.log(MyId); // 在控制台輸出 ID，方便除錯

    const [loading, setLoading] = useState(true); // 狀態管理，用於顯示資料加載中的提示
    const [events, setEvents] = useState(true); // 保存從後端獲取的事件資料

    // 從後端 API 獲取指定 ID 的事件資料
    const GetData = () => {
        AxiosInstance.get(`appointments/${MyId}`).then((res) => {
            setEvents(res.data); // 設置事件資料
            setLoading(false); // 資料加載完成
            console.log(res.data); // 在控制台輸出取得的資料
        });
    }

    // 在組件載入時執行 GetData 函式
    useEffect(() => {
        GetData();
    }, []);

    return (
        <div>
            {/* 如果資料在加載，顯示提示；否則顯示事件詳細資料 */}
            {loading ? <p>正在加載資料...</p> :
                <>
                    {/* 事件名稱顯示區域 */}
                    <Box sx={{ boxShadow: 3, padding: '20px', display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
                        <Box sx={{ fontWeight: 'bold' }}>名稱: </Box>
                        <Box sx={{ marginLeft: '10px' }}>{events.title}</Box>
                    </Box>

                    {/* 事件狀態顯示區域 */}
                    <Box sx={{ boxShadow: 3, padding: '20px', display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
                        <Box sx={{ fontWeight: 'bold' }}>狀態: </Box>
                        <Box sx={{ marginLeft: '10px' }}>{events.classNames}</Box>
                    </Box>

                    {/* 事件開始日期顯示區域 */}
                    <Box sx={{ boxShadow: 3, padding: '20px', display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
                        <Box sx={{ fontWeight: 'bold' }}>開始日期: </Box>
                        <Box sx={{ marginLeft: '10px' }}>{events.start}</Box>
                    </Box>

                    {/* 事件結束日期顯示區域 */}
                    <Box sx={{ boxShadow: 3, padding: '20px', display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
                        <Box sx={{ fontWeight: 'bold' }}>結束日期: </Box>
                        <Box sx={{ marginLeft: '10px' }}>{events.end}</Box>
                    </Box>
                </>
            }
        </div>
    );
}

export default EventDetails;
