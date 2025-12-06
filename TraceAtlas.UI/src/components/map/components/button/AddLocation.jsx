import React, { useState } from 'react';
import { Navigation, Loader2 } from 'lucide-react';
// 1. Hook'u import et
import { useGlobalLoader } from '../../../../hooks/useGlobalLoader';

export const AddLocation = ({ onLocationFound }) => {
  const [loading, setLoading] = useState(false);
  // 2. Hook'u başlat
  const { withLoader } = useGlobalLoader();

  const handleGetLocation = async () => {
    // Buton üzerindeki spinner için local state
    setLoading(true);

    // 3. İşlemi withLoader ile sarmala
    await withLoader(async () => {
      try {
        if (!navigator.geolocation) {
          throw new Error("Tarayıcınız konum servisini desteklemiyor.");
        }

        const options = {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0
        };

        // Geolocation API callback tabanlı olduğu için Promise'e çeviriyoruz
        // Böylece withLoader işlemin ne zaman bittiğini anlayabiliyor.
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });

        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy
        };

        if (onLocationFound) onLocationFound(coords);

      } catch (err) {
        console.error(err);
        
        // Hata mesajlarını yönet
        let msg = err.message || "Konum alınamadı.";
        
        // GeolocationPositionError kodları
        if (err.code === 1) msg = "Konum izni reddedildi.";
        if (err.code === 2) msg = "GPS sinyali alınamıyor.";
        if (err.code === 3) msg = "Konum bulma süresi doldu.";

        alert(msg);
      }
    });

    // İşlem bitince (başarılı veya hatalı) butonu serbest bırak
    setLoading(false);
  };

  return (
    <button
      onClick={handleGetLocation}
      disabled={loading}
      className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-white/90 backdrop-blur-md border border-white/20 shadow-lg shadow-black/10 transition-all duration-300 hover:scale-110 hover:bg-emerald-500 hover:border-emerald-400 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
      title="Konumumu Bul"
    >
      {loading ? (
        <Loader2 className="w-6 h-6 text-emerald-600 animate-spin group-hover:text-white" />
      ) : (
        <Navigation className="w-6 h-6 text-slate-700 group-hover:text-white group-hover:rotate-45 transition-transform duration-300" />
      )}
      
      <span className="absolute right-full mr-3 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Konumumu Bul
      </span>
    </button>
  );
};

export default AddLocation;