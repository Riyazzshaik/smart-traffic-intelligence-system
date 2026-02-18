import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, XOctagon } from 'lucide-react';

const RiskCard = ({ title, value, subtext, color }) => {
    return (
        <motion.div
            className={`risk-card ${color}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <h4>{title}</h4>
            <div className="value">{value}</div>
            <div className="subtext">{subtext}</div>
        </motion.div>
    );
};

const OutputPanel = ({ result }) => {
    if (!result) {
        return (
            <div className="output-panel empty">
                <p>Enter data and click "Analyze" to see risk intelligence.</p>
            </div>
        );
    }

    const riskColor = result.final_risk === 'LOW' ? 'green' :
        result.final_risk === 'MODERATE' ? 'orange' : 'red';

    const RiskIcon = result.final_risk === 'LOW' ? CheckCircle :
        result.final_risk === 'MODERATE' ? AlertTriangle : XOctagon;

    return (
        <div className="output-panel">
            <div className="result-header">
                <RiskIcon className={`result-icon ${riskColor}`} size={48} />
                <div>
                    <h3>Risk Level: <span className={`risk-text ${riskColor}`}>{result.final_risk}</span></h3>
                    <p>Confidence Score: {((result.final_score) * 100).toFixed(1)}%</p>
                </div>
            </div>

            <div className="cards-grid">
                <RiskCard
                    title="Severity Probability"
                    value={`${(result.severity_probability * 100).toFixed(1)}%`}
                    subtext={result.severity_prediction === 1 ? "High Severity Likely" : "Low Severity Likely"}
                    color="blue"
                />

                <RiskCard
                    title="Blackspot Risk"
                    value={result.blackspot_score}
                    subtext={`Cluster ID: ${result.cluster_id}`}
                    color="purple"
                />

                <RiskCard
                    title="Final Risk Score"
                    value={result.final_score}
                    subtext="Weighted AI Calculation"
                    color={riskColor}
                />
            </div>

            {result.cluster_id !== 0 && (
                <motion.div
                    className="blackspot-alert"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                >
                    <AlertTriangle size={20} />
                    <span>High Risk Blackspot Area Detected</span>
                </motion.div>
            )}
        </div>
    );
};

export default OutputPanel;
