import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // 使用日期時間生成隨機的客戶端 ID
  const [clientId] = useState(Math.floor(new Date().getTime() / 1000));

  // 使用 useState 儲存 WebSocket 連線、單條訊息和所有訊息
  const [websckt, setWebsckt] = useState(null);
  const [message, setMessage] = useState("");  // 單條訊息，初始化為空字串
  const [messages, setMessages] = useState([]);  // 所有收到的訊息

  // 使用 useEffect 來設定 WebSocket 連線
  useEffect(() => {
    const url = "ws://localhost:8000/ws/" + clientId;  // 設定 WebSocket 伺服器 URL，包含 clientId
    const ws = new WebSocket(url);  // 創建 WebSocket 連線

    ws.onopen = () => {
      ws.send("Connect");  // 當 WebSocket 連線打開時，發送 "Connect" 訊息
    };

    // 每次載入頁面時接收來自伺服器的訊息
    ws.onmessage = (e) => {
      const message = JSON.parse(e.data);  // 解析收到的訊息
      setMessages((prevMessages) => [...prevMessages, message]);  // 使用函數式更新來追加訊息
    };

    setWebsckt(ws);  // 將 WebSocket 物件儲存到 state

    // 當頁面關閉時，清理 WebSocket 連線
    return () => ws.close();
  }, [clientId]);  // clientId 作為依賴

  // 發送訊息的函式
  const sendMessage = () => {
    websckt.send(message);  // 發送訊息到伺服器
    // 每次發送訊息後接收伺服器回傳的訊息
    websckt.onmessage = (e) => {
      const message = JSON.parse(e.data);  // 解析伺服器回傳的訊息
      setMessages((prevMessages) => [...prevMessages, message]);  // 使用函數式更新來追加訊息
    };
    setMessage("");  // 清空輸入框中的訊息
  };

  return (
    <div className="container">
      <h1>FastAPI React Chat</h1>
      <h2>your client id: {clientId} </h2> {/* 顯示客戶端 ID */}
      <div className="chat-container">
        <div className="chat">
          {messages.map((value, index) => {
            // 判斷訊息是否來自自己
            if (value.clientId === clientId) {
              return (
                <div key={index} className="my-message-container">
                  <div className="my-message">
                    <p className="client">client id : {clientId}</p> {/* 顯示自己 clientId */}
                    <p className="message">{value.message}</p>  {/* 顯示訊息內容 */}
                  </div>
                </div>
              );
            } else {
              return (
                <div key={index} className="another-message-container">
                  <div className="another-message">
                    <p className="client">client id : {clientId}</p> {/* 顯示其他人的 clientId */}
                    <p className="message">{value.message}</p>  {/* 顯示訊息內容 */}
                  </div>
                </div>
              );
            }
          })}
        </div>
        {/* 訊息輸入區域和發送按鈕 */}
        <div className="input-chat-container">
          <input
            className="input-chat"
            type="text"
            placeholder="Chat message ..."
            onChange={(e) => setMessage(e.target.value)}  // 當輸入改變時，更新訊息內容
            value={message}  // 設定輸入框的值
          ></input>
          <button className="submit-chat" onClick={sendMessage}> {/* 點擊按鈕發送訊息 */}
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
