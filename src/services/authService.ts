import axios from 'axios'; // If you are using axios

const API_BASE_URL = import.meta.env.VITE_API_URL;

interface User {
    email: string;
    password: string;
    passwordConfirmation?: string;
    displayName?: string;
}

// User Registration
const register = async (userData: User) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users`, {
            user: {
                email: userData.email,
                password: userData.password,
                password_confirmation: userData.passwordConfirmation,
                display_name: userData.displayName
            }
        });
        return response.data;
    } catch (error) {
        console.error("Registration error", error);
        throw error;
    }
};

const login = async (user: { user: Pick<User, 'email' | 'password'> }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/sign_in`, user);
        // You might want to store the user token here if your API provides one
        return response.data;
    } catch (error) {
        console.error("Login error", error);
        throw error;
    }
};

// User Logout
const logout = async () => {
    try {
        await axios.delete(`${API_BASE_URL}/users/sign_out`);
        // Handle post-logout logic (like clearing local storage) here
    } catch (error) {
        console.error("Logout error", error);
        throw error;
    }
};

// Fetch User Details
const getUserDetails = async (userId: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user details", error);
        throw error;
    }
};

//Update User Credits
const updateUserCredits = async (userId: string, newCredits: number) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/users/${userId}`, {
            user: {
                credits: newCredits
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating user credits", error);
        throw error;
    }
};

const authService = { register, login, logout, getUserDetails, updateUserCredits };
export default authService;
