# 匯入 Django REST Framework 的序列化功能
from rest_framework import serializers
# 明確匯入 Appointments 模型，避免使用萬用字元
from .models import Appointments

# 定義 AppointmentSerializer 序列化器
# 將 Appointments 模型轉換為 JSON 格式，方便 API 傳輸
class AppointmentSerializer(serializers.ModelSerializer):
    # 將模型中的 'name' 欄位映射為序列化輸出的 'title'
    title = serializers.CharField(source='name')
    
    # 將模型中的 'start_date' 欄位映射為序列化輸出的 'start'
    start = serializers.DateField(source='start_date')
    
    # 將模型中的 'end_date' 欄位映射為序列化輸出的 'end'
    end = serializers.DateField(source='end_date')
    
    # 將模型中的 'status' 欄位映射為序列化輸出的 'classNames'
    classNames = serializers.CharField(source='status')

    # Meta 類定義了這個序列化器的設定
    class Meta:
        # 指定序列化的模型為 Appointments
        model = Appointments
        # 指定需要序列化的欄位
        fields = ('id', 'start', 'classNames', 'end', 'title')