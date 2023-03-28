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
    class Meta:
        verbose_name = "UserRole"
        verbose_name_plural = "User Roles"
        db_table = '"app_sph_lms_user_roles"'
    def __str__(self):
        return str(self.title)
    
class Status(models.Model):
    name = models.CharField(max_length=255, unique=True)
    class Meta:
        verbose_name = "Status"
        verbose_name_plural = "Statuses"
        db_table = '"app_sph_lms_statuses"'
    def __str__(self):
        return str(self.name)

class User(AbstractUser):
    email = models.EmailField(unique=True, null=False, db_index=True)
    role = models.OneToOneField(UserRole, on_delete=models.CASCADE)
    status =  models.ForeignKey(Status, on_delete=models.CASCADE, default=1)
    img_path = models.CharField(max_length=255, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
        db_table = '"app_sph_lms_users"'
    def __str__(self):
        return str(self.email)

class Company(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
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
    class Meta: 
        verbose_name = "Company"
        verbose_name_plural = "Companies"
        db_table = '"app_sph_lms_companies"'
    def __str__(self):
        return str(self.name)

class Category(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    class Meta: 
        verbose_name = "Category"
        verbose_name_plural = "Categories"
        db_table = '"app_sph_lms_categories"'
    def __str__(self):
        return str(self.name)    
    
class Course(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    code = models.CharField(max_length=10, unique=True, default=generate_code)
    name = models.CharField(max_length=255)
    description = models.TextField(max_length=65000, null=True)
    status = models.ForeignKey(Status, on_delete=models.CASCADE, default=1)
    img_path = models.CharField(max_length=255, null=True)
    preview_vid_path = models.CharField(max_length=255, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    class Meta: 
        verbose_name = "Course"
        verbose_name_plural = "Courses"
        db_table = '"app_sph_lms_courses"'
    def __str__(self):
        return str(self.name)   
    
class CourseCategory(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    class Meta:
        unique_together = ('course', 'category')
        verbose_name = "CourseCategory"
        verbose_name_plural = "Course categories"
        db_table = '"app_sph_lms_course_categories"'
    def __str__(self):
        return "Course: " + str(self.course) + " | " + "Category: " + str(self.category)

    
class Tag(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    class Meta: 
        verbose_name = "Tag"
        verbose_name_plural = "Tags"
        db_table = '"app_sph_lms_tags"'
    def __str__(self):
        return str(self.name)

class CourseTag(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    class Meta:
        unique_together = ('course', 'tag')
        verbose_name = "CourseTag"
        verbose_name_plural = "Course Tags"
        db_table = '"app_sph_lms_course_tags"'
    def __str__(self):
        return "Course: " + str(self.course) + " | " + "Tag: " + str(self.tag)
    
class Class(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    code = models.CharField(max_length=10, unique=True, default=generate_code)
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    class Meta:
        verbose_name = "Class"
        verbose_name_plural = "Classes"
        db_table = '"app_sph_lms_classes"'
    def __str__(self):
        return str(self.name)

class Trainer(models.Model):
    class_id = models.ForeignKey(Class, on_delete=models.CASCADE)
    trainer = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.ForeignKey(Status, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        unique_together = ('class_id', 'trainer')
        verbose_name = "Trainer"
        verbose_name_plural = "Trainers"
        db_table = '"app_sph_lms_trainers"'
    def __str__(self):
        return "Class: " + str(self.class_id) + " | " + "Trainer: " + str(self.trainer)
    
class Trainee(models.Model):
    class_id = models.ForeignKey(Class, on_delete=models.CASCADE)
    trainee = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.ForeignKey(Status, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        unique_together = ('class_id', 'trainee')
        verbose_name = "Trainee"
        verbose_name_plural = "Trainees"
        db_table = '"app_sph_lms_trainees"'
    def __str__(self):
        return "Class: " + str(self.class_id) + " | " + "Trainee: " + str(self.trainee)

