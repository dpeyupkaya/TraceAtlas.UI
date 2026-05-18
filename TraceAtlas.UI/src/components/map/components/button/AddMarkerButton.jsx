import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toggleAddingMode } from "../../../../store/slices/mapSlice.js";

// Bildirim Bileşeni - Tepeye ve Merkeze Taşındı
const ToastNotification = ({ show, message, type, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  const isSuccess = type === 'success';
  
  return (
    <div className={`
      fixed top-30 left-1/2 -translate-x-1/2 z-[10000]
      w-[calc(100%-2rem)] max-w-[400px]
      transform transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
      ${show ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-12 opacity-0 scale-95'}
    `}>
      <div className={`
        flex items-center gap-4 px-5 py-4 rounded-[20px] 
        backdrop-blur-xl border border-white/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]
        ${isSuccess 
          ? 'bg-emerald-500/90 text-white' 
          : 'bg-rose-500/90 text-white'}
      `}>
        {/* İkon */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          {isSuccess ? (
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          )}
        </div>

        {/* Mesaj */}
        <div className="flex-1 text-center">
          <p className="text-sm font-bold tracking-wide leading-tight">
            {message}
          </p>
        </div>

        {/* Kapatma butonu */}
        <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
          <svg className="w-4 h-4 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const AddMarkerButton = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isAddingMode = useSelector((state) => state.map.isAddingMode);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  const triggerNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
  };

  const handleClick = () => {
    const token = localStorage.getItem('accessToken');
    
    if (token) {
      dispatch(toggleAddingMode());
      
      triggerNotification(
        !isAddingMode ? t('map.addButton.modeOn') : t('map.addButton.modeOff'), 
        'success'
      );
    } else {
      triggerNotification(t('map.addButton.loginRequired'), 'error');
    }
  };

  return (
    <>
      <ToastNotification 
        show={notification.show} 
        message={notification.message} 
        type={notification.type} 
        onClose={() => setNotification(prev => ({ ...prev, show: false }))} 
      />

      <button
        onClick={handleClick}
        className={`
          fixed bottom-10 left-10 z-[9998]
          md:left-10 md:translate-x-0
          group flex items-center justify-center
          w-14 h-14 rounded-full 
          backdrop-blur-xl border border-white/20 shadow-2xl
          transition-all duration-300 active:scale-90
          ${isAddingMode 
            ? "bg-emerald-500 shadow-emerald-500/40" 
            : "bg-zinc-900 hover:bg-zinc-800"}
        `}
      >
        <div className="relative">
          {isAddingMode && (
            <div className="absolute inset-0 rounded-full animate-ping bg-emerald-400/40 scale-150" />
          )}
          <div className="relative z-10">
            {isAddingMode ? (
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-white group-hover:rotate-90 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            )}
          </div>
        </div>
      </button>
    </>
  );
};

export default AddMarkerButton;
