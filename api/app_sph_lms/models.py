import random
import string

from django.contrib.auth.models import AbstractUser
from django.core.validators import MinLengthValidator
from django.db import models


def generate_code(length=10):
    return ''.join(
            random.choices(
                string.ascii_uppercase + string.digits, k=length
            )
        )


# Create your models here.
class User(AbstractUser):
    first_name = models.CharField(
            max_length=255,
            null=False,
            validators=[MinLengthValidator(2)]
        )
    last_name = models.CharField(
            max_length=255,
            null=False,
            validators=[MinLengthValidator(2)]
        )
    is_active = models.BooleanField(default=1)
    is_trainer = models.BooleanField(default=0)
    email = models.EmailField(
            unique=True,
            null=False,
            db_index=True,
            validators=[MinLengthValidator(5)]
        )
    image = models.CharField(max_length=255, null=True)
    trainer_id = models.ForeignKey(
        'self',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='trainees'
    )
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "User"
        db_table = "app_sph_lms_users"

    def __str__(self):
        return str(self.email)


class Company(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(
            max_length=255,
            validators=[MinLengthValidator(3)]
        )
    email = models.EmailField(
            max_length=255,
            validators=[MinLengthValidator(5)]
        )
    description = models.TextField(
            max_length=65000,
            null=True,
            validators=[MinLengthValidator(5)]
        )
    address = models.CharField(
            max_length=255,
            null=True,
            validators=[MinLengthValidator(5)]
        )
    city = models.CharField(
            max_length=255,
            null=True,
            validators=[MinLengthValidator(5)]
        )
    state = models.CharField(
            max_length=255,
            null=True,
            validators=[MinLengthValidator(5)]
        )
    postal_code = models.CharField(
            max_length=255,
            null=True,
            validators=[MinLengthValidator(5)]
        )
    country = models.CharField(
            max_length=255,
            null=True,
            validators=[MinLengthValidator(5)]
        )
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        verbose_name = "Company"
        verbose_name_plural = "Company"
        db_table = "app_sph_lms_companies"

    def __str__(self):
        return str(self.name)


class Category(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=255, validators=[MinLengthValidator(3)])
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Category"
        db_table = "app_sph_lms_categories"

    def __str__(self):
        return str(self.name)


class Tag(models.Model):
    name = models.CharField(max_length=255, validators=[MinLengthValidator(3)])
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        verbose_name = "Tag"
        verbose_name_plural = "Tag"
        db_table = "app_sph_lms_tags"

    def __str__(self):
        return str(self.name)


class Class(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    code = models.CharField(max_length=10, unique=True, default=generate_code)
    name = models.CharField(max_length=255, validators=[MinLengthValidator(3)])
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        verbose_name = "Class"
        verbose_name_plural = "Class"
        db_table = "app_sph_lms_classes"

    def __str__(self):
        return str(self.name)


class Trainer(models.Model):
    class_id = models.ForeignKey(Class, on_delete=models.CASCADE, null=True)
    trainer = models.ForeignKey(User, on_delete=models.CASCADE)
    company = models.ForeignKey(
            Company,
            on_delete=models.CASCADE,
            related_name="trainer"
        )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('class_id', 'trainer')
        verbose_name = "Trainer"
        verbose_name_plural = "Trainer"
        db_table = "app_sph_lms_trainers"

    def __str__(self):
        return (
            "Company: " +
            str(self.company) +
            " | " +
            "Trainer: " +
            str(self.trainer) +
            " | " +
            "Class: " +
            str(self.class_id)
        )


class Trainee(models.Model):
    class_id = models.ForeignKey(
            Class,
            on_delete=models.CASCADE,
            null=True
        )
    trainee = models.ForeignKey(
            User,
            on_delete=models.CASCADE,
            related_name="user"
        )
    company = models.ForeignKey(
            Company,
            on_delete=models.CASCADE,
            related_name="trainee"
        )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('class_id', 'trainee')
        verbose_name = "Trainee"
        verbose_name_plural = "Trainee"
        db_table = "app_sph_lms_trainees"

    def __str__(self):
        return (
            "Company: " +
            str(self.company) +
            " | " +
            "Trainee: " +
            str(self.trainee) +
            " | " +
            "Class: " +
            str(self.class_id)
        )


class Course(models.Model):
    author = models.ForeignKey(
            User,
            on_delete=models.CASCADE,
            related_name="author",
            null=True,
            blank=True
        )
    category = models.ManyToManyField(
            Category,
            related_name='categories',
            through="CourseCategory"
            )
    name = models.CharField(max_length=255, validators=[MinLengthValidator(3)])
    description = models.TextField(
            max_length=65000,
            null=True,
            validators=[MinLengthValidator(5)]
        )
    is_active = models.BooleanField(default=True)
    image = models.CharField(max_length=255, null=True)
    trainee = models.ManyToManyField(
        User,
        related_name='enrolled_course',
        limit_choices_to={'is_trainer': False},
    )
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        verbose_name = "Course"
        verbose_name_plural = "Course"
        db_table = "app_sph_lms_courses"

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
        verbose_name_plural = "CourseCategory"
        db_table = "app_sph_lms_course_categories"

    def __str__(self):
        return (
            "Course: " +
            str(self.course) +
            " | " +
            "Category: " +
            str(self.category)
        )


class CourseTag(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        unique_together = ('course', 'tag')
        verbose_name = "CourseTag"
        verbose_name_plural = "CourseTag"
        db_table = "app_sph_lms_course_tags"

    def __str__(self):
        return "Course: " + str(self.course) + " | " + "Tag: " + str(self.tag)


class Lesson(models.Model):
    course = models.ForeignKey(
            Course,
            on_delete=models.CASCADE,
            related_name="lessons"
        )
    title = models.CharField(
            max_length=255,
            validators=[MinLengthValidator(3)]
        )
    link = models.URLField(max_length=600)
    description = models.TextField(
            max_length=65000,
            null=True,
            validators=[MinLengthValidator(5)]
        )
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.title


class CourseTrainee(models.Model):
    trainee = models.ForeignKey(
            Trainee, on_delete=models.CASCADE,
            related_name="trainee_detail"
        )
    course = models.ForeignKey(
            Course,
            on_delete=models.CASCADE,
            related_name="course_detail"
        )
    is_active = models.BooleanField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('trainee', 'course')
        verbose_name = "CourseTrainee"
        verbose_name_plural = "CourseTrainees"
        db_table = "app_sph_lms_course_trainees"

    def __str__(self):
        return (
            "Trainee: "
            + str(self.trainee)
            + " | "
            + "Course: "
            + str(self.course)
        )


class LearningPath(models.Model):
    name = models.CharField(
        max_length=255,
        unique=True,
        validators=[MinLengthValidator(3)]
    )
    author = models.ForeignKey(
            User,
            on_delete=models.CASCADE,
            related_name='learning_path'
        )
    description = models.TextField(
            max_length=65000,
            null=True,
            validators=[MinLengthValidator(5)]
        )
    image = models.CharField(max_length=255, null=True)
    is_active = models.BooleanField(default=True)
    courses = models.ManyToManyField(
        Course,
        related_name="learning_path",
        through='LearningPathCourse'
        )
    category = models.ManyToManyField(Category, related_name="category")
    trainee = models.ManyToManyField(
            User,
            related_name='enrolled_learning_paths',
            limit_choices_to={'is_trainer': False},
        )
    created_at = models.DateTimeField(auto_now=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        verbose_name = "LearningPath"
        verbose_name_plural = "LearningPaths"
        db_table = "app_sph_lms_learning_paths"

    def __str__(self):
        return self.name


class LearningPathCourse(models.Model):
    learning_path = models.ForeignKey(
        LearningPath,
        on_delete=models.CASCADE,
        related_name='learning_path_course'
        )
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name='learning_path_course'
        )
    course_order = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        unique_together = ('learning_path', 'course')
        verbose_name = "LearningPathCourse"
        verbose_name_plural = "LearningPathCourse"
        db_table = "app_sph_lms_learning_path_courses"

    def __str__(self):
        return (
            "Learning Path: " +
            str(self.learning_path) +
            " | " +
            "Course: " +
            str(self.course)
        )
