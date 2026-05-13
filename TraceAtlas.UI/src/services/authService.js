import api from '../api/api.js';
import { jwtDecode } from "jwt-decode"; 

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/Auth/login', { email, password });
   
    const { accessToken } = response.data;

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }
    
    return response.data;
  },

  googleLogin: async (idToken) => {
    const response = await api.post('/Auth/google-login', { idToken });
    
    const { accessToken } = response.data;
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }
    
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/Auth/register', userData);
    return response.data;
  },
  
  forgotPassword: async (email) => {
    const response = await api.post('/Auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (token, newPassword) => {
    const response = await api.post('/Auth/reset-password', { 
      token, 
      newPassword 
    });
    return response.data;
  },

  confirmEmail: async (token) => {
    const response = await api.get(`/Auth/confirm-email?token=${token}`);
    return response.data;
  },

  // Çift yazılan logout fonksiyonunu teke düşürdüm (en kapsamlı olanı bıraktım)
  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
  },

  getCurrentUserId: () => {
    const token = localStorage.getItem('accessToken');  
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);

        return (
            decoded.Id ||
            decoded.id ||
            decoded.sub ||
            decoded.userId ||
            decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] ||
            null
        );
    } catch (error) {
        console.error("Token decode hatası:", error);
        return null;
    }
  }
};