# Generated by Django 4.2 on 2023-04-29 17:58

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("main_app", "0017_rename_scanning_order_cross_processing_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="order",
            name="cross_processing",
            field=models.BooleanField(blank=True, default=False),
        ),
        migrations.AlterField(
            model_name="order",
            name="do_not_cut_negatives",
            field=models.BooleanField(blank=True, default=False),
        ),
        migrations.AlterField(
            model_name="order",
            name="push_pull",
            field=models.CharField(
                blank=True,
                choices=[("Push", "Push"), ("Pull", "Pull"), ("", "None")],
                default="",
                max_length=50,
            ),
        ),
        migrations.AlterField(
            model_name="order",
            name="slide_film_processing",
            field=models.BooleanField(blank=True, default=False),
        ),
    ]
