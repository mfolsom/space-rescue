import axios from 'axios'; // If you are using axios

const API_BASE_URL = "http://localhost:3000"; // Replace with actual API URL

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


// User Login
const login = async (credentials: Pick<User, 'email' | 'password'>) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/sign_in`, credentials);
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

const authService = { register, login, logout, getUserDetails };
export default authService;
