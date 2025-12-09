import api from '../api/api.js';
// jwt-decode kütüphanesini kurmuştuk (npm install jwt-decode), onu da import edelim
// Eğer kurmadıysan terminale: npm install jwt-decode
import { jwtDecode } from "jwt-decode"; 

export const authService = {
  // ✅ Login İşlemi (Güncellendi)
  login: async (email, password) => {
    const response = await api.post('/Auth/login', { email, password });
   
    const { accessToken, refreshToken } = response.data;

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }
    


    return response.data;
  },

  // ✅ Register İşlemi
  register: async (userData) => {
    // userData: { userName, email, password, firstName, lastName }
    const response = await api.post('/Auth/register', userData);
    return response.data;
  },
  
  // ✅ Logout (Çıkış) - Tokenları temizlemek için bunu da ekle
  logout: () => {
    localStorage.removeItem('accessToken');
   
  },

  // ... diğer forgotPassword, resetPassword, confirmEmail fonksiyonların aynı kalabilir
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

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
  },

 getCurrentUserId: () => {
    const token = localStorage.getItem('accessToken');  // DOĞRU TOKEN BU
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