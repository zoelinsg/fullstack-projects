from rest_framework import serializers
from .models import *
import calendar

# SuperMarketSalesSerializer 用於序列化 SuperMarketSales 模型資料
class SuperMarketSalesSerializer(serializers.ModelSerializer): 
    # 使用 SlugRelatedField 來序列化 gender，顯示性別的名稱而非 ID
    gender = serializers.SlugRelatedField(
        queryset=Gender.objects.all(),  # 查詢所有 Gender 資料
        slug_field='name'  # 以 name 欄位顯示
    )

    # 使用 SlugRelatedField 來序列化 country，顯示國家的名稱
    country = serializers.SlugRelatedField(
        queryset=Country.objects.all(),  # 查詢所有 Country 資料
        slug_field='name'  # 以 name 欄位顯示
    )

    # 使用 SlugRelatedField 來序列化 customertype，顯示客戶類型名稱
    customertype = serializers.SlugRelatedField(
        queryset=CustomerType.objects.all(),  # 查詢所有 CustomerType 資料
        slug_field='name'  # 以 name 欄位顯示
    )

    # 使用 SlugRelatedField 來序列化 branche，顯示分行名稱
    branche = serializers.SlugRelatedField(
        queryset=Branche.objects.all(),  # 查詢所有 Branche 資料
        slug_field='name'  # 以 name 欄位顯示
    )

    class Meta: 
        model = SuperMarketSales  # 關聯的模型
        fields = ('id', 'unit_price', 'quantity', 'date', 'country', 'gender', 'customertype', 'branche', 'productline', 'payment')
        # 指定需要序列化的欄位

# BrancheDataSerializer 用於序列化分行資料
class BrancheDataSerializer(serializers.Serializer): 
    id = serializers.IntegerField(source='branche')  # 來源為 branche 欄位的 ID
    label = serializers.CharField(source='branche__name')  # 來源為 branche 名稱
    value = serializers.IntegerField(source='quantity')  # 來源為購買數量
    percentage = serializers.DecimalField(max_digits=10, decimal_places=2)  # 百分比資料

# GenderDataSerializer 用於序列化性別資料
class GenderDataSerializer(serializers.Serializer): 
    id = serializers.IntegerField(source='gender')  # 來源為 gender 欄位的 ID
    label = serializers.CharField(source='gender__name')  # 來源為 gender 名稱
    value = serializers.IntegerField(source='quantity')  # 來源為購買數量

# ProductBrancheDataSerializer 用於序列化產品在各分行的銷售資料
class ProductBrancheDataSerializer(serializers.Serializer): 
    productline__name = serializers.CharField()  # 產品線名稱
    quantityBrancheA = serializers.IntegerField()  # 分行 A 的銷售數量
    quantityBrancheB = serializers.IntegerField()  # 分行 B 的銷售數量
    quantityBrancheC = serializers.IntegerField()  # 分行 C 的銷售數量

# CountryDataSerializer 用於序列化國家銷售資料
class CountryDataSerializer(serializers.Serializer):
    date__month = serializers.CharField()  # 日期中的月份
    quantityNetherlands = serializers.IntegerField()  # 荷蘭的銷售數量
    quantityGermany = serializers.IntegerField()  # 德國的銷售數量
    quantityFrance = serializers.IntegerField()  # 法國的銷售數量
    month_name = serializers.SerializerMethodField()  # 取得月份的英文名稱

    # 自定義方法，將數字月份轉換為英文月份名稱
    def get_month_name(self, obj):
        return calendar.month_name[obj['date__month']]