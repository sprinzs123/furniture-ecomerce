from django.shortcuts import render, redirect, HttpResponseRedirect
from django.contrib import auth
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from .models import ContactInfo, Payment, Test

def login(request):
    if request.method == 'POST':
        user = auth.authenticate(username=request.POST['username'],password=request.POST['password'])
        if user is not None:
            auth.login(request, user)
            return redirect('front')
        else:
            return render(request, 'accounts/login.html',{'error':'username or password is incorrect.'})
    else:
        return render(request, 'login/login.html')


def signup(request):
    if request.method == 'POST':
        # User has info and wants an account now!
        if request.POST['password1'] == request.POST['password2']:
            try:
                user = User.objects.get(username=request.POST['username'])
                return render(request, 'accounts/signup.html', {'error':'Username has already been taken'})
            except User.DoesNotExist:
                user = User.objects.create_user(request.POST['username'], password=request.POST['password1'])
                auth.login(request,user)
                return redirect('home')
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
    # if request.method == 'POST':
        addtest(request)
        # addAddress(request)
    # else:
        payInfo = Payment.objects.all()
        addresInfo = ContactInfo.objects.all()
        userPay = payInfo.filter(user=request.user)
        userName = request.user.username
        userAddress = addresInfo.filter(user=request.user)
        return render(request, 'login/user.html', {'payment': userPay, 'address': userAddress, 'userName': userName})

def addAddress(request):
    # if request.method == 'POST':
        address = ContactInfo()
        address.user = request.user
        address.firstName = request.POST.get('fname', '')
        address.lastName = request.POST.get('lname', '')
        address.fullName = str(address.firstName) + ' ' + str(address.lastName)
        address.address = request.POST.get('address', '')
        address.city = request.POST.get('city', '')
        address.state = request.POST.get('state', '')
        address.zip = request.POST.get('zip', '1')
        newAddress = ContactInfo(user=address.user, name=address.fullName, address=address.address, city=address.city, state=address.state, zip=address.zip)
        if address.fullName != '':
            newAddress.save()
            newAddress = ContactInfo()
            return reversed('login/user.html')


def addtest(request):
    # if request.method == 'POST':

        test = Test()
        test.user = request.user
        test.testing = request.POST.get('test', '')
        if test.testing != '':
            test.save()
            test = Test()

            return redirect('login/user.html')








