# Generated by Django 5.1.1 on 2024-10-26 16:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('activity', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='activity',
            name='title',
            field=models.CharField(max_length=255, primary_key=True, serialize=False, unique=True),
        ),
    ]