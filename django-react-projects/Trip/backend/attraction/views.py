from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework import status
from .models import Attraction
from .serializers import AttractionSerializer

class AttractionViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]  # 允許所有用戶訪問

    # 列出景點資料，允許根據名稱和類別進行篩選
    def list(self, request):
        name = request.query_params.get('name', None)
        category = request.query_params.get('category', None)

        queryset = Attraction.objects.all()
        if name:
            queryset = queryset.filter(name__icontains=name)  # 模糊搜尋名稱
        if category:
            queryset = queryset.filter(category__icontains=category)  # 模糊搜尋類別
        queryset = queryset.order_by('name')  # 按名稱排序

        serializer = AttractionSerializer(queryset, many=True)
        return Response(serializer.data)

    # 取得單一景點詳細資料
    def retrieve(self, request, pk=None):
        try:
            attraction = Attraction.objects.get(pk=pk)
            serializer = AttractionSerializer(attraction)
            return Response(serializer.data)
        except Attraction.DoesNotExist:
            return Response({'error': '景點不存在'}, status=status.HTTP_404_NOT_FOUND)

    # 新增景點資料
    def create(self, request):
        serializer = AttractionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 更新景點資料
    def update(self, request, pk=None):
        try:
            attraction = Attraction.objects.get(pk=pk)
            serializer = AttractionSerializer(attraction, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Attraction.DoesNotExist:
            return Response({'error': '景點不存在'}, status=status.HTTP_404_NOT_FOUND)

    # 刪除景點資料
    def destroy(self, request, pk=None):
        try:
            attraction = Attraction.objects.get(pk=pk)
            attraction.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Attraction.DoesNotExist:
            return Response({'error': '景點不存在'}, status=status.HTTP_404_NOT_FOUND)
