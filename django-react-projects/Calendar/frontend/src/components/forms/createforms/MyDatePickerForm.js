import React from 'react'; // 從 React 模組匯入 React 物件
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'; // 從 MUI 日期選擇器模組中匯入 DemoContainer
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // 匯入 Dayjs 適配器，讓 MUI 日期選擇器支援 Dayjs
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; // 匯入 LocalizationProvider 以支持本地化
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; // 匯入 MUI 的 DatePicker 元件
import 'dayjs/locale/nl'; // 匯入荷蘭語 (nl) 的 Dayjs 本地化支援
import dayjs from 'dayjs'; // 匯入 Dayjs 庫

// 定義 MyDatePickerForm 功能組件
// 參數: label - 日期選擇器的標籤; value - 當前選擇的日期值; name - 控件的名稱; onChange - 處理日期變更的函式
export default function MyDatePickerForm({ label, value, name, onChange }) {
    
    // 當用戶選擇日期時觸發 handleDateChange 函式
    const handleDateChange = (newDate) => {
        // 調用傳入的 onChange 函式，將選擇的日期值以 Dayjs 格式傳遞
        onChange({ target: { name: name, value: dayjs(newDate) } });
    }

    return (
        // 使用 LocalizationProvider 為 DatePicker 提供 Dayjs 適配和本地化支援
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='nl'>
            <DemoContainer components={['DatePicker']}>
                {/* DatePicker 元件設置樣式、格式、初始值、名稱及標籤 */}
                <DatePicker 
                    sx={{ width: '100%' }} // 設置寬度為 100%
                    inputFormat='DD/MM/YYYY' // 設置日期輸入格式
                    value={value} // 綁定當前的日期值
                    onChange={handleDateChange} // 當日期變更時觸發的事件處理
                    name={name} // 控件的名稱屬性
                    label={label} // 顯示的標籤
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}
