import psycopg2  # 匯入 psycopg2 用於連接 PostgreSQL
import json  # 匯入 json 來讀取 JSON 檔案

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
with open('C:/Users/zoe.lin/Desktop/fullstack-projects/django-react-projects/Trip/backend/static/cleaned_trip_data.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# 準備插入資料的 SQL 語句
insert_query = """
    INSERT INTO attraction_attraction (name, category, address, phone, description, remarks) 
    VALUES (%s, %s, %s, %s, %s, %s)
"""

# 檢查資料是否已存在的查詢
check_query = """
    SELECT EXISTS(SELECT 1 FROM attraction_attraction WHERE name = %s)
"""

# 遍歷 JSON 檔案中的每一筆資料，並插入到資料庫中
for event in data:
    # 限制名稱、地址、描述和備註的最大長度為 255 個字元
    name = event['名稱'][:255] if len(event['名稱']) > 255 else event['名稱']
    address = event['地址'][:255] if len(event['地址']) > 255 else event['地址']
    description = event['描述'][:255] if len(event['描述']) > 255 else event['描述'] if event['描述'] != '無' else None
    remarks = event['備註'][:255] if len(event['備註']) > 255 else event['備註'] if event['備註'] != '無' else None

    # 檢查資料庫中是否已存在該名稱的景點
    cur.execute(check_query, (name,))
    exists = cur.fetchone()[0]  # 取得查詢結果，是否存在相同的名稱

    if not exists:
        try:
            # 如果資料不存在，則執行插入資料的 SQL 語句
            cur.execute(insert_query, (
                name,             # 插入名稱
                event['類別'],    # 插入類別
                address,          # 插入地址
                event['電話'],    # 插入電話
                description,      # 插入描述
                remarks           # 插入備註
            ))
            print(f"資料已插入: {name}")
        except psycopg2.errors.StringDataRightTruncation as e:
            # 捕獲並顯示資料過長的錯誤
            print(f"資料過長，無法插入: {name}，錯誤: {str(e)}")
            conn.rollback()  # 回滾當前插入，避免資料庫進入不一致狀態
    else:
        print(f"資料已存在，跳過插入: {name}")

# 提交變更，確保資料寫入資料庫
conn.commit()

# 關閉游標和資料庫連接
cur.close()
conn.close()

# 輸出訊息，確認程式執行完成
print("資料處理完成")
