from django.db import models
from django.utils import timezone

# Create your models here.
# 活動 (Activity) 模型
class Activity(models.Model):
    # 活動標題
    title = models.CharField(max_length=255,primary_key=True,unique=True)
    # 活動的開始日期
    start_date = models.DateField(null=True, blank=True)
    # 活動的結束日期
    end_date = models.DateField(null=True, blank=True)
    # 活動地點
    location = models.CharField(max_length=255,default="未知")
    # 費用
    cost = models.CharField(max_length=10,default="未知")

    # 自訂活動的字串表示，返回活動標題
    def __str__(self):
        return self.title
