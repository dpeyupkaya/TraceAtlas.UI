import React, { useState, useEffect, memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Map, ArrowUp } from 'lucide-react';

import profileService from '../../services/profileService';
import Footer from '../../components/footer/Footer';

import HomeNavbar from './components/HomeNavbar';
import HomeHero from './components/HomeHero';
import AtlasShowcase from './components/AtlasShowcase';
import DiscoveryPillars from './components/DiscoveryPillars';
import ManifestoSection from './components/ManifestoSection';
import HomeCtaBanner from './components/HomeCtaBanner';

const MemoizedNavbar = memo(HomeNavbar);
const MemoizedHero = memo(HomeHero);
const MemoizedAtlas = memo(AtlasShowcase);
const MemoizedPillars = memo(DiscoveryPillars);
const MemoizedManifesto = memo(ManifestoSection);
const MemoizedCtaBanner = memo(HomeCtaBanner);
const MemoizedFooter = memo(Footer);

const HomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
    }

    let isMounted = true;
    const fetchStats = async () => {
      try {
        const response = await profileService.getPublicStats();
        if (isMounted) {
          setStats(response);
        }
      } catch {
        if (isMounted) {
          setStats(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchStats();

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      isMounted = false;
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleGuestAccess = () => {
    localStorage.clear();
    navigate('/map');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#041a14] text-emerald-50 overflow-x-hidden font-sans relative selection:bg-emerald-500 selection:text-white">
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

      {/* Global Background Ambient Lights */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Sticky Header */}
      <MemoizedNavbar 
        isLoggedIn={isLoggedIn} 
        onGuestAccess={handleGuestAccess} 
      />

      {/* Main Content Sections */}
      <main className="flex-grow flex flex-col w-full relative z-10">
        
        <MemoizedHero 
          stats={stats} 
          loading={loading} 
          isLoggedIn={isLoggedIn} 
          onGuestAccess={handleGuestAccess} 
        />

        <MemoizedAtlas />

        <MemoizedPillars />

        <MemoizedManifesto />

        <MemoizedCtaBanner isLoggedIn={isLoggedIn} />

      </main>

      {/* Floating Scroll to Top & Quick Map Pill (Mobile) */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            aria-label="Yukarı Kaydır"
            className="w-11 h-11 rounded-full bg-[#04150f]/80 backdrop-blur-xl border border-white/10 text-emerald-400 hover:text-white hover:border-emerald-500/50 flex items-center justify-center transition-all shadow-xl active:scale-90"
          >
            <ArrowUp size={18} />
          </button>
        )}

        <button
          onClick={() => navigate('/map')}
          className="md:hidden flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(16,185,129,0.4)] active:scale-95 transition-all"
        >
          <Map size={15} />
          <span>{t('navbar.map')}</span>
        </button>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <MemoizedFooter />
      </div>

    </div>
  );
};

export default HomePage;
