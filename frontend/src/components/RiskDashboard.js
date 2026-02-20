import React, { useState } from 'react';
import InputPanel from './InputPanel';
import OutputPanel from './OutputPanel';
import { TrafficService } from '../services/api';
import { motion } from 'framer-motion';

const RiskDashboard = () => {

    // Added default values to avoid empty strings for numeric fields
    const initialState = {
        Road_Type: "",
        Weather_Conditions: "",
        Light_Conditions: "",
        Speed_limit: "",
        Urban_or_Rural_Area: "",
        Number_of_Vehicles: "",
        Number_of_Casualties: "0",
        Road_Surface_Conditions: "",
        Junction_Detail: "0",
        Junction_Control: "0",
        Carriageway_Hazards: "0",
        Month: "",
        Hour: "",
        Is_Weekend: "0",
        Is_Night: "0",
        Total_Vehicles: "",
        Avg_Driver_Age: "",
        Avg_Engine_CC: "",
        Latitude: "",
        Longitude: ""
    };

    const [formData, setFormData] = useState(initialState);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const [loadingText, setLoadingText] = useState("Analyzing...");

    const analyzeRisk = async () => {
        setLoading(true);
        setLoadingText("Analyzing...");

        // Cold start timers
        const timer1 = setTimeout(() => setLoadingText("Starting AI Engine..."), 2000);
        const timer2 = setTimeout(() => setLoadingText("Waking up Server (may take 60s)..."), 8000);

        // Create an AbortController for a 60-second timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000);

        try {
            // Basic validation
            for (let key in formData) {
                // Allow '0' as a valid value, but check for empty strings
                if (formData[key] === "" && key !== 'Number_of_Casualties') {
                    alert(`Please fill ${key.replaceAll("_", " ")}`);
                    setLoading(false);
                    clearTimeout(timer1);
                    clearTimeout(timer2);
                    clearTimeout(timeoutId);
                    return;
                }
            }

            const data = await TrafficService.predictRisk(formData, controller.signal);

            clearTimeout(timeoutId);
            setResult(data);
        } catch (error) {
            console.error("Analysis failed:", error);
            if (error.name === 'AbortError') {
                alert("Request timed out. The server is likely waking up. Please try again.");
            } else {
                alert("Failed to analyze risk. Ensure backend is running.");
            }
        } finally {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timeoutId);
            setLoading(false);
        }
    };

    return (
        <section className="dashboard-section" id="dashboard">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    Real-Time Risk Analysis
                </motion.h2>

                <div className="dashboard-grid">
                    <InputPanel formData={formData} handleChange={handleChange} />

                    <div className="analysis-column">
                        <OutputPanel result={result} />

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {/* Main Action Button */}
                            <motion.button
                                className={`analyze-btn ${loading ? 'loading' : ''}`}
                                onClick={analyzeRisk}
                                disabled={loading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold',
                                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: 'white',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)'
                                }}
                            >
                                {loading ? loadingText : "⚡ Analyze Risk Intelligence"}
                            </motion.button>

                            {/* Demo Controls Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                                {/* HIGH RISK DEMO */}
                                <motion.button
                                    onClick={() => setFormData({
                                        Road_Type: "3", Weather_Conditions: "5", Light_Conditions: "6", Speed_limit: "90",
                                        Urban_or_Rural_Area: "2", Number_of_Vehicles: "3", Number_of_Casualties: "1",
                                        Road_Surface_Conditions: "2", Junction_Detail: "0", Junction_Control: "4",
                                        Carriageway_Hazards: "0", Month: "11", Hour: "23", Is_Weekend: "1", Is_Night: "1",
                                        Total_Vehicles: "3", Avg_Driver_Age: "22", Avg_Engine_CC: "2000",
                                        Latitude: "52.48", Longitude: "-1.89"
                                    })}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        padding: '0.75rem',
                                        background: 'rgba(239, 68, 68, 0.15)',
                                        border: '1px solid #ef4444',
                                        color: '#fca5a5',
                                        borderRadius: '8px',
                                        fontSize: '0.8rem',
                                        fontWeight: '600',
                                        cursor: 'pointer'
                                    }}
                                >
                                    🔴 Demo High
                                </motion.button>

                                {/* MODERATE RISK DEMO */}
                                <motion.button
                                    onClick={() => setFormData({
                                        Road_Type: "6",
                                        Weather_Conditions: "2", // Raining no high winds (Avoids +0.15 penalty)
                                        Light_Conditions: "1", // Daylight
                                        Speed_limit: "70", // High speed (Risk from model, but avoids Night+Speed penalty)
                                        Urban_or_Rural_Area: "2",
                                        Number_of_Vehicles: "2",
                                        Number_of_Casualties: "0",
                                        Road_Surface_Conditions: "2", // Wet
                                        Junction_Detail: "3", // T-Junction
                                        Junction_Control: "4", // Give Way
                                        Carriageway_Hazards: "0",
                                        Month: "11",
                                        Hour: "14", // 2 PM
                                        Is_Weekend: "0",
                                        Is_Night: "0", // Day time (Crucial to avoid +0.2 penalty)
                                        Total_Vehicles: "2",
                                        Avg_Driver_Age: "45",
                                        Avg_Engine_CC: "1600",
                                        Latitude: "52.48",
                                        Longitude: "-1.89"
                                    })}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        padding: '0.75rem',
                                        background: 'rgba(245, 158, 11, 0.15)',
                                        border: '1px solid #f59e0b',
                                        color: '#fcd34d',
                                        borderRadius: '8px',
                                        fontSize: '0.8rem',
                                        fontWeight: '600',
                                        cursor: 'pointer'
                                    }}
                                >
                                    🟠 Demo Mid
                                </motion.button>

                                {/* LOW RISK DEMO */}
                                <motion.button
                                    onClick={() => setFormData({
                                        Road_Type: "1", Weather_Conditions: "1", Light_Conditions: "1", Speed_limit: "30",
                                        Urban_or_Rural_Area: "1", Number_of_Vehicles: "1", Number_of_Casualties: "0",
                                        Road_Surface_Conditions: "1", Junction_Detail: "1", Junction_Control: "1",
                                        Carriageway_Hazards: "0", Month: "6", Hour: "12", Is_Weekend: "0", Is_Night: "0",
                                        Total_Vehicles: "1", Avg_Driver_Age: "45", Avg_Engine_CC: "1400",
                                        Latitude: "52.48", Longitude: "-1.89"
                                    })}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        padding: '0.75rem',
                                        background: 'rgba(16, 185, 129, 0.15)',
                                        border: '1px solid #10b981',
                                        color: '#6ee7b7',
                                        borderRadius: '8px',
                                        fontSize: '0.8rem',
                                        fontWeight: '600',
                                        cursor: 'pointer'
                                    }}
                                >
                                    🟢 Demo Low
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RiskDashboard;
