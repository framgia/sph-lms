from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class CourseCategory(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    def __str__(self):
        return str(self.name)

class Course(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    course_category = models.ForeignKey(CourseCategory, on_delete=models.CASCADE, related_name="category_id")
    def __str__(self):
        return str(self.title)
    
