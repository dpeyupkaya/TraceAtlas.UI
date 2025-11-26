import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import GradientBlinds from '../bits/GradientBlinds ';

const LandingPage = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black font-sans">
      
  <div className="absolute inset-0 z-0">
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

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        
        <div className="mb-10 animate-fade-in-down select-none">
          <h1 className="text-6xl md:text-9xl font-black text-black/95 tracking-tighter mix-blend-overlay opacity-90">
            TraceAtlas
          </h1>
          <div className="h-1 w-24 bg-[#00eecaff] mx-auto mt-4 rounded-full shadow-[0_0_15px_#00eecaff]"></div>
        </div>

        <p className="text-emerald-100/90 text-lg md:text-2xl font-light max-w-xl mb-16 tracking-wide backdrop-blur-sm">
          Doğanın ritmini yakala, izini sonsuzluğa bırak.
        </p>

      
        <Link 
          to="/home" 
        
          className="group relative inline-flex items-center gap-4 px-12 py-6 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:border-[#00eecaff] hover:shadow-[0_0_50px_rgba(0,238,202,0.5)]"
        >
          
         
          <span className="text-xl font-bold tracking-widest text-black transition-colors">
            YOLCULUĞA BAŞLA
          </span>
      
          <div className="bg-[#00eecaff]/20 p-2 rounded-full group-hover:bg-[#00eecaff] transition-colors duration-300">
             <ArrowRight className="w-6 h-6 text-black transition-colors" />
          </div>
          
        
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
        </Link>

        <div className="absolute bottom-10 flex flex-col items-center gap-2">
            <span className="text-black text-[10px] tracking-[0.3em] uppercase">
                Keşfet • Kaydet • Paylaş
            </span>
            <span className="text-black text-xs font-light">
                &copy; 2025 TRACEATLAS
            </span>
        </div>

      </div>
    </div>
  );
};

export default LandingPage;