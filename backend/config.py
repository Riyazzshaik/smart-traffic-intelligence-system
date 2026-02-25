import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    """Base configuration."""
    # Build paths inside the project like this: os.path.join(BASE_DIR, ...)
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    ML_MODELS_DIR = BASE_DIR

    # Security
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    
    # OpenRouteService API Key
    # Defaulting to the key found in original app.py if not in env
    ORS_API_KEY = os.environ.get('ORS_API_KEY') or "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjRmOGJlYjkzYzBlODQ0Yzk4YzNmOGQxODAzNmI2OWM3IiwiaCI6Im11cm11cjY0In0="

    # CORS
    CORS_ORIGINS = os.environ.get('CORS_ORIGINS', '*')
