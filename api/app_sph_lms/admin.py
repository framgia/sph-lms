from django.contrib import admin
from app_sph_lms.models import (Company, 
                                Course, 
                                Category, 
                                CourseCategory,
                                Tag,
                                CourseTag,
                                Class,
                                User,
                                UserRole,
                                Status,
                                Trainee,
                                Trainer,
                                Material
                                ) 

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
admin.site.register(Material)

