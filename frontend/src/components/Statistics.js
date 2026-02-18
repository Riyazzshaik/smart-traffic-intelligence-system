import React from 'react';
import { Database, Brain, Map } from 'lucide-react';

const Statistics = () => {
    return (
        <section className="stats-section">
            <div className="container">
                <div className="stats-grid">
                    <div className="stat-item">
                        <Database size={40} className="icon-purple" />
                        <h3>100k+</h3>
                        <p>Accident Records Analyzed</p>
                    </div>
                    <div className="stat-item">
                        <Brain size={40} className="icon-blue" />
                        <h3>92%</h3>
                        <p>Model Accuracy</p>
                    </div>
                    <div className="stat-item">
                        <Map size={40} className="icon-green" />
                        <h3>500+</h3>
                        <p>Blackspots Identified</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Statistics;
