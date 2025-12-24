import React from 'react';
import { Eye, Camera, MapPin } from 'lucide-react';

const MarkerPopup = ({ location, onOpenDetail }) => {
  const handleDetailClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onOpenDetail(location);
  };

  // Saçma duran başlıkları daha profesyonel hale getirdik
  const displayTitle = location.title 
    ? location.title 
    : (location.hasImage ? "Keşfetmek için tıklayın"  : "Keşfetmek için tıklayın");

  return (
    <div className="w-52 bg-zinc-950 rounded-2xl shadow-2xl overflow-hidden border border-white/10">
      
      {/* Üst Kısım: İkon ve Başlık */}
      <div className="p-4">
        <div className="flex flex-col items-center text-center gap-3">
          
          

          {/* Başlık */}
          <h3 className="text-white text-sm font-bold tracking-tight px-1 leading-snug uppercase">
            {displayTitle}
          </h3>
        </div>

        {/* Buton Alanı */}
        <div className="mt-4">
          <button 
            onClick={handleDetailClick}
            className={`
              w-full flex items-center justify-center gap-2 
              py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest
              transition-all duration-300 active:scale-95
              ${location.hasImage 
                ? 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-lg shadow-emerald-500/20' 
                : 'bg-zinc-800 hover:bg-zinc-700 text-white'}
            `}
          >
            <Eye size={14} />
            İncele
          </button>
        </div>
      </div>

      {/* Alt Dekoratif Çizgi */}
      <div className={`h-1 w-full ${location.hasImage ? 'bg-emerald-500' : 'bg-zinc-700'}`}></div>
    </div>
  );
};

export default MarkerPopup;