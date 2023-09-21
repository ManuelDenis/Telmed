from rest_framework import serializers
from questions.models import Question, Answer, Comment, AnswerVote


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('answer', 'text')


class AnswerVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnswerVote
        fields = ('answer', 'vote', 'review')


class AnswerSerializer(serializers.ModelSerializer):
    answer_vote = AnswerVoteSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Answer
        fields = ('id', 'text', 'question', 'added', 'med', 'answer_vote', 'comments')


class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ('id', 'category', 'name', 'text', 'added', 'answers')
