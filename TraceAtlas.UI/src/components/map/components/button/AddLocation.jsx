import React, { useState } from 'react';
import { Navigation, Loader2 } from 'lucide-react';

export const AddLocation = ({ onLocationFound }) => {
  const [loading, setLoading] = useState(false);

  const handleGetLocation = () => {
    setLoading(true);

    if (!navigator.geolocation) {
      alert("Tarayıcınız konum servisini desteklemiyor.");
      setLoading(false);
      return;
    }

    // Yüksek hassasiyet ayarları
    const options = {
      enableHighAccuracy: true, // GPS'i zorla (Mümkünse)
      timeout: 10000,           // 10 saniye bekle
      maximumAge: 0             // Önbellekten eski konum getirme, yenisini bul
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy // Doğruluk payını da alabiliriz (isteğe bağlı)
        };
        setLoading(false);
        if (onLocationFound) onLocationFound(coords);
      },
      (err) => {
        console.error(err);
        setLoading(false);
        let msg = "Konum alınamadı.";
        if (err.code === 1) msg = "Konum izni reddedildi.";
        if (err.code === 2) msg = "Konum servislerine erişilemiyor.";
        if (err.code === 3) msg = "Konum bulma süresi doldu.";
        alert(msg);
      },
      options
    );
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