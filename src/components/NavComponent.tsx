import React from 'react';
import './NavComponent.css';
import playerIcon from '../assets/astronaut.png'
import creditsIcon from '../assets/credits.png'
import levelIcon from '../assets/level.png'

interface NavComponentProps {
    isVisible: boolean;
    onToggleGauges: () => void;
    onOpenData: () => void;
    playerName: string;
    level: number;
    credits: number;
}

const NavComponent: React.FC<NavComponentProps> = ({ isVisible, onToggleGauges, onOpenData, playerName, level, credits }) => {
    if (!isVisible) return null;
    return (
        <div className="top-right-nav">

            <div className="player-info">
                <p><img className="player-icon" src={playerIcon} alt="Player Icon" /> {playerName}</p>
                <p><img className="player-icon" src={levelIcon} alt="Level Icon" /> Level: {level}</p>
                <p><img className="player-icon" src={creditsIcon} alt="Credits Icon" /> Credits: {credits}</p>

            </div>
            <button onClick={onOpenData}>Flight Data</button>
            <button onClick={onToggleGauges}>Flight Instruments</button>
        </div>
    );
};

export default NavComponent;
