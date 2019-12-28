from django.contrib import admin
from .models import ContactInfo, Payment, Test

admin.site.register(ContactInfo)
admin.site.register(Payment)
admin.site.register(Test)

# Register your models here.
