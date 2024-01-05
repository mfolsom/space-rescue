import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import authService from './authService';

let mock = new MockAdapter(axios);

it('register sends request to correct endpoint with correct payload', async () => {
    const userData = {
        email: 'test@test.com',
        password: 'password',
        passwordConfirmation: 'password',
        displayName: 'Test User',
    };

    // Mock the axios.post function to simulate a successful response
    mock.onPost('http://localhost:3000/users').reply(200, {
        id: 1,
        email: userData.email,
        displayName: userData.displayName,
    });

    // Call the register function
    const response = await authService.register(userData);

    // Check the response
    expect(response.email).toEqual(userData.email);
    expect(response.displayName).toEqual(userData.displayName);
});