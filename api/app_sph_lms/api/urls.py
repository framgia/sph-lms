from django.urls import path, include
from app_sph_lms.api.views import (
    CourseList, 
    CourseDetail, 
    CourseCategoryList, 
    CourseCategoryDetail,
    get_auth_user,
    SignOutView,
    AuthToken,
    UserList,
)

urlpatterns = [
    path('course/', CourseList.as_view(), name="course-list"),
    path('course/<int:pk>', CourseDetail.as_view(), name="course-detail"),
    path('course-category/', CourseCategoryList.as_view(), name="course-category-list"),
    path('course-category/<int:pk>', CourseCategoryDetail.as_view(), name="course-category-detail"),
    
    path('auth/sign-in', AuthToken.as_view(), name="login"),
    path('auth/user', get_auth_user, name="auth-user-api-health-check"),
    path('auth/sign-out', SignOutView.as_view(), name="signout"),

    path('users/<int:pk>', UserList.as_view(), name="user-detail"),
]
