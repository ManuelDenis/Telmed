from django.contrib.auth import authenticate
from rest_framework import serializers
from questions.models import AnswerVote, Answer
from questions.serializers import AnswerSerializer
from users.models import CustomUser, ProfileMed, CommentProfileMed, DoctorVote


class DoctorVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorVote
        fields = '__all__'


class CommentProfileMedSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentProfileMed
        fields = '__all__'


class ProfileMedSerializer2(serializers.ModelSerializer):
    class Meta:
        model = ProfileMed
        fields = ('name', 'category', 'job_title', 'company', 'rating')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email', 'password')
        extra_kwargs = {'password': {'write_only': True, 'min_length': 5}}

    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)


class ProfileMedSerializer(serializers.ModelSerializer):
    profile_comments = CommentProfileMedSerializer(many=True, read_only=True)
    total_votes = serializers.SerializerMethodField()
    average_rating = serializers.SerializerMethodField()
    answer_med = AnswerSerializer(many=True, read_only=True)

    class Meta:
        model = ProfileMed
        fields = ('id', 'user', 'name', 'category', 'job_title', 'company', 'profile_comments', 'total_votes', 'average_rating', 'rating', 'answer_med')

    def get_total_votes(self, profile):
        answer_vote = AnswerVote.objects.filter(answer__med=profile).count()
        return answer_vote

    def get_average_rating(self, profile):
        answer_vote = AnswerVote.objects.filter(answer__med=profile)
        totalvotes = answer_vote.count()

        if totalvotes > 0:
            ratingsum = sum([vote.vote for vote in answer_vote])
            averages = ratingsum / totalvotes
            return format(averages, ".2f")

        return "0.00"


class PasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('password',)


class AuthSerializer(serializers.Serializer):
    username = serializers.EmailField()
    password = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False
    )

    def validate(self, attrs):
        username = attrs.get('email')
        password = attrs.get('password')

        user = authenticate(
            request=self.context.get('request'),
            email=username,
            password=password
        )

        if not user:
            msg = 'Unable to authenticate with provided credentials'
            raise serializers.ValidationError(msg, code='authentication')

        if not user.is_active:
            msg = 'User account is not active'
            raise serializers.ValidationError(msg, code='is_not_active')

        attrs['user'] = user
        return user


class EmailSerializer(serializers.Serializer):
    email = serializers.EmailField()
