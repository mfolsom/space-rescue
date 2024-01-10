import React from 'react';
import './WinModal.css'; // Import the CSS file

interface WinModalProps {
    isVisible: boolean;
}

const WinModal: React.FC<WinModalProps> = ({ isVisible }) => {
    if (!isVisible) return null;

    return (
        <div className="win-modal">
            {/* <img src="path-to-your-image.jpg" alt="Win" className="win-image" /> */}
            <div className="win-text">Congratulations, you won!</div>
        </div>
    );
};

export default WinModal;