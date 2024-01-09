// src/components/Registration.tsx
import { useState } from 'react';
import authService from '../services/authService';


interface AxiosError extends Error {
    response: {
        data: {
            errors: string[];
        };
    };
}

interface RegistrationProps {
    onRegistrationSuccess: () => void;
    onShowLogin: () => void;
}

const Registration: React.FC<RegistrationProps> = ({ onRegistrationSuccess, onShowLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await authService.register({
                email,
                password,
                passwordConfirmation: passwordConfirmation,
                displayName: displayName,
            });
            console.log('Registration successful', response);
            onRegistrationSuccess();
        } catch (error) {
            const axiosError = error as AxiosError;
            setErrors(
                axiosError.response &&
                    axiosError.response.data &&
                    Array.isArray(axiosError.response.data.errors) ?
                    axiosError.response.data.errors :
                    ['Registration failed']
            );
        }
    };

    return (
        <div>
            <h1>Welcome to Space Rescue!</h1>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} className="registration-form">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email" />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} aria-label="Password" />

                <label htmlFor="passwordConfirmation">Confirm Password:</label>
                <input type="password" id="passwordConfirmation" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} aria-label="Confirm Password" />

                <label htmlFor="displayName">Display Name:</label>
                <input type="text" id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} aria-label="Display Name" />

                <button type="submit">Submit</button>
            </form>
            {errors.length > 0 && (
                <div>
                    {errors.map((error, index) => (
                        <p key={index} style={{ color: 'red' }}>{error}</p>
                    ))}
                </div>
            )}
            <div className="login-link">
                <p>
                    Already have an account? <a href="#" onClick={onShowLogin} >Log in</a>
                </p>
            </div>
        </div >
    );
};

export default Registration;
