import React from 'react'; // 從 React 模組匯入 React 物件
import Stack from '@mui/material/Stack'; // 從 MUI 匯入 Stack 元件，用於排列按鈕
import Button from '@mui/material/Button'; // 從 MUI 匯入 Button 元件，用於顯示按鈕

// 定義 MyButton 功能組件
// 參數: label - 按鈕上的文字; type - 按鈕的類型 (例如: 'button', 'submit')
export default function MyButton({ label, type }) {
  return (
    // 使用 Stack 元件來排列按鈕，設定橫向排列和按鈕間的間距
    <Stack spacing={2} direction="row">
      {/* Button 元件，variant 設定為 'contained' 讓按鈕具有實心效果 */}
      <Button variant="contained" type={type}>
        {label} {/* 顯示傳遞進來的按鈕標籤 */}
      </Button>
    </Stack>
  );
}
