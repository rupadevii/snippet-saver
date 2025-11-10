import os
from dotenv import load_dotenv
from datetime import timedelta

load_dotenv()

class Config:
    # SQLALCHEMY_DATABASE_URI = 'sqlite:///myDB.db'
    # SQLALCHEMY_TRACK_NOTIFICATIONS = False
    # JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "supersecretkey")

    SECRET_KEY = os.getenv("SECRET_KEY", "fallback_secret_key")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "fallback_jwt_secret")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=1)

    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite:///myDB.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False