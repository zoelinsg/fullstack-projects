from django.urls import path 
from .views import * 
from rest_framework.routers import DefaultRouter

# 創建一個預設的路由器實例
router = DefaultRouter()

# 註冊 'appointments' 路徑到 AppointmentViewset
# 這會自動生成對應的 CRUD API 路由 (如：/appointments/, /appointments/<id>/)
router.register('appointments', AppointmentViewset, basename='appointments')

# 將路由器生成的 URL pattern 指定為應用程式的 URL 配置
urlpatterns = router.urls