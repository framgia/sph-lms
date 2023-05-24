from app_sph_lms.models import (Category, Class, Company, Course,
                                CourseCategory, CourseTag, CourseTrainee,
                                Lesson, Status, Tag, Trainee, Trainer, User,
                                UserRole)
from django.contrib import admin

# Register your models here.
admin.site.register(User)
admin.site.register(Company)
admin.site.register(Course)
admin.site.register(Category)
admin.site.register(CourseCategory)
admin.site.register(Tag)
admin.site.register(CourseTag)
admin.site.register(Class)
admin.site.register(UserRole)
admin.site.register(Status)
admin.site.register(Trainer)
admin.site.register(Trainee)
admin.site.register(Lesson)
admin.site.register(CourseTrainee)
