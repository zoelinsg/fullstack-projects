from django.contrib import admin
from .models import Country, Gender, CustomerType, Branche, ProductLine, Payment, SuperMarketSales

# Register your models here.
# 註冊 Country 模型到管理後台
@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')  # 後台顯示的欄位
    search_fields = ('name',)  # 啟用搜尋功能的欄位

# 註冊 Gender 模型到管理後台
@admin.register(Gender)
class GenderAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')  # 後台顯示的欄位
    search_fields = ('name',)  # 啟用搜尋功能的欄位

# 註冊 CustomerType 模型到管理後台
@admin.register(CustomerType)
class CustomerTypeAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')  # 後台顯示的欄位
    search_fields = ('name',)  # 啟用搜尋功能的欄位

# 註冊 Branche 模型到管理後台
@admin.register(Branche)
class BrancheAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description')  # 後台顯示的欄位
    search_fields = ('name',)  # 啟用搜尋功能的欄位

# 註冊 ProductLine 模型到管理後台
@admin.register(ProductLine)
class ProductLineAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')  # 後台顯示的欄位
    search_fields = ('name',)  # 啟用搜尋功能的欄位

# 註冊 Payment 模型到管理後台
@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'category')  # 後台顯示的欄位
    search_fields = ('name', 'category')  # 啟用搜尋功能的欄位

# 註冊 SuperMarketSales 模型到管理後台
@admin.register(SuperMarketSales)
class SuperMarketSalesAdmin(admin.ModelAdmin):
    list_display = ('id', 'unit_price', 'quantity', 'date', 'country', 'gender', 'customertype', 'branche', 'productline', 'payment')
    # 在後台顯示銷售資料的相關欄位
    list_filter = ('country', 'gender', 'customertype', 'branche', 'productline', 'payment')  # 啟用篩選功能的欄位
    search_fields = ('country__name', 'gender__name', 'customertype__name', 'branche__name', 'productline__name', 'payment__name')
    # 啟用搜尋功能的欄位