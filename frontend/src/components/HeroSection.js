import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';

const HeroSection = () => {
    const scrollToMap = () => {
        document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="hero-section" id="hero">
            <div className="hero-content">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="hero-subtitle">
                        TrafficGuard AI Intelligence System v2.0
                    </div>

                    <h1>
                        Navigate with <br />
                        <span className="highlight">Predictive Safety</span>
                    </h1>

                    <p className="hero-description">
                        Beyond just the fastest route. TrafficGuard AI analyzes real-time weather, blackspots, and accident data to guide you safely.
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <button
                            onClick={scrollToMap}
                            className="cta-button"
                        >
                            Start Safe Navigation <ArrowRight size={20} />
                        </button>

                        <button style={{
                            padding: '1rem 2.5rem',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid #334155',
                            color: '#e2e8f0',
                            borderRadius: '99px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '1.1rem'
                        }}>
                            <ShieldCheck size={20} /> Watch Demo
                        </button>
                    </div>

                    {/* Stats */}
                    <div style={{
                        marginTop: '4rem',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '2rem',
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                        paddingTop: '2rem'
                    }}>
                        <div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>98%</div>
                            <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Accuracy Rate</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>50k+</div>
                            <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Blackspots Mapped</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>24/7</div>
                            <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Real-time Analysis</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>1.2s</div>
                            <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Response Time</div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Background Effects */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '400px', height: '400px', background: 'rgba(59, 130, 246, 0.2)', borderRadius: '50%', filter: 'blur(100px)' }}></div>
                <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '500px', height: '500px', background: 'rgba(139, 92, 246, 0.2)', borderRadius: '50%', filter: 'blur(120px)' }}></div>
            </div>
        </section>
    );
};

export default HeroSection;
