from typing import List
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import json

app = FastAPI()

# 新增 CORS 中介軟體，允許跨來源請求
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 允許所有來源
    allow_credentials=True,  # 允許帶有憑證的請求
    allow_methods=["*"],  # 允許所有 HTTP 方法
    allow_headers=["*"],  # 允許所有標頭
)


# 連線管理器，管理 WebSocket 連線
class ConnectionManager:

    def __init__(self) -> None:
        # 儲存所有活躍的 WebSocket 連線
        self.active_connections: List[WebSocket] = []

    # 當有新的 WebSocket 連線時，接受連線並將其加入活躍連線列表
    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    # 當 WebSocket 斷開連線時，從活躍連線列表中移除
    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    # 傳送私人訊息給特定 WebSocket 連線
    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    # 廣播訊息給所有活躍的 WebSocket 連線
    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)


manager = ConnectionManager()

# 定義 HTTP GET 端點
@app.get("/")
def Home():
    return "Welcome home"  # 回傳簡單的歡迎訊息


# 定義 WebSocket 端點
@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: int):
    await manager.connect(websocket)  # 接受新連線並加入管理器
    now = datetime.now()  # 取得當前時間
    current_time = now.strftime("%H:%M")  # 格式化時間為"時:分"
    try:
        while True:
            data = await websocket.receive_text()  # 接收來自客戶端的訊息
            # 將訊息組裝為包含時間、客戶端 ID 及訊息的字典
            message = {"time": current_time, "clientId": client_id, "message": data}
            # 廣播訊息給所有已連線的客戶端
            await manager.broadcast(json.dumps(message))
    except WebSocketDisconnect:
        # 當 WebSocket 斷開連線時，從管理器中移除連線
        manager.disconnect(websocket)
        # 廣播客戶端離線訊息
        message = {"time": current_time, "clientId": client_id, "message": "Offline"}
        await manager.broadcast(json.dumps(message))
