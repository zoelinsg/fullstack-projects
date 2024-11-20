from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AttractionViewSet

# 創建一個路由器並註冊視圖集
router = DefaultRouter()
router.register(r'attractions', AttractionViewSet, basename='attractions')

# 使用路由器生成的 URL 模式
urlpatterns = [
    path('', include(router.urls)),
]
