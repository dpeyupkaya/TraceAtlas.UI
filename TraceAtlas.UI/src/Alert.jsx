import React, { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { jwtDecode } from "jwt-decode";


const jwt_decode = jwtDecode.default || jwtDecode;

export default function TokenAlert() {
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    const decoded = jwt_decode(token);
    const expirationTime = decoded.exp * 1000;
    const now = Date.now();
    const remainingTime = expirationTime - now;

    if (remainingTime <= 0) {
      triggerLogout();
      return;
    }

    // Uyarı süresi: token bitmeden 2 dakika önce
    const warningTime = 2 * 60 * 1000;
    const showWarningAt = remainingTime - warningTime;

    let warningTimer = null;
    if (showWarningAt > 0) {
      warningTimer = setTimeout(() => {
        setMessage('Oturumunuz 2 dakika içinde sona erecek. Lütfen tekrar giriş yapınız.');
        setShowAlert(true);
      }, showWarningAt);
    } else {
      // Token bitimine 2 dakikadan az kaldıysa hemen göster
      setMessage('Oturumunuz 2 dakika içinde sona erecek. Lütfen tekrar giriş yapınız.');
      setShowAlert(true);
    }

    // Logout timer: token süresi dolunca çalışır
    const logoutTimer = setTimeout(() => {
      triggerLogout();
    }, remainingTime);

    function triggerLogout() {
      setMessage('Oturumunuz sona erdi. Lütfen tekrar giriş yapınız.');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        localStorage.removeItem('accessToken');
        window.location.href = '/auth';
      }, 3000); // 3 saniye sonra yönlendirme
    }

    return () => {
      clearTimeout(warningTimer);
      clearTimeout(logoutTimer);
    };
  }, []);

  if (!showAlert) return null;

  return (
    <Stack sx={{ width: '100%', position: 'fixed', top: 20, zIndex: 9999 }}>
      <Alert variant="outlined" severity="error">
        {message}
      </Alert>
    </Stack>
  );
}
