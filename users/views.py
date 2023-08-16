from django.contrib.auth import login, get_user_model
from django.shortcuts import redirect
from django.urls import reverse
from django.views import View
from rest_framework import generics, permissions, status
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from djknox import settings
from users.models import CustomUser
from users.serializers import UserSerializer, AuthSerializer
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from users.token import account_activation_token

User = get_user_model()


class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer

    def send_registration_email(self, email, token):
        from_email = settings.EMAIL_HOST_USER
        user = CustomUser.objects.get(email=email)
        to_email = email
        subject = "Welcome to our platform"
        message = "Thank you for registering on our platform!"
        message += f"\n\nTo activate your account, click the following link:\n"
        activation_link = f"http://127.0.0.1:8000/api/auth/activate/{user.id}/{token}"
        message += activation_link

        smtp_server = settings.EMAIL_HOST
        smtp_port = settings.EMAIL_PORT
        smtp_username = settings.DEFAULT_FROM_EMAIL
        smtp_password = settings.EMAIL_HOST_PASSWORD

        msg = MIMEMultipart()
        msg["From"] = from_email
        msg["To"] = to_email
        msg["Subject"] = subject
        msg.attach(MIMEText(message, "plain"))

        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(smtp_username, smtp_password)
            server.sendmail(from_email, to_email, msg.as_string())

    def perform_create(self, serializer):
        user = serializer.save(is_active=False)
        tokenemail = account_activation_token.make_token(user)
        self.send_registration_email(user.email, tokenemail)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class ActivateUserView(View):
    def get(self, request, *args, **kwargs):
        try:
            user = User.objects.get(pk=kwargs['user_id'])
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and account_activation_token.check_token(user, kwargs['token']):
            user.is_active = True
            user.save()
            return redirect('/Dashboard')
        else:
            return redirect(reverse('activation-failure'))


class LoginView(KnoxLoginView):
    serializer_class = AuthSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        if not user.email:
            return Response({'message': 'Email address not exist, please register!'})
        if not user.is_active:
            return Response({'detail': 'Your account is not active.'}, status=status.HTTP_400_BAD_REQUEST)
        login(request, user)
        return super(LoginView, self).post(request, format=None)


class UserInfoView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        user = self.request.user
        return Response({'email': user.email})
