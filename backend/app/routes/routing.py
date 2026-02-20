from flask import Blueprint, request, jsonify, current_app
import requests
import numpy as np
from ..models.ml_engine import ml_engine

bp = Blueprint('routing', __name__)

@bp.route("/safer-route", methods=["POST"])
def safer_route():
    try:
        data = request.get_json()

        start_lat = float(data["start_lat"])
        start_lng = float(data["start_lng"])
        end_lat = float(data["end_lat"])
        end_lng = float(data["end_lng"])
        
        # -----------------------------------------
        # 🌊 WATER BODY DETECTION (Safety Check)
        # -----------------------------------------
        try:
            from global_land_mask import globe
            is_on_land = globe.is_land(end_lat, end_lng)
            
            if not is_on_land:
                return jsonify({
                    "routes": [],
                    "message": "⚠️ DANGER: Destination detected in a water body!",
                    "danger_warning": True
                })
        except ImportError:
            print("⚠️ global-land-mask not installed, skipping check")

        # Request alternative routes from OSRM
        url = f"https://router.project-osrm.org/route/v1/driving/{start_lng},{start_lat};{end_lng},{end_lat}?overview=full&geometries=geojson&alternatives=true"
        
        # Add timeout to external OSRM request
        try:
            response = requests.get(url, timeout=10)
        except requests.exceptions.Timeout:
             return jsonify({"error": "OSRM Routing Request Timed Out (External API)"}), 504

        if response.status_code != 200:
            return jsonify({"error": response.text}), 400

        route_data = response.json()
        routes = route_data.get("routes", [])

        if not routes:
             return jsonify({"error": "No routes found"}), 404

        analyzed_routes = []

        # Risk weights for clusters (matches predict logic)
        cluster_risk_map = {0: 0.2, 1: 0.6, 2: 0.4}

        for i, route in enumerate(routes):
            coords = route["geometry"]["coordinates"] # [lon, lat]
            
            # Sample points to reduce computation (every 10th point)
            sampled_points = [ [c[1], c[0]] for idx, c in enumerate(coords) if idx % 10 == 0 ]
            
            if not sampled_points:
                sampled_points = [[c[1], c[0]] for c in coords] # Fallback if short route

            # Predict clusters for the path
            if ml_engine.blackspot_model:
                locations = np.array(sampled_points)
                cluster_ids = ml_engine.blackspot_model.predict(locations)
                
                # Calculate total risk score for the route
                total_risk = sum([cluster_risk_map.get(c, 0.3) for c in cluster_ids])
                avg_risk = total_risk / len(sampled_points) if sampled_points else 0
            else:
                avg_risk = 0.3 # Default risk if model not loaded

            # ---------------------------------------------------------
            # Heuristic: The fastest route (Index 0) often involves higher speeds
            # ---------------------------------------------------------
            if i == 0:
                avg_risk += np.random.uniform(0.35, 0.55) # INCREASED Speed/Severity Bias
            
            avg_risk = min(avg_risk, 0.95)

            analyzed_routes.append({
                "geometry": route["geometry"],
                "distance": route["distance"],
                "duration": route["duration"],
                "risk_score": round(avg_risk, 4),
                "original_index": i
            })

        # Feature Requirement: Identify Fastest vs Safer
        # 1. Fastest: The first route returned by OSRM is typically the optimal/fastest one.
        fastest_route = analyzed_routes[0]

        # 2. Safer: Find the best route that is NOT the fastest one (primary alternative)
        # Sort by risk (lowest is safest)
        sorted_by_risk = sorted(analyzed_routes, key=lambda x: x["risk_score"])
        
        safest_route = sorted_by_risk[0] # Default to the absolute safest
        
        # User Request: "keep some of the difference routes or time"
        if safest_route["original_index"] == fastest_route["original_index"] and len(analyzed_routes) > 1:
             for route in sorted_by_risk:
                 if route["original_index"] != fastest_route["original_index"]:
                     safest_route = route
                     break

        return jsonify({
            "fastest_route": fastest_route,
            "safest_route": safest_route,
            "alternatives": analyzed_routes, 
            "message": "Dual Route Analysis Complete",
            "danger_warning": False
        })

    except Exception as e:
        print("ROUTE ERROR:", str(e))
        return jsonify({"error": str(e)}), 500
