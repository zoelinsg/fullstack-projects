import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer'; // 引入 Drawer 元件作為側邊欄
import AppBar from '@mui/material/AppBar'; // 引入 AppBar 元件作為頂部導航欄
import CssBaseline from '@mui/material/CssBaseline'; // 引入 CssBaseline 以保持樣式一致性
import Toolbar from '@mui/material/Toolbar'; // 引入 Toolbar 用來組織 AppBar 內容
import Typography from '@mui/material/Typography'; // 引入 Typography 用來顯示文字
import ListItem from '@mui/material/ListItem'; // 引入 ListItem 作為列表項目
import ListItemButton from '@mui/material/ListItemButton'; // 引入可點擊的 ListItem
import ListItemIcon from '@mui/material/ListItemIcon'; // 引入列表項目的圖標容器
import ListItemText from '@mui/material/ListItemText'; // 引入列表項目的文字
import AutoGraphIcon from '@mui/icons-material/AutoGraph'; // 引入圖標
import { Link, useLocation } from 'react-router-dom'; // 引入 React Router 用來導航

// 定義側邊欄的寬度
const drawerWidth = 240;

// Navbar 組件定義，接收 content 作為主內容
export default function Navbar({ content }) {
  const location = useLocation(); // 使用 React Router 的 useLocation 取得當前頁面路徑

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* 固定在頁面頂部的導航欄 */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Clipped drawer {/* 導航欄標題 */}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* 固定在左側的側邊欄 */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth, // 設定側邊欄的寬度
          flexShrink: 0, // 禁止收縮
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }, // 設定 Drawer 內部樣式
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          {/* Dashboard 1 的導航項目 */}
          <ListItem key={1} disablePadding>
            <ListItemButton 
              component={Link} 
              to={"/"} // 連結到首頁
              selected={"/" === location.pathname} // 根據當前路徑設定選中效果
            >
              <ListItemIcon>
                <AutoGraphIcon /> {/* 圖標 */}
              </ListItemIcon>
              <ListItemText primary={"Dashboard 1"} /> {/* 顯示的文字 */}
            </ListItemButton>
          </ListItem>

          {/* Dashboard 2 的導航項目 */}
          <ListItem key={2} disablePadding>
            <ListItemButton 
              component={Link} 
              to={"/dashboard2"} // 連結到 /dashboard2 頁面
              selected={"/dashboard2" === location.pathname} // 根據當前路徑設定選中效果
            >
              <ListItemIcon>
                <AutoGraphIcon /> {/* 圖標 */}
              </ListItemIcon>
              <ListItemText primary={"Dashboard 2"} /> {/* 顯示的文字 */}
            </ListItemButton>
          </ListItem>
        </Box>
      </Drawer>

      {/* 主內容區域 */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {content} {/* 顯示傳入的主內容 */}
      </Box>
    </Box>
  );
}
