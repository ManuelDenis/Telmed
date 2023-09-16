from django.urls import path
from users.views import Front

urlpatterns = [
    path("Category/", Front.as_view()),
]