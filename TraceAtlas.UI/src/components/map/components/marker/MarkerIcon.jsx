import React from 'react';
import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { LuCameraOff ,LuCamera  } from "react-icons/lu";

export const getMarkerIcon = (imageBase64) => {
  // Gevşek kontrol devam ediyor: String ise ve 10 karakterden uzunsa resim var say.
  const hasImage = imageBase64 && typeof imageBase64 === 'string' && imageBase64.length > 10;

  // --- RENK PALETİ (Modern & Minimalist) ---
  // Fotoğraf varsa: Teal (Modern Turkuaz/Yeşil)
  // Fotoğraf yoksa: Slate (Koyu Gri/Mavi - daha nötr)
  const bgColor = hasImage ? 'bg-teal-600' : 'bg-slate-700';
  const pointColor = hasImage ? 'text-teal-600' : 'text-slate-700';

  const iconMarkup = (
    // Ana taşıyıcı küçültüldü (w-9 h-9) ve hover efektleri (group, hover:scale) kaldırıldı.
    <div className="relative w-9 h-9 flex flex-col items-center">
      
      {/* --- YUVARLAK GÖVDE --- */}
      <div className={`
        relative z-20 w-full h-full rounded-full flex items-center justify-center
        shadow-sm border-[2px] border-white ${bgColor}
      `}>
        {hasImage ? (
          // Kamera İkonu (Biraz daha küçük ve zarif)
          <LuCamera  className="w-4 h-4 text-white" strokeWidth={2} />
        ) : (
          // Pin İkonu
          <LuCameraOff   className="w-4 h-4 text-white" strokeWidth={2} />
        )}
      </div>

      {/* --- ALTTAKİ SİVRİ OK UCU --- */}
      {/* SVG kullanarak daha keskin bir uç elde ediyoruz */}
      <svg 
        className={`absolute -bottom-[8px] z-10 w-4 h-3 ${pointColor}`}
        viewBox="0 0 16 12" 
        fill="currentColor"
      >
         <path d="M8 12L0 0h16L8 12z"/>
      </svg>

    </div>
  );

  return L.divIcon({
    className: 'bg-transparent', // Leaflet'in varsayılan stilini sıfırla
    html: renderToStaticMarkup(iconMarkup),
    iconSize: [36, 44],    // Toplam boyut (gövde + uç)
    iconAnchor: [18, 44],  // İkonun sivri ucunun tam konuma denk geleceği nokta (X: ortası, Y: en altı)
    popupAnchor: [0, -40]  // Popup'ın açılacağı yer (ikonun biraz üstü)
  });
};