import React from 'react';
import { Shield, Map, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <motion.div
          className="logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Shield className="logo-icon" size={28} />
          <span>TrafficGuard AI</span>
        </motion.div>

        <ul className="nav-links">
          <li><a href="#hero">Home</a></li>
          <li><a href="#map-section">Live Navigation</a></li>
          <li><a href="#dashboard">Risk Analysis</a></li>
          <li><a href="#safety-education">Safety Intel</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
