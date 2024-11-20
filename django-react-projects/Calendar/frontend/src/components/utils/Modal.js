import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

// 定義樣式物件，用於控制 Modal 視窗的位置、寬度、背景顏色、邊框及陰影
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// 自訂彈出視窗的功能組件
// 參數: open - 控制視窗開啟與否; handleClose - 關閉視窗的處理函式; myDate - 顯示的日期資料
export default function MyModal({ open, handleClose, myDate }) {

  return (
    <div>
      {/* 使用 MUI 的 Modal 元件，控制彈出式視窗的顯示 */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* Box 元件用來包裹內部內容，並應用之前定義的樣式 */}
        <Box sx={style}>
          {/* Typography 元件顯示標題文字，包含選擇的日期 */}
          <Typography id="modal-modal-title" variant="h6" component="h2">
            我選擇了 {myDate}
          </Typography>
          {/* 另一個 Typography 元件顯示描述文字 */}
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            在下一個影片中，我將會在此新增表單
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
