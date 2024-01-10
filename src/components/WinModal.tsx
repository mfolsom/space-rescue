import React from 'react';
import './WinModal.css'; // Import the CSS file
import winImage from '../assets/wingame.png'; // Import the win image

interface WinModalProps {
    isVisible: boolean;
}

const WinModal: React.FC<WinModalProps> = ({ isVisible }) => {
    if (!isVisible) return null;

    return (
        <div className="win-modal">
            <div className="win-image">
                <img src={winImage} alt="Win" className="win-image-inner" />
            </div>
            <div className="win-text">Congratulations, you rescued Rover!</div>
        </div>
    );
};

export default WinModal;