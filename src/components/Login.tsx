// src/components/Login.tsx
import React, { useState } from 'react';
import authService from '../services/authService';

interface LoginProps {
    onLoginSuccess: (userData: any) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await authService.login({
                user: {
                    email,
                    password
                }
            });
            console.log('Login successful', response);
            onLoginSuccess(response);
        } catch (error) {
            setErrors(['Login failed. Please check your credentials.']);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="login-form">

                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
            {errors.length > 0 && (
                <div>
                    {errors.map((error, index) => (
                        <p key={index} style={{ color: 'red' }}>{error}</p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Login;
