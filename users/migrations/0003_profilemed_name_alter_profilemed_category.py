# Generated by Django 4.2.4 on 2023-08-27 18:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('medical', '0002_category_dis'),
        ('users', '0002_profilemed'),
    ]

    operations = [
        migrations.AddField(
            model_name='profilemed',
            name='name',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='profilemed',
            name='category',
            field=models.ManyToManyField(related_name='profiles', to='medical.category'),
        ),
    ]