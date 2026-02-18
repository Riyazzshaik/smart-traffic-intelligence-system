import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MapPin, Sun, Car, Activity } from 'lucide-react';

const InputGroup = ({ title, icon, children, isOpen, onToggle }) => {
    return (
        <div className="input-group">
            <div className="group-header" onClick={onToggle}>
                <div className="group-title">
                    {icon}
                    <span>{title}</span>
                </div>
                <ChevronDown
                    className={`chevron ${isOpen ? 'open' : ''}`}
                    size={18}
                />
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="group-content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                    >
                        <div className="group-grid">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const InputPanel = ({ formData, handleChange }) => {
    const [openSection, setOpenSection] = useState('environment');

    const toggle = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <div className="input-panel glass-card">
            <h3>Analysis Parameters</h3>

            <InputGroup
                title="Environment & Road"
                icon={<Sun size={18} />}
                isOpen={openSection === 'environment'}
                onToggle={() => toggle('environment')}
            >
                <div className="field">
                    <label>Road Type</label>
                    <select name="Road_Type" value={formData.Road_Type} onChange={handleChange}>
                        <option value="">Select...</option>
                        <option value="1">Roundabout</option>
                        <option value="2">One way street</option>
                        <option value="3">Dual carriageway</option>
                        <option value="6">Single carriageway</option>
                        <option value="7">Slip road</option>
                        <option value="9">Unknown</option>
                    </select>
                </div>
                <div className="field">
                    <label>Weather</label>
                    <select name="Weather_Conditions" value={formData.Weather_Conditions} onChange={handleChange}>
                        <option value="">Select...</option>
                        <option value="1">Fine no high winds</option>
                        <option value="2">Raining no high winds</option>
                        <option value="3">Snowing no high winds</option>
                        <option value="4">Fine + High winds</option>
                        <option value="5">Raining + High winds</option>
                        <option value="6">Snowing + High winds</option>
                        <option value="7">Fog or mist</option>
                    </select>
                </div>
                <div className="field">
                    <label>Light Conditions</label>
                    <select name="Light_Conditions" value={formData.Light_Conditions} onChange={handleChange}>
                        <option value="">Select...</option>
                        <option value="1">Daylight</option>
                        <option value="4">Darkness - lights lit</option>
                        <option value="5">Darkness - lights unlit</option>
                        <option value="6">Darkness - no lighting</option>
                        <option value="7">Darkness - lighting unknown</option>
                    </select>
                </div>
                <div className="field">
                    <label>Speed Limit</label>
                    <input type="number" name="Speed_limit" value={formData.Speed_limit} onChange={handleChange} placeholder="e.g. 30" />
                </div>
                <div className="field">
                    <label>Urban/Rural</label>
                    <select name="Urban_or_Rural_Area" value={formData.Urban_or_Rural_Area} onChange={handleChange}>
                        <option value="">Select...</option>
                        <option value="1">Urban</option>
                        <option value="2">Rural</option>
                    </select>
                </div>
                <div className="field">
                    <label>Road Surface</label>
                    <select name="Road_Surface_Conditions" value={formData.Road_Surface_Conditions} onChange={handleChange}>
                        <option value="">Select...</option>
                        <option value="1">Dry</option>
                        <option value="2">Wet or damp</option>
                        <option value="3">Snow</option>
                        <option value="4">Frost or ice</option>
                        <option value="5">Flood over 3cm</option>
                    </select>
                </div>
            </InputGroup>

            <InputGroup
                title="Vehicle & Driver"
                icon={<Car size={18} />}
                isOpen={openSection === 'vehicle'}
                onToggle={() => toggle('vehicle')}
            >
                <div className="field">
                    <label>Avg Driver Age</label>
                    <input type="number" name="Avg_Driver_Age" value={formData.Avg_Driver_Age} onChange={handleChange} placeholder="e.g. 35" />
                </div>
                <div className="field">
                    <label>Vehicle Count</label>
                    <input type="number" name="Number_of_Vehicles" value={formData.Number_of_Vehicles} onChange={handleChange} placeholder="e.g. 2" />
                </div>
                <div className="field">
                    <label>Total Vehicles Involved</label>
                    <input type="number" name="Total_Vehicles" value={formData.Total_Vehicles} onChange={handleChange} placeholder="e.g. 2" />
                </div>
                <div className="field">
                    <label>Engine CC</label>
                    <input type="number" name="Avg_Engine_CC" value={formData.Avg_Engine_CC} onChange={handleChange} placeholder="e.g. 1600" />
                </div>
            </InputGroup>

            <InputGroup
                title="Location & Time"
                icon={<MapPin size={18} />}
                isOpen={openSection === 'location'}
                onToggle={() => toggle('location')}
            >
                <div className="field">
                    <label>Latitude</label>
                    <input type="number" name="Latitude" value={formData.Latitude} onChange={handleChange} placeholder="e.g. 51.5" />
                </div>
                <div className="field">
                    <label>Longitude</label>
                    <input type="number" name="Longitude" value={formData.Longitude} onChange={handleChange} placeholder="e.g. -0.12" />
                </div>
                <div className="field">
                    <label>Month (1-12)</label>
                    <input type="number" name="Month" value={formData.Month} onChange={handleChange} />
                </div>
                <div className="field">
                    <label>Hour (0-23)</label>
                    <input type="number" name="Hour" value={formData.Hour} onChange={handleChange} />
                </div>
                <div className="field">
                    <label>Is Weekend?</label>
                    <select name="Is_Weekend" value={formData.Is_Weekend} onChange={handleChange}>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                </div>
                <div className="field">
                    <label>Is Night?</label>
                    <select name="Is_Night" value={formData.Is_Night} onChange={handleChange}>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                </div>
            </InputGroup>

            <InputGroup
                title="Hazards & Junctions"
                icon={<Activity size={18} />}
                isOpen={openSection === 'hazards'}
                onToggle={() => toggle('hazards')}
            >
                <div className="field">
                    <label>Carriageway Hazards</label>
                    <select name="Carriageway_Hazards" value={formData.Carriageway_Hazards} onChange={handleChange}>
                        <option value="0">None</option>
                        <option value="1">Other object on road</option>
                        <option value="2">Any animal in carriageway</option>
                        <option value="3">Pedestrian in carriageway</option>
                        <option value="6">Previous accident</option>
                    </select>
                </div>
                <div className="field">
                    <label>Junction Detail</label>
                    <select name="Junction_Detail" value={formData.Junction_Detail} onChange={handleChange}>
                        <option value="0">Not at junction</option>
                        <option value="1">Roundabout</option>
                        <option value="3">T or staggered junction</option>
                        <option value="6">Crossroads</option>
                    </select>
                </div>
                <div className="field">
                    <label>Junction Control</label>
                    <select name="Junction_Control" value={formData.Junction_Control} onChange={handleChange}>
                        <option value="0">Not at junction</option>
                        <option value="1">Authorised person</option>
                        <option value="2">Auto traffic signal</option>
                        <option value="4">Give way or uncontrolled</option>
                    </select>
                </div>
            </InputGroup>

        </div>
    );
};

export default InputPanel;
