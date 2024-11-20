from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse, FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
import qrcode
import os

# 建立 FastAPI 應用
app = FastAPI()

# 新增 CORS 中介軟體，允許跨來源請求
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 允許所有來源
    allow_credentials=True,  # 允許帶有憑證的請求
    allow_methods=["*"],  # 允許所有 HTTP 方法
    allow_headers=["*"],  # 允許所有標頭
)

# 配置靜態資源路徑，儲存生成的 QRCode 圖片
app.mount("/static", StaticFiles(directory="static"), name="static")

# 設置 Jinja2 模板，供 HTML 文件渲染
templates = Jinja2Templates(directory="templates")


# 生成 QRCode 的路由
@app.post("/generate_qrcode")
async def generate_qrcode(url: str = Form(...)):
    try:
        # 檢查 static 資料夾是否存在，否則創建
        if not os.path.exists("static"):
            os.makedirs("static")

        # 設定 QRCode 圖片的檔案名稱和存儲路徑
        file_name = "qr_code.png"
        file_path = os.path.join("static", file_name)

        # 生成 QRCode
        qr = qrcode.QRCode(
            version=1,  # 設置 QR code 的版本（尺寸）
            error_correction=qrcode.constants.ERROR_CORRECT_L,  # 設置容錯率
            box_size=10,  # 每個 "盒子" 的尺寸
            border=4  # QR code 的邊框寬度
        )
        qr.add_data(url)  # 添加數據（URL）
        qr.make(fit=True)  # 自動調整 QRCode 大小以適應數據
        img = qr.make_image(fill="black", back_color="white")  # 生成 QRCode 圖片（黑色前景、白色背景）
        img.save(file_path)  # 將圖片保存到指定路徑

        # 回傳 QRCode 檔案名給前端
        return JSONResponse(content={"file_name": file_name})
    except Exception as e:
        # 發生錯誤時，回傳錯誤訊息
        return JSONResponse(status_code=500, content={"message": str(e)})

# 提供計算機頁面
@app.get("/calculator", response_class=HTMLResponse)
async def calculator(request: Request):
    """
    提供簡單的計算機頁面
    :param request: 請求對象
    """
    # 渲染 calculator.html 頁面，提供簡單的計算功能
    return templates.TemplateResponse("calculator.html", {"request": request})
