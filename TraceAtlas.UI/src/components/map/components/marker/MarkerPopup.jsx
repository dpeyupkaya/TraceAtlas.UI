// MarkerPopup.jsx
import React from 'react';

// Yeşil tema ikonları
const UserIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
  </svg>
);

const EyeIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
    <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
  </svg>
);

const MarkerPopup = ({ location, onOpenDetail }) => {
  const handleDetailClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onOpenDetail(location);
  };

  return (
    // Leaflet popup content'i - sadece içerik, harita kendi çerçevesini ekliyor
    <div className="w-64 bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg shadow-lg border border-emerald-200/50 overflow-hidden">
      
      {/* İçerik Alanı */}
      <div className="p-3">
        
    
        <h3 className="font-bold text-emerald-900 text-base mb-2 line-clamp-1">
          {location.title}
        </h3>
        
        {/* Alt Bilgi */}
        <div className="flex items-center justify-between">
          
          {/* Kullanıcı Bilgisi - Yeşil tema */}
          <div className="flex items-center gap-1.5">
            <div className="p-1 bg-emerald-100 rounded-full">
              <UserIcon className="w-3 h-3 text-emerald-600" />
            </div>
            <span className="text-xs text-emerald-600 font-medium">
              @{location.creatorUsername}
            </span>
          </div>
          
          {/* Detay Butonu - Yeşil gradient */}
          <button 
            onClick={handleDetailClick}
            className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 shadow-md hover:shadow-emerald-500/40 hover:scale-105 active:scale-95 group"
          >
            <EyeIcon className="w-3 h-3 group-hover:scale-110 transition-transform" />
            Detay
          </button>
        </div>
      </div>

      {/* Alt çizgi - Doğa temasına uygun yeşil gradient */}
      <div className="h-1 bg-gradient-to-r from-emerald-400 to-green-400"></div>
    </div>
  );
};

export default MarkerPopup;