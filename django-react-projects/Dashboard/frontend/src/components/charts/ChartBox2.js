import React from 'react';
import { Grid, Box } from '@mui/material';

// MyChartBox2 組件定義，從父組件接受 icon、title 和 chart 作為屬性 (props) 來渲染內容
export default function MyChartBox2(props) {
  // 從 props 中解構取得 icon1, title1, chart1 等屬性
  const { icon1, title1, chart1, icon2, title2, chart2 } = props;

  return (
    <>
        <Grid 
            container
            sx={{
                width: '100%',                // 設定寬度為 100%
                display: 'flex',              // 使用 flex 布局
                minHeight: '200px',           // 最小高度設定為 200px
                boxShadow: 3,                 // 加入陰影效果
                justifyContent: 'space-evenly', // 在主軸方向均勻分配空間
                marginTop: '20px'             // 上方邊距 20px
            }}
        >

            {/* 第一個圖表盒 */}
            <Grid
                item xs={12} sm={12} md={6} lg={6}  // 設定在不同裝置寬度下的響應式配置
                sx={{
                    minHeight: '200px',            // 最小高度 200px
                    padding: '20px',               // 內邊距 20px
                    borderRight: '1px dotted #d3d3d3' // 右側點狀邊框
                }}
            >
                <Box 
                    sx={{
                        marginBottom: '20px',       // 下方邊距 20px
                        fontWeight: 'bold',         // 粗體字
                        display: 'flex',            // 使用 flex 布局
                        flexDirection: 'row',       // 主軸方向為橫向
                        alignItems: 'center'        // 垂直對齊
                    }}
                > 
                    <Box sx={{ marginRight: '15px' }}>{icon1}</Box>  {/* 顯示圖標 */}
                    <Box>{title1}</Box>                              {/* 顯示標題 */}
                </Box>

                <Box sx={{ marginBottom: '20px' }}>{chart1}</Box>     {/* 顯示圖表 */}

            </Grid>

            {/* 第二個圖表盒 */}
            <Grid
                item xs={12} sm={12} md={6} lg={6}
                sx={{
                    minHeight: '200px',
                    padding: '20px',
                    borderRight: '1px dotted #d3d3d3'
                }}
            >
                <Box 
                    sx={{
                        marginBottom: '20px',
                        fontWeight: 'bold',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                > 
                    <Box sx={{ marginRight: '15px' }}>{icon2}</Box>  {/* 顯示圖標 */}
                    <Box>{title2}</Box>                              {/* 顯示標題 */}
                </Box>

                <Box sx={{ marginBottom: '20px' }}>{chart2}</Box>     {/* 顯示圖表 */}

            </Grid>

        </Grid>

    </>
  );
}
