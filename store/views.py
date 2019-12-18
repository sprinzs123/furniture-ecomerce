from django.shortcuts import render, get_object_or_404
from .models import Product, Featured

items = Product.objects.all()
featured = Featured.objects.all()



def front(request):
    return render(request, 'store/front_page.html', {'items': items, 'featured':featured})

def store(request):
    return render(request, 'store/store_page.html',  {'items': items, 'featured':featured})

def single(request, product_id):
    product = get_object_or_404(Product, pk=product_id)
    return render(request, 'store/single_item.html',  {'items': items, 'featured':featured, 'product': product})
def checkout(request):
    return render(request, 'store/checkout.html',  {'items': items, 'featured':featured})
