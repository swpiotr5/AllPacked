import axios from 'axios';

export const register = async(data) => {
    try {
        const response = await axios.post('http://localhost:8000/register/', data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export const login = async(data, navigate) => {
    try {
        const response = await axios.post('http://localhost:8000/token/', data);
        console.log('Server response:', response.data);

        const accessToken = response.data.access;
        if (accessToken) {
            localStorage.clear();
            localStorage.setItem('access_token', accessToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            navigate('/home');
        }

        return response.data;
    } catch (error) {
        console.error('Login error:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : error.message;
    }
}