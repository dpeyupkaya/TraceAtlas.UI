import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Map, Users, ArrowRight, Compass, Sparkles, Navigation } from 'lucide-react';

const Counter = ({ value }) => {
  const target = Number(value) || 0;
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (target <= 0) {
      return;
    }

    let start = 0;
    const duration = Math.min(1500, Math.max(600, target / 50));
    const stepTime = 16;
    const increment = target / (duration / stepTime);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setDisplayValue(target);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{displayValue.toLocaleString()}</span>;
};

const HomeHero = ({ stats, loading, isLoggedIn, onGuestAccess }) => {
  const { t } = useTranslation();

  return (
    <section className="relative w-full pt-10 pb-16 md:pt-16 md:pb-24 overflow-clip">
      
      {/* Ambient background glows */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] bg-emerald-700/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Subtle topographic grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:28px_28px]" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
        
        

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-none mb-6">
          TRACE<span className="text-emerald-500">ATLAS</span>{' '}
          <span className="text-emerald-400/90 inline-block font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            2026
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-emerald-100/70 max-w-3xl font-light leading-relaxed mb-10">
          {t('landing.heroText')}
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
          <Link
            to={isLoggedIn ? '/map' : '/auth'}
            className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black tracking-widest text-xs uppercase transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.35)] hover:shadow-[0_0_45px_rgba(16,185,129,0.55)] active:scale-95 flex items-center justify-center gap-3 group"
          >
            <span>
              {isLoggedIn ? t('home.register.continueExploring') : t('home.register.loginOrRegister')}
            </span>
            <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
          </Link>

          {!isLoggedIn && (
            <button
              onClick={onGuestAccess}
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-emerald-500/30 text-emerald-100 font-bold tracking-widest text-xs uppercase transition-all duration-300 flex items-center justify-center gap-2.5 active:scale-95 group"
            >
              <Compass size={16} className="text-emerald-400 group-hover:rotate-45 transition-transform" />
              <span>{t('home.register.guest')}</span>
            </button>
          )}
        </div>

        {/* Live Community Pulse Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl">
          
          {/* Card 1: Rotalar */}
          <div className="py-5 px-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/20 hover:bg-white/[0.04] transition-all duration-300 flex items-center gap-4 text-left group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 transition-colors">
              <Map className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className={`text-2xl sm:text-3xl font-black text-white tracking-tight ${loading ? 'opacity-30' : 'opacity-100'}`}>
                {stats ? <Counter key={stats.routeCount} value={stats.routeCount} /> : '--'}
              </div>
              <div className="text-[10px] text-emerald-200/40 uppercase tracking-widest font-bold">
                {t('home.register.routes')}
              </div>
            </div>
          </div>

          {/* Card 2: Gezginler */}
          <div className="py-5 px-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/20 hover:bg-white/[0.04] transition-all duration-300 flex items-center gap-4 text-left group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 transition-colors">
              <Users className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className={`text-2xl sm:text-3xl font-black text-white tracking-tight ${loading ? 'opacity-30' : 'opacity-100'}`}>
                {stats ? <Counter key={stats.userCount} value={stats.userCount} /> : '--'}
              </div>
              <div className="text-[10px] text-emerald-200/40 uppercase tracking-widest font-bold">
                {t('home.register.travelers')}
              </div>
            </div>
          </div>

          {/* Card 3: Canlı Doğa Atlası */}
          <div className="py-5 px-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/20 hover:bg-white/[0.04] transition-all duration-300 flex items-center gap-4 text-left group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 transition-colors">
              <Navigation className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight">
                100%
              </div>
              <div className="text-[10px] text-emerald-200/40 uppercase tracking-widest font-bold">
                CANLI TOPLULUK
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};

export default React.memo(HomeHero);
