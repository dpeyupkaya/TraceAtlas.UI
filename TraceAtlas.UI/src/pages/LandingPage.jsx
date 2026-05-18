import React from 'react';
import { Link } from 'react-router-dom'; 
import { ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Footer from '../components/footer/Footer';
import LanguageSwitcher from '../components/i18n/LanguageSwitcher';

const LandingPage = () => {
  const { t } = useTranslation();

  return (
    <>
    <div className="min-h-screen bg-[#04150f] text-emerald-50 font-sans flex flex-col justify-center items-center relative selection:bg-emerald-500 selection:text-white overflow-hidden">
      <Helmet>
        <title>{t('landing.seoTitle')}</title>
        <meta name="description" content={t('landing.seoDescription')} />
        <link rel="canonical" href="https://www.traceatlas.com.tr/" />
      </Helmet>

      {/* Arka Plan Videosu */}
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

      <div className="absolute right-5 top-5 z-20 md:right-8 md:top-8">
        <LanguageSwitcher />
      </div>

      <div className="w-full max-w-5xl px-6 md:px-12 flex flex-col items-center text-center z-10 mt-10">
        
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 text-white drop-shadow-2xl">
          TRACE<span className="text-emerald-500">ATLAS</span>
        </h1>

        <p className="text-lg md:text-xl text-emerald-50/80 font-light max-w-2xl mb-14 leading-relaxed drop-shadow-md">
          {t('landing.heroText')}
        </p>

        <Link
          to="/home"
          className="group relative px-10 py-4 md:px-12 md:py-5 bg-[#10b981] text-[#04150f] rounded-xl font-bold tracking-widest transition-all duration-300 hover:bg-[#0fa472] hover:scale-[1.02] active:scale-95 flex items-center gap-4 mb-20 shadow-[0_0_40px_rgba(16,185,129,0.3)]"
        >
          <span className="text-sm md:text-base uppercase">{t('landing.cta')}</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
        </Link>
      </div>

      <div className="absolute bottom-6 text-[10px] text-emerald-500/40 font-mono tracking-widest uppercase z-10">
        © 2026 TRACEATLAS
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default LandingPage;
