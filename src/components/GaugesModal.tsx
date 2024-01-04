import React from 'react';
import CustomGauge from './CustomGauge';
import VelocityIcon from './../assets/velocity.png';
import FuelIcon from './../assets/fuel.png';
import OxygenIcon from './../assets/oxygen.png';
import './GaugesModal.css';

const GaugesModal: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
    return (
        <div>
            {isVisible && (
                <div className="modal">
                    {/* You may want to keep or move the close functionality to the parent */}
                    <div className="gauges-container">
                        <CustomGauge radius={100} percent={25} icon={VelocityIcon} label="Velocity" />
                        <CustomGauge radius={100} percent={10} icon={FuelIcon} label="Fuel" />
                        <CustomGauge radius={100} percent={80} icon={OxygenIcon} label="Oxygen" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default GaugesModal;
