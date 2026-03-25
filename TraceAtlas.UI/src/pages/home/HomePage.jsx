import React, { useState, useEffect, useRef, memo } from 'react';
import { Helmet } from 'react-helmet-async';
import InfoPanel from './components/InfoPanel';
import WelcomePanel from './components/WelcomePanel';
import RegisterPanel from './components/RegisterPanel';
import Footer from '../../components/footer/Footer';
import { ChevronDown, Compass } from 'lucide-react'; 

const MemoizedInfo = memo(InfoPanel);
const MemoizedWelcome = memo(WelcomePanel);
const MemoizedRegister = memo(RegisterPanel);

const HomePage = () => {
  const [showArrow, setShowArrow] = useState(true);
  const registerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowArrow(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (registerRef.current) {
      observer.observe(registerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen  bg-[#041a14] overflow-x-hidden font-sans relative">
      <Helmet>
        <title>Keşfet | TraceAtlas Deneyim Haritası</title>
        <meta name="description" content="Çevrendeki gizli kalmış mekanları ve popüler rotaları harita üzerinden keşfet. TraceAtlas topluluğunun paylaştığı gerçek deneyimleri incele." />
        <meta property="og:title" content="Keşfet | TraceAtlas Deneyim Haritası" />
        <meta property="og:description" content="En iyi kamp alanları, gizli mekanlar ve şehir rotaları. TraceAtlas topluluğunun paylaştığı gerçek deneyimleri harita üzerinde incele." />
        <meta property="og:url" content="https://www.traceatlas.com.tr/home" />
        <link rel="canonical" href="https://www.traceatlas.com.tr/home" />
      </Helmet>
      
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="flex flex-col md:flex-row w-full flex-grow relative z-10">
        <div className="w-full md:w-1/3 h-[100dvh] md:h-auto border-b md:border-b-0 md:border-r border-white/5 shrink-0">
          <MemoizedInfo />
        </div>
        
        <div className="w-full md:w-1/3 h-[100dvh] md:h-auto border-b md:border-b-0 md:border-r border-white/5 shrink-0">
          <MemoizedWelcome />
        </div>
        
        <div className="w-full md:w-1/3 h-[100dvh] md:h-auto shrink-0">
          <MemoizedRegister />
        </div>
      </div>

      {showArrow && (
        <div className="md:hidden fixed bottom-10 right-6 z-[100] flex flex-col items-center animate-bounce">
          <div className="bg-[#020617]/80 backdrop-blur-xl pl-4 pr-2 py-2 rounded-full border border-emerald-500/30 shadow-2xl flex items-center gap-3">
            <span className="text-[10px] font-black text-emerald-50 tracking-[0.2em] uppercase">KEŞFET</span>
            <div className="bg-emerald-500/20 p-1.5 rounded-full border border-emerald-500/40">
              <ChevronDown size={18} className="text-emerald-400" />
            </div>
          </div>
        </div>
      )}

      <div ref={registerRef} className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;