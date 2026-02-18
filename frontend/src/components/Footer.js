import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>TrafficGuard AI</h3>
                    <p>Saving lives through intelligence.</p>
                </div>
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="#dashboard">Dashboard</a></li>
                        <li><a href="#routes">Routes</a></li>
                        <li><a href="#logic">How it Works</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Connect</h4>
                    <div className="social-icons">
                        <Github size={20} />
                        <Twitter size={20} />
                        <Linkedin size={20} />
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2026 TrafficGuard AI. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
