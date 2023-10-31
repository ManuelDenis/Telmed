from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from medical.models import Category
from .managers import CustomUserManager


class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(_("email address"), unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email


class ProfileMed(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, null=True, blank=True)
    category = models.ManyToManyField(Category, related_name='profiles', null=True, blank=True)
    job_title = models.CharField(max_length=100, null=True, blank=True)
    company = models.CharField(max_length=100, null=True, blank=True)
    rating = models.FloatField(null=True, blank=True)

    def __str__(self):
        return self.user.email


class Article(models.Model):
    title = models.CharField(max_length=200, null=True, blank=True)
    doctor = models.ForeignKey(ProfileMed, on_delete=models.CASCADE, null=True, blank=True)
    content = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.title


class DoctorVote(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    doctor = models.ForeignKey(ProfileMed, on_delete=models.CASCADE)
    vote = models.PositiveIntegerField(choices=[(1, '1'), (2, '2'), (3, '3'), (4, '4'), (5, '5')])

    def __str__(self):
        return self.doctor.name

    class Meta:
        unique_together = ('user', 'doctor')


class CommentProfileMed(models.Model):
    profile = models.ForeignKey(ProfileMed, on_delete=models.CASCADE, related_name='profile_comments')
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='user_comment')
    name = models.CharField(max_length=50, null=True, blank=True)
    text = models.TextField()
    added = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.text[:15]
