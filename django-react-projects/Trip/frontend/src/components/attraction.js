// 檔案路徑: src/components/Attraction.js
// 定義 Attraction 元件，包含搜尋、篩選和分頁功能

import React, { useState, useEffect } from 'react';
import Axios from '../utils/Axios';

const Attraction = () => {
  // 使用 useState 管理景點資料、搜尋條件、篩選條件和分頁
  const [attractions, setAttractions] = useState([]); // 景點列表
  const [searchQuery, setSearchQuery] = useState(''); // 搜尋條件
  const [filter, setFilter] = useState('all'); // 類別篩選條件
  const [currentPage, setCurrentPage] = useState(1); // 當前頁數
  const itemsPerPage = 50; // 每頁顯示的項目數量

  // 根據搜尋和篩選條件取得景點資料
  useEffect(() => {
    // 定義非同步函數 fetchData，根據搜尋和篩選條件請求資料
    const fetchData = async () => {
      try {
        const response = await Axios.get('/api/attractions', {
          params: {
            name: searchQuery || undefined, // 搜尋條件名稱
            category: filter !== 'all' ? filter : undefined, // 類別篩選條件
            page: currentPage, // 當前頁數
            page_size: itemsPerPage, // 每頁顯示的項目數量
          },
        });
        setAttractions(response.data); // 設置取得的景點資料
      } catch (error) {
        console.error('Error fetching attractions:', error); // 錯誤處理
      }
    };
    
    fetchData(); // 呼叫 fetchData 函數以獲取資料
  }, [searchQuery, filter, currentPage]); // 當搜尋條件、篩選條件或頁數變更時重新執行

  // 處理頁數更改事件
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage); // 更新當前頁數
  };

  // 處理搜尋按鈕點擊事件
  const handleSearch = () => {
    setCurrentPage(1); // 重置為第一頁並觸發 useEffect 重新獲取資料
  };

  // 處理類別篩選按鈕點擊事件
  const handleFilter = () => {
    setCurrentPage(1); // 重置為第一頁並觸發 useEffect 重新獲取資料
  };

  return (
    <div>
      <h1>景點搜尋與篩選</h1>
      
      {/* 搜尋欄位及執行按鈕 */}
      <input
        type="text"
        placeholder="搜尋景點名稱"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // 更新搜尋條件
      />
      <button onClick={handleSearch}>搜尋</button> {/* 搜尋按鈕 */}

      {/* 類別篩選選單及執行按鈕 */}
      <select value={filter} onChange={(e) => setFilter(e.target.value)}> {/* 更新篩選條件 */}
        <option value="all">所有類別</option>
        <option value="景點">景點</option>
        <option value="博物館">博物館</option>
        <option value="住宿">住宿</option>
        <option value="綠色商店">綠色商店</option>
      </select>
      <button onClick={handleFilter}>篩選</button> {/* 類別篩選按鈕 */}

      {/* 顯示篩選後的結果 */}
      <ul>
        {attractions.map((attraction) => (
          <li key={attraction.id}>{attraction.name}</li> // 顯示每個景點的名稱
        ))}
      </ul>

      {/* 分頁按鈕 */}
      <div>
        {Array.from({ length: Math.ceil(attractions.length / itemsPerPage) }, (_, index) => (
          <button 
            key={index + 1} 
            onClick={() => handlePageChange(index + 1)} 
            disabled={index + 1 === currentPage} // 禁用當前頁面的按鈕
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Attraction;
