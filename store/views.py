from django.shortcuts import render, get_object_or_404
from .models import Product, Featured
from django.core.paginator import Paginator

items = Product.objects.all()
featured = Featured.objects.all()


def front(request):
    return render(request, 'store/front_page.html', {'items': items, 'featured':featured})


def store(request):
    paginator = Paginator(items, 12)
    page = request.GET.get('page')
    store_items = paginator.get_page(page)
    return render(request, 'store/store_page.html',  {'items': items, 'featured':featured, 'store_items': store_items})


def single(request, product_id):
    product = get_object_or_404(Product, pk=product_id)
    return render(request, 'store/single_item.html',  {'items': items, 'featured':featured, 'product': product})
