import React, { useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker } from "react-leaflet";
import { motion } from 'framer-motion';
import "leaflet/dist/leaflet.css";

// Fix Leaflet marker icons
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const RouteSection = () => {
    const [startLat, setStartLat] = useState(52.48);
    const [startLng, setStartLng] = useState(-1.89);
    const [endLat, setEndLat] = useState(52.50);
    const [endLng, setEndLng] = useState(-1.85);
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(false);

    // Hardcoded for demo if backend isn't perfect, but trying real fetch first
    const [dangerWarning, setDangerWarning] = useState(false);

    const getRoutes = async () => {
        setLoading(true);
        setDangerWarning(false);
        setRoutes([]);

        try {
            const response = await fetch("http://127.0.0.1:5000/safer-route", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    start_lat: startLat,
                    start_lng: startLng,
                    end_lat: endLat,
                    end_lng: endLng
                })
            });

            if (!response.ok) throw new Error("Route fetch failed");

            const data = await response.json();

            if (data.danger_warning) {
                setDangerWarning(true);
                return;
            }

            // Backend now returns { routes: [{geometry, distance, risk_score, ...}, ...], message }
            if (data.routes && data.routes.length > 0) {
                const processedRoutes = data.routes.map((route, index) => {
                    // Flip [long, lat] to [lat, long] for Leaflet
                    const coords = route.geometry.coordinates.map(c => [c[1], c[0]]);
                    return {
                        id: index,
                        coordinates: coords,
                        distance: (route.distance / 1000).toFixed(2), // Convert to km
                        duration: (route.duration / 60).toFixed(0), // Convert to mins
                        risk_score: route.risk_score,
                        isSafest: index === 0 // Backend sorts by risk, so first is always safest
                    };
                });
                setRoutes(processedRoutes);
            }
        } catch (error) {
            console.error("Routing error:", error);
            alert("Failed to fetch routes. Make sure backend is running.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="route-section" id="routes">
            <div className="container">
                <h2>Safer Route Suggestion</h2>
                <div className="route-grid">
                    <div className="route-controls glass-card">
                        <h3>Plan Your Journey</h3>
                        <div className="input-group">
                            <label>Start Location</label>
                            <div className="row">
                                <input type="number" placeholder="Lat" value={startLat} onChange={e => setStartLat(e.target.value)} />
                                <input type="number" placeholder="Lng" value={startLng} onChange={e => setStartLng(e.target.value)} />
                            </div>
                        </div>
                        <div className="input-group">
                            <label>Destination</label>
                            <div className="row">
                                <input type="number" placeholder="Lat" value={endLat} onChange={e => setEndLat(e.target.value)} />
                                <input type="number" placeholder="Lng" value={endLng} onChange={e => setEndLng(e.target.value)} />
                            </div>
                        </div>
                        <button
                            className="route-btn"
                            onClick={getRoutes}
                            disabled={loading}
                        >
                            {loading ? "Analyzing Safety..." : "Find Safer Route"}
                        </button>

                        {dangerWarning && (
                            <motion.div
                                className="danger-alert"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <h4>⚠️ CRITICAL WARNING</h4>
                                <p>Destination detected in a Water Body!</p>
                                <small>Route calculation cancelled for safety.</small>
                            </motion.div>
                        )}

                        {routes.length > 0 && (
                            <div className="route-results">
                                <h4>Route Intelligence</h4>
                                <div className="route-list">
                                    {routes.map(route => (
                                        <div key={route.id} className={`route-item ${route.isSafest ? 'safest' : ''}`}>
                                            <div className="route-info">
                                                <span className={`badge ${route.isSafest ? 'green' : 'red'}`}>
                                                    {route.isSafest ? 'SAFEST' : 'RISKY'}
                                                </span>
                                                <span className="details">{route.distance} km • {route.duration} min</span>
                                            </div>
                                            <div className="risk-metric">
                                                Risk Score: <strong>{route.risk_score}</strong>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="map-container">
                        <MapContainer center={[startLat, startLng]} zoom={12} style={{ height: "100%", width: "100%", borderRadius: "12px" }}>
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                            <Marker position={[startLat, startLng]} />
                            <Marker position={[endLat, endLng]} />

                            {routes.map((route, idx) => (
                                <Polyline
                                    key={idx}
                                    positions={route.coordinates}
                                    color={route.isSafest ? "#10b981" : "#ef4444"}
                                    weight={route.isSafest ? 8 : 5}
                                    opacity={route.isSafest ? 1 : 0.6}
                                />
                            ))}
                        </MapContainer>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RouteSection;
