from django.db import models


class Product(models.Model):
    title = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=30, decimal_places=2)
    picture = models.CharField(max_length=300)
    category = models.CharField(max_length=200)
    sub_category = models.CharField(max_length=200)

    def __str__(self):
        return self.title


class Featured(models.Model):
    title = models.CharField(max_length=200)
    picture = models.CharField(max_length=300)
    price = models.DecimalField(max_digits=30, decimal_places=2)
    old_price = models.DecimalField(max_digits=30, decimal_places=2)
    def __str__(self):
        return self.title
