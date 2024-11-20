import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart'; // 引入柱狀圖元件

// MyStackedBarChart 組件定義，接收數據集、X 軸標籤名稱及資料系列作為屬性 (props)
export default function MyStackedBarChart({ dataset, XlabelName, series }) {
   
  return (
    <BarChart
      dataset={dataset} // 傳入的數據集，用於繪製堆疊柱狀圖
      xAxis={[{ 
          scaleType: 'band', // 設定 X 軸的縮放類型為帶狀 (band)
          dataKey: XlabelName, // 設定 X 軸使用的資料鍵，動態顯示標籤
          tickLabelStyle: { // 自訂 X 軸標籤的樣式
            angle: 20, // 標籤文字旋轉 20 度，避免重疊
            textAnchor: 'start', // 文字對齊方式設定為起始位置
            fontSize: 10, // 設定標籤的字體大小為 10
          },
      }]}
      series={series} // 傳入資料系列，用於定義堆疊的柱狀數據
      width={400} // 設定圖表寬度為 400 像素
      height={250} // 設定圖表高度為 250 像素
    />
  );
}
