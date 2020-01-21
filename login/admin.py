from django.contrib import admin
from .models import ContactInfo, Payment, Test, Orders

admin.site.register(ContactInfo)
admin.site.register(Payment)
admin.site.register(Test)
admin.site.register(Orders)


# Register your models here.
