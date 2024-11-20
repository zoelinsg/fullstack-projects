import json
from datetime import datetime

# 載入資料
with open("C:/Users/zoe.lin/Desktop/api-projects/activity_data.json", "r", encoding="utf-8") as file:
    data = json.load(file)

# 用來儲存處理後的資料
processed_data = []

# 用來追蹤已經出現過的項目（根據標題與開始日期來判斷）
seen = set()

# 日期格式化函數，將原始日期轉為 "YYYY/MM/DD" 格式
def format_date(date_str):
    try:
        return datetime.strptime(date_str, "%Y%m%dT%H%M%S").strftime("%Y/%m/%d")
    except ValueError:
        return "無"

# 開始處理資料
for entry in data:
    # 根據標題和開始日期檢查是否已處理過此項目
    identifier = (entry.get("標題"), entry.get("開始日期"))
    if identifier not in seen:
        # 處理日期格式
        if "開始日期" in entry:
            entry["開始日期"] = format_date(entry["開始日期"])
        if "結束日期" in entry:
            entry["結束日期"] = format_date(entry["結束日期"])

        # 將 None 或空字串替換為 "無"
        for key, value in entry.items():
            if value is None or value == "":
                entry[key] = "無"

        # 加入已處理的資料集
        processed_data.append(entry)
        # 標記此條目已處理過
        seen.add(identifier)

# 將處理後的資料儲存回 JSON 檔案
output_path = "C:/Users/zoe.lin/Desktop/api-projects/cleaned_activity_data.json"
with open(output_path, "w", encoding="utf-8") as file:
    json.dump(processed_data, file, ensure_ascii=False, indent=4)

print(f"資料已清理並儲存至 {output_path}。")
