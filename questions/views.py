from django.core.exceptions import ObjectDoesNotExist
from django.core.mail import send_mail
from django.http import HttpResponse
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from djknox import settings
from questions.models import Question, Answer, AnswerVote
from questions.serializers import QuestionSerializer, AnswerSerializer, AnswerVoteSerializer
from users.models import CustomUser, ProfileMed


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [AllowAny]


class QuestionMedViewSet(viewsets.ModelViewSet):
    serializer_class = QuestionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        userinfo = CustomUser.objects.get(email=self.request.user.email)
        try:
            med = ProfileMed.objects.get(user=userinfo)
            categories_med_list = med.category.all()
            questions = Question.objects.filter(category__in=categories_med_list).distinct()
            return questions.order_by('-added')
        except ProfileMed.DoesNotExist:
            return Question.objects.none()


class QuestionUserViewSet(viewsets.ModelViewSet):
    serializer_class = QuestionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        userinfo = CustomUser.objects.get(email=self.request.user.email)
        try:
            questions = Question.objects.filter(user=userinfo)
            return questions.order_by('-added')
        except ProfileMed.DoesNotExist:
            return Question.objects.none()


class CreateQuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ['post', ]

    def perform_create(self, serializer):
        userinfo = CustomUser.objects.get(email=self.request.user.email)
        serializer.validated_data['user'] = userinfo
        serializer.save()


class CreateAnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ['post', ]

    def perform_create(self, serializer):
        userinfo = CustomUser.objects.get(email=self.request.user.email)
        med = ProfileMed.objects.get(user=userinfo)
        serializer.validated_data['med'] = med
        serializer.save()

        question = serializer.validated_data['question']

        try:
            question_user = question.user
        except ObjectDoesNotExist:
            question_user = None

        if question_user and question_user.email:
            subject = "Echipa Telmed. Ați primit un răspuns la întrebarea dvs."
            message = f"Buna ziua!\nAți primit un răspuns la întrebarea dvs. " \
                      f"pe platforma noastră.\n" \
                      f"Ati intrebat:\n{question.text}\n" \
                      f"Raspunsul il puteti vizualiza accesand aplicatia noastra telmed.pro."
            from_email = settings.DEFAULT_FROM_EMAIL
            recipient_list = [question_user.email]

            send_mail(subject, message, from_email, recipient_list)


class AnswerVoteCreateView(viewsets.ModelViewSet):
    queryset = AnswerVote.objects.all()
    serializer_class = AnswerVoteSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ['post', 'get']

    def perform_create(self, serializer):
        user = CustomUser.objects.get(email=self.request.user.email)
        answer_id = self.request.data.get('answer')
        rating = self.request.data.get('vote')

        serializer.validated_data['user'] = user
        serializer.validated_data['answer'] = Answer.objects.get(id=answer_id)
        serializer.validated_data['vote'] = rating
        serializer.save()

