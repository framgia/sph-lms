# Generated by Django 4.1.7 on 2023-04-26 09:22

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app_sph_lms', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='MaterialCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, validators=[django.core.validators.MinLengthValidator(5)])),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('updated_at', models.DateTimeField(auto_now=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Material',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, validators=[django.core.validators.MinLengthValidator(5)])),
                ('link', models.CharField(max_length=255, validators=[django.core.validators.MinLengthValidator(5)])),
                ('type', models.CharField(max_length=255, validators=[django.core.validators.MinLengthValidator(5)])),
                ('description', models.TextField(max_length=65000, validators=[django.core.validators.MinLengthValidator(5)])),
                ('directory', models.BigIntegerField(default=0)),
                ('is_active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('updated_at', models.DateTimeField(auto_now=True, null=True)),
                ('material_categories_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app_sph_lms.materialcategory')),
            ],
        ),
        migrations.CreateModel(
            name='CompanyMaterial',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='companymaterials', to='app_sph_lms.company')),
                ('material', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='material', to='app_sph_lms.material')),
            ],
        ),
    ]