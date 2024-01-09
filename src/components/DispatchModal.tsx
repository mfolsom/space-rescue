import React, { useState, useEffect } from 'react';
import './DispatchModal.css';

interface DispatchModalProps {
    isVisible: boolean;
    onDismiss: () => void;
}

const DispatchModal: React.FC<DispatchModalProps> = ({ isVisible, onDismiss }) => {
    if (!isVisible) return null;

    const [message, setMessage] = useState('');
    const [charIndex, setCharIndex] = useState(0);

    const fullMessage = "***incoming transmission*** ruff woof grrr woof [automatic AI translation: This is Rover, I'm stranded on Mars, please rescue me]";
    const typingSpeed = 100; // in milliseconds

    useEffect(() => {
        if (charIndex < fullMessage.length) {
            const timer = setTimeout(() => {
                setMessage((prevMessage) => prevMessage + fullMessage[charIndex]);
                setCharIndex((prevIndex) => prevIndex + 1);
            }, typingSpeed);
            return () => clearTimeout(timer);
        }
    }, [charIndex, fullMessage, typingSpeed]);

    return (
        <div className="dispatch-modal" onClick={onDismiss}>
            <p>{message}</p>
        </div>
    );
};

export default DispatchModal;