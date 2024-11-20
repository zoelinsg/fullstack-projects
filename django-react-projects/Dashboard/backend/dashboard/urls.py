from django.contrib import admin
from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import * 

# 創建一個預設的路由器實例
router = DefaultRouter()

# 註冊超市銷售的 ViewSet，對應的 URL 路徑為 /supermarketsales/
router.register('supermarketsales', SuperMarketSalesViewset, basename='supermarketsales')

# 註冊分行數據的 ViewSet，對應的 URL 路徑為 /branchedata/
router.register('branchedata', BrancheDataViewset, basename='branchedata')

# 註冊性別數據的 ViewSet，對應的 URL 路徑為 /genderdata/
router.register('genderdata', GenderDataViewset, basename='genderdata')

# 註冊產品分行數據的 ViewSet，對應的 URL 路徑為 /productbranchedata/
router.register('productbranchedata', ProductBrancheViewset, basename='productbranchedata')

# 註冊國家數據的 ViewSet，對應的 URL 路徑為 /countrydata/
router.register('countrydata', CountryDataViewet, basename='countrydata')

# 將路由器生成的 URL 列表設為應用的 URL 模式
urlpatterns = router.urls