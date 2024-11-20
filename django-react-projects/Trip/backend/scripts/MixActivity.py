import requests
import json
import certifi
import urllib3

# 禁用不安全請求的警告
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# 定義函數來處理 API 資料
def fetch_activity_data(url):
    try:
        # 發送請求，對特定域名跳過 SSL 憑證驗證
        if 'e-land.gov.tw' in url:
            response = requests.get(url, verify=False)  # 跳過 SSL 憑證驗證
        else:
            response = requests.get(url, verify=certifi.where())  # 其他網址驗證 SSL 憑證

        # 檢查請求是否成功
        if response.status_code == 200:
            data = response.json()  # 將回應的內容轉為 JSON 格式
            return data
        else:
            print(f"無法取得資料, 錯誤代碼: {response.status_code}")
            return None
    except requests.exceptions.RequestException as e:
        print(f"請求錯誤: {e}")
        return None

# 定義函數來過濾和處理活動資料
def process_activity_data(data):
    processed_data = []
    
    if data:
        # 如果資料是嵌套結構，從適當的鍵提取資料
        if isinstance(data, dict):
            # 針對不同的 API 格式，從不同的鍵中提取資料
            if 'itemList' in data:
                data = data['itemList']  # 如果有 'itemList' 鍵，使用其內容
            elif 'records' in data:
                data = data['records']  # 處理 'records' 格式的資料
            elif 'data' in data:
                data = data['data']  # 處理 'data' 鍵下的資料

        # 確保資料是列表
        if isinstance(data, list):
            for item in data:
                # 檢查 item 是否是字典，如果不是就跳過這個項目
                if not isinstance(item, dict):
                    print(f"跳過非字典項目: {item}")
                    continue

                # 提取所需的欄位，並處理缺少的資料
                title = item.get('title', '標題未提供')

                # 根據資料格式提取日期
                if 'time' in item:
                    time_range = item.get('time', '日期未提供')
                    if " ~ " in time_range:
                        start_date, end_date = time_range.split(" ~ ")
                    else:
                        start_date, end_date = "日期格式錯誤", "日期格式錯誤"
                elif 'startDate' in item and 'endDate' in item:
                    start_date = item.get('startDate')
                    end_date = item.get('endDate')
                else:
                    start_date, end_date = "無日期資訊", "無日期資訊"

                # 提取地點和費用
                location = item.get('location', item.get('locationName', '地點未提供'))
                fee = item.get('fee', item.get('票價', '無提供費用資訊'))

                # 建立新的資料結構
                processed_data.append({
                    '標題': title,
                    '開始日期': start_date,
                    '結束日期': end_date,
                    '地點': location,
                    '費用': fee
                })
    return processed_data

# 設定活動資料來源 URL
urls = [
    'https://datacenter.taichung.gov.tw/swagger/OpenData/f14debec-6cae-415f-8d54-ab2720bff125',
    'https://odapi.npm.gov.tw/data/open/api/v1/exhibition/current.json',
    'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6',
    'https://www.nstm.gov.tw/Handlers/OpenDataHandler.ashx?ID=8d2ebef5-cf0e-44b7-ae63-513ba3805865&Type=5',
    'https://www.nstm.gov.tw/Handlers/OpenDataHandler.ashx?ID=82bf035a-2909-4047-a3a2-cc9616610d2e&Type=5',
    'https://www.nmns.edu.tw/backend/opendata/Exhibition/list?key=571fe588-7dae-4cab-8805-8143f910d88a'
]

# 處理所有 URL 的資料
final_data = []
for url in urls:
    data = fetch_activity_data(url)
    processed_data = process_activity_data(data) if data else []
    final_data.extend(processed_data)

# 將資料儲存為 JSON 檔案
output_file = 'activity_data.json'
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(final_data, f, ensure_ascii=False, indent=4)

print(f"資料已儲存至 {output_file}")
