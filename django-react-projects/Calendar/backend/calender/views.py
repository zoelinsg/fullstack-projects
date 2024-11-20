from rest_framework import viewsets, permissions 
from .serializers import *
from rest_framework.response import Response 
from .models import * 

# 定義 AppointmentViewset 視圖集合
# 提供 RESTful API 功能來處理 Appointments 模型的資料
class AppointmentViewset(viewsets.ViewSet):
    # 設定權限類別，允許所有使用者訪問這個視圖
    permission_classes = [permissions.AllowAny]
    
    # 查詢所有的 Appointments 資料
    queryset = Appointments.objects.all()
    
    # 指定使用的序列化器類別
    serializer_class = AppointmentSerializer

    # 定義 create 方法來處理 POST 請求，新增新的預約資料
    def create(self, request):
        # 使用序列化器來驗證並處理請求中的資料
        serializer = self.serializer_class(data=request.data)
        # 如果資料有效，則保存資料並回應序列化後的資料
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            # 如果資料無效，回應錯誤訊息並設置狀態碼為 400
            return Response(serializer.errors, status=400)

    # 定義 list 方法來處理 GET 請求，列出所有的預約資料
    def list(self, request):
        # 查詢所有的 Appointments 資料
        queryset = Appointments.objects.all()
        # 將資料序列化
        serializer = self.serializer_class(queryset, many=True)
        # 回應序列化後的資料
        return Response(serializer.data)
    
    # 定義 retrieve 方法來處理 GET 請求，根據主鍵 (pk) 取得單一預約資料
    def retrieve(self, request, pk=None):
        # 根據主鍵查詢特定的 Appointments 資料
        queryset = self.queryset.get(pk=pk)
        # 將資料序列化
        serializer = self.serializer_class(queryset)
        # 回應序列化後的資料
        return Response(serializer.data)