
// 匯入 React 和 Material-UI 相關元件
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import { Link, useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';

// 定義 Navbar 元件
export default function Navbar(props) {
  const { drawerWidth, content } = props; // 接收 drawerWidth 和 content 兩個屬性
  const location = useLocation(); // 取得目前的路徑位置
  const path = location.pathname; // 取得目前路徑的 pathname

  // 使用 useState Hook 定義開關狀態，用於控制 Drawer 的顯示
  const [open, setOpen] = React.useState(false);

  // 切換 Drawer 開啟狀態的函式
  const changeOpenStatus = () => {
    setOpen(!open);
  };

  // 定義側邊欄的內容
  const myDrawer = (
    <div>
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {/* 主頁選單項目 */}
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/" selected={"/" === path}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </ListItem>

          {/* 關於頁選單項目 */}
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/about" selected={"/about" === path}>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary={"About"} />
            </ListItemButton>
          </ListItem>

          {/* 新增頁選單項目 */}
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/create" selected={"/create" === path}>
              <ListItemIcon>
                <BorderColorIcon />
              </ListItemIcon>
              <ListItemText primary={"Create"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* 定義 AppBar，用於顯示頂部導航欄 */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {/* 響應式選單按鈕，在小螢幕上顯示 */}
          <IconButton
            color="inherit"
            onClick={changeOpenStatus}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div">
            Our application
          </Typography>
        </Toolbar>
      </AppBar>

      {/* 靜態側邊欄，適用於桌面設備 */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" }, // 僅在小螢幕隱藏
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        {myDrawer}
      </Drawer>

      {/* 可關閉的側邊欄，適用於行動裝置 */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={changeOpenStatus}
        sx={{
          display: { xs: "block", sm: "none" }, // 僅在小螢幕顯示
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        {myDrawer}
      </Drawer>

      {/* 主內容區域 */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {content}
      </Box>
    </Box>
  );
}
