from rest_framework import serializers
from users.serializers import ProfileMedSerializer
from .models import Category
from questions.serializers import QuestionSerializer


class CategorySerializer(serializers.ModelSerializer):
    profiles = ProfileMedSerializer(many=True, read_only=True)
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'dis', 'profiles', 'questions']
