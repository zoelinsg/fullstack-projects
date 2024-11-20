import React from 'react';
import Box from '@mui/material/Box';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer'; // 用來建立響應式的圖表容器
import { BarPlot } from '@mui/x-charts/BarChart'; // 引入柱狀圖元件
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart'; // 引入折線圖和標記圖元件
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis'; // 引入 X 軸元件
import { ChartsLegend } from '@mui/x-charts/ChartsLegend'; // 引入圖例元件

// MyCombiChart 組件定義
export default function MyCombiChart({ data, myseries, xcolumn }) {
 
  return (
    // 外部容器 Box，設定圖表寬高
    <Box sx={{ width: '100%', height: '300px' }}>

        {/* 使用 ResponsiveChartContainer 包裝圖表內容，使其具備響應式特性 */}
        <ResponsiveChartContainer
          dataset={data}       // 傳入的數據集，用於渲染圖表
          series={myseries}    // 傳入的數據系列，用於定義不同的資料視覺化
          xAxis={[
            {
              dataKey: xcolumn,           // 設定 X 軸使用的資料鍵
              scaleType: 'band',          // 設定 X 軸的縮放類型
              id: 'x-axis-id',            // 為 X 軸設定唯一 ID
              tickLabelStyle: {           // 自訂 X 軸標籤樣式
                angle: 20,                // 標籤角度設置為 20 度
                textAnchor: 'start',      // 標籤的起始對齊方式
                fontSize: 10,             // 設定標籤的字體大小
              },
            },
          ]}
        >
          <BarPlot />            {/* 渲染柱狀圖 */}
          <LinePlot />           {/* 渲染折線圖 */}
          <MarkPlot />           {/* 渲染標記圖 */}
          <ChartsLegend />       {/* 顯示圖表的圖例 */}
          <ChartsXAxis position="bottom" axisId="x-axis-id" />  {/* 設定 X 軸位置及使用的軸 ID */}
        </ResponsiveChartContainer>

    </Box>
  );
}
