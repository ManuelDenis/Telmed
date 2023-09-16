# Generated by Django 4.2.4 on 2023-09-05 15:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0016_commentprofilemed_name'),
        ('questions', '0005_remove_question_category_alter_question_user_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='answer',
            name='user',
        ),
        migrations.AddField(
            model_name='answer',
            name='med',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='users.profilemed'),
        ),
    ]
