# Generated by Django 4.2.4 on 2023-09-05 20:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('medical', '0002_category_dis'),
        ('questions', '0006_remove_answer_user_answer_med'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='question',
            name='category',
        ),
        migrations.AddField(
            model_name='question',
            name='category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='questions', to='medical.category'),
        ),
    ]