import React from 'react'; // 從 React 模組匯入 React 物件
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'; // 從 MUI 日期選擇器模組中匯入 DemoContainer
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // 匯入 Dayjs 適配器，讓 MUI 日期選擇器支援 Dayjs
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; // 匯入 LocalizationProvider 以支援本地化
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; // 匯入 MUI 的 DatePicker 元件
import 'dayjs/locale/nl'; // 匯入荷蘭語 (nl) 的 Dayjs 本地化支援

// 定義 DatePickerForm 功能組件
// 參數: label - 日期選擇器的標籤; value - 當前選擇的日期值; onChange - 處理日期變更的函式
export default function DatePickerForm({ label, value, onChange }) {
  return (
    // 使用 LocalizationProvider 為 DatePicker 提供 Dayjs 適配和本地化支援
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='nl'>
      {/* DemoContainer 用來包裝 DatePicker 元件，顯示自訂的日期選擇器 */}
      <DemoContainer components={['DatePicker']}>
        {/* DatePicker 元件設置樣式、格式、初始值及標籤 */}
        <DatePicker
          label={label} // 顯示日期選擇器的標籤
          sx={{ width: '100%' }} // 設置寬度為 100%
          value={value} // 綁定當前的日期值
          onChange={onChange} // 當日期變更時觸發的事件處理
          inputFormat="DD/MM/YYYY" // 設置日期輸入格式
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
