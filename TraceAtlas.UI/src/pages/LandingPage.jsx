import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Map, Mountain, Users } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#04150f] text-emerald-50 font-sans flex flex-col justify-center items-center relative selection:bg-emerald-500 selection:text-white overflow-hidden">
      <Helmet>
        <title>TraceAtlas - İzini Sonsuzluğa Bırak</title>
        <meta name="description" content="Doğanın ritmini yakala, izini sonsuzluğa bırak. TraceAtlas ile lokasyon bazlı yeni deneyimler keşfetmeye başla!" />
        <link rel="canonical" href="https://www.traceatlas.com.tr/" />
      </Helmet>

      <div className="absolute inset-0 z-0 pointer-events-none">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover scale-105"
        >
          <source src="/bg/bg.mp4" type="video/mp4" />
        </video>
        
      <div className="absolute inset-0 bg-black/10"></div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#04150f] via-[#04150f]/60 to-transparent"></div>
      </div>

      <div className="w-full max-w-5xl px-6 md:px-12 flex flex-col items-center text-center z-10 mt-10">
        
       

        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 text-white drop-shadow-2xl">
          TRACE<span className="text-emerald-500">ATLAS</span>
        </h1>

        <p className="text-lg md:text-xl text-emerald-50/80 font-light max-w-2xl mb-14 leading-relaxed drop-shadow-md">
          Dağlardan ormanlara, gizli rotalara kadar tüm doğa harikalarını keşfet. 
          Haritada her anıyı bir hediye gibi sakla ve izini sonsuzluğa bırak.
        </p>

        <button
          onClick={() => navigate('/home')}
          className="group relative px-10 py-4 md:px-12 md:py-5 bg-[#10b981] text-[#04150f] rounded-xl font-bold tracking-widest transition-all duration-300 hover:bg-[#0fa472] hover:scale-[1.02] active:scale-95 flex items-center gap-4 mb-20 shadow-[0_0_40px_rgba(16,185,129,0.3)]"
        >
          <span className="text-sm md:text-base uppercase">Maceraya Başla</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          <div className="flex flex-col items-center p-8 rounded-2xl bg-black/20 backdrop-blur-md border border-white/10 transition-all duration-300 hover:bg-black/40 hover:border-emerald-500/30 group">
            <Mountain className="w-8 h-8 text-emerald-500 mb-4 group-hover:scale-110 transition-transform" />
            <span className="text-white font-semibold mb-2 tracking-wide">Yeni Rotalar</span>
            <span className="text-sm text-emerald-100/60 text-center font-light">Keşfedilmemiş yolları bul ve sınırları aş.</span>
          </div>
          
          <div className="flex flex-col items-center p-8 rounded-2xl bg-black/20 backdrop-blur-md border border-white/10 transition-all duration-300 hover:bg-black/40 hover:border-emerald-500/30 group">
            <Map className="w-8 h-8 text-emerald-500 mb-4 group-hover:scale-110 transition-transform" />
            <span className="text-white font-semibold mb-2 tracking-wide">Özel Noktalar</span>
            <span className="text-sm text-emerald-100/60 text-center font-light">Kendi anılarını ve gizli köşelerini işaretle.</span>
          </div>
          
          <div className="flex flex-col items-center p-8 rounded-2xl bg-black/20 backdrop-blur-md border border-white/10 transition-all duration-300 hover:bg-black/40 hover:border-emerald-500/30 group">
            <Users className="w-8 h-8 text-emerald-500 mb-4 group-hover:scale-110 transition-transform" />
            <span className="text-white font-semibold mb-2 tracking-wide">Topluluk</span>
            <span className="text-sm text-emerald-100/60 text-center font-light">Deneyimlerini doğa tutkunlarıyla paylaş.</span>
          </div>
        </div>

      </div>

      <div className="absolute bottom-6 text-[10px] text-emerald-500/40 font-mono tracking-widest uppercase z-10">
        © 2026 TRACEATLAS
      </div>
    </div>
  );
};

export default LandingPage;