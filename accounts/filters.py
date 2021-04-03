import django_filters
from store.models import *
from django_filters import DateFilter, CharFilter


class OrderFilter(django_filters.FilterSet):
    start_date = DateFilter(field_name='date_created', lookup_expr='gte')
    end_date = DateFilter(field_name='date_created', lookup_expr='lte')
    name = CharFilter(field_name='user', lookup_expr='icontains', label='Customer')

    class Meta:
        model = Order
        fields = '__all__'
        exclude = ['customer', 'date_created', 'address', 'quantity', 'name', 'user']


class InventoryFilter(django_filters.FilterSet):
    inventory_gt = django_filters.NumberFilter(field_name='inventory_amount', lookup_expr='gte')
    inventory_lt = django_filters.NumberFilter(field_name='inventory_amount', lookup_expr='lte')
    title = CharFilter(field_name='title', lookup_expr='icontains')

    class Meta:
        model = Product
        fields = '__all__'
        exclude = ['picture', 'inventory_amount', 'price', 'title']
