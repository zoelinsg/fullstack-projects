import React from 'react';
import { Grid, Box } from '@mui/material';

// MyChartBox 組件：接收圖標、標題和圖表作為參數，在儀表板上排列顯示
export default function MyChartBox(props) {
  // 解構從 props 傳入的參數
  const { icon1, title1, chart1, icon2, title2, chart2, icon3, title3, chart3 } = props;
  
  return (
    <>
        <Grid container
            // 使用 MUI 的 Grid 來建立一個容器，並設定樣式
            sx={{ width: '100%', display: 'flex', minHeight: '200px', boxShadow: 3, justifyContent: 'space-evenly' }}
        >
            {/* 第一個圖表區塊 */}
            <Grid
                item xs={12} sm={12} md={6} lg={4}
                // 設定區塊的最小高度、內邊距及邊框樣式
                sx={{ minHeight: '200px', padding: '20px', borderRight: '1px dotted #d3d3d3' }}
            >
                {/* 圖標和標題區域 */}
                <Box sx={{ marginBottom: '20px', fontWeight: 'bold', display: 'flex', flexDirection: 'row', alignItems: 'center' }}> 
                    <Box sx={{ marginRight: '15px' }}>{icon1}</Box>  {/* 圖標 */}
                    <Box>{title1}</Box>  {/* 標題 */}
                </Box>

                {/* 圖表顯示區域 */}
                <Box sx={{ marginBottom: '20px' }}>{chart1}</Box>
            </Grid>

            {/* 第二個圖表區塊 */}
            <Grid
                item xs={12} sm={12} md={6} lg={4}
                sx={{ minHeight: '200px', padding: '20px', borderRight: '1px dotted #d3d3d3' }}
            >
                <Box sx={{ marginBottom: '20px', fontWeight: 'bold', display: 'flex', flexDirection: 'row', alignItems: 'center' }}> 
                    <Box sx={{ marginRight: '15px' }}>{icon2}</Box>  {/* 圖標 */}
                    <Box>{title2}</Box>  {/* 標題 */}
                </Box>

                <Box sx={{ marginBottom: '20px' }}>{chart2}</Box>  {/* 圖表顯示區域 */}
            </Grid>

            {/* 第三個圖表區塊 */}
            <Grid
                item xs={12} sm={12} md={6} lg={4}
                sx={{ minHeight: '200px', padding: '20px', borderRight: '1px dotted #d3d3d3' }}
            >
                <Box sx={{ marginBottom: '20px', fontWeight: 'bold', display: 'flex', flexDirection: 'row', alignItems: 'center' }}> 
                    <Box sx={{ marginRight: '15px' }}>{icon3}</Box>  {/* 圖標 */}
                    <Box>{title3}</Box>  {/* 標題 */}
                </Box>

                <Box sx={{ marginBottom: '20px' }}>{chart3}</Box>  {/* 圖表顯示區域 */}
            </Grid>

        </Grid>
    </>
  );
}
