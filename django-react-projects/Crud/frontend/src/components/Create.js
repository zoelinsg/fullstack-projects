// 匯入 React 和其他必要的 Hook 與元件
import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import MyDatePickerField from './forms/MyDatePickerField'; // 日期選擇器元件
import MyTextField from './forms/MyTextField'; // 單行文字輸入框元件
import MySelectField from './forms/MySelectField'; // 下拉選擇框元件
import MyMultiLineField from './forms/MyMultilineField'; // 多行文字輸入框元件
import { useForm } from 'react-hook-form'; // 用於處理表單的 Hook
import AxiosInstance from './Axios'; // Axios 實例，用於發送 API 請求
import Dayjs from 'dayjs'; // 日期處理函式庫
import { useNavigate } from 'react-router-dom'; // 用於頁面導航的 Hook
import { yupResolver } from '@hookform/resolvers/yup'; // Yup 驗證與 react-hook-form 的整合
import * as yup from 'yup'; // 用於資料驗證的函式庫
import MyMultiSelectField from './forms/MyMultiSelectField'; // 多選框元件

// 定義 Create 元件
const Create = () => {
  // 使用 useState Hook 定義狀態
  const [projectmanager, setProjectmanager] = useState(); // 儲存專案經理選項
  const [employees, setEmployees] = useState(); // 儲存員工選項
  const [loading, setLoading] = useState(true); // 資料加載狀態，預設為加載中

  // 定義硬編碼選項，用於選擇專案狀態
  const hardcoded_options = [
    { id: '', name: 'None' },
    { id: 'Open', name: 'Open' },
    { id: 'In progress', name: 'In progress' },
    { id: 'Completed', name: 'Completed' }
  ];

  // 從 API 獲取資料，用於填充選項
  const GetData = () => {
    AxiosInstance.get('projectmanager/').then((res) => {
      setProjectmanager(res.data); // 設定專案經理選項
      console.log(res.data);
    });

    AxiosInstance.get('employees/').then((res) => {
      setEmployees(res.data); // 設定員工選項
      console.log(res.data);
      setLoading(false); // 完成資料加載
    });
  };

  // 使用 useEffect Hook 在元件載入時執行 GetData 函式
  useEffect(() => {
    GetData();
  }, []);

  const navigate = useNavigate(); // 用於頁面導航

  // 定義表單的預設值
  const defaultValues = {
    name: '',
    comments: '',
    status: ''
  };

  // 使用 Yup 定義表單資料驗證規則
  const schema = yup.object({
    name: yup.string().required('Name is a required field'), // 專案名稱必填
    projectmanager: yup.string().required('Project manager is a required field'), // 專案經理必填
    status: yup.string().required('Status is a required field'), // 狀態必填
    employees: yup.array().min(1, 'Pick at least one option from the select field'), // 至少選擇一名員工
    comments: yup.string(),
    start_date: yup.date().required('Start date is a required field'), // 開始日期必填
    end_date: yup.date()
      .required('End date is a required field')
      .min(yup.ref('start_date'), 'The end date can not be before the start date') // 結束日期不能早於開始日期
  });

  // 使用 useForm Hook 來處理表單
  const { handleSubmit, control } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema) // 使用 Yup 驗證規則
  });

  // 表單提交處理函式
  const submission = (data) => {
    const StartDate = Dayjs(data.start_date["$d"]).format('YYYY-MM-DD'); // 格式化開始日期
    const EndDate = Dayjs(data.end_date["$d"]).format('YYYY-MM-DD'); // 格式化結束日期

    // 使用 Axios 發送 POST 請求，提交表單資料
    AxiosInstance.post('project/', {
      name: data.name,
      projectmanager: data.projectmanager,
      employees: data.employees,
      status: data.status,
      comments: data.comments,
      start_date: StartDate,
      end_date: EndDate
    })
    .then((res) => {
      navigate('/'); // 提交成功後導航至首頁
    });
  };

  return (
    <div>
      {loading ? (
        <p>Loading data...</p>
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

            <Box sx={{ display: 'flex', justifyContent: 'start', marginTop: '40px' }}>
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

// 匯出 Create 元件，供其他模組使用
export default Create;
