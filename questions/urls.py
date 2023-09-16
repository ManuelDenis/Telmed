from django.urls import path
from users.views import Front

urlpatterns = [
    path('Question/', Front.as_view()),
    path('QuestionCreate/', Front.as_view()),
]