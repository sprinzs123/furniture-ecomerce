from django.contrib import admin
from .models import Product, Featured, Customer, Order, Address

admin.site.register(Product)
admin.site.register(Featured)
admin.site.register(Customer)
admin.site.register(Order)
admin.site.register(Address)
