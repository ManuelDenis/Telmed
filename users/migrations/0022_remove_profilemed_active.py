# Generated by Django 4.2.4 on 2023-10-27 15:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0021_remove_profilemed_image_cert'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profilemed',
            name='active',
        ),
    ]