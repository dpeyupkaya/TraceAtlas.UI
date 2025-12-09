import React, { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom'; 

export default function TokenAlert() {
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // 1. OTOMATİK GİZLEME EFEKTİ
  // showAlert 'true' olduğunda çalışır, 5 saniye sayar ve kapatır.
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 2000); // 5 saniye sonra gizle

      return () => clearTimeout(timer); // Component unmount olursa timer'ı temizle
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

        // 1. Durum: Süre bitti
        if (remainingTime <= 0) {
            handleLogout();
        } 
     
        else if (remainingTime < 1 * 60 * 1000) {
            const minutesLeft = Math.ceil(remainingTime / 60000);
            const newMessage = `Oturumunuz ${minutesLeft} dakika içinde sona erecek. Lütfen işlerinizi kaydedin.`;
         
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
  }, [navigate]); // message ve showAlert'ı bağımlılıklara eklemiyoruz, sonsuz döngü olmasın diye

  const handleLogout = () => {
    // Çıkış mesajı zaten varsa tekrar tekrar set etme
    if (message === 'Oturumunuz sona erdi. Giriş sayfasına yönlendiriliyorsunuz...') return;

    setMessage('Oturumunuz sona erdi. Giriş sayfasına yönlendiriliyorsunuz...');
    setShowAlert(true);
    
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');

    // Kullanıcı mesajı okusun diye biraz bekletip yönlendiriyoruz
    setTimeout(() => {
      navigate('/auth'); 
    }, 3000);
  };

  if (!showAlert) return null;

  return (
    <Stack sx={{ 
        position: 'fixed', 
        bottom: 50,        // Alt kısımdan 50px yukarıda
        left: '50%',       // Soldan %50 it
        transform: 'translateX(-50%)', // Kendi genişliğinin yarısı kadar geri çek (Tam ortalar)
        zIndex: 9999,
        width: 'max-content', // Sadece içerik kadar genişlik kaplasın
        maxWidth: '90%'       // Mobilde taşmasın
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