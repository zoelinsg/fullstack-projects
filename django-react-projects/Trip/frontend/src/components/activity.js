// 檔案路徑: src/components/Activity.js
// 定義 Activity 元件，包含標題搜尋、日期篩選和分頁功能

import React, { useState, useEffect, useCallback } from 'react';
import Axios from '../utils/Axios'; // 引入 Axios 實例

const Activity = () => {
  // 使用 useState 管理活動資料、搜尋條件、篩選條件和分頁
  const [allActivities, setAllActivities] = useState([]); // 所有活動資料
  const [displayActivities, setDisplayActivities] = useState([]); // 當前頁顯示的活動資料
  const [searchQuery, setSearchQuery] = useState(''); // 標題搜尋條件
  const [startDate, setStartDate] = useState(''); // 開始日期篩選條件
  const [endDate, setEndDate] = useState(''); // 結束日期篩選條件
  const [currentPage, setCurrentPage] = useState(1); // 當前頁數
  const [pageGroup, setPageGroup] = useState(0); // 當前頁碼組，用於分頁按鈕的顯示
  const itemsPerPage = 20; // 每頁顯示的項目數量
  const pagesPerGroup = 10; // 每組顯示的頁碼數量

  // 使用 useCallback 來穩定 fetchData 函數，避免過多的重新渲染
  const fetchData = useCallback(async () => {
    try {
      const response = await Axios.get('/api/activity', { // 確認 API 路徑正確
        params: {
          title: searchQuery || undefined, // 若無標題搜尋條件則不設此參數
          start_date: startDate || undefined, // 若無開始日期則不設此參數
          end_date: endDate || undefined, // 若無結束日期則不設此參數
        },
      });
      setAllActivities(response.data); // 設置所有取得的活動資料
      setCurrentPage(1); // 重置頁數
      setPageGroup(0); // 重置頁碼組
    } catch (error) {
      console.error('Error fetching activities:', error); // 錯誤處理
    }
  }, [searchQuery, startDate, endDate]); // fetchData 依賴項

  // 使用 useEffect 取得活動資料
  useEffect(() => {
    fetchData(); // 初次及每次依賴變更時執行
  }, [fetchData]);

  // 每次 currentPage 或 allActivities 更新時計算當前頁面顯示的資料
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayActivities(allActivities.slice(startIndex, endIndex)); // 設置當前頁面的活動資料
  }, [currentPage, allActivities]); // 依賴當前頁面和所有活動資料

  // 處理標題搜尋的按鈕事件
  const handleSearchByTitle = () => {
    fetchData(); // 根據標題進行搜尋
  };

  // 處理日期篩選的按鈕事件
  const handleSearchByDate = () => {
    fetchData(); // 根據日期篩選
  };

  // 處理頁數更改
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage); // 更新當前頁數
  };

  // 處理分頁組切換
  const handlePageGroupChange = (direction) => {
    if (direction === 'prev' && pageGroup > 0) {
      setPageGroup(pageGroup - 1); // 前一組頁碼
    } else if (direction === 'next' && (pageGroup + 1) * pagesPerGroup < Math.ceil(allActivities.length / itemsPerPage)) {
      setPageGroup(pageGroup + 1); // 後一組頁碼
    }
  };

  // 計算當前頁碼組的起始和結束頁碼
  const totalPages = Math.ceil(allActivities.length / itemsPerPage); // 總頁數
  const startPage = pageGroup * pagesPerGroup + 1; // 當前頁碼組的起始頁碼
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages); // 當前頁碼組的結束頁碼

  return (
    <div>
      <h1>活動搜尋與篩選</h1>
      
      {/* 標題搜尋欄位 */}
      <input
        type="text"
        placeholder="搜尋活動標題"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // 更新標題搜尋條件
      />
      {/* 標題搜尋執行按鈕 */}
      <button onClick={handleSearchByTitle}>搜尋</button>

      {/* 開始日期篩選 */}
      <input
        type="date"
        placeholder="開始日期"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)} // 更新開始日期篩選條件
      />

      {/* 結束日期篩選 */}
      <input
        type="date"
        placeholder="結束日期"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)} // 更新結束日期篩選條件
      />
      {/* 日期篩選執行按鈕 */}
      <button onClick={handleSearchByDate}>篩選</button>

      {/* 顯示篩選結果 */}
      <ul>
        {displayActivities.map((activity) => (
          <li key={activity.id}>{activity.title}</li> // 顯示每個活動的標題
        ))}
      </ul>

      {/* 分頁按鈕 */}
      <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
        {/* 上一組頁碼按鈕 */}
        <button onClick={() => handlePageGroupChange('prev')} disabled={pageGroup === 0}>
          &lt;&lt;
        </button>

        {/* 目前頁碼組內的頁碼按鈕 */}
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <button
            key={startPage + index}
            onClick={() => handlePageChange(startPage + index)}
            disabled={currentPage === startPage + index} // 禁用當前頁碼
          >
            {startPage + index}
          </button>
        ))}

        {/* 下一組頁碼按鈕 */}
        <button onClick={() => handlePageGroupChange('next')} disabled={endPage === totalPages}>
          &gt;&gt;
        </button>
      </div>
    </div>
  );
};

export default Activity;
