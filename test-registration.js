const axios = require('axios');

async function testRegistration() {
    const baseUrl = 'http://localhost:4444/auth';

    console.log('--- Testing Registration ---');

    // 1. Test invalid data (missing username)
    try {
        console.log('\n1. Testing missing data (should return 400):');
        await axios.post(`${baseUrl}/register`, {
            email: 'test@example.com',
            password: 'password123'
        });
    } catch (error) {
        console.log('Status:', error.response?.status);
        console.log('Message:', JSON.stringify(error.response?.data?.message));
    }

    // 2. Test weak password
    try {
        console.log('\n2. Testing weak password (should return 400):');
        await axios.post(`${baseUrl}/register`, {
            email: 'test@example.com',
            password: '123',
            username: 'testuser'
        });
    } catch (error) {
        console.log('Status:', error.response?.status);
        console.log('Message:', JSON.stringify(error.response?.data?.message));
    }

    // 3. Test duplicate email (assuming test@example.com exists or will be created)
    // This is hard to automate without a clean state, but we can check if it returns something other than 500
    try {
        console.log('\n3. Testing duplicate/invalid email flow:');
        const res = await axios.post(`${baseUrl}/register`, {
            email: 'existing@example.com',
            password: 'password123',
            username: 'testuser'
        });
        console.log('Status:', res.status);
        console.log('Data:', res.data);
    } catch (error) {
        console.log('Status:', error.response?.status);
        console.log('Message:', error.response?.data?.message);
    }
}

testRegistration();
