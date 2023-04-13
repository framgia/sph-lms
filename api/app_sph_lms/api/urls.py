from django.urls import path, include
from app_sph_lms.api.views import (
    ClassList,
    CourseList, 
    CourseDetail, 
    CourseCategoryList, 
    CourseCategoryDetail,
    get_auth_user,
    SignOutView,
    AuthToken,
    UserDetail,
    CompanyUsersViewSet
)

urlpatterns = [
    path('user/<int:company_id>', CompanyUsersViewSet.as_view(), name='user-company'),
    path('user/<int:company_id>/<int:pk>', UserDetail.as_view(), name="user-list"),
    
    path('course/', CourseList.as_view(), name="course-list"),
    path('course/<int:pk>', CourseDetail.as_view(), name="course-detail"),
    path('course-category/', CourseCategoryList.as_view(), name="course-category-list"),
    path('course-category/<int:pk>', CourseCategoryDetail.as_view(), name="course-category-detail"),
    
    path('auth/sign-in', AuthToken.as_view(), name="login"),
    path('auth/user', get_auth_user, name="auth-user-api-health-check"),
    path('auth/sign-out', SignOutView.as_view(), name="signout"),
    
    path('classes/<int:company_id>', ClassList.as_view(), name="classes")
]
