import React, { useState } from 'react';
import './GameIntroModal.css';

const GameIntroModal: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);

    return (
        isModalOpen && (
            <div className="game-intro">
                <div className="game-intro-content">
                    <h1>Welcome to Space Rescue!</h1>
                    <p className="fade-in-text">You are a Pilot Ranger in the Space Response Corps. Your job is to receive dispatches and go where you are needed to rescue people around the solar system.</p>
                    <p className="fade-in-text">You have received a distress call from Rover on the surface of Mars!</p>
                    <p className="fade-in-text">Your goal is to land successfully on Mars and rescue Rover</p>
                    <p className="fade-in-text">To do this you must approach Mars and enter into a successful orbit around the planet. Watch your fuel levels as you fly! Once you're in orbit, you will receive weather conditions on the surface. </p>
                    <button className="fade-in-button" onClick={() => setIsModalOpen(false)}>Okay</button>
                </div>
            </div>
        )
    );
};

export default GameIntroModal;