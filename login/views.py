from django.shortcuts import render, redirect, HttpResponseRedirect
from django.contrib import auth
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from .models import ContactInfo
from store.models import Customer, Address, Order


def login(request):
    if request.method == 'POST':
        user = auth.authenticate(username=request.POST['username'], password=request.POST['password'])
        if user is not None:
            auth.login(request, user)
            return redirect('front')
        else:
            return render(request, 'login/login.html', {'error': 'username or password is incorrect.'})
    else:
        return render(request, 'login/login.html')


def signup(request):
    if request.method == 'POST':
        # User has info and wants an account now!
        if request.POST['password1'] == request.POST['password2']:
            try:
                user = User.objects.get(username=request.POST['username'])
                return render(request, 'login/signup.html', {'error':'Username has already been taken'})
            except User.DoesNotExist:
                user = User.objects.create_user(request.POST['username'], password=request.POST['password1'])
                auth.login(request,user)
                return redirect('/')
    else:
        return render(request, 'login/signup.html')


def logout(request):
    if request.method == 'POST':
        auth.logout(request)
        return redirect('front')

# all function for user page are here
# this function in referenced on url page
# and as {% ulr 'url name' %} in html


@login_required
def user_page(request):
    if request.method == 'POST':
        addAddress(request)
    address_info = Address.objects.all()
    orders = Order.objects.all()
    user_name = request.user
    user_order = orders.filter(user=request.user)
    user_address = address_info.filter(user=request.user)
    user_name = request.user
    # user_address = address_info.filter(user=request.user)
    content = {'user_name': user_name,  'user_order': user_order, 'user_address': user_address}
    return render(request, 'login/user.html', content)


def addAddress(request):
    if request.method == 'POST':
        address = Address()
        address.user = request.user
        address.firstName = request.POST.get('fname', '')
        address.lastName = request.POST.get('lname', '')
        address.fullName = str(address.firstName) + ' ' + str(address.lastName)
        address.address = request.POST.get('address', '')
        address.city = request.POST.get('city', '')
        address.state = request.POST.get('state', '')
        address.zip = request.POST.get('zip', '1')
        new_address = Address(user=address.user, first_name=address.firstName, last_name=address.lastName,  address=address.address, city=address.city, state=address.state, zip=address.zip)
        if address.fullName != '':
            new_address.save()
            return reversed('login/user.html')


def checkout(request):
    addOrders(request)
    if request.user.is_authenticated:

        address_info = Address.objects.all()
        user_address = address_info.filter(user=request.user)
        content = {'user_address': user_address}
        return render(request, 'login/checkout.html', content)
    else:
        return render(request, 'login/checkout.html')


def addtest(request):
    # if request.method == 'POST':
        test = Test()
        test.user = request.user
        test.testing = request.POST.get('test', 'cant find it')
        # if test.testing != '':
        test.save()
        test = Test()
        # return redirect('login/user.html')


def addOrders(request):
    if request.user.is_authenticated and request.method == 'POST':
        order = Orders()

        order.user = request.user
        order.name = request.POST.get('name', 'default')
        order.address = request.POST.get('address', 'default')
        order.items = request.POST.get('items', 'default')
        order.save()
        order = Orders()













