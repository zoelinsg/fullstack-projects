from django.urls import path  # 引入 Django 的 URL 路徑處理模組
from .views import *  # 引入所有的視圖 (Views)
from rest_framework.routers import DefaultRouter  # 引入 REST Framework 的預設路由器

# 建立一個 REST Framework 的預設路由器
router = DefaultRouter()

# 註冊專案 (Project) 的視圖集 (Viewset) 到路由
# 'project' 是該路由的基礎路徑，對應的視圖集為 ProjectViewset
router.register('project', ProjectViewset, basename='project')

# 註冊專案經理 (ProjectManager) 的視圖集到路由
# 'projectmanager' 是該路由的基礎路徑，對應的視圖集為 ProjectManagerViewset
router.register('projectmanager', ProjectManagerViewset, basename='projectmanager')

# 註冊員工 (Employees) 的視圖集到路由
# 'employees' 是該路由的基礎路徑，對應的視圖集為 EmployeesViewset
router.register('employees', EmployeesViewset, basename='employees')

# 取得自動生成的 URL 列表，並賦值給 urlpatterns
urlpatterns = router.urls

# 備註: 以下是備用的 URL 模式，可以定義自訂的 URL 路徑
# urlpatterns = [
#     path('', home)  # 定義一個根路徑，對應到 home 視圖
# ]
