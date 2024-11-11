import axios from 'axios';
import { RefreshCw } from 'react-feather';

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

        const accessToken = response.data.access;
        const refreshToken = response.data.refresh;
        if (accessToken) {
            localStorage.clear();
            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('refresh_token', refreshToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            navigate('/home');
        }

        return response.data;
    } catch (error) {
         throw error.response ? error.response.data : error.message;
    }
}

export const logout = async (navigate, setIsAuth) => {
    const refreshToken = localStorage.getItem('refresh_token');

    try {
        await axios.post('http://localhost:8000/token/blacklist/', { refresh: refreshToken });
      } catch (error) {
        console.error("Error logging out:", error);
      } finally {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setIsAuth(false);
        navigate('/login');
      }
};