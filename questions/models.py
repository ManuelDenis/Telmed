from django.db import models
from medical.models import Category
from users.models import CustomUser, ProfileMed


class Question(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, blank=True)
    category = models.ManyToManyField(Category, null=True, blank=True, related_name='questions')
    name = models.CharField(max_length=50, null=True, blank=True)
    text = models.TextField()
    added = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.text[:15]


class Answer(models.Model):
    med = models.ForeignKey(ProfileMed, on_delete=models.CASCADE, null=True, blank=True, related_name='answer_med')
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='answers')
    text = models.TextField()
    added = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.text[:30]


class AnswerVote(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE, related_name='answer_vote')
    vote = models.PositiveIntegerField(choices=[(1, '1'), (2, '2'), (3, '3'), (4, '4'), (5, '5')])
    review = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.user.email

    class Meta:
        unique_together = ('user', 'answer')


class Comment(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.DO_NOTHING)
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE, related_name='comments')
    text = models.TextField()
    added = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.text[:15]
