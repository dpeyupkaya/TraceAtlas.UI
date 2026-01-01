import React, { useState, useEffect, useRef, memo } from 'react';
import InfoPanel from './components/InfoPanel';
import WelcomePanel from './components/WelcomePanel';
import RegisterPanel from './components/RegisterPanel';
import Footer from '../../components/footer/Footer';
import Snowfall from 'react-snowfall';
import { ChevronDown, Snowflake, Cloud } from 'lucide-react';


const MemoizedInfo = memo(InfoPanel);
const MemoizedWelcome = memo(WelcomePanel);
const MemoizedRegister = memo(RegisterPanel);

const HomePage = () => {
  const [showArrow, setShowArrow] = useState(true);
  const [isSnowing, setIsSnowing] = useState(true);
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
    <div className="flex flex-col w-full min-h-screen bg-[#022c22] overflow-x-hidden font-sans relative">
      {isSnowing && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, pointerEvents: 'none', willChange: 'transform' }}>
          <Snowfall 
            color='white'
            speed={[0.5, 2.0]} 
            wind={[-0.5, 2.0]} 
            snowflakeCount={100} 
            radius={[0.5, 2.5]}
          />
        </div>
      )}

    
      <button 
        onClick={() => setIsSnowing(!isSnowing)}
        className="fixed top-4 right-4 z-[10000] p-3 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-400 active:scale-95 transition-transform will-change-transform"
        style={{ transform: 'translateZ(0)' }} 
        aria-label="Hava Durumu"
      >
        {isSnowing ? <Snowflake size={20} className="animate-pulse" /> : <Cloud size={20} className="opacity-50" />}
      </button>
      

      <div className="flex flex-col md:flex-row w-full flex-grow">
        <div className="w-full md:w-1/3 h-[100dvh] md:h-auto border-b md:border-b-0 md:border-r border-[#10b981]/10 shrink-0">
          <MemoizedInfo />
        </div>
        
        <div className="w-full md:w-1/3 h-[100dvh] md:h-auto border-b md:border-b-0 md:border-r border-[#10b981]/10 shrink-0">
          <MemoizedWelcome />
        </div>
        
        <div className="w-full md:w-1/3 h-[100dvh] md:h-auto shrink-0">
          <MemoizedRegister />
        </div>
      </div>


      {showArrow && (
        <div className="md:hidden fixed bottom-10 right-6 z-[100] flex flex-col items-center animate-bounce will-change-transform">
          <div className="bg-emerald-900/80 backdrop-blur-lg pl-4 pr-2 py-2 rounded-full border border-emerald-500/30 shadow-lg flex items-center gap-3">
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