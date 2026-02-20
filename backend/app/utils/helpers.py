import os
import joblib

def safe_load_model(path):
    """Safely load a joblib model."""
    if os.path.exists(path):
        return joblib.load(path)
    return None
