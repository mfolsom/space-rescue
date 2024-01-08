import React from 'react';
import './DataModal.css';

interface DataModalProps {
    isVisible: boolean;
    coordinates: { x: number, y: number, z: number };
}


const DataModal: React.FC<DataModalProps> = ({ isVisible, coordinates }) => {
    if (!isVisible) return null;

    const planetConditions = {
        name: 'Mars',
        weather: ['Lightning Strikes', 'Freezing Clouds', 'Dust Storms', 'High Winds']
    };

    const selectRandomConditions = (conditions: string[]) => {
        const shuffled = [...conditions].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 2);
    };

    const selectedConditions = selectRandomConditions(planetConditions.weather);

    return (
        <div className="data-modal">
            <h2>Galactic Coordinates</h2>
            <p>X: {coordinates.x.toFixed(2)}, Y: {coordinates.y.toFixed(2)}, Z: {coordinates.z.toFixed(2)}</p>

            {coordinates.z >= 3500 && (
                <>
                    <h2>
                        {coordinates.z >= 4250 ? `Successful Orbit: ${planetConditions.name}` : `Approaching ${planetConditions.name}`}
                    </h2>
                    <h3>Landing Conditions</h3>
                    <ul>
                        {selectedConditions.map((condition, index) => (
                            <li key={index}>{condition}</li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default DataModal;

