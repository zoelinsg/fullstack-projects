import React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart'; // 引入派圖元件及標籤樣式類別

// MyPieChart 組件定義，接收數據集作為屬性 (props)
export default function MyPieChart({ myData }) {
  return (
    <PieChart
      series={[
        {
            arcLabel: (item) => `${item.percentage} %`, // 顯示每個項目的百分比標籤
            data: myData, // 傳入的數據集，用於渲染派圖
            highlightScope: { faded: 'global', highlighted: 'item' }, // 設定高亮效果範圍
            faded: { 
              innerRadius: 30, // 當項目變淡 (faded) 時的內半徑
              additionalRadius: -30, // 額外縮減的半徑
              color: 'gray' // 當項目變淡時的顏色
            }
        },
      ]}
      // 自訂弧形標籤的樣式
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
            fill: 'white', // 標籤文字顏色設為白色
            fontSize: 14,  // 標籤文字大小設定為 14
        }
      }}
      width={400} // 設定圖表寬度為 400 像素
      height={200} // 設定圖表高度為 200 像素
    />
  );
}
