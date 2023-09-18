"""
URL configuration for djknox project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from medical.views import CategoryViewSet
from questions.views import QuestionViewSet, CreateQuestionViewSet, CreateAnswerViewSet, QuestionMedViewSet, \
    QuestionUserViewSet, AnswerVoteCreateView, CreateCommentViewSet
from users.views import ProfileMedViewSet, CreateProfileMedViewSet, Profile, ProfileUpdate

router = DefaultRouter()
router.register(r'category', CategoryViewSet)
router.register(r'question', QuestionViewSet)
router.register(r'profiles', ProfileMedViewSet, 'profile')
router.register(r'profile-med-create', CreateProfileMedViewSet)
router.register(r'profile-med', Profile)
router.register(r'profile-update', ProfileUpdate)
router.register(r'question-create', CreateQuestionViewSet)
router.register(r'answers-create', CreateAnswerViewSet)
router.register(r'comment_create', CreateCommentViewSet)
router.register(r'question-med', QuestionMedViewSet, 'question-med')
router.register(r'question-user', QuestionUserViewSet, 'question-user')
router.register(r'answer-vote-create', AnswerVoteCreateView)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('users.urls')),
    path('medical/', include(router.urls)),
]
