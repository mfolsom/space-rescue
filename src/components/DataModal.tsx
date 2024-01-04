import React from 'react';
import './DataModal.css';

interface DataModalProps {
    isVisible: boolean;
    coordinates: { x: number, y: number, z: number }; // Add coordinates prop
}


const DataModal: React.FC<DataModalProps> = ({ isVisible, coordinates }) => {
    if (!isVisible) return null;

    const planetConditions = {
        name: 'Mars',
        weather: ['Lightning Strikes', 'Freezing Clouds', 'Dust Storms', 'Wind Trajectories']
    };

    return (
        <div className="data-modal">
            <h2>Galactic Coordinates</h2>
            <p>X: {coordinates.x.toFixed(2)}, Y: {coordinates.y.toFixed(2)}, Z: {coordinates.z.toFixed(2)}</p>

            <h2>Planetary Conditions</h2>
            <p>Planet: {planetConditions.name}</p>
            <ul>
                {planetConditions.weather.map((condition, index) => (
                    <li key={index}>{condition}</li>
                ))}
            </ul>
        </div>
    );
};

export default DataModal;

