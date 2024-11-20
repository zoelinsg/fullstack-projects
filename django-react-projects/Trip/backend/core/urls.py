"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# 檔案路徑: backend/urls.py
# 設定主 URL 配置，包含 admin 和各應用的 API 路徑

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),  # 管理後台
    path('api/', include('attraction.urls')),  # 將 attraction 應用的 URL 加入 /api/ 前綴
    path('api/', include('activity.urls')),  # 其他應用如 activity 的 URL
]
