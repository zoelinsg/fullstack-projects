from django.shortcuts import render  # 引入 Django 的視圖渲染模組
from django.http import HttpResponse  # 引入 Http 回應模組
from rest_framework import viewsets, permissions  # 引入 Django REST Framework 的視圖集和權限模組
from .serializers import *  # 引入所有序列化器
from rest_framework.response import Response  # 引入回應模組，用於返回 API 回應
from .models import *  # 引入所有的模型 (Models)

# 備註：這是一個用於展示的首頁視圖函式
# def home(request): 
#     return HttpResponse("This is the homepage")

# 專案經理的視圖集 (ViewSet)
class ProjectManagerViewset(viewsets.ViewSet):
    # 設定權限為允許所有人訪問
    permission_classes = [permissions.AllowAny]
    # 設定查詢集為 ProjectManager 所有的資料
    queryset = ProjectManager.objects.all()
    # 指定使用的序列化器
    serializer_class = ProjectManagerSerializer

    # 定義列出所有專案經理的行為
    def list(self, request):
        queryset = ProjectManager.objects.all()  # 獲取所有專案經理
        serializer = self.serializer_class(queryset, many=True)  # 序列化資料
        return Response(serializer.data)  # 返回序列化後的資料

# 員工的視圖集 (ViewSet)
class EmployeesViewset(viewsets.ViewSet):
    # 設定權限為允許所有人訪問
    permission_classes = [permissions.AllowAny]
    # 設定查詢集為 Employees 所有的資料
    queryset = Employees.objects.all()
    # 指定使用的序列化器
    serializer_class = EmployeesSerializer

    # 定義列出所有員工的行為
    def list(self, request):
        queryset = Employees.objects.all()  # 獲取所有員工資料
        serializer = self.serializer_class(queryset, many=True)  # 序列化資料
        return Response(serializer.data)  # 返回序列化後的資料

# 專案的視圖集 (ViewSet)
class ProjectViewset(viewsets.ViewSet):
    # 設定權限為允許所有人訪問
    permission_classes = [permissions.AllowAny]
    # 設定查詢集為 Project 所有的資料
    queryset = Project.objects.all()
    # 指定使用的序列化器
    serializer_class = ProjectSerializer

    # 定義列出所有專案的行為
    def list(self, request):
        queryset = Project.objects.all()  # 獲取所有專案資料
        serializer = self.serializer_class(queryset, many=True)  # 序列化資料
        return Response(serializer.data)  # 返回序列化後的資料

    # 定義創建專案的行為
    def create(self, request):
        serializer = self.serializer_class(data=request.data)  # 從請求中獲取資料並序列化
        if serializer.is_valid():  # 檢查資料是否有效
            serializer.save()  # 儲存資料
            return Response(serializer.data)  # 返回儲存後的資料
        else: 
            return Response(serializer.errors, status=400)  # 返回錯誤訊息和 400 狀態碼

    # 定義取得特定專案的行為
    def retrieve(self, request, pk=None):
        project = self.queryset.get(pk=pk)  # 根據主鍵 (pk) 獲取專案資料
        serializer = self.serializer_class(project)  # 序列化資料
        return Response(serializer.data)  # 返回序列化後的資料

    # 定義更新專案的行為
    def update(self, request, pk=None):
        project = self.queryset.get(pk=pk)  # 根據主鍵獲取專案資料
        serializer = self.serializer_class(project, data=request.data)  # 將新資料與原資料結合並序列化
        if serializer.is_valid():  # 檢查資料是否有效
            serializer.save()  # 儲存更新後的資料
            return Response(serializer.data)  # 返回更新後的資料
        else: 
            return Response(serializer.errors, status=400)  # 返回錯誤訊息和 400 狀態碼

    # 定義刪除專案的行為
    def destroy(self, request, pk=None):
        project = self.queryset.get(pk=pk)  # 根據主鍵獲取專案資料
        project.delete()  # 刪除專案
        return Response(status=204)  # 返回 204 狀態碼，表示資料已刪除
