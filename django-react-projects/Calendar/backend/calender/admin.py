from django.contrib import admin
from .models import *

# Register your models here.
# 註冊模型到 Django 管理介面
# 這樣可以讓 Appointments 模型在管理後台進行管理
admin.site.register(Appointments)