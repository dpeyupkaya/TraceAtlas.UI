import React, { useState, useEffect, useRef } from 'react';
import InfoPanel from './components/InfoPanel';
import WelcomePanel from './components/WelcomePanel';
import RegisterPanel from './components/RegisterPanel';
import Footer from '../../components/footer/Footer';
import Snowfall from 'react-snowfall';
import { ChevronDown } from 'lucide-react';

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
    <div className="flex flex-col w-full min-h-screen bg-[#022c22] overflow-x-hidden font-sans">
      <Snowfall 
        color='white'
        speed={[0.5, 1.5]} 
        wind={[-0.5, 2.0]} 
        snowflakeCount={150}
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          zIndex: 9999,
          pointerEvents: 'none'
        }}
      />
      
      <div className="flex flex-col md:flex-row w-full flex-grow">
        <div className="w-full md:w-1/3 h-[100dvh] md:h-auto border-b md:border-b-0 md:border-r border-[#10b981]/10 shrink-0">
          <InfoPanel />
        </div>
        
        <div className="w-full md:w-1/3 h-[100dvh] md:h-auto border-b md:border-b-0 md:border-r border-[#10b981]/10 shrink-0">
          <WelcomePanel />
        </div>
        
        <div className="w-full md:w-1/3 h-[100dvh] md:h-auto shrink-0">
          <RegisterPanel />
        </div>
      </div>

      {showArrow && (
        <div className="md:hidden fixed bottom-10 right-6 z-[100] flex flex-col items-center animate-bounce">
          <div className="bg-emerald-500/10 backdrop-blur-xl pl-4 pr-2 py-2 rounded-full border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)] flex items-center gap-3">
            <span className="text-[10px] font-black text-emerald-50 tracking-[0.2em] uppercase">KEŞFE BAŞLA</span>
            <div className="bg-emerald-500/20 p-1.5 rounded-full border border-emerald-500/40">
              <ChevronDown size={18} className="text-emerald-400" />
            </div>
          </div>
        </div>
      )}

      <div ref={registerRef}>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;