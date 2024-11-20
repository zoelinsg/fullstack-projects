import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MyDatePickerForm from '../forms/createforms/MyDatePickerForm';
import MySelectForm from '../forms/createforms/MySelectForm';
import MyTextForm from '../forms/createforms/MyTextForm';
import MyButton from '../forms/createforms/MyButton';
import AxiosInstance from '../AxiosInstance';
import dayjs from 'dayjs';

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
// formData - 表單資料; handleChange - 處理表單變更的函式
export default function MyModal9({ open, handleClose, myDate, formData, handleChange }) {

  // 表單提交函式，當用戶點擊提交時觸發
  const submission = (event) => {
    event.preventDefault();

    // 使用 dayjs 轉換選擇的開始與結束日期為指定的格式
    const StartDate = dayjs(formData.start["$d"]).format("YYYY-MM-DD");
    const EndDate = dayjs(formData.end["$d"]).format("YYYY-MM-DD");

    // 發送 POST 請求至後端 API，提交表單資料
    AxiosInstance.post(`appointments/`, {
      title: formData.title,
      classNames: formData.classNames,
      start: StartDate,
      end: EndDate
    })
    .then((res) => {
      console.log(res);
      // 重新載入頁面，顯示最新的資料
      window.location.reload();
    });

  }

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
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {/* 表單元素，提交後觸發 submission 函式 */}
            <form onSubmit={submission}>
              <Box sx={{ marginBottom: '20px' }}>
                <MyTextForm
                  label={"標題"}
                  name={"title"}
                  value={formData.title}
                  onChange={handleChange}
                />
              </Box>

              <Box sx={{ marginBottom: '20px' }}>
                <MySelectForm
                  label={"狀態"}
                  name={"classNames"}
                  value={formData.classNames}
                  onChange={handleChange}
                />
              </Box>

              <Box sx={{ marginBottom: '20px' }}>
                <MyDatePickerForm
                  label={"開始日期"}
                  name={"start"}
                  value={formData.start}
                  onChange={handleChange}
                />
              </Box>

              <Box sx={{ marginBottom: '20px' }}>
                <MyDatePickerForm
                  label={"結束日期"}
                  name={"end"}
                  value={formData.end}
                  onChange={handleChange}
                />
              </Box>

              <Box sx={{ marginBottom: '20px' }}>
                <MyButton
                  label={"提交"}
                  type={"submit"}
                />
              </Box>
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
