import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { motion } from 'framer-motion';
import { Navigation, MapPin, AlertTriangle, ShieldCheck, Crosshair } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet markers
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom Icons
// const safeIcon = new L.Icon({
//     iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
//     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41]
// });

const dangerIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const startIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Component to handle map clicks
const LocationSelector = ({ mode, setStart, setEnd }) => {
    useMapEvents({
        click(e) {
            if (mode === 'start') {
                setStart(e.latlng);
            } else if (mode === 'end') {
                setEnd(e.latlng);
            }
        },
    });
    return null;
};

// Component to fit bounds
const AutoFitBounds = ({ routes, start, end }) => {
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        const bounds = L.latLngBounds([]);

        if (start) bounds.extend([start.lat, start.lng]);
        if (end) bounds.extend([end.lat, end.lng]);

        routes.forEach(route => {
            if (route.geometry && route.geometry.coordinates) {
                route.geometry.coordinates.forEach(coord => bounds.extend([coord[1], coord[0]]));
            }
        });

        if (bounds.isValid()) {
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [routes, start, end, map]);

    return null;
};

const MapSection = () => {
    const [start, setStart] = useState({ lat: 52.48, lng: -1.89 }); // Default Birmingham
    const [end, setEnd] = useState({ lat: 52.50, lng: -1.85 });

    const [routes, setRoutes] = useState({ fastest: null, safest: null });
    const [loading, setLoading] = useState(false);
    const [selectionMode, setSelectionMode] = useState(null);
    const [alertPlaying, setAlertPlaying] = useState(false);
    const [dangerWarning, setDangerWarning] = useState(false);

    const audioRef = useRef(new Audio('https://assets.mixkit.co/active_storage/sfx/995/995-preview.mp3'));

    const handleLocateMe = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setStart({ lat: latitude, lng: longitude });
            },
            () => alert('Unable to retrieve your location')
        );
    };

    const [loadingText, setLoadingText] = useState("Calculating...");

    const fetchRoutes = async () => {
        console.log("FETCH ROUTES CLICKED");
        setLoading(true);
        setLoadingText("Connecting to AI...");
        setRoutes({ fastest: null, safest: null });
        setDangerWarning(false);

        // Timer to update loading text for cold starts
        const timer1 = setTimeout(() => setLoadingText("Starting AI Engine..."), 2000);
        const timer2 = setTimeout(() => setLoadingText("Waking up Server (may take 60s)..."), 8000);

        try {
            const response = await fetch("https://smart-traffic-api-u09k.onrender.com/safer-route", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    start_lat: start.lat,
                    start_lng: start.lng,
                    end_lat: end.lat,
                    end_lng: end.lng
                })
            });

            const data = await response.json();

            if (data.danger_warning) {
                setDangerWarning(true);
                return;
            }

            if (data.fastest_route || data.routes) {
                if (data.fastest_route && data.safest_route) {
                    setRoutes({
                        fastest: data.fastest_route,
                        safest: data.safest_route
                    });

                    if (data.fastest_route.risk_score > 0.6 || data.safest_route.risk_score > 0.6) {
                        triggerAlert();
                    }
                } else if (data.routes && data.routes.length > 0) {
                    setRoutes({
                        fastest: data.routes[0],
                        safest: data.routes[0]
                    });
                }
            }
        } catch (error) {
            console.error("Error fetching routes:", error);
            alert("Failed to connect to AI Route Server. Please try again in 1 minute.");
        } finally {
            clearTimeout(timer1);
            clearTimeout(timer2);
            setLoading(false);
        }
    };

    const triggerAlert = () => {
        setAlertPlaying(true);
        audioRef.current.play().catch(e => console.log("Audio play failed", e));
        setTimeout(() => setAlertPlaying(false), 3000);
    };

    return (
        <section className={`section-padding ${alertPlaying ? 'animate-pulse-red' : ''}`} id="map-section">
            <div className="container">
                <div className="flex-center-col">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2>AI Intelligent Navigation</h2>
                        <p style={{ color: '#94a3b8' }}>
                            Compare <span style={{ color: '#ef4444' }}>Fastest</span> vs <span style={{ color: '#10b981' }}>Safest</span> Routes
                        </p>
                    </motion.div>
                </div>

                <div className="grid-2">
                    {/* Controls Panel */}
                    <div className="glass-card">
                        <div className="flex-between" style={{ marginBottom: '1rem' }}>
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                                <Navigation size={22} className="text-blue" />
                                Planner
                            </h3>
                            <button onClick={handleLocateMe} style={{ background: 'none', border: 'none', color: '#60a5fa', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <Crosshair size={16} /> Locate Me
                            </button>
                        </div>

                        {/* Start Input */}
                        <div
                            style={{
                                padding: '10px',
                                border: `1px solid ${selectionMode === 'start' ? '#3b82f6' : '#334155'}`,
                                borderRadius: '8px',
                                marginBottom: '10px',
                                background: selectionMode === 'start' ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                                cursor: 'pointer'
                            }}
                            onClick={() => setSelectionMode('start')}
                        >
                            <label style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Start Location</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
                                <MapPin size={18} color="#3b82f6" />
                                <span style={{ fontSize: '0.9rem' }}>{start.lat.toFixed(4)}, {start.lng.toFixed(4)}</span>
                            </div>
                        </div>

                        {/* End Input */}
                        <div
                            style={{
                                padding: '10px',
                                border: `1px solid ${selectionMode === 'end' ? '#8b5cf6' : '#334155'}`,
                                borderRadius: '8px',
                                marginBottom: '1rem',
                                background: selectionMode === 'end' ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
                                cursor: 'pointer'
                            }}
                            onClick={() => setSelectionMode('end')}
                        >
                            <label style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Destination</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
                                <MapPin size={18} color="#8b5cf6" />
                                <span style={{ fontSize: '0.9rem' }}>{end.lat.toFixed(4)}, {end.lng.toFixed(4)}</span>
                            </div>
                        </div>

                        <button
                            onClick={fetchRoutes}
                            disabled={loading}
                            className="btn-primary"
                        >
                            {loading ? loadingText : <><ShieldCheck size={20} /> Predict Safe Route</>}
                        </button>

                        {dangerWarning && (
                            <div style={{
                                marginTop: '1.5rem',
                                background: 'rgba(220, 38, 38, 0.2)',
                                border: '1px solid #ef4444',
                                padding: '1rem',
                                borderRadius: '8px',
                                color: '#fecaca',
                                textAlign: 'center'
                            }}>
                                <h4 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', margin: '0 0 0.5rem 0', color: '#ef4444' }}>
                                    <AlertTriangle size={20} /> CRITICAL WARNING
                                </h4>
                                <p style={{ margin: 0, fontSize: '0.9rem' }}>Destination detected in a Water Body!</p>
                                <small style={{ display: 'block', marginTop: '0.5rem', opacity: 0.8 }}>Route calculation cancelled for safety.</small>
                            </div>
                        )}

                        {/* Route Comparison Results */}
                        {routes.fastest && (
                            <div style={{ marginTop: '1.5rem' }}>
                                {/* Fastest Route Card (Unsafe/Standard) */}
                                <div className="route-card fastest">
                                    <div className="flex-between">
                                        <div>
                                            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#ef4444' }}>FASTEST</span>
                                            <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                                                {(routes.fastest.duration / 60).toFixed(0)} min
                                            </div>
                                            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                                                {(routes.fastest.distance / 1000).toFixed(1)} km
                                            </div>
                                        </div>
                                        <div className="badge red">
                                            RISK: {routes.fastest.risk_score}
                                        </div>
                                    </div>
                                </div>

                                {/* Safest Route Card (Recommended) */}
                                <div className="route-card safest">
                                    <div className="flex-between">
                                        <div>
                                            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#10b981' }}>OPTIMIZED SAFER</span>
                                            <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                                                {(routes.safest.duration / 60).toFixed(0)} min
                                            </div>
                                            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                                                {(routes.safest.distance / 1000).toFixed(1)} km
                                            </div>
                                        </div>
                                        <div className="badge green">
                                            RISK: {routes.safest.risk_score}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {selectionMode && (
                            <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#fbbf24', textAlign: 'center' }}>
                                Tap on the map to set location
                            </p>
                        )}
                    </div>

                    {/* Map Area */}
                    <div className="map-wrapper">
                        <MapContainer center={[start.lat, start.lng]} zoom={13} style={{ height: "100%", width: "100%" }}>
                            {/* RESTORED STANDARD TILE LAYER */}
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            <LocationSelector
                                mode={selectionMode}
                                setStart={(coords) => { setStart(coords); setSelectionMode(null); }}
                                setEnd={(coords) => { setEnd(coords); setSelectionMode(null); }}
                            />

                            <Marker position={[start.lat, start.lng]} icon={startIcon}>
                                <Popup>Start Point</Popup>
                            </Marker>
                            <Marker position={[end.lat, end.lng]} icon={dangerIcon}>
                                <Popup>Destination</Popup>
                            </Marker>

                            {/* Routes */}
                            {routes.fastest && (
                                <>
                                    {/* Fastest Route (Red) */}
                                    <Polyline
                                        positions={routes.fastest.geometry.coordinates.map(c => [c[1], c[0]])}
                                        pathOptions={{ color: '#ef4444', weight: 4, opacity: 0.6, dashArray: '10, 10' }}
                                    >
                                        <Popup>Fastest Route</Popup>
                                    </Polyline>

                                    {/* Safest Route (Green) */}
                                    <Polyline
                                        positions={routes.safest.geometry.coordinates.map(c => [c[1], c[0]])}
                                        pathOptions={{ color: '#10b981', weight: 6, opacity: 0.9 }}
                                    >
                                        <Popup>Safest Route</Popup>
                                    </Polyline>

                                    <AutoFitBounds
                                        routes={[routes.fastest, routes.safest]}
                                        start={start}
                                        end={end}
                                    />
                                </>
                            )}
                        </MapContainer>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MapSection;
