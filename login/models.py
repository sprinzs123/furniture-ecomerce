from django.db import models
from django.contrib.auth.models import User
from datetime import date


class ContactInfo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    state = models.CharField(max_length=200)
    zip = models.IntegerField(default='00000')

    def __str__(self):
        return f'{self.user.username} contact'


class Payment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    cardNum = models.IntegerField(default='0000000')
    exMonth = models.IntegerField(default='0000000')
    exYear = models.IntegerField(default='0000000')
    security = models.IntegerField(default='0000000')
    def __str__(self):
        return f'{self.user.username} pay'


class Test(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    testing = models.CharField(max_length=200)

    def __str__(self):
        return f'{self.user.username} testing'


class Orders(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=300)
    address = models.CharField(max_length=300)
    items = models.CharField(max_length=30000)
    orderTime = models.DateField(default=date.today)

    def __str__(self):
        return f'{self.user.username}'



