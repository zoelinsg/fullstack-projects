import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart'; // 引入折線圖元件

// MyLineChart 組件定義，接收數據、X 軸資料鍵和系列資料作為屬性 (props)
export default function MyLineChart({ mydata, myxaxis, myseries }) {
  return (
    <LineChart
      dataset={mydata} // 傳入的數據集，用於繪製折線圖
      xAxis={[
        { 
          dataKey: myxaxis, // 設定 X 軸使用的資料鍵
          scaleType: 'point' // 設定 X 軸的縮放類型為點 (point)
        }
      ]}
      series={myseries} // 傳入的資料系列，用於定義不同的折線數據
      width={700} // 設定圖表寬度為 700 像素
      height={300} // 設定圖表高度為 300 像素
    />
  );
}
