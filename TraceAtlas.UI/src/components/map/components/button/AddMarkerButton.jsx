import React, { useState, useEffect } from 'react';

// --- BİLDİRİM BİLEŞENİ (ALTA TAŞINDI) ---
const ToastNotification = ({ show, message, type, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // 3 saniye sonra kaybolur
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  // Başarılı (Success) ve Hata (Error) renk şemaları
  const isSuccess = type === 'success';
  const bgColor = isSuccess ? 'bg-emerald-900/90' : 'bg-rose-900/90'; // Biraz daha opak yaptım alt kısımda daha net görünsün diye
  const borderColor = isSuccess ? 'border-emerald-500/30' : 'border-rose-500/30';
  const iconColor = isSuccess ? 'text-emerald-400' : 'text-rose-400';
  const textColor = isSuccess ? 'text-emerald-100' : 'text-rose-100';

  return (
    <div className={`
      fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 
      flex items-center gap-3 px-6 py-4 rounded-2xl 
      backdrop-blur-md border shadow-[0_8px_32px_rgba(0,0,0,0.4)] 
      transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 
      ${bgColor} ${borderColor}
    `}>
      {/* İkon */}
      <div className={`${iconColor}`}>
        {isSuccess ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        )}
      </div>
      
      {/* Mesaj */}
      <span className={`font-medium text-sm ${textColor} whitespace-nowrap`}>{message}</span>
    </div>
  );
};

// --- ANA BUTON BİLEŞENİ ---
const AddMarkerButton = ({ onClick, isActive }) => {
  // Bildirim State'i
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  // Bildirim tetikleyici fonksiyon
  const triggerNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
  };

  const handleClick = () => {
    const token = localStorage.getItem('accessToken');
    
    if (token) {
      onClick(); 
      
      if (!isActive) {
        triggerNotification('Konum ekleme modu aktif', 'success');
      } else {
        triggerNotification('Konum ekleme modu kapatıldı', 'success');
      }
    } else {
      // Token yoksa sadece alt tarafta uyarı göster
      triggerNotification('İşlem yapmak için giriş yapmalısınız!', 'error');
    }
  };

  return (
    <>
      {/* Bildirim Bileşeni - CSS ile alta sabitlendi */}
      <ToastNotification 
        show={notification.show} 
        message={notification.message} 
        type={notification.type} 
        onClose={() => setNotification({ ...notification, show: false })} 
      />

      <button
        onClick={handleClick}
        title="Konum Ekle"
        className={`
          group flex items-center justify-center
          w-16 h-16 rounded-full 
          backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]
          transition-all duration-300 ease-in-out
          ${
            isActive 
              ? "bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.6)] scale-110"
              : "bg-emerald-900/60 text-emerald-100 hover:bg-emerald-800/80 hover:scale-105"
          }
        `}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="32" 
          height="32" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className={`transition-transform duration-300 ${isActive ? 'rotate-90' : 'rotate-0'}`}
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
    </>
  );
};

export default AddMarkerButton;