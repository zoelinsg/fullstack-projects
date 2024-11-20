from rest_framework import serializers
from .models import Attraction

# 景點 (Attraction) 序列化器
class AttractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attraction
        # 要序列化的欄位
        fields = ['name', 'category', 'address', 'phone', 'description', 'remarks']

