from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import UserManager
import random
import string

def generate_code(length=10):
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))

# Create your models here.
class UserRole(models.Model):
    title = models.CharField(max_length=255, unique=True)
    def __str__(self):
        return str(self.title)
    
class Status(models.Model):
    name = models.CharField(max_length=255, unique=True)
    def __str__(self):
        return str(self.name)

class User(AbstractUser):
    email = models.EmailField(unique=True, null=False, db_index=True)
    role_id = models.OneToOneField(UserRole, on_delete=models.CASCADE)
    status_id =  models.ForeignKey(Status, on_delete=models.CASCADE, default=1)
    img_path = models.CharField(max_length=255, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    def __str__(self):
        return str(self.email)

class Company(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    description = models.TextField(max_length=65000, null=True)
    address = models.CharField(max_length=255, null=True)
    city = models.CharField(max_length=255, null=True)
    state = models.CharField(max_length=255, null=True)
    postal_code = models.CharField(max_length=255, null=True)
    country = models.CharField(max_length=255, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    def __str__(self):
        return str(self.name)

class Category(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    def __str__(self):
        return str(self.name)    
    
class Course(models.Model):
    company_id = models.ForeignKey(Company, on_delete=models.CASCADE)
    code = models.CharField(max_length=10, unique=True, default=generate_code)
    name = models.CharField(max_length=255)
    description = models.TextField(max_length=65000, null=True)
    status_id = models.ForeignKey(Status, on_delete=models.CASCADE, default=1)
    img_path = models.CharField(max_length=255, null=True)
    preview_vid_path = models.CharField(max_length=255, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    def __str__(self):
        return str(self.name)   
    
class CourseCategory(models.Model):
    course_id = models.ForeignKey(Course, on_delete=models.CASCADE)
    category_id = models.ForeignKey(Category, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    class Meta:
        unique_together = ('course_id', 'category_id')
    def __str__(self):
        return "Course: " + str(self.course_id) + " | " + "Category: " + str(self.category_id)

    
class Tag(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    def __str__(self):
        return str(self.name)

class CourseTag(models.Model):
    course_id = models.ForeignKey(Course, on_delete=models.CASCADE)
    tag_id = models.ForeignKey(Tag, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    class Meta:
        unique_together = ('course_id', 'tag_id')
    def __str__(self):
        return "Course: " + str(self.course_id) + " | " + "Tag: " + str(self.tag_id)
    
class Class(models.Model):
    company_id = models.ForeignKey(Company, on_delete=models.CASCADE)
    code = models.CharField(max_length=10, unique=True, default=generate_code)
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    def __str__(self):
        return str(self.name)

class Trainer(models.Model):
    class_id = models.ForeignKey(Class, on_delete=models.CASCADE)
    trainer_id = models.ForeignKey(User, on_delete=models.CASCADE)
    status_id = models.ForeignKey(Status, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        unique_together = ('class_id', 'trainer_id')
    def __str__(self):
        return "Class: " + str(self.class_id) + " | " + "Trainer: " + str(self.trainer_id)
    
class Trainee(models.Model):
    class_id = models.ForeignKey(Class, on_delete=models.CASCADE)
    trainee_id = models.ForeignKey(User, on_delete=models.CASCADE)
    status_id = models.ForeignKey(Status, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        unique_together = ('class_id', 'trainee_id')
    def __str__(self):
        return "Class: " + str(self.class_id) + " | " + "Trainee: " + str(self.trainee_id)

