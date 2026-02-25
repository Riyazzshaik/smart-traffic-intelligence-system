import os
from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from .models.ml_engine import init_ml_engine

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize CORS
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

    # Initialize ML Engine
    # Models are in 'backend/ml_models', which is Config.ML_MODELS_DIR
    init_ml_engine(app.config['ML_MODELS_DIR'])

    # Register Blueprints
    from .routes import predict, routing
    app.register_blueprint(predict.bp)
    app.register_blueprint(routing.bp)

    @app.route("/")
    def home():
        return jsonify({
            "message": "Smart Traffic Risk API Running 🚦",
            "version": "1.0.0",
            "status": "active"
        })

    return app
