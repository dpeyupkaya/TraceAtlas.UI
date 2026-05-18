import React, { useState, useEffect, useRef, memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import InfoPanel from './components/InfoPanel';
import WelcomePanel from './components/WelcomePanel';
import RegisterPanel from './components/RegisterPanel';
import Footer from '../../components/footer/Footer';
import { ChevronDown, Compass } from 'lucide-react'; 

const MemoizedInfo = memo(InfoPanel);
const MemoizedWelcome = memo(WelcomePanel);
const MemoizedRegister = memo(RegisterPanel);

const HomePage = () => {
  const { t } = useTranslation();
  const [showArrow, setShowArrow] = useState(true);
  const registerRef = useRef(null); 

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
       
        setShowArrow(!entry.isIntersecting);
      },
      { threshold: 0.2 } 
    );

    if (registerRef.current) {
      observer.observe(registerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToRegister = () => {
    if (registerRef.current) {
      registerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#041a14] overflow-x-hidden font-sans relative">
      <Helmet>
        <title>{t('home.seoTitle')}</title>
        <meta name="description" content={t('home.seoDescription')} />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.traceatlas.com.tr/home" />
        <meta property="og:title" content={t('home.seoTitle')} />
        <meta property="og:description" content={t('home.seoSocialDescription')} />
        <meta property="og:image" content="https://www.traceatlas.com.tr/og-image.jpg" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('home.seoTitle')} />
        <meta name="twitter:description" content={t('home.seoSocialDescription')} />
        <meta name="twitter:image" content="https://www.traceatlas.com.tr/og-image.jpg" />

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
        
        <div ref={registerRef} className="w-full md:w-1/3 h-[100dvh] md:h-auto shrink-0">
          <MemoizedRegister />
        </div>
      </div>

      {showArrow && (
        <button 
          onClick={scrollToRegister}
          className="md:hidden fixed bottom-10 right-6 z-[100] flex flex-col items-center animate-bounce cursor-pointer group hover:scale-105 transition-transform"
          aria-label={t('home.registerAria')}
        >
          <div className="bg-[#020617]/80 backdrop-blur-xl pl-4 pr-2 py-2 rounded-full border border-emerald-500/30 shadow-2xl flex items-center gap-3">
            <span className="text-[10px] font-black text-emerald-50 tracking-[0.2em] uppercase">{t('home.explore')}</span>
            <div className="bg-emerald-500/20 p-1.5 rounded-full border border-emerald-500/40 group-active:bg-emerald-500/40 transition-colors">
              <ChevronDown size={18} className="text-emerald-400" />
            </div>
          </div>
        </button>
      )}

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
