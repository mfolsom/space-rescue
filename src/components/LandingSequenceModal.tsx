import React from 'react';
import './LandingSequenceModal.css';

interface LandingSequenceModalProps {
    isVisible: boolean;
    onDismiss: () => void;
    setIsWinModalVisible: (isVisible: boolean) => void; // Add this line
}

const LandingSequenceModal: React.FC<LandingSequenceModalProps> = ({ isVisible, onDismiss, setIsWinModalVisible }) => {
    if (!isVisible) return null;

    const handleClick = () => {
        onDismiss();
        setIsWinModalVisible(true); // Set isWinModalVisible to true when the "Okay" button is clicked
    };

    return (
        <div className="landing-sequence-modal" onClick={handleClick}>
            <div className="landing-sequence-content">
                <h1>Initiating Landing Sequence...</h1>
                <button onClick={handleClick}>Okay</button>
            </div>
        </div>
    );
};

export default LandingSequenceModal;