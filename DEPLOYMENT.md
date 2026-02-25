# 🚀 Deployment Guide - Smart Traffic Intelligence Platform

Follow this guide to deploy your AI platform "neatly" and professionally to the cloud.

## 📦 Option 1: Docker (Fast Track)
This is the "neatest" way to run everything in one go.

### 💨 The 3-Step Start:
1.  **Preparation**: Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Windows/Mac) or Docker Engine (Linux).
2.  **Configuration**: 
    -   Inside the `backend` folder, create a file named `.env`.
    -   Paste this inside: `ORS_API_KEY=your_key_here`
3.  **Launch**:
    -   Open your terminal in the project root folder.
    -   Run: `docker-compose up -d --build`

---

## 🏗️ Detailed Docker Steps
1.  **Clone the Repository** to your server.
2.  **Set Environment Variables**:
    -   Copy `backend/.env.example` to `backend/.env`.
    -   Add your `ORS_API_KEY`.
3.  **Run with Docker Compose**:
    ```bash
    docker-compose up -d --build
    ```
    -   **Frontend**: accessible at your public address (e.g., `http://localhost` on Port 80)
    -   **Backend API**: accessible at `http://localhost:5000`

---

## 🌐 Option 2: Cloud Deployment (Render / Railway / Vorcel)
This is the easiest way to get a public URL for your startup.

### 1. Backend (Flask + ML Models)
Deploy this to **Render** or **Railway** as a "Web Service".
-   **Root Directory**: `backend`
-   **Build Command**: `pip install -r requirements.txt`
-   **Start Command**: `gunicorn --bind 0.0.0.0:$PORT run:app`
-   **Environment Variables**:
    -   `ORS_API_KEY`: (Your Key)
    -   `FLASK_ENV`: `production`

### 2. Frontend (React + Nginx)
Deploy this to **Render**, **Railway**, or **Vercel**.
-   **Root Directory**: `frontend`
-   **Build Command**: `npm run build`
-   **Publish Directory**: `build`
-   **Environment Variables**:
    -   `REACT_APP_API_URL`: (The URL of your deployed Backend)

---

## 🛠️ Maintenance & Scaling
-   **Model Updates**: To update the ML models, simply replace the `.joblib` files in `backend/ml_models/` and redeploy.
-   **SSL/HTTPS**: If using Docker, it is recommended to put a proxy like **Nginx Proxy Manager** or **Traefik** in front for automated SSL certificates.

## 🚦 Verification Checklist
- [ ] Check if the Backend health check returns `Smart Traffic Risk API Running 🚦`.
- [ ] Verify that searching for a route calculates the "Safety Score".
- [ ] Ensure water body detection is active.
