# Generated by Django 3.1.7 on 2021-03-25 15:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0012_auto_20210325_1536'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='order_customer',
            new_name='user',
        ),
    ]
