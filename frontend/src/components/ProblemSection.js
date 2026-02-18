import React from 'react';
import { AlertTriangle, TrendingUp, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const ProblemSection = () => {
    return (
        <section className="problem-section" id="problem">
            <div className="container">

                <div className="grid-split">
                    <motion.div
                        className="problem-content"
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2>The Hidden Danger</h2>
                        <p>
                            Traditional navigation systems optimize for speed and distance, often ignoring
                            critical safety factors. Every year, millions of accidents occur in predictable
                            high-risk zones known as <span className="highlight-red">Blackspots</span>.
                        </p>

                        <div className="stat-card">
                            <AlertTriangle className="icon-red" size={32} />
                            <div>
                                <h4>Blind Routing</h4>
                                <p>GPS apps don't warn you about high-severity accident zones.</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="solution-content"
                        initial={{ x: 100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2>Our AI Solution</h2>
                        <p>
                            We combine machine learning severity prediction with geospatial clustering to identify risks before they happen.
                        </p>

                        <div className="features-grid">
                            <div className="feature-card">
                                <TrendingUp className="icon-blue" />
                                <h4>Severity ML</h4>
                                <p>Predicts accident impact probability.</p>
                            </div>
                            <div className="feature-card">
                                <ShieldCheck className="icon-green" />
                                <h4>Safer Routing</h4>
                                <p>Risk-weighted pathfinding algorithms.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default ProblemSection;
