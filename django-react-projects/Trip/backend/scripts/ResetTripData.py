import json

# 載入資料
with open("C:/Users/zoe.lin/Desktop/api-projects/trip_data.json", "r", encoding="utf-8") as file:
    data = json.load(file)

# 用來儲存處理後的資料
processed_data = []

# 用來追蹤已經出現過的項目（根據名稱）
seen = set()

# 開始處理資料
for entry in data:
    # 檢查是否已經處理過此項目
    if entry["名稱"] not in seen:
        # 將None或空字串替換為 "無"
        for key, value in entry.items():
            if value is None or value == "":
                entry[key] = "無"
        
        # 加入已處理的資料集
        processed_data.append(entry)
        # 標記此名稱已處理過
        seen.add(entry["名稱"])

# 修改為正確的本地路徑
output_path = "C:/Users/zoe.lin/Desktop/api-projects/cleaned_trip_data.json"

# 將處理後的資料儲存回 JSON 檔案
with open(output_path, "w", encoding="utf-8") as file:
    json.dump(processed_data, file, ensure_ascii=False, indent=4)

print(f"資料已清理並儲存至 {output_path}。")
