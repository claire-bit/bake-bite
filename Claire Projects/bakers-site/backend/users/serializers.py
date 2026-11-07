from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "email", "phone_number", "address"]
        read_only_fields = ["id", "email"]


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["first_name", "last_name", "email", "phone_number", "address", "password"]
        extra_kwargs = {
            "first_name": {"required": True, "allow_blank": False},
            "last_name": {"required": True, "allow_blank": False},
        }

    def validate_email(self, value):
        value = value.strip().lower()
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("An account with this email already exists.")
        return value

    def validate_password(self, value):
        validate_password(value)
        return value

    def create(self, validated_data):
        # The email doubles as the username, so the form never asks for one.
        return User.objects.create_user(
            username=validated_data["email"], is_active=False, **validated_data
        )


class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Log in with email + password instead of username + password."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields.pop(self.username_field)
        self.fields["email"] = serializers.EmailField(write_only=True)

    def validate(self, attrs):
        email = attrs["email"].strip().lower()
        user = User.objects.filter(email__iexact=email).first()

        if user and not user.is_active and user.check_password(attrs["password"]):
            raise AuthenticationFailed(
                "Please verify your email before logging in.", "email_not_verified"
            )

        attrs[self.username_field] = user.get_username() if user else email
        data = super().validate(attrs)
        data["user"] = UserSerializer(self.user).data
        return data