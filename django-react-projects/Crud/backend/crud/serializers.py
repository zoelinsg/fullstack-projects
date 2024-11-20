from rest_framework import serializers
from .models import *  # 引入所有的模型 (Models)

# 專案的序列化器 (Serializer)
# 將 Project 模型轉換為 JSON 格式或其他格式，以便在 API 中傳遞
class ProjectSerializer(serializers.ModelSerializer):
    class Meta: 
        # 指定序列化器對應的模型是 Project
        model = Project
        # 指定要序列化的欄位
        fields = ('id', 'name', 'projectmanager', 'start_date', 'employees', 'end_date', 'comments', 'status')


# 專案經理的序列化器 (Serializer)
# 將 ProjectManager 模型轉換為 API 可以使用的格式
class ProjectManagerSerializer(serializers.ModelSerializer):
    class Meta: 
        # 指定序列化器對應的模型是 ProjectManager
        model = ProjectManager
        # 指定要序列化的欄位
        fields = ('name', 'id')


# 員工的序列化器 (Serializer)
# 將 Employees 模型轉換為 API 可以使用的格式
class EmployeesSerializer(serializers.ModelSerializer):
    class Meta: 
        # 指定序列化器對應的模型是 Employees
        model = Employees
        # 指定要序列化的欄位
        fields = ('name', 'id')
