import React, { useCallback, useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom'; 
import { useTranslation } from 'react-i18next';

export default function TokenAlert() {
  const { t } = useTranslation();
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    if (message === t('common.messages.sessionExpired')) return;

    setMessage(t('common.messages.sessionExpired'));
    setShowAlert(true);
    
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');

    setTimeout(() => {
      navigate('/auth'); 
    }, 3000);
  }, [message, navigate, t]);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 2000); 

      return () => clearTimeout(timer); 
    }
  }, [showAlert]);

  useEffect(() => {
    const checkTokenStatus = () => {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      try {
        const decoded = jwtDecode(token);
        const expirationTime = decoded.exp * 1000;
        const now = Date.now();
        const remainingTime = expirationTime - now;

        if (remainingTime <= 0) {
            handleLogout();
        } 
     
        else if (remainingTime < 1 * 60 * 1000) {
            const minutesLeft = Math.ceil(remainingTime / 60000);
            const newMessage = t('common.messages.sessionWarning', { minutes: minutesLeft });
         
            if (message !== newMessage || !showAlert) {
                setMessage(newMessage);
                setShowAlert(true);
            }
        } 
      } catch (error) {
        console.error("Token hatası:", error);
        handleLogout(); 
      }
    };

    checkTokenStatus();
    // Her 10 saniyede bir kontrol (Uyarı kapandıktan sonra süre azalıyorsa tekrar açılmasını sağlar)
    const intervalId = setInterval(checkTokenStatus, 40000);

    return () => clearInterval(intervalId);
  }, [handleLogout, message, showAlert, t]);

  if (!showAlert) return null;

  return (
    <Stack sx={{ 
        position: 'fixed', 
        bottom: 50,      
        left: '50%',      
        transform: 'translateX(-50%)',
        zIndex: 9999,
        width: 'max-content',
        maxWidth: '90%'     
    }}>
      <Alert 
        variant="filled" 
        severity="warning" 
        sx={{ 
            boxShadow: 6, 
            fontSize: '1rem',
            padding: '10px 20px'
        }} 
      >
        {message}
      </Alert>
    </Stack>
  );
}
