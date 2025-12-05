import L from 'leaflet';

// SVG Kodları (String olarak - Performans için en iyisi bu)
const CAMERA_SVG = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-white">
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
    <circle cx="12" cy="13" r="3"></circle>
  </svg>
`;

const DOT_SVG = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-white">
    <circle cx="12" cy="12" r="6"></circle>
  </svg>
`;

export const getMarkerIcon = (location) => {
  // Kontrol mantığı (Aynı)
  const hasImage = (location.hasImage === true) ||
                   (location.blobUrl && Array.isArray(location.blobUrl) && location.blobUrl.length > 0) ||
                   (location.imageBase64 && typeof location.imageBase64 === 'string' && location.imageBase64.length > 10);


  const bgColor = hasImage ? 'bg-teal-600' : 'bg-slate-500';
  const shadow = hasImage ? 'shadow-[0_2px_8px_rgba(13,148,136,0.6)]' : 'shadow-sm';
  const iconSvg = hasImage ? CAMERA_SVG : DOT_SVG;
  

  const size = hasImage ? 'w-9 h-9' : 'w-7 h-7';


  const html = `
    <div class="relative flex flex-col items-center justify-center transform transition-transform hover:scale-110">
      <div class="${size} ${bgColor} ${shadow} rounded-full flex items-center justify-center border-2 border-white">
        ${iconSvg}
      </div>
      ${hasImage ? '<div class="absolute -bottom-1 w-2 h-2 bg-teal-600 rotate-45 border-r border-b border-white"></div>' : ''}
    </div>
  `;

  return L.divIcon({
    className: 'bg-transparent', 
    html: html,
    iconSize: [36, 36],
    iconAnchor: [18, 36], 
    popupAnchor: [0, -36] 
  });
};