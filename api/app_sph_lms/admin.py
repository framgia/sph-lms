from app_sph_lms.models import (Category, CompletedLesson, Course,
                                CourseCategory, LearningPath,
                                LearningPathCourse, Lesson, User)
from django.contrib import admin

# Register your models here.
admin.site.register(
    [
        User,
        Course,
        Category,
        CourseCategory,
        Lesson,
        LearningPath,
        LearningPathCourse,
        CompletedLesson
    ]
)
