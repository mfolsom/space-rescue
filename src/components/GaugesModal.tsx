import React from 'react';
import CustomGauge from './CustomGauge';
import VelocityIcon from './../assets/velocity.png';
import FuelIcon from './../assets/fuel.png';
import OxygenIcon from './../assets/oxygen.png';
import './GaugesModal.css';

const GaugesModal: React.FC<{ isVisible: boolean, velocity: number, fuel: number }> = ({ isVisible, velocity, fuel }) => {
    // Normalize velocity to a percentage (assuming full throttle corresponds to velocity of 100)
    const velocityPercent = Math.round(Math.min(Math.max(velocity, 0), 100));

    return (
        <div>
            {isVisible && (
                <div className="modal">
                    {/* You may want to keep or move the close functionality to the parent */}
                    <div className="gauges-container">
                        <CustomGauge radius={100} percent={velocityPercent} icon={VelocityIcon} label="Velocity" />
                        <CustomGauge radius={100} percent={Math.round(fuel)} icon={FuelIcon} label="Fuel" />
                        <CustomGauge radius={100} percent={83} icon={OxygenIcon} label="Oxygen" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default GaugesModal;
