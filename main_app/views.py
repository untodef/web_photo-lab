from django.contrib import messages
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.contrib.auth import logout
from .models import UserProfile
from .forms import UserProfileForm, UserProfileEditForm, CustomPasswordChangeForm, UserEditForm, BankCardForm
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.urls import reverse
from .models import BankCard
from .forms import DeliveryLocationForm
from .models import DeliveryLocation


def index(request):
    return render(request, 'index.html')


def store(request):
    return render(request, 'store.html')


def order(request):
    return render(request, 'order.html')


def contacts(request):
    return render(request, 'contacts.html')


def register(request):
    if request.method == 'POST':
        form = UserProfileForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)  # добавьте это, чтобы войти после регистрации
            return redirect('home')
    else:
        form = UserProfileForm()
    return render(request, 'registration/register.html', {'form': form})


@login_required
def account(request):
    user = request.user
    user_profile, created = UserProfile.objects.get_or_create(user=user)
    bank_card_form = BankCardForm()
    bank_cards = BankCard.objects.filter(user=request.user)
    delivery_location_form = DeliveryLocationForm()
    delivery_locations = DeliveryLocation.objects.filter(user=request.user)
    if created:
        user_profile.save()
    user_profile = request.user.userprofile
    if request.method == "POST":
        user_edit_form = UserEditForm(request.POST, instance=request.user)
        profile_edit_form = UserProfileEditForm(
            request.POST, instance=user_profile)
        password_form = CustomPasswordChangeForm(request.user, request.POST)

        if user_edit_form.is_valid() and profile_edit_form.is_valid():
            user_edit_form.save()
            profile_edit_form.save()
            messages.success(request, "Изменения сохранены")
            return redirect("account")

        if password_form.is_valid():
            password_form.save()
            messages.success(request, "Пароль изменен")
            return redirect("account")

    else:
        user_edit_form = UserEditForm(instance=request.user)
        profile_edit_form = UserProfileEditForm(instance=user_profile)
        password_form = CustomPasswordChangeForm(request.user)

    context = {
        "user_edit_form": user_edit_form,
        "profile_edit_form": profile_edit_form,
        "password_form": password_form,
        "bank_card_form": bank_card_form,
        "bank_cards": bank_cards,
        'delivery_location_form': delivery_location_form,
        'delivery_locations': delivery_locations,
    }

    return render(request, "account.html", context)


def sign_out(request):
    logout(request)
    # Замените 'index' на название URL-адреса вашей домашней страницы
    return redirect('index')


@login_required
@csrf_exempt
def add_bank_card(request):
    if request.method == 'POST':
        form = BankCardForm(request.POST)
        if form.is_valid():
            bank_card = form.save(commit=False)
            bank_card.user = request.user
            bank_card.save()
            return HttpResponseRedirect(reverse('account'))
        else:
            return JsonResponse({'status': 'error', 'errors': form.errors})
    else:
        return JsonResponse({'status': 'error', 'errors': 'Invalid request'})


@login_required
def delete_bank_card(request, card_id):
    bank_card = BankCard.objects.get(id=card_id, user=request.user)
    bank_card.delete()
    return JsonResponse({'status': 'success'})


@login_required
@csrf_exempt
def add_delivery_location(request):
    if request.method == "POST":
        form = DeliveryLocationForm(request.POST)
        # В представлении добавления адреса доставки
        if form.is_valid():
            delivery_location = form.save(commit=False)
            delivery_location.user = request.user
            delivery_location.save()
            return JsonResponse({"status": "success", "delivery_address": delivery_location.delivery_address})
        else:
            return JsonResponse({'status': 'error', 'errors': form.errors})
    else:
        return JsonResponse({'status': 'error', 'errors': 'Invalid request'})


@login_required
@csrf_exempt
def delete_delivery_location(request, location_id):
    try:
        delivery_location = DeliveryLocation.objects.get(
            id=location_id, user=request.user)
        delivery_location.delete()
        return JsonResponse({"status": "success"})
    except DeliveryLocation.DoesNotExist:
        return JsonResponse({"status": "error", "message": "Адрес доставки не найден"})
