from django.contrib.auth.models import AbstractUser
from django.core.validators import MinLengthValidator
from django.db import models


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
    image = models.ImageField(null=True)
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
    image = models.ImageField(null=True)
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


class CompletedLesson(models.Model):
    trainee = models.ForeignKey(
            User,
            on_delete=models.CASCADE,
            related_name="trainee",
            limit_choices_to={'is_trainer': False},
        )
    lesson = models.ForeignKey(
            Lesson,
            on_delete=models.CASCADE,
            related_name="lesson"
        )
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        unique_together = ('trainee', 'lesson')
        verbose_name = "CompletedLesson"
        verbose_name_plural = "CompletedLessons"
        db_table = "app_sph_lms_completed_lessons"

    def __str__(self):
        return (
            "Trainee: "
            + str(self.trainee)
            + " | "
            + "Lesson: "
            + str(self.lesson)
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
    image = models.ImageField(null=True)
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
