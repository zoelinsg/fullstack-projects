import React from 'react'; // 從 React 模組匯入 React 物件
import TextField from '@mui/material/TextField'; // 從 MUI 匯入 TextField 元件，用於顯示文字輸入框

// 定義 MyTextForm 功能組件
// 參數: label - 輸入框的標籤; value - 當前的輸入值; name - 控件的名稱; onChange - 處理輸入變更的函式
export default function MyTextForm({ label, value, name, onChange }) {
  return (
    <>
      {/* TextField 元件，用於顯示文字輸入框 */}
      <TextField 
        id="outlined-basic" // 設置輸入框的 ID
        label={label} // 顯示輸入框的標籤
        variant="outlined" // 設置輸入框的樣式為 "outlined"
        value={value} // 綁定當前的輸入值
        onChange={onChange} // 當輸入內容變更時觸發的事件處理
        name={name} // 控件的名稱屬性
        fullWidth // 使輸入框佔滿可用寬度
      />
    </>
  );
}
