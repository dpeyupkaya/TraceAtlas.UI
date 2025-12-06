import React from 'react';
import { useSelector } from 'react-redux';

const GlobalLoader = () => {
  const { isLoading } = useSelector((state) => state.ui);

  if (!isLoading) return null;

  return (
    // Z-Index çok yüksek, tıklamaları engeller ama arkaplanı karartmaz (daha modern hissettirir)
    <div className="fixed inset-0 z-[9999] pointer-events-auto cursor-wait">
      
      {/* Şeffaf koruyucu katman (Tıklamayı engeller ama görüntüyü bozmaz) */}
      <div className="absolute inset-0 bg-transparent" />

      {/* Loading Bar Haznesi */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-transparent overflow-hidden">
        
        {/* Hareket Eden Bar */}
        {/* shadow-emerald-500/50 ile çok hafif, şık bir parlama verdik */}
        <div className="h-full w-full bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_1px_10px_rgba(16,185,129,0.5)] animate-clean-slide" />
      
      </div>

      <style>{`
        @keyframes clean-slide {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-clean-slide {
          /* Hızlanıp yavaşlamadan düz akar, gözü yormaz */
          animation: clean-slide 1s infinite cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
};

export default GlobalLoader;