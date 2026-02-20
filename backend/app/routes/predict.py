from flask import Blueprint, request, jsonify
from ..models.ml_engine import ml_engine
import numpy as np

bp = Blueprint('predict', __name__)

@bp.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        required_fields = [
            "Road_Type", "Weather_Conditions", "Light_Conditions",
            "Speed_limit", "Urban_or_Rural_Area",
            "Number_of_Vehicles", "Number_of_Casualties",
            "Road_Surface_Conditions", "Junction_Detail",
            "Junction_Control", "Carriageway_Hazards",
            "Month", "Hour", "Is_Weekend", "Is_Night",
            "Total_Vehicles", "Avg_Driver_Age", "Avg_Engine_CC",
            "Latitude", "Longitude"
        ]

        missing = [f for f in required_fields if f not in data]
        if missing:
            return jsonify({"error": "Missing fields", "missing": missing}), 400

        # Convert all inputs to float
        for key in data:
            data[key] = float(data[key])

        # -------- Feature Engineering --------
        # Matching logic from original app.py
        data["High_Speed"] = 1 if data["Speed_limit"] > 60 else 0
        data["Bad_Weather"] = 1 if data["Weather_Conditions"] in [4, 5, 6] else 0
        data["Night_Danger"] = 1 if data["Is_Night"] == 1 else 0
        data["Vehicle_Intensity"] = data["Number_of_Vehicles"] / 5
        data["Young_Driver"] = 1 if data["Avg_Driver_Age"] < 25 else 0
        data["Hazard_Score"] = data["Road_Surface_Conditions"] + data["Carriageway_Hazards"]

        # -------- Model Input --------
        feature_columns = ml_engine.feature_columns
        if feature_columns is None:
             return jsonify({"error": "Models not loaded"}), 500

        input_data = [data[col] for col in feature_columns]
        
        # -------- Severity Prediction --------
        severity_prob, severity_pred = ml_engine.predict_severity(input_data)

        # -------- Blackspot Prediction --------
        cluster_id, blackspot_score = ml_engine.predict_blackspot(data["Latitude"], data["Longitude"])

        # -------- Final Risk Calculation --------
        final_score = severity_prob * 0.85 + blackspot_score * 0.15

        if severity_prob > 0.6:
            final_score += 0.15

        # Stronger penalty for dangerous driving conditions
        if data["Is_Night"] == 1 and data["Speed_limit"] >= 60:
             final_score += 0.2
        
        if data["Weather_Conditions"] in [4, 5, 6]: # Rain/Fog/Snow
             final_score += 0.15

        final_score = min(final_score, 0.98)

        if final_score < 0.35:
            risk = "LOW"
        elif final_score < 0.6:
            risk = "MODERATE"
        else:
            risk = "HIGH"

        return jsonify({
            "severity_probability": round(severity_prob, 4),
            "severity_prediction": int(severity_pred),
            "blackspot_score": round(blackspot_score, 4),
            "cluster_id": int(cluster_id),
            "final_score": round(final_score, 4),
            "final_risk": risk
        })

    except Exception as e:
        print("🔥 PREDICT ERROR:", str(e))
        return jsonify({"error": str(e)}), 500
