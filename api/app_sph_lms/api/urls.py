from app_sph_lms.api.view.auth_view import (GoogleLoginView)
from app_sph_lms.api.view.category_view import CategoryDetail, CategoryList
from app_sph_lms.api.view.class_view import ClassList
from app_sph_lms.api.view.course_view import (CourseCategoryDetail,
                                              CourseCategoryList, CourseDetail,
                                              CourseList)
from app_sph_lms.api.view.learning_path_view import (LearningPathDetail,
                                                     LearningPathList)
from app_sph_lms.api.view.trainee_view import (CourseTraineeViewSet,
                                               LearningPathTraineeViewSet, TrainerTraineeList)
from app_sph_lms.api.view.trainer_view import TrainerCoursesList, TrainerLearningPathList
from app_sph_lms.api.view.user_view import (CompanyUsersViewSet, TraineeList,
                                            UserDetail)
from django.urls import path

urlpatterns = [
    path(
        'auth/google/',
        GoogleLoginView.as_view(),
        name='google'
    ),
    path(
        'user/<int:company_id>',
        CompanyUsersViewSet.as_view(),
        name='user-company'
    ),
    path(
        'user/<int:company_id>/<int:pk>',
        UserDetail.as_view(),
        name="user-list"
    ),
    path(
        'user/trainee',
        TraineeList.as_view(),
        name="user-list"
    ),

    path(
        'course/',
        CourseList.as_view(),
        name="course-list"
    ),
    path(
        'course/<int:pk>',
        CourseDetail.as_view(),
        name="course-detail"
    ),
    path(
        'course/<int:pk>/trainee',
        CourseTraineeViewSet.as_view(),
        name="course-trainee"
    ),

    path(
        'course-category/',
        CourseCategoryList.as_view(),
        name="course-category-list"
    ),
    path(
        'course-category/<int:pk>',
        CourseCategoryDetail.as_view(),
        name="course-category-detail"
    ),

    path(
        'category/',
        CategoryList.as_view(),
        name="category-list"
    ),
    path(
        'category/<int:pk>',
        CategoryDetail.as_view(),
        name="category-detail"
    ),
    path(
        'classes/<int:company_id>',
        ClassList.as_view(),
        name="classes"
    ),
    path(
        'learning-path/',
        LearningPathList.as_view(),
        name="learning-path-list"
    ),
    path(
        'learning-path/<int:pk>/trainee',
        LearningPathTraineeViewSet.as_view(),
        name="learning-path-trainee"
    ),
    path(
        'learning-paths/<int:pk>',
        LearningPathDetail.as_view(),
        name="learning-path-detail"
    ),
    path(
        'trainer/trainees',
        TrainerTraineeList.as_view(),
        name="trainer-trainee"
    ),
    path(
        'trainer/course',
        TrainerCoursesList.as_view(),
        name="learning-path-detail"
    ),
    path(
        'trainer/learning-path',
        TrainerLearningPathList.as_view(),
        name="trainer-learning-path-list"
    )
]
