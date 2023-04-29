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


class DeliveryLocation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    delivery_address = models.CharField(max_length=255)

    def __str__(self):
        return self.address


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    film_type = models.CharField(max_length=50, choices=[
                                 ("35mm", "35mm"), ("120mm", "120mm")])
    scan_size = models.CharField(max_length=50, choices=[
                                 ("L", "L"), ("XL", "XL"), ("XXL", "XXL")])
    print_type = models.CharField(max_length=50, choices=[
                                  ("color", "color"), ("bw", "bw")])
    slide_film_processing = models.BooleanField(default=False, blank=True)
    do_not_cut_negatives = models.BooleanField(default=False, blank=True)
    cross_processing = models.BooleanField(default=False, blank=True)
    push_pull = models.CharField(max_length=50, choices=[(
        "Push", "Push"), ("Pull", "Pull"), ("", "None")], default="", blank=True)

    print_size = models.CharField(max_length=50, choices=[
        ("9x13", "9x13"),
        ("10x15", "10x15"),
        ("13х13", "13х13"),
        ("13х18", "13х18"),
        ("13х30", "13х30"),
        ("15х15", "15х15"),
        ("15х21", "15х21"),
        ("15х30", "15х30"),
        ("20х20", "20х20"),
        ("20х30", "20х30"),
    ])
    paper_type = models.CharField(max_length=50, choices=[
                                  ("glossy", "glossy"), ("matte", "matte")])
    border_style = models.CharField(max_length=50, choices=[(
        "noBorders", "noBorders"), ("whiteBorders", "whiteBorders")])
    number_of_copies = models.PositiveIntegerField(default=1)
    film_count = models.PositiveIntegerField(default=1)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Order #{self.pk} by {self.user.username}"
