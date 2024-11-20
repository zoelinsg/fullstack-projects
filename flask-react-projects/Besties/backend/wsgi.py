from app import app  # 從 app 模組中引入 Flask 應用實例

# 檢查這個文件是否是直接被執行的
if __name__ == "__main__":
    app.run()  # 啟動 Flask 內建的開發伺服器

# Gunicorn 和 WSGI（Web Server Gateway Interface）都是用來部署和提供 Python Web 應用的元件，特別是那些使用 Flask 和 Django 等 Web 框架構建的應用。
