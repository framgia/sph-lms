# Generated by Django 4.1.7 on 2023-06-14 10:15

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app_sph_lms', '0002_alter_learningpathcourse_course_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='img_path',
            new_name='image',
        ),
        migrations.RemoveField(
            model_name='user',
            name='role',
        ),
        migrations.AddField(
            model_name='user',
            name='is_trainer',
            field=models.BooleanField(default=0),
        ),
        migrations.AddField(
            model_name='user',
            name='trainer_id',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='trainees', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='learningpath',
            name='trainee',
            field=models.ManyToManyField(limit_choices_to={'is_trainer': False}, related_name='enrolled_learning_paths', to=settings.AUTH_USER_MODEL),
        ),
        migrations.DeleteModel(
            name='UserRole',
        ),
    ]
