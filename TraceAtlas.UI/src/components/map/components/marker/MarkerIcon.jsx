import React from 'react';
import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { LuCameraOff, LuCamera } from "react-icons/lu";

export const getMarkerIcon = (location) => {
  
  // --- YENİ EKLENEN KISIM ---
  // 1. Backend'den gelen optimize edilmiş "hasImage" bayrağı var mı?
  // (GetAll sorgusundan gelen veri buraya düşer)
  const fromFlag = location.hasImage === true;

  // 2. Detay verisi geldiyse BlobUrl listesi dolu mu?
  // (Bazen detay sayfasından haritaya veri basarsan burası çalışır)
  const fromBlob = location.blobUrl && Array.isArray(location.blobUrl) && location.blobUrl.length > 0;

  // 3. Eski usul Base64 var mı?
  const fromBase64 = location.imageBase64 && typeof location.imageBase64 === 'string' && location.imageBase64.length > 10;

  // Herhangi biri TRUE ise "Resim Var" kabul et
  const hasImage = fromFlag || fromBlob || fromBase64;
  // -------------------------

  // --- RENK PALETİ ---
  const bgColor = hasImage ? 'bg-teal-600' : 'bg-slate-700';
  const pointColor = hasImage ? 'text-teal-600' : 'text-slate-700';

  const iconMarkup = (
    <div className="relative w-9 h-9 flex flex-col items-center">
      <div className={`
        relative z-20 w-full h-full rounded-full flex items-center justify-center
        shadow-sm border-[2px] border-white ${bgColor}
      `}>
        {hasImage ? (
          <LuCamera className="w-4 h-4 text-white" strokeWidth={2} />
        ) : (
          <LuCameraOff className="w-4 h-4 text-white" strokeWidth={2} />
        )}
      </div>

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
    className: 'bg-transparent',
    html: renderToStaticMarkup(iconMarkup),
    iconSize: [36, 44],
    iconAnchor: [18, 44],
    popupAnchor: [0, -40]
  });
};