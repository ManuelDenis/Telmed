from django.contrib import admin
from questions.models import Question, Answer, Comment, AnswerVote


class AnswerInline(admin.TabularInline):
    model = Answer
    readonly_fields = ('id', 'text')
    extra = 0


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    inlines = [AnswerInline]


@admin.register(AnswerVote)
class AnswerVoteAdmin(admin.ModelAdmin):
    list_display = ('id', 'answer', 'vote')


admin.site.register(Comment)
admin.site.register(Answer)
