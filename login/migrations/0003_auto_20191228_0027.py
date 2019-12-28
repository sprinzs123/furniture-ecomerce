# Generated by Django 2.2.7 on 2019-12-28 00:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0002_auto_20191228_0018'),
    ]

    operations = [
        migrations.AddField(
            model_name='payment',
            name='cardNum',
            field=models.IntegerField(default='0000000'),
        ),
        migrations.AddField(
            model_name='payment',
            name='exMonth',
            field=models.IntegerField(default='0000000'),
        ),
        migrations.AddField(
            model_name='payment',
            name='exYear',
            field=models.IntegerField(default='0000000'),
        ),
        migrations.AddField(
            model_name='payment',
            name='security',
            field=models.IntegerField(default='0000000'),
        ),
        migrations.AlterField(
            model_name='test',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]