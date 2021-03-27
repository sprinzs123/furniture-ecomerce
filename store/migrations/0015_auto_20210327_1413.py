# Generated by Django 3.1.7 on 2021-03-27 14:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0014_address_user'),
    ]

    operations = [
        migrations.RenameField(
            model_name='address',
            old_name='name',
            new_name='first_name',
        ),
        migrations.AddField(
            model_name='address',
            name='last_name',
            field=models.CharField(default='name', max_length=200),
            preserve_default=False,
        ),
    ]
