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

    const handleSubmit = async (e) => {
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
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
                </div>
                <div>
                    <label>Display Name:</label>
                    <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                </div>
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
                    Already have an account? <span onClick={onShowLogin} style={{ cursor: 'pointer', color: 'blue' }}>Log in</span>
                </p>
            </div>
        </div>
    );
};

export default Registration;
