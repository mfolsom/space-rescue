// src/components/LoginModal.tsx
import React from 'react';
import Login from './Login';
import './LoginModal.css';

interface LoginModalProps {
    onLoginSuccess: (userData: any) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onLoginSuccess }) => {
    return (
        <div className="login-modal">
            <div className="login-modal-content">
                <Login onLoginSuccess={onLoginSuccess} />
            </div>
        </div>
    );
};

export default LoginModal;
