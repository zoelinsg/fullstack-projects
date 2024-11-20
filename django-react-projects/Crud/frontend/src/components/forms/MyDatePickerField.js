// 匯入必要的模組和元件
import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // 使用 Dayjs 作為日期處理函式庫的適配器
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; // 提供本地化設定
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; // Material-UI 日期選擇器元件
import { Controller } from 'react-hook-form'; // react-hook-form 用於表單控制

// 定義自訂的日期選擇器元件
export default function MyDatePickerField(props) {
  const { label, control, width, name } = props; // 從 props 中取得 label, control, width, name 等屬性

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}> {/* 使用 Dayjs 適配器設定本地化 */}
      <Controller
        name={name} // 設定控制的表單欄位名稱
        control={control} // 傳入的 react-hook-form 控制物件
        render={({
          field: { onChange, value }, // 解構表單欄位控制方法
          fieldState: { error }, // 獲取欄位狀態的錯誤訊息
          formState, // 其他表單狀態（未使用）
        }) => (
          <DatePicker
            label={label} // 設定日期選擇器的標籤
            sx={{ width: width }} // 設定元件的寬度樣式
            onChange={onChange} // 當選擇日期變更時呼叫 onChange 方法
            value={value} // 設定選擇的日期值
            slotProps={{
              textField: {
                error: !!error, // 如果有錯誤，顯示錯誤狀態
                helperText: error?.message, // 顯示錯誤訊息作為輔助文字
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
}
