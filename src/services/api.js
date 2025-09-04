import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('jwtToken');
      //console.log('[Interceptor] Token:', token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
       // console.log('[Interceptor] Authorization header set.');
      }
    }
    return config;
  },
  (error) => {
    console.error('[Interceptor Error]', error);
    return Promise.reject(error);
  }
);

export default api;