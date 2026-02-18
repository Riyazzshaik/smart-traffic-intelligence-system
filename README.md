# 🚦 Smart Traffic Intelligence System

An end-to-end Machine Learning powered system for early accident risk prediction and blackspot identification.

## 📌 Project Overview

This system predicts accident severity risk and identifies high-risk blackspot areas using historical accident data. It combines:

- Binary accident severity prediction (High / Low)
- Blackspot clustering using location-based risk analysis
- Combined risk scoring (Severity + Area Risk)
- Flask REST API backend
- React interactive dashboard frontend

---

## 🧠 Core Features

### 🔹 1. Accident Severity Prediction
- Binary classification model
- Predicts high-risk vs low-risk accidents
- Built using engineered traffic & weather features

### 🔹 2. Blackspot Identification
- Clustering-based hotspot detection
- Risk scoring per geographic cluster

### 🔹 3. Combined Risk Score
- Severity probability + cluster risk
- Final intelligent risk output

---

## 🏗️ Tech Stack

### Backend
- Python
- Flask
- Scikit-learn
- Joblib

### Frontend
- React.js
- Custom dashboard components

---

## 📂 Project Structure

```
smart-traffic-system/
│
├── accident_api/
│   ├── app.py
│   ├── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│
└── README.md
```

---

## 🚀 How to Run Locally

### Backend

```
cd accident_api
pip install -r requirements.txt
python app.py
```

### Frontend

```
cd frontend
npm install
npm start
```

---

## 🎯 Future Improvements

- Deploy backend using Render / AWS
- Deploy frontend using Vercel
- Add Docker containerization
- Add model versioning
- Add logging & monitoring

---

## 👨‍💻 Author

Riyaz Shaik  
Machine Learning Engineer (Aspiring)

---

## ⭐ Why This Project Matters

This project demonstrates:

- End-to-end ML system design
- Production-ready API development
- Risk scoring logic
- Full-stack integration
- Real-world data engineering
