from django.db import models

# 定義專案經理 (ProjectManager) 的資料表模型
class ProjectManager(models.Model): 
    # 名稱欄位，設定為唯一，字串長度上限為100
    name = models.CharField(unique=True, max_length=100)
    # 建立時間，會自動設置為物件創建時的時間
    created = models.DateTimeField(auto_now_add=True)
    # 修改時間，會自動設置為物件最後一次修改時的時間
    modified = models.DateTimeField(auto_now=True)

    # 字串表示，回傳物件的名稱
    def __str__(self):
        return self.name

# 定義員工 (Employees) 的資料表模型
class Employees(models.Model): 
    # 名稱欄位，設定為唯一，字串長度上限為100
    name = models.CharField(unique=True, max_length=100)
    # 建立時間，會自動設置為物件創建時的時間
    created = models.DateTimeField(auto_now_add=True)
    # 修改時間，會自動設置為物件最後一次修改時的時間
    modified = models.DateTimeField(auto_now=True)

    # 字串表示，回傳物件的名稱
    def __str__(self):
        return self.name

# 定義專案 (Project) 的資料表模型
class Project(models.Model): 
    # 專案名稱欄位，設定為唯一，字串長度上限為100
    name = models.CharField(unique=True, max_length=100)
    # 員工欄位，多對多關聯，連結至員工模型 (Employees)
    employees = models.ManyToManyField(Employees)
    # 專案經理欄位，外鍵關聯到專案經理模型 (ProjectManager)，可選擇性為空
    projectmanager = models.ForeignKey(ProjectManager, on_delete=models.CASCADE, blank=True, null=True)
    # 專案開始日期
    start_date = models.DateField()
    # 專案結束日期
    end_date = models.DateField()
    # 備註欄位，字串長度上限為500，可選擇性為空
    comments = models.CharField(max_length=500, blank=True, null=True)
    # 專案狀態欄位，字串長度上限為100
    status = models.CharField(max_length=100)
    # 建立時間，會自動設置為物件創建時的時間
    created = models.DateTimeField(auto_now_add=True)
    # 修改時間，會自動設置為物件最後一次修改時的時間
    modified = models.DateTimeField(auto_now=True)

    # 字串表示，回傳專案的名稱
    def __str__(self):
        return self.name
