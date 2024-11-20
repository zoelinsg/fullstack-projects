import requests
import json
import certifi
import urllib3

# 禁用不安全請求的警告
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# 定義函數來處理 API 資料，加入 SSL 憑證驗證或跳過憑證驗證
def fetch_trip_data(url):
    try:
        # 如果是 e-land.gov.tw 網域，跳過 SSL 憑證驗證
        if 'e-land.gov.tw' in url:
            response = requests.get(url, verify=False)  # 對特定域名跳過 SSL 憑證驗證
        else:
            response = requests.get(url, verify=certifi.where())  # 其他域名則驗證 SSL 憑證

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

# 定義函數來處理住宿資料
def process_hotel_data(data):
    processed_data = []
    
    if data:
        for item in data:
            # 提取所需的欄位，並處理可能缺少的資料
            name = item.get('中文名稱') or item.get('旅館名稱', '名稱未提供')
            address = item.get('營業地址', '地址未提供') or item.get('地址', '地址未提供')
            phone = item.get('電話或手機', '電話未提供') or item.get('電話', '電話未提供')

            # 建立新的資料結構，並新增「類別」欄位
            processed_data.append({
                '名稱': name,
                '類別': '住宿',  # 固定類別為「住宿」
                '地址': address,
                '電話': phone,
                '描述': '無',  # 若無描述資料，設為 "無"
                '備註': '無'
            })
    return processed_data

# 定義函數來處理綠色商店資料
def process_green_store_data(data):
    processed_data = []
    
    # 檢查資料中是否包含 records 鍵
    if data and 'records' in data:
        for item in data['records']:
            # 提取所需欄位
            name = item.get('storename', '名稱未提供')
            address = item.get('storeaddr', '地址未提供')
            phone = item.get('contacttel', '電話未提供')

            # 新增「類別」欄位並建立資料結構
            processed_data.append({
                '名稱': name,
                '類別': '綠色商店',  # 固定類別為「綠色商店」
                '地址': address,
                '電話': phone,
                '描述': '無',
                '備註': '無'
            })
    return processed_data

# 定義函數來處理景點資料
def process_attractions_data(data):
    processed_data = []
    
    # 確認資料包含 XML_Head 和 Infos 鍵
    if data and 'XML_Head' in data and 'Infos' in data['XML_Head']:
        for item in data['XML_Head']['Infos']['Info']:
            # 提取所需欄位
            name = item.get('Name', '名稱未提供')
            address = item.get('Add', '地址未提供')
            describe = item.get('Description', '描述未提供')

            # 新增「類別」欄位並建立資料結構
            processed_data.append({
                '名稱': name,
                '類別': '景點',  # 固定類別為「景點」
                '地址': address,
                '電話': '無',  # 若無電話資料，固定為 "無"
                '描述': describe,
                '備註': '無'
            })
    return processed_data

# 定義函數來處理博物館資料
def process_museum_data(data):
    processed_data = []
    
    if data:
        for item in data:
            # 提取所需的欄位，處理可能不同的鍵名稱
            name = item.get('名稱') or item.get('館舍名稱') or item.get('name')
            address = item.get('地址', '地址未提供') or item.get('address') 
            phone = item.get('電話', '電話未提供') or item.get('聯絡電話') or item.get('phone')

            # 新增「類別」欄位並建立資料結構
            processed_data.append({
                '名稱': name,
                '類別': '博物館',  # 固定類別為「博物館」
                '地址': address,
                '電話': phone,
                '描述': '無',
                '備註': '無'
            })
    return processed_data

# 設定各類資料的 API URL
url1 = 'https://odws.hccg.gov.tw/001/Upload/25/opendataback/9059/1323/d3159d74-aee9-4ebe-b087-e3ce28973a16.json'
url2 = 'https://opendataap2.e-land.gov.tw/resource/files/2023-08-09/3c1d9ae33e7f4be461d5f2b1cf1abe65.json'
url3 = 'https://odws.hccg.gov.tw/001/Upload/25/opendataback/9059/85/464c639b-28e9-40a3-82c7-5dc0af98b568.json'
url4 = 'https://odws.hccg.gov.tw/001/Upload/25/opendataback/9059/1317/f8de261b-4d79-4dfe-b4cd-3c319b3e2812.json'
url5 = 'https://datacenter.taichung.gov.tw/swagger/OpenData/4b55f49c-9a8f-4ab4-ad55-fb478df871ad'

# 綠色商店資料 API
url6 = 'https://data.moenv.gov.tw/api/v2/gp_p_01?api_key=e8dd42e6-9b8b-43f8-991e-b3dee723a52d&limit=1000&sort=ImportDate desc&format=JSON'

# 景點資料 API
url7 = 'https://media.taiwan.net.tw/XMLReleaseALL_public/scenic_spot_C_f.json'

# 博物館資料 API
url8 = 'https://odws.hccg.gov.tw/001/Upload/25/opendataback/9059/116/5c70f7bf-98f4-4a85-8122-1a2192a51cf1.json'
url9 = 'https://opendataap2.e-land.gov.tw/./resource/files/2021-01-07/f149147b389cb41da04502fb8cce8696.json'
url10 = 'https://cloud.culture.tw/frontsite/trans/emapOpenDataAction.do?method=exportEmapJson&typeId=H'
url11 = 'https://datacenter.taichung.gov.tw/swagger/OpenData/c22ab11f-3959-4e75-b5f1-cc0632cf7699'

# 取得並處理各類 API 資料
data1 = fetch_trip_data(url1)
processed_data1 = process_hotel_data(data1) if data1 else []

data2 = fetch_trip_data(url2)
processed_data2 = process_hotel_data(data2) if data2 else []

data3 = fetch_trip_data(url3)
processed_data3 = process_hotel_data(data3) if data3 else []

data4 = fetch_trip_data(url4)
processed_data4 = process_hotel_data(data4) if data4 else []

data5 = fetch_trip_data(url5)
processed_data5 = process_hotel_data(data5) if data5 else []

data6 = fetch_trip_data(url6)
processed_data6 = process_green_store_data(data6) if data6 else []

data7 = fetch_trip_data(url7)
processed_data7 = process_attractions_data(data7) if data7 else []

data8 = fetch_trip_data(url8)
processed_data8 = process_museum_data(data8) if data8 else []

data9 = fetch_trip_data(url9)
processed_data9 = process_museum_data(data9) if data9 else []

data10 = fetch_trip_data(url10)
processed_data10 = process_museum_data(data10) if data10 else []

data11 = fetch_trip_data(url11)
processed_data11 = process_museum_data(data11) if data11 else []

# 合併所有資料
final_data = (processed_data1 + processed_data2 + processed_data3 + processed_data4 +
              processed_data5 + processed_data6 + processed_data7 + processed_data8 +
              processed_data9 + processed_data10 + processed_data11)

# 將資料寫入 JSON 檔案
output_file = 'trip_data.json'
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(final_data, f, ensure_ascii=False, indent=4)

print(f"資料已儲存至 {output_file}")
