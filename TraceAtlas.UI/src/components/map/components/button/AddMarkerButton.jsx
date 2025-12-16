import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAddingMode } from "../../../../store/slices/mapSlice.js";

const ToastNotification = ({ show, message, type, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  const isSuccess = type === 'success';
  const bgColor = isSuccess ? 'bg-gradient-to-br from-emerald-500 to-teal-600' : 'bg-gradient-to-br from-rose-500 to-pink-600';
  const iconBgColor = isSuccess ? 'bg-emerald-400/20' : 'bg-rose-400/20';

  return (
    <div className={`
      fixed bottom-8 right-8 z-[9999]
      transform transition-all duration-500 ease-out
      ${show ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'}
    `}>
      <div className={`
        flex items-center gap-4 px-6 py-4 rounded-2xl 
        backdrop-blur-xl border border-white/20 shadow-2xl
        ${bgColor}
      `}>
        <div className={`${iconBgColor} w-10 h-10 rounded-full flex items-center justify-center`}>
          {isSuccess ? (
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          )}
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-white text-sm">
            {isSuccess ? 'Başarılı' : 'Uyarı'}
          </span>
          <span className="text-white/90 text-sm font-medium whitespace-nowrap">
            {message}
          </span>
        </div>
        <button
          onClick={onClose}
          className="ml-4 p-1 hover:bg-white/10 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const AddMarkerButton = () => {
  const dispatch = useDispatch();
  const isAddingMode = useSelector((state) => state.map.isAddingMode);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
  const [isPressed, setIsPressed] = useState(false);

  const triggerNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
  };

  const handleClick = () => {
    const token = localStorage.getItem('accessToken');
    
    if (token) {
      setIsPressed(true);
      setTimeout(() => setIsPressed(false), 200);
      
      dispatch(toggleAddingMode());
      
      if (!isAddingMode) {
        triggerNotification('Konum ekleme modu aktif', 'success');
      } else {
        triggerNotification('Konum ekleme modu kapatıldı', 'success');
      }
    } else {
      triggerNotification('İşlem yapmak için giriş yapmalısınız!', 'error');
    }
  };

  return (
    <>
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
          fixed bottom-8 left-8 z-[9998]
          group flex items-center justify-center
          w-14 h-14 rounded-full 
          backdrop-blur-xl border border-white/20 shadow-2xl
          transition-all duration-300 ease-out
          ${isPressed ? 'scale-95' : 'scale-100'}
          ${
            isAddingMode 
              ? "bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/40"
              : "bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg hover:shadow-xl hover:shadow-slate-900/20"
          }
        `}
      >
        <div className="relative">
          <div className={`
            absolute inset-0 rounded-full transition-all duration-300
            ${isAddingMode ? 'animate-ping bg-emerald-400/30' : 'bg-transparent'}
          `} />
          
          <div className="relative">
            {isAddingMode ? (
              <svg className="w-6 h-6 text-white transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-white transition-transform duration-300 group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            )}
          </div>
        </div>

        {/* Tooltip */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
          Konum Ekle
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45" />
        </div>
      </button>
    </>
  );
};

export default AddMarkerButton;