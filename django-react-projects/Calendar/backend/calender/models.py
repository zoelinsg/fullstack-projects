from django.db import models

# Create your models here.
# 定義 Appointments 模型
# 這個模型表示預約資料，包括名稱、開始日期、結束日期、備註、狀態等資訊
class Appointments(models.Model):
    # 預約名稱，最多 200 個字元
    name = models.CharField(max_length=200)
    
    # 預約的開始日期
    start_date = models.DateField()
    
    # 預約的結束日期
    end_date = models.DateField()
    
    # 備註欄位，可以選擇性填寫，最多 500 個字元
    # `blank=True` 表示可以在表單中留空，`null=True` 表示資料庫中允許空值
    comments = models.CharField(max_length=500, blank=True, null=True)
    
    # 預約的狀態，最多 100 個字元，例如: "已確認", "取消", "待定"
    status = models.CharField(max_length=100)
    
    # 建立時間，會自動設置為紀錄建立的時間
    created = models.DateTimeField(auto_now_add=True)
    
    # 修改時間，每次更新紀錄時自動設置為當前時間
    modified = models.DateTimeField(auto_now=True)

    # 自定義字串表示方法，方便在管理界面中顯示
    def __str__(self):
        return self.name