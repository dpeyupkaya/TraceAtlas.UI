import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import profileService from '../../../services/profileService';
import { LogIn, Map, Users, ArrowRight } from 'lucide-react';

const Counter = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = Number(value);
    if (!end || end <= 0) {
      setDisplayValue(0);
      return;
    }

    const duration = Math.min(1500, Math.max(600, end / 50));
    const stepTime = 16;
    const increment = end / (duration / stepTime);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{displayValue}</span>;
};

const RegisterPanel = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) setIsLoggedIn(true);

    const fetchStats = async () => {
      try {
        const response = await profileService.getPublicStats();
        setStats(response);
      } catch {
        setStats(null);
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
    <div className="w-full h-full bg-[#041a14] text-emerald-50 flex flex-col justify-center items-center p-8 relative border-l border-white/5">
      
      <div className="w-full max-w-[280px] flex flex-col items-center">
        
        {/* Sade Logo Alanı */}
        <div className="mb-12">
          <div className="w-20 h-20 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20 shadow-xl">
            <LogIn className="w-10 h-10 text-emerald-500" />
          </div>
        </div>

        {/* Başlık */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-black text-white tracking-tighter leading-none">
            TRACEATLAS <span className="text-emerald-500 block text-4xl mt-1">2026</span>
          </h1>
          <p className="text-emerald-100/30 text-[10px] tracking-[0.3em] uppercase mt-4 font-bold">
            Maceraya Hazır Mısın?
          </p>
        </div>

        {/* İstatistikler Grid */}
        <div className="grid grid-cols-2 gap-4 w-full mb-12">
          <div className="py-4 px-2 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col items-center transition-all hover:bg-white/[0.05]">
            <Map className="w-5 h-5 text-emerald-500 mb-2" />
            <div className={`text-2xl font-black text-white ${loading ? 'opacity-30' : 'opacity-100'}`}>
              {stats ? <Counter key={stats.routeCount} value={stats.routeCount} /> : '--'}
            </div>
            <div className="text-[9px] text-emerald-200/20 uppercase tracking-widest font-bold">
              Rotalar
            </div>
          </div>

          <div className="py-4 px-2 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col items-center transition-all hover:bg-white/[0.05]">
            <Users className="w-5 h-5 text-emerald-500 mb-2" />
            <div className={`text-2xl font-black text-white ${loading ? 'opacity-30' : 'opacity-100'}`}>
              {stats ? <Counter key={stats.userCount} value={stats.userCount} /> : '--'}
            </div>
            <div className="text-[9px] text-emerald-200/20 uppercase tracking-widest font-bold">
              Gezginler
            </div>
          </div>
        </div>

        {/* Butonlar */}
        <div className="w-full space-y-6">
          <Link to={isLoggedIn ? '/map' : '/auth'} className="block w-full">
            <button className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black tracking-widest transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2">
              {isLoggedIn ? 'KEŞFE DEVAM ET' : 'GİRİŞ YAP / KAYIT OL'}
              <ArrowRight size={18} />
            </button>
          </Link>

          {!isLoggedIn && (
            <button
              onClick={handleGuestAccess}
              className="w-full group flex flex-col items-center"
            >
              <span className="text-[10px] text-white/20 group-hover:text-emerald-500 transition-colors tracking-[0.3em] font-bold">
                MİSAFİR OLARAK GÖZ AT
              </span>
              <div className="w-8 h-[1px] bg-white/10 group-hover:w-12 group-hover:bg-emerald-500/50 transition-all mt-2"></div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPanel;