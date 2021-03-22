from django.shortcuts import render, get_object_or_404
from .models import Product, Featured
from django.views.generic import ListView

items = Product.objects.all()
featured = Featured.objects.all()

def front(request):
    items = Product.objects.all()
    items = items.exclude(inventory_amount=0)
    return render(request, 'store/front_page.html', {'items': items, 'featured':featured})


class StorePage(ListView):
    template_name = 'store/store_page.html'
    model = Product
    context_object_name = 'items'


def single(request, product_id):
    product = get_object_or_404(Product, pk=product_id)
    return render(request, 'store/single_item.html',  {'items': items, 'featured':featured, 'product': product})


