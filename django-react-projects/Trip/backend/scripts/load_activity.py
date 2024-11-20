import psycopg2  # 匯入 psycopg2 用於連接 PostgreSQL
import json  # 匯入 json 來讀取 JSON 檔案
from datetime import datetime  # 匯入 datetime 用於處理日期格式

# 連接到 PostgreSQL 資料庫
conn = psycopg2.connect(
    host="localhost",       # 資料庫伺服器位址
    database="trip-database",  # 資料庫名稱
    user="postgres",   # 資料庫使用者名稱
    password="postgres"  # 資料庫密碼
)

# 建立游標，用來執行 SQL 查詢
cur = conn.cursor()

# 讀取 JSON 檔案，並確保使用 UTF-8 編碼來讀取中文
with open('C:/Users/zoe.lin/Desktop/fullstack-projects/django-react-projects/Trip/backend/static/cleaned_activity_data.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# 準備插入資料的 SQL 語句
# 注意，這裡使用的是 'activity_activity' 資料表，依據您的 Django 資料表結構
insert_query = """
    INSERT INTO activity_activity (title, start_date, end_date, location, cost) 
    VALUES (%s, %s, %s, %s, %s)
"""

# 檢查資料是否已存在的查詢
check_query = """
    SELECT EXISTS(SELECT 1 FROM activity_activity WHERE title = %s)
"""

# 定義一個函數來轉換日期格式，並處理"無"字串
def parse_date(date_str):
    """
    將 'YYYY/MM/DD' 格式的日期字串轉換為 'YYYY-MM-DD' 格式的日期，並處理 '無' 為 NULL
    """
    if date_str == '無':  # 處理 "無" 字串為 NULL
        return None
    try:
        # 嘗試將日期從 'YYYY/MM/DD' 轉換為 'YYYY-MM-DD'
        return datetime.strptime(date_str, '%Y/%m/%d').date()
    except ValueError:
        # 如果日期格式錯誤，返回 None
        return None

# 遍歷 JSON 檔案中的每一筆資料，並插入到資料庫中
for event in data:
    # 轉換開始日期和結束日期
    start_date = parse_date(event['開始日期'])
    end_date = parse_date(event['結束日期'])
    
    # 檢查資料庫中是否已存在該標題
    cur.execute(check_query, (event['標題'],))
    exists = cur.fetchone()[0]  # 取得查詢結果，是否存在相同的 title

    if not exists:
        # 如果資料不存在，則執行插入資料的 SQL 語句
        cur.execute(insert_query, (
            event['標題'],         # 插入標題
            start_date,            # 插入開始日期，已轉換為正確格式
            end_date,              # 插入結束日期，若為"無"，則插入 NULL
            event['地點'],         # 插入地點
            event['費用']          # 插入費用
        ))
        print(f"資料已插入: {event['標題']}")
    else:
        print(f"資料已存在，跳過插入: {event['標題']}")

# 提交變更，確保資料寫入資料庫
conn.commit()

# 關閉游標和資料庫連接
cur.close()
conn.close()

# 輸出訊息，確認程式執行完成
print("資料處理完成")
