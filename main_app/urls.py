from django.urls import path, include
from django.contrib import admin
from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('', views.index, name='index'),
    path('store/', views.store, name='store'),
    path('order/', views.order, name='order'),
    path('contacts/', views.contacts, name='contacts'),
    path('account/', views.account, name='account'),
    path('admin/', admin.site.urls),
    path('accounts/', include('django.contrib.auth.urls')),
    path('register/', views.register, name='register'),
    path('sign-out/', views.sign_out, name='sign_out'),
    path('add-bank-card/', views.add_bank_card, name='add_bank_card'),
    path('delete-bank-card/<int:card_id>/',
         views.delete_bank_card, name='delete_bank_card'),
]
