// 匯入必要的模組和元件
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel'; // 引入 Material-UI 的輸入標籤元件
import MenuItem from '@mui/material/MenuItem'; // 引入下拉選單項目元件
import FormControl from '@mui/material/FormControl'; // 表單控制元件
import Select from '@mui/material/Select'; // 下拉選單元件
import { Controller } from 'react-hook-form'; // 使用 react-hook-form 的 Controller 來管理表單欄位
import FormHelperText from '@mui/material/FormHelperText'; // 輔助文字顯示元件

// 定義自訂的下拉選單元件
export default function MySelectField(props) {
  const { label, name, control, width, options } = props; // 從 props 中取得 label, name, control, width, options

  return (
    <Controller
      name={name} // 設定表單欄位名稱
      control={control} // 傳入的 react-hook-form 控制物件
      render={({
        field: { onChange, value }, // 解構表單欄位的控制方法
        fieldState: { error }, // 取得欄位狀態中的錯誤訊息
        formState, // 其他表單狀態（未使用）
      }) => (
        <FormControl variant="standard" sx={{ width: width }}> {/* 設定元件的寬度樣式 */}
          <InputLabel id={`${name}-label`}>{label}</InputLabel> {/* 設定選單的標籤 */}
          
          <Select
            labelId={`${name}-label`} // 連結的標籤 ID
            id={`${name}-select`} // 元件的 ID
            onChange={onChange} // 當選擇變更時呼叫 onChange 方法
            value={value} // 設定選擇的值
            error={!!error} // 根據錯誤狀態設定輸入框是否顯示為錯誤
          >
            {options.map((option) => (
              <MenuItem key={option.id} value={option.id}> {/* 使用 option ID 作為唯一鍵值 */}
                {option.name} {/* 顯示選項名稱 */}
              </MenuItem>
            ))}
          </Select>

          {/* 如果有錯誤訊息，顯示在輸入框下方 */}
          <FormHelperText sx={{ color: "#d32f2f" }}>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
}
