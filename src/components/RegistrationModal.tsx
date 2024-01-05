import React from 'react';
import Registration from './Registration';
import './RegistrationModal.css';

interface RegistrationModalProps {
    onRegistrationSuccess: () => void;
    onShowLogin: () => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ onRegistrationSuccess, onShowLogin }) => {
    return (
        <div className="registration-modal">
            <div className="registration-modal-content">
                <Registration onRegistrationSuccess={onRegistrationSuccess} onShowLogin={onShowLogin} />
            </div>
        </div>
    );
};

export default RegistrationModal;
