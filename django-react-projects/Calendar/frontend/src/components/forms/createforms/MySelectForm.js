import React from 'react'; // 從 React 模組匯入 React 物件
import Box from '@mui/material/Box'; // 從 MUI 匯入 Box 元件，用於控制佈局和樣式
import InputLabel from '@mui/material/InputLabel'; // 匯入 InputLabel 元件，用於顯示選單的標籤
import MenuItem from '@mui/material/MenuItem'; // 匯入 MenuItem 元件，作為下拉選單的選項
import FormControl from '@mui/material/FormControl'; // 匯入 FormControl 元件，管理表單控制項
import Select from '@mui/material/Select'; // 匯入 Select 元件，顯示下拉選單

// 定義 MySelectForm 功能組件
// 參數: label - 下拉選單的標籤; value - 當前選擇的值; name - 控件的名稱; onChange - 處理選擇變更的函式
export default function MySelectForm({ label, value, name, onChange }) {

  return (
    // 使用 Box 元件來控制外部容器的最小寬度
    <Box sx={{ minWidth: 120 }}>
      {/* 使用 FormControl 管理 Select 的控制項，fullWidth 使其佔滿可用寬度 */}
      <FormControl fullWidth>
        {/* InputLabel 顯示下拉選單的標籤 */}
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        {/* Select 元件，用於顯示下拉選單 */}
        <Select
          labelId="demo-simple-select-label" // 與 InputLabel 相關聯的 ID
          id="demo-simple-select" // 下拉選單的 ID
          value={value} // 綁定當前的選擇值
          onChange={onChange} // 當選擇變更時觸發的事件處理
          name={name} // 控件的名稱屬性
          label={label} // 顯示的標籤
        >
          {/* MenuItem 定義下拉選單的選項 */}
          <MenuItem value={'Open'}>Open</MenuItem>
          <MenuItem value={'In Progress'}>In Progress</MenuItem>
          <MenuItem value={'Completed'}>Completed</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
