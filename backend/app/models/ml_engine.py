import os
import joblib
import numpy as np
from ..utils.helpers import safe_load_model

class MLEngine:
    def __init__(self, models_dir):
        self.models_dir = models_dir
        self.severity_model = None
        self.blackspot_model = None
        self.feature_columns = None
        self.threshold = 0.5
        self.load_models()

    def load_models(self):
        """Load all necessary ML models and artifacts."""
        try:
            print(f"Loading models from: {self.models_dir}")
            self.severity_model = joblib.load(os.path.join(self.models_dir, "final_severity_model.joblib"))
            self.blackspot_model = joblib.load(os.path.join(self.models_dir, "blackspot_model.joblib"))
            self.feature_columns = joblib.load(os.path.join(self.models_dir, "feature_list.joblib"))
            self.threshold = joblib.load(os.path.join(self.models_dir, "severity_threshold.joblib"))
            print("✅ Models Loaded Successfully")
        except Exception as e:
            print(f"❌ Error loading models: {e}")
            # Ensure we can still run even if models fail (for dev/testing)
            pass

    def predict_severity(self, input_data):
        """Predict accident severity probability."""
        if not self.severity_model:
            return 0, 0
            
        # Ensure input order matches feature columns
        input_array = np.array([input_data])
        severity_prob = float(self.severity_model.predict_proba(input_array)[0][1])
        severity_pred = 1 if severity_prob >= self.threshold else 0
        return severity_prob, severity_pred

    def predict_blackspot(self, lat, lng):
        """Predict if a location is a blackspot cluster."""
        if not self.blackspot_model:
            return 0, 0
            
        location_input = np.array([[lat, lng]])
        # Fix: Ensure predict returns a scalar
        cluster_id = int(self.blackspot_model.predict(location_input)[0])
        
        # Risk map from original code
        cluster_risk_map = {0: 0.2, 1: 0.6, 2: 0.4}
        blackspot_score = cluster_risk_map.get(cluster_id, 0.3)
        
        return cluster_id, blackspot_score

    def get_feature_columns(self):
        return self.feature_columns

# Global instance will be initialized in app factory
ml_engine = None

def init_ml_engine(models_dir):
    global ml_engine
    ml_engine = MLEngine(models_dir)
