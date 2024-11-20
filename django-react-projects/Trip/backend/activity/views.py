from django.shortcuts import render
from rest_framework import viewsets, permissions, filters
from rest_framework.response import Response
from rest_framework import status
from .models import Activity
from .serializers import ActivitySerializer

# 活動視圖集 (ViewSet)，提供活動資料的 CRUD 操作與篩選功能
class ActivityViewSet(viewsets.ModelViewSet):
    # 設定此視圖允許所有使用者訪問
    permission_classes = [permissions.AllowAny]
    
    # 定義此視圖集使用的模型和序列化器
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    
    # 可以使用 filter_backends 來標準化篩選條件
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'start_date', 'end_date']
    
    # 可選的篩選條件，根據標題、開始日期、結束日期進行篩選
    def get_queryset(self):
        queryset = super().get_queryset()
        title = self.request.query_params.get('title', None)
        start_date = self.request.query_params.get('start_date', None)
        end_date = self.request.query_params.get('end_date', None)

        # 根據提供的篩選條件過濾數據
        if title:
            queryset = queryset.filter(title__icontains=title)  # 模糊搜尋活動標題
        if start_date:
            queryset = queryset.filter(start_date__gte=start_date)  # 篩選開始日期不小於指定日期
        if end_date:
            queryset = queryset.filter(end_date__lte=end_date)  # 篩選結束日期不大於指定日期
        
        return queryset

    # 新增活動資料，加入邏輯檢查，確保開始日期在結束日期之前
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # 檢查開始日期與結束日期的邏輯
        start_date = serializer.validated_data.get('start_date')
        end_date = serializer.validated_data.get('end_date')
        if start_date and end_date and start_date > end_date:
            return Response({"error": "開始日期不能晚於結束日期"}, status=status.HTTP_400_BAD_REQUEST)
        
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    # 更新活動資料，加入邏輯檢查
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        # 檢查開始日期與結束日期的邏輯
        start_date = serializer.validated_data.get('start_date')
        end_date = serializer.validated_data.get('end_date')
        if start_date and end_date and start_date > end_date:
            return Response({"error": "開始日期不能晚於結束日期"}, status=status.HTTP_400_BAD_REQUEST)
        
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)
    
    # 刪除活動資料
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
