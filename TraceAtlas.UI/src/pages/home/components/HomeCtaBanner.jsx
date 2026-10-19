import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Map, ArrowRight, Sparkles } from 'lucide-react';

const HomeCtaBanner = ({ isLoggedIn }) => {
  const { t } = useTranslation();

  return (
    <section className="w-full py-16 md:py-20 relative select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-950/40 via-[#041f18] to-emerald-950/40 border border-emerald-500/20 p-8 sm:p-12 md:p-16 text-center shadow-[0_0_50px_rgba(4,26,20,0.8)]">
          
          {/* Ambient inner glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-emerald-500/10 rounded-full blur-[90px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold tracking-widest uppercase mb-5">
              <Sparkles size={12} />
              <span>DİJİTAL ATLAS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4 max-w-2xl">
              Sen de Kendi Hikayeni Haritaya İşle
            </h2>

            <p className="text-sm sm:text-base text-emerald-100/70 max-w-xl font-light mb-8">
              Keşfettiğin yeni rotaları, sakin koyları ve gizli kamp noktalarını diğer gezginlerle paylaş; maceranı ölümsüzleştir.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                to="/map"
                className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black tracking-widest text-xs uppercase transition-all shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
              >
                <Map size={16} />
                <span>{t('navbar.map')}</span>
              </Link>

              {!isLoggedIn && (
                <Link
                  to="/auth"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/30 text-emerald-100 font-bold tracking-widest text-xs uppercase transition-all flex items-center justify-center gap-2"
                >
                  <span>{t('home.register.loginOrRegister')}</span>
                  <ArrowRight size={14} />
                </Link>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default React.memo(HomeCtaBanner);
