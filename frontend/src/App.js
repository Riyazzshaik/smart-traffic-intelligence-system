import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import MapSection from './components/MapSection';
import RiskDashboard from './components/RiskDashboard'; // Keeps manual analysis
import SafetySection from './components/SafetySection';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App relative bg-[#0f172a] text-slate-200 min-h-screen">
      <Navbar />

      <main>
        <HeroSection />

        {/* Main Feature: Interactive Map with Dual Routes */}
        <MapSection />

        {/* Manual Risk Analysis Tool */}
        <RiskDashboard />

        {/* Education & Awareness */}
        <SafetySection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
