from django.shortcuts import render
from .models import Product, Featured

items = Product.objects.all()
featured = Featured.objects.all()



def front(request):
    return render(request, 'store/front_page.html', {'items': items, 'featured':featured})

def store(request):
    return render(request, 'store/store_page.html',  {'items': items, 'featured':featured})

def single(request):
    return render(request, 'store/single_item.html',  {'items': items, 'featured':featured})
