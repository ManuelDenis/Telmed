# Generated by Django 4.2.4 on 2023-08-29 10:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('medical', '0002_category_dis'),
        ('users', '0003_profilemed_name_alter_profilemed_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profilemed',
            name='category',
            field=models.ManyToManyField(blank=True, null=True, related_name='profiles', to='medical.category'),
        ),
    ]
