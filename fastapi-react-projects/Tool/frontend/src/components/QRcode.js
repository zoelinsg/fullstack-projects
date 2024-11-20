import React, { useState } from 'react';
import AxiosInstance from './Axios';  // 使用我們定義的 Axios 實例

function QRcode() {
  const [url, setUrl] = useState('');  // 儲存使用者輸入的 URL
  const [qrCodeUrl, setQrCodeUrl] = useState('');  // 儲存生成的 QRCode 下載連結
  const [error, setError] = useState('');  // 儲存錯誤訊息

  // 提交表單，請求 FastAPI 後端生成 QRCode
  const handleSubmit = async (e) => {
    e.preventDefault();  // 阻止表單的默認提交行為

    const formData = new FormData();
    formData.append('url', url);  // 將 URL 作為表單數據傳遞

    try {
      // 發送 POST 請求到 FastAPI 後端，使用 Axios 發送表單數據
      const response = await AxiosInstance.post('/generate_qrcode', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  // 設置正確的 Content-Type
        },
      });

      // 如果請求成功，設置 QRCode 圖片的路徑
      setQrCodeUrl(`http://127.0.0.1:8000/static/${response.data.file_name}`);
      setError('');  // 清空錯誤訊息
    } catch (err) {
      console.error('生成 QRCode 時發生錯誤:', err);
      setError('生成 QRCode 時發生錯誤，請確認伺服器是否正常運作。');
    }
  };

  return (
    <div>
      <h1>QRCode 生成器</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="輸入 URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}  // 更新 URL 狀態
        />
        <button type="submit">生成 QRCode</button>
      </form>

      {/* 顯示錯誤訊息 */}
      {error && (
        <p style={{ color: 'red' }}>{error}</p>
      )}

      {/* 如果生成了 QRCode，顯示結果 */}
      {qrCodeUrl && (
        <div>
          <p>QRCode 已生成:</p>
          <img src={qrCodeUrl} alt="QR Code" />
          <a href={qrCodeUrl} download="qr_code.png">下載 QRCode</a>
        </div>
      )}
    </div>
  );
}

export default QRcode;
