from app_sph_lms.models import (Category, Class, Company, Course,
                                CourseCategory, CourseTag, CourseTrainee,
                                LearningPath, LearningPathCourse, Lesson,
                                Tag, Trainee, Trainer, User, UserRole)
from django.contrib import admin

# Register your models here.
admin.site.register(
    [
        User,
        Company,
        Course,
        Category,
        CourseCategory,
        Tag,
        CourseTag,
        Class,
        UserRole,
        Trainer,
        Trainee,
        Lesson,
        CourseTrainee,
        LearningPath,
        LearningPathCourse,
    ]
)
