# Generated by Django 4.2.4 on 2023-09-04 05:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('questions', '0003_alter_answer_question_alter_comment_answer_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='name',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]