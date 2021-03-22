from django.db import models


class Product(models.Model):
    title = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=30, decimal_places=2)
    picture = models.CharField(max_length=300)
    category = models.CharField(max_length=200)
    sub_category = models.CharField(max_length=200)
    inventory_amount = models.IntegerField(default=10)

    def __str__(self):
        return self.title


class Featured(models.Model):
    title = models.CharField(max_length=200)
    picture = models.CharField(max_length=300)
    price = models.DecimalField(max_digits=30, decimal_places=2)
    old_price = models.DecimalField(max_digits=30, decimal_places=2)

    def __str__(self):
        return self.title


class Address(models.Model):
    city = models.CharField(max_length=200)
    state = models.CharField(max_length=200)
    zip = models.IntegerField(default='00000')


class Customer(models.Model):
    name = models.CharField(max_length=200, null=True)
    phone = models.CharField(max_length=200, null=True)
    email = models.CharField(max_length=200, null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    address = models.ForeignKey(Address, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.name


class Order(models.Model):
    STATUS = (
        ('Pending', 'Pending'),
        ('Out for delivery', 'Out for delivery'),
        ('Delivered', 'Delivered')
    )
    order_customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=300)
    address = models.CharField(max_length=300)
    order_item = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=200, null=True, choices=STATUS, default='Pending')

    def __str__(self):
        return str(self.status) + " " + " " + str(self.date_created) + " " + str(self.order_item)
