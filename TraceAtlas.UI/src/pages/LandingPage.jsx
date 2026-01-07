import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import GradientBlinds from '../bits/GradientBlinds ';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black font-sans select-none">
      {/* Arka Plan Efekti */}
      <div className="absolute inset-0 z-0 select-none">
        <GradientBlinds
          gradientColors={['#022c22', '#10b981']}
          angle={0}
          noise={0.3}
          blindCount={12}
          blindMinWidth={50}
          spotlightRadius={0.5}
          spotlightSoftness={1}
          spotlightOpacity={1}
          mouseDampening={0.15}
          distortAmount={0}
          shineDirection="left"
          mixBlendMode="lighten"
        />
      </div>

      {/* Dekoratif Işıklar */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-400/5 rounded-full blur-[120px] pointer-events-none select-none"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-cyan-400/3 rounded-full blur-[100px] pointer-events-none select-none"></div>
        <div className="absolute top-0 left-0 w-32 h-32 bg-[#00eecaff]/10 rounded-full blur-[60px] pointer-events-none select-none"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#00eecaff]/8 rounded-full blur-[80px] pointer-events-none select-none"></div>
      </div>

      {/* Ana İçerik */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 select-none">
        
        {/* Logo/Başlık Alanı */}
        <div className="mb-10 animate-fade-in-down select-none">
          <h1 className="text-6xl md:text-9xl font-black text-black/95 tracking-tighter mix-blend-overlay opacity-90 select-none">
            TraceAtlas
          </h1>
          <div className="h-1 w-24 bg-[#00eecaff] mx-auto mt-4 rounded-full shadow-[0_0_15px_#00eecaff] select-none"></div>
        </div>

        {/* Slogan */}
        <p className="text-emerald-100/90 text-lg md:text-2xl font-light max-w-xl mb-16 tracking-wide backdrop-blur-sm select-none">
          Doğanın ritmini yakala, izini sonsuzluğa bırak.
        </p>

        {/* Yeni Modern Buton */}
        <div className="relative group/btn">
          <div className="absolute inset-0 bg-[#00eecaff]/20 blur-[30px] rounded-full opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
          
          <button 
            onClick={() => navigate('/home')}
            className="relative px-8 py-4 bg-transparent border border-[#00eecaff]/50 hover:border-[#00eecaff] text-[#00eecaff] rounded-full font-bold tracking-[0.2em] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-3 group"
          >
            YOLCULUĞA BAŞLA
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        {/* Footer Bilgisi */}
        <div className="absolute bottom-10 flex flex-col items-center gap-2 select-none">
          <span className="text-white/60 text-[10px] tracking-[0.3em] uppercase select-none">
            Keşfet • Favorilere Ekle • Paylaş
          </span>
          <span className="text-white/40 text-xs font-light select-none">
            &copy; 2026 TRACEATLAS
          </span>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;