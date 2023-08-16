from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import serializers
from users.models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email', 'password')
        extra_kwargs = {'password': {'write_only': True, 'min_length': 5}}

    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)


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
