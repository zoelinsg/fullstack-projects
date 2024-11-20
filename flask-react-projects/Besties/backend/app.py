from flask import Flask, send_from_directory
from flask_cors import CORS
import os
from extensions import db  # 改成從 extensions 引入 db

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///friends.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)  # 使用 init_app 註冊 db

# 設定前端資料夾和打包後的 dist 資料夾路徑
frontend_folder = os.path.join(os.getcwd(), "..", "frontend")
dist_folder = os.path.join(frontend_folder, "dist")

@app.route("/", defaults={"filename": ""})
@app.route("/<path:filename>")
def index(filename):
    if not filename:
        filename = "index.html"
    return send_from_directory(dist_folder, filename)

from routes import api_bp
app.register_blueprint(api_bp)

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
