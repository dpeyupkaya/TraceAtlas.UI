import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

export const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.clear(); // Konsolu temizle
    localStorage.removeItem('accessToken'); // Token sil
    // Eğer backend refresh token logout varsa çağırabilirsin
    navigate('/auth'); // Login sayfasına yönlendir
  };

  return (
    <div>
      <Button variant="contained" color="error" onClick={handleLogout}>
        Çıkış Yap
      </Button>
    </div>
  );
};

export default Logout;
