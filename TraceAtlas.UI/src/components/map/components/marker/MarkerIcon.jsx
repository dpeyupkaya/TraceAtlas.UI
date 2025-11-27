import L from 'leaflet';

// Fotoğrafsız durumlar için bir SVG ikon (Map Pin)
const defaultIconSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-white">
    <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
  </svg>
`;

export const getMarkerIcon = (imageBase64) => {
  // Resim var mı kontrolü
  const hasImage = imageBase64 && imageBase64.length > 0;

  // Eğer resim varsa base64 formatını ayarla
  const iconUrl = hasImage
    ? imageBase64.startsWith('data:image')
      ? imageBase64
      : `data:image/jpeg;base64,${imageBase64}`
    : null;

  return L.divIcon({
    className: 'custom-marker', // Leaflet stillerini sıfırlamak için
    iconSize: [50, 50],         // Marker boyutu
    iconAnchor: [25, 48],       // Marker'ın ucu tam konuma denk gelsin (Alttaki ok için ayarlandı)
    popupAnchor: [0, -50],      // Popup marker'ın tepesinde açılsın
    html: `
      <div class="relative w-full h-full group cursor-pointer transition-transform hover:scale-110 duration-200">
        
        ${hasImage ? 
          // --- DURUM 1: RESİM VARSA (Emerald Tema) ---
          `
          <div class="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 p-[3px] shadow-lg z-10">
            <div class="w-full h-full rounded-full border-2 border-white overflow-hidden bg-white">
              <img src="${iconUrl}" class="w-full h-full object-cover" alt="marker" />
            </div>
          </div>
          <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-teal-500 rotate-45 border-r-2 border-b-2 border-white/20"></div>
          ` 
          : 
          // --- DURUM 2: RESİM YOKSA (Mavi/Standart Tema) ---
          `
          <div class="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 p-[3px] shadow-lg z-10 flex items-center justify-center">
            <div class="w-full h-full rounded-full border-2 border-white/50 bg-transparent flex items-center justify-center">
               ${defaultIconSvg}
            </div>
          </div>
          <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-indigo-600 rotate-45 border-r-2 border-b-2 border-blue-800/20"></div>
          `
        }
        
      </div>
    `
  });
};