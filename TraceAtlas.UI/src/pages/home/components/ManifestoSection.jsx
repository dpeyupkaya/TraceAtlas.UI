import React from 'react';
import { useTranslation } from 'react-i18next';
import { Compass } from 'lucide-react';

const ManifestoSection = () => {
  const { t } = useTranslation();

  return (
    <section className="w-full py-16 md:py-24 relative overflow-clip select-none">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="py-12 sm:py-16 px-6 sm:px-12 rounded-3xl bg-gradient-to-b from-white/[0.03] to-white/[0.01] border border-white/5 relative shadow-2xl backdrop-blur-xl">
          
          {/* Compass Icon */}
          <div className="mx-auto w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-8 shadow-inner shadow-emerald-500/10">
            <Compass className="w-7 h-7 animate-[spin_20s_linear_infinite]" />
          </div>

          {/* Quote Lines */}
          <blockquote className="space-y-2 mb-8">
            <p className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-wider uppercase leading-snug">
              "{t('home.info.quoteLine1')}"
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl font-black text-emerald-400 tracking-wider uppercase leading-snug">
              "{t('home.info.quoteLine2')}"
            </p>
          </blockquote>

          {/* Decorative Footer Info */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-[1px] bg-emerald-500/30 mb-4" />
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-emerald-200/40">
              TRACEATLAS KAŞİF MANİFESTOSU • 2026
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default React.memo(ManifestoSection);
