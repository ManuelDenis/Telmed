from django.contrib.auth import login, get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.shortcuts import redirect, render
from django.urls import reverse
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.views import View
from django.views.generic import TemplateView
from knox.auth import TokenAuthentication
from rest_framework import generics, permissions, status, viewsets
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from djknox import settings
from users.models import CustomUser, ProfileMed, DoctorVote
from users.serializers import UserSerializer, AuthSerializer, ProfileMedSerializer, DoctorVoteSerializer, \
    ProfileMedSerializer2
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from users.token import account_activation_token
from rest_framework.exceptions import PermissionDenied

User = get_user_model()


class Front(TemplateView):
    template_name = 'index.html'


class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer

    def send_registration_email(self, email, token):
        from_email = settings.EMAIL_HOST_USER
        user = CustomUser.objects.get(email=email)
        to_email = email
        subject = "Telemd - Welcome to our platform"
        message = "Thank you for registering on our platform!"

        # Create the HTML content of the email with a clickable link
        activation_link = f"https://www.telmed.pro/activate/{user.id}/{token}"
        html_message = f"""
        <html>
        <body>
            <p>{message}</p>
            <p>To activate your account, click the following link:</p>
            <a href="{activation_link}">{activation_link}</a>
        </body>
        </html>
        """

        smtp_server = settings.EMAIL_HOST
        smtp_port = settings.EMAIL_PORT
        smtp_username = settings.DEFAULT_FROM_EMAIL
        smtp_password = settings.EMAIL_HOST_PASSWORD

        msg = MIMEMultipart()
        msg["From"] = from_email
        msg["To"] = to_email
        msg["Subject"] = subject

        # Attach the HTML message
        msg.attach(MIMEText(html_message, "html"))

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


class CheckEmailExistsView(APIView):
    def send_reset_password_email(self, email, token):
        from_email = settings.EMAIL_HOST_USER
        user = CustomUser.objects.get(email=email)
        to_email = email
        subject = "Password reset"
        message = "Hello, you request a password reset link"
        message += f"\n\nTo reset password, click the following link:\n"
        activation_link = f"https://www.telmed.pro/Reset-password/{user.id}/{token}"
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

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')

        try:
            user = User.objects.get(email=email)
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            self.send_reset_password_email(email, token)
            return Response({'detail': f'A reset password link has been sent to {email}. Check your email to reset your password.'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'detail': 'Email does not exist. Check if email is correct or register for a new account.'}, status=status.HTTP_404_NOT_FOUND)


class ResetPasswordView(APIView):
    def post(self, request, user_id, token, *args, **kwargs):
        new_password = request.data.get('new_password')

        try:
            user = User.objects.get(pk=user_id)
            if default_token_generator.check_token(user, token):
                user.set_password(new_password)
                user.save()
                return Response({'detail': 'Password reset successfully'}, status=status.HTTP_200_OK)
            else:
                return Response({'detail': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({'detail': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)


class ProfileMedViewSet(viewsets.ModelViewSet):
    queryset = ProfileMed.objects.all()
    serializer_class = ProfileMedSerializer


class CreateProfileMedViewSet(viewsets.ModelViewSet):
    queryset = ProfileMed.objects.all()
    serializer_class = ProfileMedSerializer2
    permission_classes = [IsAuthenticated]
    http_method_names = ['post', ]

    def perform_create(self, serializer):
        userinfo = CustomUser.objects.get(email=self.request.user.email)
        serializer.validated_data['user'] = userinfo
        serializer.save()


class ProfileUpdate(viewsets.ModelViewSet):
    queryset = ProfileMed.objects.all()
    serializer_class = ProfileMedSerializer2
    permission_classes = [IsAuthenticated]
    http_method_names = ['patch', ]

    def perform_update(self, serializer):
        userinfo = CustomUser.objects.get(email=self.request.user.email)
        serializer.validated_data['user'] = userinfo
        serializer.save()


class Profile(viewsets.ModelViewSet):
    queryset = ProfileMed.objects.all()
    serializer_class = ProfileMedSerializer
    permission_classes = [IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        userinfo = CustomUser.objects.get(email=self.request.user.email)
        instance = ProfileMed.objects.get(user=userinfo)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
