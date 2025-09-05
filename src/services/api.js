import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://oktech-boasaude-production.up.railway.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Log da URL base para debug
console.log('API Base URL:', api.defaults.baseURL);

api.interceptors.request.use(
  (config) => {
    console.log('[API Request]', config.method?.toUpperCase(), config.url, config.params);
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    console.error('[Interceptor Error]', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('[API Response]', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('[API Error]', error.response?.status, error.config?.url, error.message);
    return Promise.reject(error);
  }
);

export default api;