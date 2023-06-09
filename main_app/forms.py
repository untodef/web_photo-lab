from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import UserProfile, BankCard
from django.contrib.auth.forms import PasswordChangeForm
from .models import DeliveryLocation
from .models import Order


class CustomPasswordChangeForm(PasswordChangeForm):
    pass


class UserEditForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email')


class UserProfileForm(UserCreationForm):
    phone_number = forms.CharField(max_length=15, required=False)

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email',
                  'password1', 'password2', 'phone_number')

    def save(self, commit=True):
        user = super().save(commit=False)
        if commit:
            user.save()
        user_profile = UserProfile(
            user=user, phone_number=self.cleaned_data['phone_number'])
        user_profile.save()
        return user


class UserProfileEditForm(forms.ModelForm):
    phone_number = forms.CharField(required=False)

    class Meta:
        model = UserProfile
        fields = ('phone_number',)


class BankCardForm(forms.ModelForm):
    class Meta:
        model = BankCard
        fields = ['card_number']


class DeliveryLocationForm(forms.ModelForm):
    class Meta:
        model = DeliveryLocation
        fields = ['delivery_address']


class OrderForm(forms.ModelForm):
    class Meta:
        model = Order
        fields = [
            'film_type',
            'scan_size',
            'print_type',
            'slide_film_processing',
            'do_not_cut_negatives',
            'cross_processing',
            'push_pull',
            'print_size',
            'paper_type',
            'border_style',
            'number_of_copies',
            'film_count',
            'total_price',
        ]
  # обновите это
