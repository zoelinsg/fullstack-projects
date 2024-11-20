import React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart'; // 引入環狀圖和弧形標籤的樣式類別
import { useDrawingArea } from '@mui/x-charts/hooks'; // 引入繪圖區域的自訂 Hook
import { styled } from '@mui/material/styles'; // 引入 MUI 的樣式工具

// 設定圖表的寬高
const size = {
  width: 400, // 圖表寬度設置為 400 像素
  height: 200, // 圖表高度設置為 200 像素
};

// 自訂樣式的文字元件，用來顯示圖表中心的標籤
const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary, // 文字顏色使用主題的文字顏色
  textAnchor: 'middle', // 文字水平居中
  dominantBaseline: 'central', // 文字垂直居中
  fontSize: 20, // 文字大小設定為 20
}));

// PieCenterLabel 組件用於在圖表中心顯示標籤
function PieCenterLabel({ children }) {
  // 使用 useDrawingArea Hook 取得圖表的繪圖區域位置和尺寸
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children} {/* 顯示傳入的中心標籤內容 */}
    </StyledText>
  );
}

// MyDonutChart 組件定義，接收數據和中心標籤作為屬性 (props)
export default function MyDonutChart({ data, centerlabel }) {
  return (
    <PieChart 
        series={[{ 
            data, // 傳入的數據陣列，用於繪製圖表
            innerRadius: 50, // 設定環狀圖的內半徑，決定內部空洞大小
            arcLabel: (item) => `${item.value}`, // 弧形標籤顯示每個數據項的值
            highlightScope: { faded: 'global', highlighted: 'item' }, // 設定高亮效果的範圍
            faded: { 
              innerRadius: 30, // 當項目變淡 (faded) 時的內半徑
              additionalRadius: -30, // 額外縮減的半徑
              color: 'gray' // 當項目變淡時的顏色
            }
        }]} 
        sx={{
            // 自訂弧形標籤的樣式
            [`& .${pieArcLabelClasses.root}`]: {
                fill: 'white', // 標籤文字顏色設為白色
                fontSize: 12,  // 標籤文字大小設定為 12
            }
        }}
        {...size} // 傳入設定的寬度和高度
    >
      <PieCenterLabel>{centerlabel}</PieCenterLabel> {/* 在圖表中心顯示中心標籤 */}
    </PieChart>
  );
}
