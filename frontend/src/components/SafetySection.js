import React from 'react';
import { motion } from 'framer-motion';
import { Shield, CloudRain, Moon, Activity, AlertTriangle, Eye } from 'lucide-react';

const SafetyCard = ({ icon: Icon, title, desc, color, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay, duration: 0.5 }}
            style={{
                background: 'rgba(30, 41, 59, 0.7)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '1.5rem',
                borderLeft: `4px solid ${color}`,
                cursor: 'pointer'
            }}
            whileHover={{ translateY: -5 }}
        >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ padding: '0.75rem', borderRadius: '50%', backgroundColor: `${color}20`, color: color, display: 'inline-flex' }}>
                    <Icon size={28} />
                </div>
            </div>
            <h3 style={{ fontSize: '1.25rem', marginTop: '1rem', marginBottom: '0.5rem' }}>{title}</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{desc}</p>
        </motion.div>
    );
};

const SafetySection = () => {
    const tips = [
        {
            icon: Activity,
            title: "Over-Speeding Risks",
            desc: "Speed increases braking distance exponentially. Risk calculation penalizes high speeds on curved roads.",
            color: "#ef4444"
        },
        {
            icon: Moon,
            title: "Night Driving",
            desc: "Visibility drops by 70% at night. Our AI boosts risk scores for unlit roads after sunset.",
            color: "#8b5cf6"
        },
        {
            icon: CloudRain,
            title: "Rain & Skids",
            desc: "Wet surfaces reduce tire friction. The model detects weather conditions to suggest slower routes.",
            color: "#3b82f6"
        },
        {
            icon: AlertTriangle,
            title: "Blackspot Awareness",
            desc: "Historical accident data is clustered to identify high-density danger zones to avoid.",
            color: "#f59e0b"
        },
        {
            icon: Shield,
            title: "Defensive Driving",
            desc: "Always anticipate other drivers' errors. Maintain a 3-second gap for safety.",
            color: "#10b981"
        },
        {
            icon: Eye,
            title: "Blind Spots",
            desc: "Check mirrors and blind spots frequently. Cyclists and pedestrians are hard to see on turns.",
            color: "#ec4899"
        }
    ];

    return (
        <section style={{ padding: '6rem 2rem', background: '#0f172a' }} id="safety-education">
            <div className="container">
                <motion.div
                    style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <span style={{ color: '#10b981', fontWeight: 'bold', letterSpacing: '2px', fontSize: '0.875rem', textTransform: 'uppercase' }}>Education</span>
                    <h2 style={{ fontSize: '2.5rem', margin: '0.5rem 0 1rem 0' }}>Road Safety Intelligence</h2>
                    <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
                        Understanding risk factors is the first step to checking them. Our AI doesn't just route you; it educates you.
                    </p>
                </motion.div>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '1.5rem'
                    }}
                >
                    {tips.map((tip, index) => (
                        <SafetyCard
                            key={index}
                            {...tip}
                            delay={index * 0.1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SafetySection;
