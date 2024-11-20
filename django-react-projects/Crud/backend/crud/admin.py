from django.contrib import admin
from .models import *  # 引入所有的模型 (Models)

# 註冊 Project 模型到 Django 管理介面
# 使得 Project 模型可以在 Django admin 後台管理
admin.site.register(Project)

# 註冊 ProjectManager 模型到 Django 管理介面
# 使得 ProjectManager 模型可以在 Django admin 後台管理
admin.site.register(ProjectManager)

# 註冊 Employees 模型到 Django 管理介面
# 使得 Employees 模型可以在 Django admin 後台管理
admin.site.register(Employees)
