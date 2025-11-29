import axios from 'axios';

// .env dosyasından okur, okuyamazsa senin verdiğin localhost'u baz alır
const BASE_URL = import.meta.env.VITE_BASE_URL 

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(
  (config) => {
    
    const token = localStorage.getItem('accessToken'); 
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default api;