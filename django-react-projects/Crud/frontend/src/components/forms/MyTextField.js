// 匯入必要的模組和元件
import * as React from 'react';
import TextField from '@mui/material/TextField'; // 引入 Material-UI 的 TextField 元件
import { Controller } from 'react-hook-form'; // 使用 react-hook-form 的 Controller 來管理表單欄位

// 定義自訂的文字輸入框元件
export default function MyTextField(props) {
  const { label, width, placeholder, name, control } = props; // 從 props 中取得 label, width, placeholder, name, control

  return (
    <Controller
      name={name} // 設定表單欄位名稱
      control={control} // 傳入的 react-hook-form 控制物件
      render={({
        field: { onChange, value }, // 解構表單欄位的控制方法
        fieldState: { error }, // 取得欄位狀態中的錯誤訊息
        formState, // 其他表單狀態（未使用）
      }) => (
        <TextField
          sx={{ width: width }} // 設定輸入框的寬度樣式
          onChange={onChange} // 當輸入變更時呼叫 onChange 方法
          value={value} // 設定輸入框的值
          id="standard-basic" // 設定輸入框的唯一 ID
          label={label} // 設定輸入框的標籤
          variant="standard" // 設定 TextField 的樣式為標準格式
          placeholder={placeholder} // 設定輸入框的佔位文字
          error={!!error} // 根據錯誤狀態設定輸入框是否顯示為錯誤
          helperText={error?.message} // 如果有錯誤，顯示錯誤訊息作為輔助文字
        />
      )}
    />
  );
}
