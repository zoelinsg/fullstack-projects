from rest_framework import serializers
from .models import Activity

# 活動模型的序列化器，用於將模型轉換為 JSON 格式
class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        # 對應的模型
        model = Activity
        # 要序列化的欄位
        fields = ['title', 'start_date', 'end_date', 'location', 'cost']