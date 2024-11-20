from django.shortcuts import render
from rest_framework import viewsets, permissions
from .serializers import * 
from .models import * 
from rest_framework.response import Response
from django.db.models import Sum, F, Func, Value, FloatField, IntegerField, Case, When
from django.db.models.functions import Cast

# SuperMarketSalesViewset 用於處理超市銷售資料的 API 請求
class SuperMarketSalesViewset(viewsets.ViewSet): 
    permission_classes = [permissions.AllowAny]  # 設定允許所有使用者訪問
    queryset = SuperMarketSales.objects.all()  # 查詢所有超市銷售資料
    serializer_class = SuperMarketSalesSerializer  # 使用 SuperMarketSalesSerializer 進行序列化

    # 列出所有超市銷售資料
    def list(self, request): 
        queryset = SuperMarketSales.objects.all()  # 取得所有超市銷售記錄
        serializer = self.serializer_class(queryset, many=True)  # 序列化資料
        return Response(serializer.data)  # 回傳 JSON 格式的資料

# BrancheDataViewset 用於處理分行銷售資料的 API 請求
class BrancheDataViewset(viewsets.ViewSet): 
    permission_classes = [permissions.AllowAny]  # 設定允許所有使用者訪問
    queryset = SuperMarketSales.objects.all()  # 查詢所有超市銷售資料
    serializer_class = BrancheDataSerializer  # 使用 BrancheDataSerializer 進行序列化

    # 列出分行銷售數據及其百分比
    def list(self, request): 
        # 計算總購買數量
        total_sum = SuperMarketSales.objects.aggregate(total_quantity=Sum('quantity'))
        total_quantity_value = total_sum['total_quantity']

        # 查詢每個分行的銷售數據並計算百分比
        queryset = SuperMarketSales.objects.values('branche', 'branche__name')\
                   .annotate(quantity=Sum('quantity'))\
                   .annotate(percentage=Func(
                      (Cast(F('quantity'), FloatField()) / total_quantity_value) * 100,
                      Value(2), 
                      function='ROUND', 
                      output_field=FloatField()
                   ))
        
        serializer = self.serializer_class(queryset, many=True)  # 序列化資料
        return Response(serializer.data)  # 回傳 JSON 格式的資料

# GenderDataViewset 用於處理性別銷售資料的 API 請求
class GenderDataViewset(viewsets.ViewSet): 
    permission_classes = [permissions.AllowAny]  # 設定允許所有使用者訪問
    queryset = SuperMarketSales.objects.all()  # 查詢所有超市銷售資料
    serializer_class = GenderDataSerializer  # 使用 GenderDataSerializer 進行序列化

    # 列出依據性別的銷售數據
    def list(self, request): 
        queryset = SuperMarketSales.objects.values('gender', 'gender__name')\
                   .annotate(quantity=Sum('quantity'))
        
        serializer = self.serializer_class(queryset, many=True)  # 序列化資料
        return Response(serializer.data)  # 回傳 JSON 格式的資料

# ProductBrancheViewset 用於處理產品在各分行的銷售資料 API 請求
class ProductBrancheViewset(viewsets.ViewSet): 
    permission_classes = [permissions.AllowAny]  # 設定允許所有使用者訪問
    queryset = SuperMarketSales.objects.all()  # 查詢所有超市銷售資料
    serializer_class = ProductBrancheDataSerializer  # 使用 ProductBrancheDataSerializer 進行序列化

    # 列出依據產品線在各分行的銷售數據
    def list(self, request): 
        queryset = SuperMarketSales.objects.values('productline__name')\
                   .annotate(quantityBrancheA=Sum(
                       Case(
                           When(branche__name="A", then='quantity'),  # 計算分行 A 的數量
                           default=0, 
                           output_field=IntegerField()
                       )
                   ))\
                   .annotate(quantityBrancheB=Sum(
                       Case(
                           When(branche__name="B", then='quantity'),  # 計算分行 B 的數量
                           default=0, 
                           output_field=IntegerField()
                       )
                   ))\
                   .annotate(quantityBrancheC=Sum(
                       Case(
                           When(branche__name="C", then='quantity'),  # 計算分行 C 的數量
                           default=0, 
                           output_field=IntegerField()
                       )
                   ))
        
        serializer = self.serializer_class(queryset, many=True)  # 序列化資料
        return Response(serializer.data)  # 回傳 JSON 格式的資料

# CountryDataViewset 用於處理各國家銷售資料的 API 請求
class CountryDataViewet(viewsets.ViewSet): 
    permission_classes = [permissions.AllowAny]  # 設定允許所有使用者訪問
    queryset = SuperMarketSales.objects.all()  # 查詢所有超市銷售資料
    serializer_class = CountryDataSerializer  # 使用 CountryDataSerializer 進行序列化

    # 列出依據月份及各國家的銷售數據
    def list(self, request): 
        queryset = SuperMarketSales.objects.values('date__month')\
                   .annotate(quantityNetherlands=Sum(
                       Case(
                           When(country__name="Netherlands", then='quantity'),  # 計算荷蘭的數量
                           default=0, 
                           output_field=IntegerField()
                       )
                   ))\
                   .annotate(quantityGermany=Sum(
                       Case(
                           When(country__name="Germany", then='quantity'),  # 計算德國的數量
                           default=0, 
                           output_field=IntegerField()
                       )
                   ))\
                   .annotate(quantityFrance=Sum(
                       Case(
                           When(country__name="France", then='quantity'),  # 計算法國的數量
                           default=0, 
                           output_field=IntegerField()
                       )
                   ))
        
        serializer = self.serializer_class(queryset, many=True)  # 序列化資料
        return Response(serializer.data)  # 回傳 JSON 格式的資料