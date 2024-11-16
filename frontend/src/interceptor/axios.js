import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000',
});

instance.interceptors.request.use(
    async config => {
        const token = localStorage.getItem('access_token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem('refresh_token');
            try {
                const response = await axios.post('http://localhost:8000/token/refresh/', { refresh: refreshToken });

                if (response.status === 200) {
                    const newAccessToken = response.data.access;
                    const newRefreshToken = response.data.refresh;

                    localStorage.setItem('access_token', newAccessToken);
                    if (newRefreshToken) {
                        localStorage.setItem('refresh_token', newRefreshToken);
                    }

                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                    return instance(originalRequest);
                }
            } catch (err) {
                console.error('Error refreshing token:', err);
            }
        }

        return Promise.reject(error);
    }
);

export default instance;