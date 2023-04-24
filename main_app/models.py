from django.contrib.auth.models import User
from django.db import models


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=15, blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} - Профиль"


class BankCard(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    card_number = models.CharField(max_length=19)  # 16 цифр + 3 пробела

    def __str__(self):
        return f"{self.user.username}'s Bank Card: **** **** **** {self.card_number[-4:]}"
