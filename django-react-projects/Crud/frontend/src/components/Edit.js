// 檔案名稱: src/components/Edit.js
// 這個檔案定義了一個 React 元件，用於編輯專案記錄，
// 包含表單操作、資料驗證及 API 請求。

// 匯入 React 和其他必要的 Hook 與元件
import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material'; // 使用 Material-UI 的元件
import MyDatePickerField from './forms/MyDatePickerField'; // 日期選擇器元件
import MyTextField from './forms/MyTextField'; // 單行文字輸入框元件
import MySelectField from './forms/MySelectField'; // 下拉選擇框元件
import MyMultiLineField from './forms/MyMultilineField'; // 多行文字輸入框元件
import { useForm } from 'react-hook-form'; // 用於處理表單的 Hook
import AxiosInstance from './Axios'; // 引入 Axios 實例，用於發送 API 請求
import Dayjs from 'dayjs'; // 日期處理函式庫
import { useNavigate, useParams } from 'react-router-dom'; // 用於頁面導航和取得 URL 參數的 Hook
import MyMultiSelectField from './forms/MyMultiSelectField'; // 多選框元件

// 定義 Edit 元件
const Edit = () => {
  const MyParam = useParams(); // 取得 URL 中的參數
  const MyId = MyParam.id; // 提取專案 ID

  // 使用 useState Hook 定義狀態
  const [projectmanager, setProjectmanager] = useState(); // 儲存專案經理選項
  const [employees, setEmployees] = useState(); // 儲存員工選項
  const [loading, setLoading] = useState(true); // 加載狀態，預設為 true 表示正在加載

  // 定義硬編碼選項，用於選擇專案狀態
  const hardcoded_options = [
    { id: '', name: 'None' },
    { id: 'Open', name: 'Open' },
    { id: 'In progress', name: 'In progress' },
    { id: 'Completed', name: 'Completed' }
  ];

  // 從 API 獲取資料，用於填充選項及設定表單預設值
  const GetData = () => {
    // 獲取專案經理選項
    AxiosInstance.get(`projectmanager/`).then((res) => {
      setProjectmanager(res.data); // 設定專案經理選項
      console.log(res.data);
    });

    // 獲取員工選項
    AxiosInstance.get(`employees/`).then((res) => {
      setEmployees(res.data); // 設定員工選項
      console.log(res.data);
    });

    // 獲取要編輯的專案資料
    AxiosInstance.get(`project/${MyId}`).then((res) => {
      console.log(res.data);
      setValue('name', res.data.name); // 設定專案名稱
      setValue('status', res.data.status); // 設定專案狀態
      setValue('employees', res.data.employees); // 設定員工列表
      setValue('projectmanager', res.data.projectmanager); // 設定專案經理
      setValue('comments', res.data.comments); // 設定專案評論
      setValue('start_date', Dayjs(res.data.start_date)); // 設定開始日期
      setValue('end_date', Dayjs(res.data.end_date)); // 設定結束日期
      setLoading(false); // 資料加載完成
    });
  };

  // 使用 useEffect Hook 在元件載入時執行 GetData 函式
  useEffect(() => {
    GetData();
  }, []);

  const navigate = useNavigate(); // 用於頁面導航

  // 表單的預設值
  const defaultValues = {
    name: '',
    comments: '',
    status: ''
  };

  // 使用 useForm Hook 來處理表單
  const { handleSubmit, setValue, control } = useForm({
    defaultValues: defaultValues
  });

  // 表單提交處理函式
  const submission = (data) => {
    // 格式化開始與結束日期
    const StartDate = Dayjs(data.start_date["$d"]).format("YYYY-MM-DD");
    const EndDate = Dayjs(data.end_date["$d"]).format("YYYY-MM-DD");

    // 使用 Axios 發送 PUT 請求以更新專案資料
    AxiosInstance.put(`project/${MyId}/`, {
      name: data.name,
      projectmanager: data.projectmanager,
      employees: data.employees,
      status: data.status,
      comments: data.comments,
      start_date: StartDate,
      end_date: EndDate
    }).then((res) => {
      navigate(`/`); // 更新成功後導航至首頁
    });
  };

  // 渲染元件的內容
  return (
    <div>
      {loading ? (
        <p>Loading data...</p> // 如果資料正在加載，顯示 Loading 提示
      ) : (
        <form onSubmit={handleSubmit(submission)}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', backgroundColor: '#00003f', marginBottom: '10px' }}>
            <Typography sx={{ marginLeft: '20px', color: '#fff' }}>
              Create records
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', width: '100%', boxShadow: 3, padding: 4, flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '40px' }}>
              <MyTextField
                label="Name"
                name="name"
                control={control}
                placeholder="Provide a project name"
                width="30%"
              />

              <MyDatePickerField
                label="Start date"
                name="start_date"
                control={control}
                width="30%"
              />

              <MyDatePickerField
                label="End date"
                name="end_date"
                control={control}
                width="30%"
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <MyMultiLineField
                label="Comments"
                name="comments"
                control={control}
                placeholder="Provide project comments"
                width="30%"
              />

              <MySelectField
                label="Status"
                name="status"
                control={control}
                width="30%"
                options={hardcoded_options}
              />

              <MySelectField
                label="Project manager"
                name="projectmanager"
                control={control}
                width="30%"
                options={projectmanager}
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: '40px' }}>
              <MyMultiSelectField
                label="Employees"
                name="employees"
                control={control}
                width="30%"
                options={employees}
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: '40px' }}>
              <Button variant="contained" type="submit" sx={{ width: '30%' }}>
                Submit
              </Button>
            </Box>
          </Box>
        </form>
      )}
    </div>
  );
};

// 匯出 Edit 元件，供其他模組使用
export default Edit;
