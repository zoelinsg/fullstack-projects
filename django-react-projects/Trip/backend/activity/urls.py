# backend/activity/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ActivityViewSet

# 註冊活動路徑
router = DefaultRouter()
router.register(r'activity', ActivityViewSet, basename='activity')

urlpatterns = [
    path('', include(router.urls)),  # 包含 router 的路徑
]
