# Generated by Django 2.2.7 on 2020-08-14 01:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0002_auto_20191208_1631'),
    ]

    operations = [
        migrations.AlterField(
            model_name='featured',
            name='picture',
            field=models.CharField(max_length=300),
        ),
        migrations.AlterField(
            model_name='product',
            name='picture',
            field=models.CharField(max_length=300),
        ),
    ]