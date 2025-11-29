import { jwtDecode } from "jwt-decode";

export const getCurrentUserId = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.sub || 
           decoded.uid || 
           decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] ||
           decoded.id;
  } catch (error) {
    return null;
  }
};