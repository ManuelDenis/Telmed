# Generated by Django 4.2.4 on 2023-10-26 08:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0020_profilemed_image_cert'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profilemed',
            name='image_cert',
        ),
    ]
