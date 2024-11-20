# 檔案路徑: backend/attraction/models.py
# 景點模型，用於存儲景點的基本信息

from django.db import models

class Attraction(models.Model):
    name = models.CharField(max_length=500, primary_key=True, unique=True)  # 景點名稱，主鍵且唯一
    category = models.CharField(max_length=100)  # 景點類別
    address = models.CharField(max_length=500)  # 景點地址
    phone = models.CharField(max_length=50, null=True, blank=True)  # 聯絡電話 (可選)
    description = models.TextField(null=True, blank=True)  # 景點描述
    remarks = models.TextField(null=True, blank=True)  # 備註 (可選)

    def __str__(self):
        return self.name  # 返回景點名稱
