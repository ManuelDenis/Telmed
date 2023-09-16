from django.urls import path
from knox import views as knox_views
from users.views import CreateUserView, LoginView, ActivateUserView, UserInfoView, CheckEmailExistsView, \
    ResetPasswordView, Front

urlpatterns = [
    path("Register/", Front.as_view()),
    path("Dashboard/", Front.as_view()),
    path("ProfileMed/", Front.as_view()),
    path("ProfileMedList/", Front.as_view()),
    path("ProfileMedRegister/", Front.as_view()),
    path("ProfileMedUpdate/", Front.as_view()),
    path("Login/", Front.as_view()),
    path("ConfirmationSent/", Front.as_view()),
    path("PasswordReset/", Front.as_view()),
    path('Reset-password/<int:user_id>/<str:token>/', Front.as_view(), name='reset-password'),
    path('PasswordResetConfirmation/', Front.as_view()),
    path('PasswordResetLinkConfirmation/', Front.as_view()),
    path("", Front.as_view(), name='index'),

    path("create/", CreateUserView.as_view(), name="create"),
    path('user_info/', UserInfoView.as_view(), name='user_info'),
    path('login/', LoginView.as_view(), name='knox_login'),
    path('logout/', knox_views.LogoutView.as_view(), name="knox-logout"),
    path('logoutall/', knox_views.LogoutAllView.as_view(), name='knox_logoutall'),
    path('activate/<int:user_id>/<str:token>/', ActivateUserView.as_view(), name='activate-user'),
    path('reset-password/email/', CheckEmailExistsView.as_view(), name='reset-password-email'),
    path('reset-password/<int:user_id>/<str:token>/', ResetPasswordView.as_view(), name='reset-password'),
]
