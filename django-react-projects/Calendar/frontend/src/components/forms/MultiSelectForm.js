import React from 'react'; // 從 React 模組匯入 React 物件
import OutlinedInput from '@mui/material/OutlinedInput'; // 匯入 MUI 的 OutlinedInput 作為選單的輸入框
import InputLabel from '@mui/material/InputLabel'; // 匯入 MUI 的 InputLabel 顯示選單標籤
import MenuItem from '@mui/material/MenuItem'; // 匯入 MUI 的 MenuItem 作為選單的每個選項
import FormControl from '@mui/material/FormControl'; // 匯入 MUI 的 FormControl 管理表單控件
import ListItemText from '@mui/material/ListItemText'; // 匯入 MUI 的 ListItemText 顯示選項文字
import Select from '@mui/material/Select'; // 匯入 MUI 的 Select 顯示下拉選單
import Checkbox from '@mui/material/Checkbox'; // 匯入 MUI 的 Checkbox 作為多選控件

// 設置選單的樣式屬性
const ITEM_HEIGHT = 48; // 每個選項的高度
const ITEM_PADDING_TOP = 8; // 選單頂部的內間距
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP, // 設置選單的最大高度
      width: 250, // 設置選單的寬度
    },
  },
};

// 定義 MultiSelectForm 功能組件
// 參數: label - 下拉選單的標籤; options - 可供選擇的選項; setSelectedValue - 更新選取值的函式; selectedValue - 當前選取的值
export default function MultiSelectForm({ label, options, setSelectedValue, selectedValue }) {
  
  // 當用戶選擇選項時觸發 handleChange 函式
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    // 判斷用戶是否選擇了「全選」
    if (value.includes('all')) {
      // 如果選中「全選」，且當前所有選項都已選中，則清除選擇；否則選中所有選項
      setSelectedValue(selectedValue.length === options.length ? [] : options);
    } else {
      // 若非全選，則更新選取的值
      setSelectedValue(
        typeof value === 'string' ? value.split(',') : value
      );
    }
  };

  return (
    <div>
      {/* 使用 FormControl 管理多選下拉選單的控件，並設置全寬度 */}
      <FormControl sx={{ m: 1, width: '100%' }}>
        <InputLabel id="demo-multiple-checkbox-label">{label}</InputLabel>
        {/* 使用 Select 元件建立多選下拉選單 */}
        <Select
          labelId="demo-multiple-checkbox-label" // 設定與 InputLabel 對應的 ID
          id="demo-multiple-checkbox" // 下拉選單的 ID
          multiple // 啟用多選功能
          value={selectedValue} // 綁定當前選取的值
          onChange={handleChange} // 當選擇變更時觸發的事件處理
          input={<OutlinedInput label={label} />} // 設置輸入框樣式
          renderValue={(selected) => selected.join(', ')} // 將選取的值顯示為逗號分隔的字串
          MenuProps={MenuProps} // 設置選單樣式屬性
        >
          {/* 「全選」選項 */}
          <MenuItem value={'all'}>
            <Checkbox 
              checked={selectedValue.length === options.length} // 當所有選項都選中時，設置為選中狀態
              indeterminate={selectedValue.length > 0 && selectedValue.length < options.length} // 部分選中時顯示中間狀態
            />
            <ListItemText primary={"Select All"} />
          </MenuItem>

          {/* 根據 options 動態生成選項 */}
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox checked={selectedValue.indexOf(option) > -1} /> {/* 根據選取狀態顯示勾選狀態 */}
              <ListItemText primary={option} /> {/* 顯示選項的文字 */}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
