from pathlib import Path
from datetime import timedelta
from decouple import config

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = "django-insecure-tg=q6k=z-o18&h3aj(o9gzah*#%5upbdsjrrk-43o3+d9hq&n2"

DEBUG = True

ALLOWED_HOSTS = []

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "accounts",
    "rest_framework",
    "rest_framework_simplejwt.token_blacklist",
    "corsheaders",
    "register",
    "login",
    "api",
    "contact",
    "ambulance",
    'django_extensions',
    "stripe",
    "transactions",
    "payments",
    # 'rest_framework',
    "rest_framework_simplejwt"
  
   
]


# Stripe API Keys (Get from Stripe Dashboard)

STRIPE_SECRET_KEY = "sk_test_51QvEz9RoqWK389OSYcnYNPi1xyTNb21GAtRidTYVA5en4jxQPVelfsZEUOn4juWaW2j6uByECwdaZVoFLolKscbY00DYP7R8Yw"



# STRIPE_SECRET_KEY = "sk_test_51QvEz9RoqWK389OSYcnYNPi1xyTNb21GAtRidTYVA5en4jxQPVelfsZEUOn4juWaW2j6uByECwdaZVoFLolKscbY00DYP7R8Yw"
STRIPE_PUBLIC_KEY = "pk_test_51QvEz9RoqWK389OSXrTxrJPZcVB4dAXWsIihe3gxak8P0R1DKiTQK8BOLZMLGVwEHRp6P8Ebw05R2jTs6cVTgWQw00gwuP9fgd"


CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Your React frontend URL
]


MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
}

ROOT_URLCONF = "backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
                
            ],
        },
    },
]

WSGI_APPLICATION = "backend.wsgi.application"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

STATIC_URL = "static/"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
AUTH_USER_MODEL = "accounts.CustomUser"

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=60),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
}

CORS_ALLOW_ALL_ORIGINS = True

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = config("MAILTRAP_HOST", default="sandbox.smtp.mailtrap.io")
EMAIL_PORT = config("MAILTRAP_PORT", default=2525)
EMAIL_HOST_USER = config("MAILTRAP_USER", default="2dd3a67ae03729")
EMAIL_HOST_PASSWORD = config("MAILTRAP_PASSWORD", default="f8c91d50273699")
EMAIL_USE_TLS = True
