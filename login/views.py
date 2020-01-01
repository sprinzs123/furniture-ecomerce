from django.shortcuts import render, redirect
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

@login_required
def user_page(request):
    payInfo = Payment.objects.all()
    addresInfo = ContactInfo.objects.all()
    userPay = payInfo.filter(user=request.user)
    userName = request.user.username
    userAddress = addresInfo.filter(user=request.user)
    return render(request, 'login/user.html', {'payment': userPay, 'address': userAddress, 'userName': userName})

# def addAddress(request):
#     if request.method == 'POST':
#         user = request.user.username
#         firstName = request.POST.get('fname', '')
#         lastName = request.POST.get('lname', '')
#         fullName = str(firstName) + ' ' + str(lastName)
#         address = request.POST.get('address', '')
#         city = request.POST.get('city', '')
#         state = request.POST.get('state', '')
#         zip = request.POST.get('zip', '')
#         newAddress = ContactInfo(user=user, name=fullName, address=address, city=city, state=state, zip=zip)
#         newAddress.save()
#
#     return render(request, 'store/front_page.html')

def addTest(request):
    if request.method == 'POST':
        # user = request.user.username
        test = 'maybe'
        addedTest = Test(testing=test,)
        addedTest.save()

    return render(request, 'login/user.html')







