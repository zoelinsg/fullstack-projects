from django.urls import path
from user.views import loginView, registerView, CookieTokenRefreshView, logoutView, user

app_name = "user"

urlpatterns = [
    path('login', loginView),  # 登入 API
    path('register', registerView),  # 註冊 API
    path('refresh-token', CookieTokenRefreshView.as_view()),  # 刷新 Token 的 API
    path('logout', logoutView),  # 登出 API
    path("user", user),  # 取得使用者資料的 API
]