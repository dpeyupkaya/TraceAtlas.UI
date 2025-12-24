import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/Navbar"; 
import MapContainer from "../components/map/components/MapContainer";
import { X, Sparkles } from "lucide-react";

const MapPage = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem("ny26");
    
    if (!hasSeen) {
      const timer = setTimeout(() => setShowModal(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("ny26", "true");
    setShowModal(false);
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-zinc-950">
      <Navbar />

    
      <div className={`absolute inset-0 z-0 transition-all duration-1000 ${showModal ? 'blur-sm scale-105' : 'blur-0 scale-100'}`}>
        <MapContainer />
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md transition-opacity">
          
          <div className="relative bg-zinc-900 border border-white/10 w-full max-w-[360px] rounded-[32px] p-10 text-center shadow-2xl overflow-hidden">
            
            <button onClick={handleClose} className="absolute top-5 right-5 text-zinc-500 hover:text-white transition-colors">
              <X size={20} />
            </button>

            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 mb-6">
              <Sparkles size={24} />
            </div>
            
            <h2 className="text-white text-2xl font-light tracking-[0.2em] uppercase mb-4 leading-tight">
              2026 <br/>
              <span className="font-black text-emerald-500">TRACEATLAS</span>
            </h2>

            <p className="text-zinc-400 text-sm leading-relaxed font-light italic px-2">
              "Yeni yılda haritalar sadece yolları değil, kurduğunuz tüm hayalleri göstersin."
            </p>

            <button 
              onClick={handleClose}
              className="mt-8 w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold rounded-2xl transition-all active:scale-95"
            >
              Keşfetmeye Hazırım
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapPage;