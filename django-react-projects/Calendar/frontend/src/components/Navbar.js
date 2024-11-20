import React from 'react'; // 從 React 匯入 React 物件
import Box from '@mui/material/Box'; // 匯入 MUI 的 Box 元件，用於佈局
import Drawer from '@mui/material/Drawer'; // 匯入 MUI 的 Drawer 元件，用於側邊欄
import AppBar from '@mui/material/AppBar'; // 匯入 MUI 的 AppBar 元件，用於頂部導航欄
import CssBaseline from '@mui/material/CssBaseline'; // 匯入 MUI 的 CssBaseline，用於重設 CSS 樣式
import Toolbar from '@mui/material/Toolbar'; // 匯入 MUI 的 Toolbar 元件，用於佈局
import List from '@mui/material/List'; // 匯入 MUI 的 List 元件，用於清單佈局
import Typography from '@mui/material/Typography'; // 匯入 MUI 的 Typography 元件，用於顯示文字
import ListItem from '@mui/material/ListItem'; // 匯入 MUI 的 ListItem 元件，用於清單項目
import ListItemButton from '@mui/material/ListItemButton'; // 匯入 MUI 的 ListItemButton 元件，用於點擊按鈕
import ListItemIcon from '@mui/material/ListItemIcon'; // 匯入 MUI 的 ListItemIcon 元件，用於顯示圖標
import ListItemText from '@mui/material/ListItemText'; // 匯入 MUI 的 ListItemText 元件，用於顯示文字
import { Link, useLocation } from 'react-router-dom'; // 匯入 React Router 的 Link 和 useLocation 用於導航
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'; // 匯入 MUI 的 CalendarMonthIcon 作為圖標

// 定義側邊欄的寬度
const drawerWidth = 240;

// 定義 Navbar 功能組件
export default function Navbar(props) {
  const { content } = props; // 接收內容作為 props，用於顯示主頁面內容
  const location = useLocation(); // 使用 useLocation 取得當前路徑
  const path = location.pathname; // 取得目前的路徑名稱

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* 頂部導航欄 */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Clipped drawer
          </Typography>
        </Toolbar>
      </AppBar>
      {/* 固定側邊欄 */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {/* 使用迴圈來生成日曆項目 */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  component={Link}
                  to={`/calendar${index}`}
                  selected={`/calendar${index}` === path} // 當前路徑選中時，設置為選中狀態
                >
                  <ListItemIcon>
                    <CalendarMonthIcon />
                  </ListItemIcon>
                  <ListItemText primary={`Calendar #${index}`} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      {/* 主頁面內容區域 */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {content}
      </Box>
    </Box>
  );
}
