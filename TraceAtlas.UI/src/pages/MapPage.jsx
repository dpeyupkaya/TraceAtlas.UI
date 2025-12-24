import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import MapContainer from "../components/map/components/MapContainer";
import { X, Sparkles } from "lucide-react";

const MapPage = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem("ny2026");
    if (!hasSeen) {
      const timer = setTimeout(() => setShowModal(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("ny2026", "true");
    setShowModal(false);
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-zinc-950 font-sans">
      <Navbar />

      <div className={`absolute inset-0 transition-all duration-1000 ${showModal ? 'scale-[1.02] blur-sm' : 'scale-100 blur-0'}`}>
        <MapContainer />
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md transition-opacity">
          
          <div className="relative bg-gradient-to-br from-zinc-900 to-black border border-white/10 w-full max-w-[360px] rounded-[32px] p-10 shadow-2xl overflow-hidden">
            
            {/* Minimal Arka Plan Işığı */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-emerald-500/50 blur-sm rounded-full" />

            {/* Kapat Butonu */}
            <button 
              onClick={handleClose}
              className="absolute top-5 right-5 text-zinc-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            {/* İçerik */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 mb-6">
                <Sparkles size={24} />
              </div>
              
              <h2 className="text-white text-2xl font-light tracking-[0.2em] uppercase mb-4">
                2026 <br/>
                <span className="font-black text-emerald-500">TRACEATLAS</span>
              </h2>

              <div className="h-px w-12 bg-white/10 mx-auto mb-6" />

              <p className="text-zinc-400 text-sm leading-relaxed font-light italic">
                "Yeni yılda haritalar sadece yolları değil, <br /> 
                kurduğunuz tüm hayalleri göstersin."
              </p>

              <div className="mt-8 text-[10px] text-zinc-600 tracking-widest uppercase">
                Yolculuğun Bir Parçası Olduğun İçin Teşekkürler
              </div>
            </div>

            {/* Dekoratif Köşe Süsü */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-emerald-500/5 blur-[40px] rounded-full" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MapPage;