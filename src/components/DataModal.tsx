import React, { useState } from 'react';
import './DataModal.css';

interface DataModalProps {
    isVisible: boolean;
    coordinates: { x: number, y: number, z: number };
    playerInfo: { name: string, level: number, credits: number };
    // setPlayerInfo: (playerInfo: { name: string, level: number, credits: number }) => void;
    updateCredits: (newCredits: number) => void;
    setIsLandingSequenceModalVisible: (isVisible: boolean) => void;
}

const DataModal: React.FC<DataModalProps> = ({ isVisible, coordinates, playerInfo, updateCredits, setIsLandingSequenceModalVisible }) => {
    const [isFuelModalVisible, setIsFuelModalVisible] = useState(false);

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

    const handleAttemptLandingClick = () => {
        setIsFuelModalVisible(true);
    };

    const handleYesClick = () => {
        if (!playerInfo) {
            return;
        }
        const newCredits = playerInfo.credits - 100; // Subtract 100 from the user's current credits
        updateCredits(newCredits); // Update the local state
        setIsFuelModalVisible(false); // Close the modal
        setIsLandingSequenceModalVisible(true); // Open the landing sequence modal
    };

    return (
        <div className="data-modal">
            <h2>Galactic Coordinates</h2>
            <p>X: {coordinates.x.toFixed(2)}</p>
            <p>Y: {coordinates.y.toFixed(2)}</p>
            <p>Z: {coordinates.z.toFixed(2)}</p>

            {coordinates.z >= 3500 && (
                <>
                    <h2 className={coordinates.z >= 4250 ? `color-a` : `color-b`}>
                        {coordinates.z >= 4250 ? `Successful Orbit: ${planetConditions.name}` : `Approaching Orbit: ${planetConditions.name}`}
                    </h2>
                    <h3>Landing Conditions</h3>
                    <ul>
                        {selectedConditions.map((condition, index) => (
                            <li key={index}>{condition}</li>
                        ))}
                    </ul>
                    {coordinates.z >= 4250 && (
                        <button onClick={handleAttemptLandingClick}>Attempt Landing?</button>
                    )}
                </>
            )}

            {isFuelModalVisible && (
                <div className="fuel-modal">
                    <p>You don't have enough fuel to land. Spend 100 credits to fill up?</p>
                    <button onClick={handleYesClick}>Yes</button>
                    <button onClick={() => setIsFuelModalVisible(false)}>No</button>
                </div>
            )}
        </div>
    );
};

export default DataModal;