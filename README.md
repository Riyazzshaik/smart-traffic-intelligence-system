# 🚦 Smart Traffic Intelligence System

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/Start-Python%203.9-3776AB.svg)
![React](https://img.shields.io/badge/Frontend-React-61DAFB.svg)
![ML](https://img.shields.io/badge/AI-XGBoost-orange.svg)
![Docker](https://img.shields.io/badge/DevOps-Docker-2496ED.svg)

> An AI-powered platform for real-time accident risk prediction and safe route optimization.

---

## 📖 Overview

**TrafficGuard AI** goes beyond traditional navigation by prioritizing safety over speed. Leveraging historical accident data and real-time environmental factors, the system predicts accident probability and suggests safer travel alternatives.

### 🌟 Key Features
- **Real-Time Risk Analysis**: Instant accident severity prediction based on weather, time, and road conditions.
- **Dual-Path Routing**: Compares the "Fastest" route vs. the "Safest" route using specialized risk scoring.
- **Blackspot Clustering**: Visualizes high-risk zones using K-Means clustering data.
- **Interactive Intelligence**: Live map with dynamic route selection and geolocation.
- **Professional UI**: Glassmorphism-based Dark AI theme for a modern user experience.

---

## 🏗️ Architecture

The system follows a modular Monorepo architecture:

\`\`\`
smart-traffic-intelligence/
├── backend/             # Flask API & ML Engine
│   ├── app/
│   │   ├── models/      # XGBoost & K-Means Inference Logic
│   │   ├── routes/      # API Endpoints (Predict, Routing)
│   │   └── services/    # Business Logic
│   ├── ml_models/       # Serialized Joblib Models
│   └── run.py           # Entry Point
│
├── frontend/            # React Client
│   ├── src/
│   │   ├── components/  # Reusable UI Components
│   │   ├── services/    # API abstraction
│   │   └── assets/      # Icons & Styles
│   └── Dockerfile
│
└── docker-compose.yml   # Container Orchestration
\`\`\`

---

## 🧠 Machine Learning Engine

The core intelligence is powered by two primary models:
1.  **Severity Prediction Model (`XGBoost`)**:
    -   Analyzes 20+ features (Weather, Light, Urban/Rural, Speed).
    -   Outputs a `Severity Probability Score` (0.0 - 1.0).
2.  **Blackspot Detector (`K-Means`)**:
    -   Clusters historical accident coordinates.
    -   Identifies geographic "Danger Zones" enabling spatial risk scoring.

---

## 🚀 Getting Started

### Prerequisites
- Docker & Docker Compose
- *OR* Python 3.9+ and Node.js 18+

### Option A: Run with Docker (Recommended)
\`\`\`bash
# 1. Clone the repository
git clone https://github.com/Start-Riyaz/smart-traffic-intelligence.git
cd smart-traffic-intelligence

# 2. Start the application
docker-compose up --build
\`\`\`
The App will be available at:
-   **Frontend**: `http://localhost:3000`
-   **Backend**: `http://localhost:5000`

### Option B: Manual Setup

#### 1. Backend Setup
\`\`\`bash
cd backend
python -m venv venv
source venv/bin/activate  # or .\venv\Scripts\activate on Windows
pip install -r requirements.txt
python run.py
\`\`\`

#### 2. Frontend Setup
\`\`\`bash
cd frontend
npm install
npm start
\`\`\`

---

## 📸 Screenshots

| Risk Dashboard | Safe Route Planner |
|:---:|:---:|
| *(Add Dashboard Screenshot)* | *(Add Map Screenshot)* |

---

## 🛠️ Tech Stack

-   **Frontend**: React.js, Framer Motion, Leaflet Maps, Modern CSS3
-   **Backend**: Flask (Python), NumPy, Pandas, Joblib
-   **Machine Learning**: Scikit-Learn, XGBoost
-   **Infrastructure**: Docker, Render (Backend Deployment), Vercel (Frontend Deployment)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Developed by [Shaik Riyaz](https://www.linkedin.com/in/shaik-riyaz-28630b326)**
