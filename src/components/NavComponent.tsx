import React from 'react';
import './NavComponent.css';

interface NavComponentProps {
    onToggleGauges: () => void;
    onOpenData: () => void;
    playerName: string;
    level: number;
    credits: number;
}

const NavComponent: React.FC<NavComponentProps> = ({ onToggleGauges, onOpenData, playerName, level, credits }) => {
    return (
        <div className="top-right-nav">
            <button onClick={onToggleGauges}>Flight Instruments</button>
            <button onClick={onOpenData}>Flight Data</button>
            <div className="player-info">
                <p>Player: {playerName}</p>
                <p>Level: {level}</p>
                <p>Credits: {credits}</p>
            </div>
        </div>
    );
};

export default NavComponent;
