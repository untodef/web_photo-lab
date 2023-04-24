from django.contrib import messages
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.contrib.auth import logout
from .models import UserProfile
from .forms import UserProfileForm, UserProfileEditForm, CustomPasswordChangeForm, UserEditForm


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
    }

    return render(request, "account.html", context)


def sign_out(request):
    logout(request)
    # Замените 'index' на название URL-адреса вашей домашней страницы
    return redirect('index')
