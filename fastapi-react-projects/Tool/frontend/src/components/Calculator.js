import React, { useState } from 'react';
import { evaluate } from 'mathjs';  // 引入 math.js 的 evaluate 函數，用於計算表達式

// 定義 計算機 元件
const Calculator = () => {
  const [input, setInput] = useState('');  // 儲存使用者的輸入

  // 處理按鈕點擊事件
  const handleClick = (value) => {
    setInput(input + value);  // 更新輸入框中的內容
  };

  // 處理等號按鈕，計算結果
  const handleCalculate = () => {
    try {
      setInput(evaluate(input).toString());  // 使用 math.js 的 evaluate 計算數學表達式
    } catch (error) {
      setInput('Error');  // 如果表達式無效，顯示錯誤信息
    }
  };

  // 清除輸入
  const handleClear = () => {
    setInput('');  // 清空輸入框
  };

  return (
    <div>
      <h1>計算機</h1>
      <div>
        {/* 顯示使用者的輸入 */}
        <input type="text" value={input} readOnly />  
      </div>
      <div>
        {/* 定義數字和運算符的按鈕 */}
        <button onClick={() => handleClick('7')}>7</button>
        <button onClick={() => handleClick('8')}>8</button>
        <button onClick={() => handleClick('9')}>9</button>
        <button onClick={() => handleClick('/')}>/</button>
      </div>
      <div>
        <button onClick={() => handleClick('4')}>4</button>
        <button onClick={() => handleClick('5')}>5</button>
        <button onClick={() => handleClick('6')}>6</button>
        <button onClick={() => handleClick('*')}>*</button>
      </div>
      <div>
        <button onClick={() => handleClick('1')}>1</button>
        <button onClick={() => handleClick('2')}>2</button>
        <button onClick={() => handleClick('3')}>3</button>
        <button onClick={() => handleClick('-')}>-</button>
      </div>
      <div>
        <button onClick={() => handleClick('.')}>.</button>
        <button onClick={() => handleClick('0')}>0</button>
        <button onClick={handleClear}>C</button>  {/* 清除按鈕 */}
        <button onClick={() => handleClick('+')}>+</button>
      </div>
      <div>
        {/* 等號按鈕 */}
        <button onClick={handleCalculate}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
