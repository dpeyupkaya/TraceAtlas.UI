import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/Navbar"; 
import MapContainer from "../components/map/components/MapContainer";
import { X } from "lucide-react";

const MapPage = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // LocalStorage kontrolü (Anahtar ismini 'ny2026' olarak güncelledim)
    const hasSeen = localStorage.getItem("ny2026");
    if (!hasSeen) {
      setShowModal(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("ny2026", "true");
    setShowModal(false);
  };

  return (
    <div className="relative w-full min-h-[100svh] overflow-hidden bg-gray-100 font-sans">
      <Navbar />

      {/* Harita Katmanı */}
      <div className="absolute inset-0 z-0">
        <MapContainer />
      </div>

      {/* HAFİF YENİ YIL MODALI */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300">
          
          <div className="relative bg-[#052c22] border border-white/10 w-full max-w-[340px] rounded-3xl p-8 text-center shadow-2xl overflow-hidden">
            
            {/* Üstteki İnce Süs Çizgisi */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-emerald-400 to-red-500 opacity-50" />

            {/* Kapat Butonu */}
            <button 
              onClick={handleClose}
              className="absolute top-3 right-3 text-white/30 hover:text-white transition-colors p-1"
            >
              <X size={20} />
            </button>

            {/* İçerik */}
            <div className="text-4xl mb-4">🎄</div>
            
            <h2 className="text-white text-2xl font-black tracking-tight mb-2">
              MUTLU YILLAR <br/>
              <span className="text-red-500">2026</span>
            </h2>

            <p className="text-emerald-100/60 text-sm leading-relaxed mb-2">
              TraceAtlas ile yeni rotalar, yeni zirveler ve muhteşem keşiflerle dolu bir yıl dileriz.
            </p>

           

            {/* Köşe Süsü (Hafif) */}
            <div className="absolute -bottom-2 -right-2 text-2xl opacity-10 select-none pointer-events-none">
              ❄️
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapPage;