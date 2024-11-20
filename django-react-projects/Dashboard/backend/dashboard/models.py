from django.db import models

# Country 模型表示國家
class Country(models.Model): 
    name = models.CharField(max_length=200)  # 國家的名稱

# Gender 模型表示性別
class Gender(models.Model): 
    name = models.CharField(max_length=200)  # 性別名稱，例如：男、女

# CustomerType 模型表示客戶類型
class CustomerType(models.Model): 
    name = models.CharField(max_length=200)  # 客戶類型名稱，例如：一般客戶、VIP

# Branche 模型表示分行
class Branche(models.Model): 
    name = models.CharField(max_length=200)  # 分行名稱
    description = models.CharField(max_length=200)  # 分行描述

# ProductLine 模型表示產品線
class ProductLine(models.Model): 
    name = models.CharField(max_length=200)  # 產品線名稱

# Payment 模型表示付款方式
class Payment(models.Model): 
    name = models.CharField(max_length=200)  # 付款方式名稱，例如：現金、信用卡
    category = models.CharField(max_length=200)  # 付款分類，例如：線上、離線

# SuperMarketSales 模型表示超市銷售記錄
class SuperMarketSales(models.Model): 
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)  # 單價
    quantity = models.IntegerField()  # 購買數量
    date = models.DateField()  # 購買日期
    country = models.ForeignKey(Country, on_delete=models.CASCADE)  # 關聯的國家
    gender = models.ForeignKey(Gender, on_delete=models.CASCADE)  # 關聯的性別
    customertype = models.ForeignKey(CustomerType, on_delete=models.CASCADE)  # 關聯的客戶類型
    branche = models.ForeignKey(Branche, on_delete=models.CASCADE)  # 關聯的分行
    productline = models.ForeignKey(ProductLine, on_delete=models.CASCADE)  # 關聯的產品線
    payment = models.ForeignKey(Payment, on_delete=models.CASCADE)  # 關聯的付款方式