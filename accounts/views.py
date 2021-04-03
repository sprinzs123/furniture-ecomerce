from django.shortcuts import render, get_object_or_404
from store.models import Order, Customer, Product
from .filters import OrderFilter, InventoryFilter


def home(request):
    orders = Order.objects.all()
    pending = orders.filter(status='Pending').count()
    delivered = orders.filter(status='Delivered').count()
    delivering = orders.filter(status='Out for delivery').count()
    total = orders.count()
    customers = Customer.objects.all()
    pending_orders = orders.filter(status='Pending').order_by('-id')

    myFilter = OrderFilter(request.GET, queryset=orders)
    orders = myFilter.qs

    context = {'pending_orders': pending_orders, 'pending': pending, 'delivered': delivered, 'delivering': delivering,
               'total': total, 'orders': orders, 'customers': customers, 'myFilter': myFilter}
    return render(request, 'accounts/dashboard.html', context)


def customer(request, pk):
    customer = get_object_or_404(Customer, pk=pk)
    orders = customer.order_set.all()
    order_count = orders.count()
    context = {'customer': customer, 'orders': orders, 'order_count': order_count}
    return render(request, 'accounts/customer.html', context)


def inventory(request):
    items = Product.objects.all()
    out_of_stock = items.filter(inventory_amount=0)
    in_stock = items.exclude(inventory_amount=0)
    on_shelves_amount = sum(items.values_list('inventory_amount', flat=True))
    missing_items_count = out_of_stock.count()
    present_items_count = in_stock.count()

    my_filter = InventoryFilter(request.GET, queryset=in_stock)
    in_stock = my_filter.qs

    context = {'out_of_stock': out_of_stock, 'in_stock': in_stock, 'on_shelves_amount': on_shelves_amount,
               'missing_items_count': missing_items_count, 'present_items_count': present_items_count,
               'my_filter': my_filter}
    return render(request, 'accounts/inventory.html', context)
