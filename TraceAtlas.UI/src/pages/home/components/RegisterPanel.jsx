import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import profileService from '../../../services/profileService';
import { LogIn, Map, Users, Gift } from 'lucide-react';
import ChristmasButton from '../../../common/ChristmasButton';

const Counter = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    if (isNaN(end)) return;
    const duration = 1000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{displayValue}</span>;
};

const RegisterPanel = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ routeCount: 0, userCount: 0 });
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) setIsLoggedIn(true);
    const fetchStats = async () => {
      try {
        const response = await profileService.getPublicStats();
        setStats({
          routeCount: response?.routeCount || 10000,
          userCount: response?.userCount || 50000
        });
      } catch (error) {
        setStats({ routeCount: 10000, userCount: 50000});
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleGuestAccess = () => {
    localStorage.clear();
    navigate('/map');
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-[#021a14] via-[#052c22] to-[#0a3d31] text-emerald-50 flex flex-col justify-center items-center p-6 relative overflow-hidden border-l border-white/5">
      
      {/* Animasyonlu Işıklar */}
      <style>{`
        @keyframes light-swing {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        .animate-light-swing { animation: light-swing 3s ease-in-out infinite; transform-origin: top; }
      `}</style>

      <div className="absolute top-0 left-0 w-full flex justify-around px-2 pointer-events-none z-20">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex flex-col items-center animate-light-swing" style={{ animationDelay: `${i * 0.3}s` }}>
            <div className="w-[1px] h-10 bg-white/20"></div>
            <div className={`w-3 h-3 rounded-full shadow-[0_0_15px_white] animate-pulse ${i % 2 === 0 ? 'bg-red-500' : 'bg-yellow-400'}`}></div>
          </div>
        ))}
      </div>

      <div className="w-full max-w-[280px] relative z-10 flex flex-col items-center">
        
        {/* LOGO ALANI */}
        <div className="relative mb-10 mt-4">
          <span className="absolute -top-8 -left-6 text-5xl z-30 transform -rotate-12 drop-shadow-lg">🎅</span>
          <div className="w-24 h-24 bg-emerald-500 rounded-[2rem] flex items-center justify-center shadow-2xl rotate-3 border border-white/20 relative overflow-hidden group">
            <LogIn className="w-12 h-12 text-white group-hover:scale-110 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent"></div>
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center animate-bounce shadow-lg border-4 border-[#052c22]">
            <Gift className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* METİN */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-white tracking-tighter leading-none">
            TRACEATLAS <span className="text-red-500 block text-4xl mt-1">2026</span>
          </h1>
          <p className="text-emerald-100/40 text-[10px] tracking-[0.3em] uppercase mt-3 font-bold">Maceraya Hazır Mısın?</p>
        </div>

        {/* İSTATİSTİKLER */}
        <div className="grid grid-cols-2 gap-3 w-full mb-12">
          <div className="py-4 px-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center transition-colors hover:bg-white/10">
            <Map className="w-5 h-5 text-red-400 mb-2" />
            <div className="text-2xl font-black text-white">
              {loading ? "..." : <Counter value={stats.routeCount} />}
            </div>
            <div className="text-[9px] text-emerald-200/40 uppercase tracking-widest font-bold">Rotalar</div>
          </div>

          <div className="py-4 px-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center transition-colors hover:bg-white/10">
            <Users className="w-5 h-5 text-yellow-400 mb-2" />
            <div className="text-2xl font-black text-white">
              {loading ? "..." : <Counter value={stats.userCount} />}
            </div>
            <div className="text-[9px] text-emerald-200/40 uppercase tracking-widest font-bold">Gezginler</div>
          </div>
        </div>

    <div className="w-full space-y-6">
  <Link to={isLoggedIn ? "/map" : "/auth"} className="block w-full pt-4">
    <ChristmasButton className="w-full">
      {isLoggedIn ? (
        "KEŞFE DEVAM ET"
      ) : (
        /* flex-row ile yan yana dizilim, gap-2 ile aradaki boşluk */
        <div className="flex flex-row items-center justify-center gap-2 w-full font-black tracking-tighter">
          <span>GİRİŞ YAP </span>
          <span >VEYA</span> 
          <span>KAYIT OL</span>
        </div>
      )}
    </ChristmasButton>
  </Link>




          {!isLoggedIn && (
            <button 
              onClick={handleGuestAccess} 
              className="w-full group flex flex-col items-center pt-2"
            >
              <span className="text-[10px] text-white/30 group-hover:text-yellow-500 transition-colors tracking-[0.3em] font-bold">
                KAYIT OLMADAN GÖZ AT
              </span>
              <div className="w-12 h-[1px] bg-white/10 group-hover:w-24 group-hover:bg-yellow-500/50 transition-all duration-500 mt-2"></div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPanel;