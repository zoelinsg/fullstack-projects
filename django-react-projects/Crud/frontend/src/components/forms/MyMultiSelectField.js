// 匯入必要的模組和元件
import * as React from 'react';
import { useTheme } from '@mui/material/styles'; // 引入 MUI 主題，用於樣式設定
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Controller } from 'react-hook-form'; // 用於控制表單的 react-hook-form 組件

// 設定選單的高度和間距
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// 用於設定選項樣式的函式，根據是否選中來調整字體粗細
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

// 定義自訂的多選下拉選單元件
export default function MyMultiSelectField(props) {
  const { control, name, label, width, options } = props; // 從 props 中取得 control, name, label, width, options
  const theme = useTheme(); // 使用 MUI 主題
  const [personName, setPersonName] = React.useState([]); // 狀態儲存已選中的選項

  // 處理選擇變更的函式
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // 自動填入時將字串轉換成陣列
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <Controller
      name={name} // 設定表單欄位名稱
      control={control} // 傳入的 react-hook-form 控制物件
      defaultValue={[]} // 設定預設值為空陣列
      render={({
        field: { onChange, value }, // 解構表單欄位的控制方法
        fieldState: { error }, // 取得欄位狀態中的錯誤訊息
        formState, // 其他表單狀態（未使用）
      }) => (
        <FormControl sx={{ width: width }}> {/* 設定元件的寬度樣式 */}
          <InputLabel id="demo-multiple-chip-label">{label}</InputLabel>
          <Select
            sx={{ width: '100%' }}
            labelId="demo-multiple-chip-label" // 連結的標籤 ID
            id="demo-multiple-chip" // 組件的 ID
            multiple // 啟用多選功能
            value={value} // 設定選擇的值
            onChange={(e) => {
              handleChange(e); // 更新狀態
              onChange(e.target.value); // 更新表單資料
            }}
            input={<OutlinedInput id="select-multiple-chip" label={label} />} // 使用 OutlinedInput 作為選單的輸入框
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={options.find(option => option.id === value)?.name} // 根據選項 ID 來顯示對應的名稱
                  />
                ))}
              </Box>
            )}
            MenuProps={MenuProps} // 設定選單的樣式屬性
          >
            {options.map((option) => (
              <MenuItem
                key={option.id} // 選項的唯一 ID
                value={option.id} // 選項的值
                style={getStyles(option.name, personName, theme)} // 動態樣式
              >
                {option.name} {/* 顯示選項名稱 */}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
}
