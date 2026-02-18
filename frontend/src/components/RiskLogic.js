import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';

const RiskLogic = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="risk-logic-container" id="logic">
            <button
                className="logic-toggle"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Info size={20} />
                <span>How is Risk Calculated?</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="logic-content glass-card"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                    >
                        <h3>AI Logic Explanation</h3>
                        <div className="formula">
                            <p>The Final Risk Score is a weighted combination of multiple AI models:</p>
                            <code>
                                Risk = (0.85 × Severity Probability) + (0.15 × Blackspot Risk)
                            </code>
                            <ul>
                                <li><strong>Severity Probability:</strong> Prediction from trained Random Forest Classifer based on road conditions.</li>
                                <li><strong>Blackspot Risk:</strong> Geospatial clustering (K-Means) identifying historical accident hotspots.</li>
                                <li><strong>Dynamic Boosts:</strong> Additional penalties for night-time speeding or dangerous weather.</li>
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default RiskLogic;
