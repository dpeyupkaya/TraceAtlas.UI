// src/components/navbar/MobileMenu.jsx
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// İkonları dışarıda tanımlayarak gereksiz re-render'ı önledik
const icons = {
  Map: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.159.69.159 1.006 0Z" />
    </svg>
  ),
  Profile: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
  ),
  // Default ikon
  Default: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
       <circle cx="12" cy="12" r="10" />
    </svg>
  )
};

const MobileMenu = ({ isOpen, items, onClose }) => {
  const location = useLocation();

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Sayfanın arkada kaymasını engelle
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Arka plan overlay tıklaması
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Koyu Arka Plan Overlay (Blur efektli) */}
      <div 
        className="fixed inset-0 bg-stone-900/40 backdrop-blur-md z-[9998] animate-fadeIn transition-opacity duration-300"
        onClick={handleOverlayClick}
      />

      {/* Menü Konteyner */}
      <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-20 animate-slideDown pointer-events-none px-4">
        <div className="w-full max-w-md pointer-events-auto">
          
          {/* Glassmorphism Kart */}
          <div className="bg-white/90 backdrop-blur-3xl border border-white/50 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] rounded-3xl overflow-hidden ring-1 ring-black/5">
            
            {/* Header: Başlık ve Kapat Butonu */}
            <div className="flex items-center justify-between p-5 border-b border-stone-200/50 bg-white/50">
              <h3 className="text-lg font-bold text-[#1E3A3A] tracking-tight">Menü</h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-red-50 hover:text-red-500 rounded-full transition-all active:scale-90 text-stone-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Menü Öğeleri Listesi */}
            <div className="p-3 space-y-2">
              {items.map((item, index) => {
                const isActive = location.pathname === item.href;
                
                return (
                  <Link
                    key={index}
                    to={item.href}
                    onClick={onClose}
                    className={`
                      relative overflow-hidden flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group
                      ${isActive 
                        ? 'text-white shadow-[0_4px_15px_-3px_rgba(45,85,79,0.4)] ring-1 ring-[#4ade80]/30' 
                        : 'text-stone-600 hover:bg-stone-100/80 hover:text-[#1E3A3A]'
                      }
                    `}
                    style={{
                      // Aktifse senin koyu yeşil gradyanın, değilse şeffaf
                      background: isActive 
                        ? 'linear-gradient(110deg, #1E3A3A 0%, #2D554F 100%)' 
                        : 'transparent'
                    }}
                  >
                    {/* Ikon Kutusu */}
                    <div className={`p-2 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? 'bg-white/10 text-emerald-300' 
                        : 'bg-stone-100 text-stone-500 group-hover:bg-white group-hover:text-[#2D554F] group-hover:shadow-sm'
                    }`}>
                      {icons[item.label] || icons.Default}
                    </div>
                    
                    {/* Label */}
                    <span className={`font-semibold flex-1 text-base tracking-wide ${
                        isActive ? 'text-white' : ''
                    }`}>
                      {item.label}
                    </span>

                    {/* Aktif Durum Göstergeleri (Nokta ve Ok) */}
                    {isActive && (
                      <div className="flex items-center gap-2">
                         {/* Yanıp Sönen Yeşil Nokta */}
                        <div className="w-2 h-2 bg-[#4ade80] rounded-full shadow-[0_0_8px_#4ade80] animate-pulse"></div>
                      </div>
                    )}
                    
                    {/* Sağ Ok */}
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 20 20" 
                      fill="currentColor" 
                      className={`w-5 h-5 transition-transform duration-300 ${
                        isActive 
                            ? 'text-emerald-300 translate-x-0' 
                            : 'text-stone-300 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-[#2D554F]'
                      }`}
                    >
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                  </Link>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;