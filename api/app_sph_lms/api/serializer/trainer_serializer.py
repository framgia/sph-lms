from app_sph_lms.models import Course, LearningPath, User
from rest_framework import serializers


class TrainerTraineeSerializer(serializers.ModelSerializer):
    progress = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'id',
            'first_name',
            'last_name',
            'email',
            'image',
            'progress'
            ]

    def get_progress(self, obj):
        last_course = obj.enrolled_course.last()
        if last_course:
            total_lessons = last_course.lessons.count()
            completed_lessons = obj.trainee.filter(
                    lesson__course=last_course
                ).count()
            if total_lessons > 0:
                progress_percentage = int(
                        (completed_lessons / total_lessons) * 100
                    )
            else:
                progress_percentage = 0
            progress = {
                'name': last_course.name,
                'percentage': progress_percentage
            }
            return progress
        return None


class TrainerCourseSerializer(serializers.ModelSerializer):
    lesson_count = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ("id", "name", "lesson_count")

    def get_lesson_count(self, obj):
        return obj.lessons.count()


class TrainerLearningPathSerializer(serializers.ModelSerializer):
    course_count = serializers.SerializerMethodField()

    class Meta:
        model = LearningPath
        fields = ["id", "name", "course_count"]

    def get_course_count(self, instance):
        return instance.courses.all().count()
