import React, { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { LogIn, UserPlus, Compass, Mountain, Map, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import LanguageSwitcher from '../i18n/LanguageSwitcher';

const AuthPanel = () => {
  const { t } = useTranslation();
  const [isLoginView, setIsLoginView] = useState(true);

  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
      if (
        e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) || 
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="w-full min-h-[100dvh] flex flex-col lg:flex-row relative bg-[#041a14] overflow-hidden select-none">
      
      {/* ─── SOL PANEL: Marka Kimliği & Atmosfer (Sadece Masaüstü) ─── */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[50%] relative flex-col items-center justify-center overflow-hidden">
        
        {/* Arka plan video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/bg/bg.mp4" type="video/mp4" />
          </video>
          {/* Video overlay gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#041a14] via-[#041a14]/70 to-[#041a14]/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#041a14] via-transparent to-[#041a14]/40" />
        </div>

        {/* İçerik */}
        <div className="relative z-10 max-w-md px-12 text-center flex flex-col items-center">
          
          {/* Logo */}
          <Link to="/" className="group mb-10 inline-block">
            <h1 className="text-5xl xl:text-6xl font-black text-white tracking-tighter group-hover:text-emerald-400 transition-colors">
              TRACE<span className="text-emerald-500">ATLAS</span>
            </h1>
          </Link>

          {/* İkon Cluster */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.15)]">
              <Compass className="w-7 h-7 animate-[spin_20s_linear_infinite]" />
            </div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.15)]">
              <Mountain className="w-7 h-7" />
            </div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.15)]">
              <Map className="w-7 h-7" />
            </div>
          </div>

          {/* Manifesto */}
          <p className="text-base xl:text-lg text-emerald-100/70 font-light leading-relaxed mb-8">
            {t('landing.heroText')}
          </p>

          {/* Alıntı */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-[1px] bg-emerald-500/30 mb-5" />
            <p className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-emerald-400/60 leading-relaxed">
              "{t('home.info.quoteLine1')}"<br />
              "{t('home.info.quoteLine2')}"
            </p>
            <div className="w-12 h-[1px] bg-emerald-500/30 mt-5" />
          </div>
        </div>

        {/* Alt sol köşe: koordinat badge */}
        <div className="absolute bottom-8 left-8 z-10">
          <span className="px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[9px] font-mono font-bold tracking-widest text-emerald-300/60 uppercase">
            © 2026 TRACEATLAS
          </span>
        </div>
      </div>

      {/* ─── SAĞ PANEL: Auth Formu ─── */}
      <div className="w-full lg:w-[55%] xl:w-[50%] min-h-[100dvh] flex flex-col relative">
        
        {/* Ambient glow efektleri */}
        <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-emerald-600/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none" />
        {/* Topoğrafik ızgara */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:28px_28px]" />

        {/* Üst bar: Geri ve Dil Seçici */}
        <div className="relative z-20 flex items-center justify-between px-6 py-5">
          <Link
            to="/home"
            className="flex items-center gap-2 text-emerald-100/50 hover:text-emerald-400 transition-colors text-xs font-bold tracking-widest uppercase group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">{t('common.buttons.home')}</span>
          </Link>

          {/* Mobilde logo */}
          <Link to="/" className="lg:hidden">
            <span className="text-lg font-black text-white tracking-tighter">
              TRACE<span className="text-emerald-500">ATLAS</span>
            </span>
          </Link>

          <LanguageSwitcher variant="floating" />
        </div>

        {/* Form Alanı */}
        <div className="flex-grow flex flex-col justify-center items-center px-4 sm:px-8 py-8 relative z-10">
          <div className="w-full max-w-[420px] flex flex-col gap-5">
            
            {/* Başlık Alanı */}
            <div className="text-center mb-2">
              {/* Canlı Durum Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-400 tracking-[0.2em] uppercase">
                  {isLoginView ? t('auth.panel.welcomeSubtitle') : t('auth.panel.newRouteSubtitle')}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <Motion.div
                  key={isLoginView ? 'login-title' : 'register-title'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center justify-center gap-3">
                    {isLoginView ? t('auth.panel.welcome') : t('auth.panel.newRoute')}
                    <span className="text-emerald-500">
                      {isLoginView ? <Compass size={24} /> : <UserPlus size={24} />}
                    </span>
                  </h2>
                </Motion.div>
              </AnimatePresence>
            </div>

            {/* Tab Switcher */}
            <div className="bg-white/[0.02] border border-white/5 p-1.5 rounded-2xl flex relative">
              <Motion.div
                className="absolute top-1.5 bottom-1.5 left-1.5 rounded-xl w-[calc(50%-6px)]"
                style={{
                  background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))',
                  border: '1px solid rgba(16,185,129,0.25)',
                  boxShadow: '0 0 20px rgba(16,185,129,0.1)',
                }}
                animate={{ x: isLoginView ? 0 : '100%' }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
              
              <button
                onClick={() => setIsLoginView(true)}
                className={`flex-1 flex items-center justify-center gap-2.5 py-3 text-[11px] font-black tracking-[0.2em] uppercase relative z-10 transition-colors duration-200 rounded-xl ${
                  isLoginView ? 'text-emerald-400' : 'text-emerald-100/25 hover:text-emerald-100/40'
                }`}
              >
                <LogIn size={15} />
                <span>{t('auth.tabs.login')}</span>
              </button>
              
              <button
                onClick={() => setIsLoginView(false)}
                className={`flex-1 flex items-center justify-center gap-2.5 py-3 text-[11px] font-black tracking-[0.2em] uppercase relative z-10 transition-colors duration-200 rounded-xl ${
                  !isLoginView ? 'text-emerald-400' : 'text-emerald-100/25 hover:text-emerald-100/40'
                }`}
              >
                <UserPlus size={15} />
                <span>{t('auth.tabs.register')}</span>
              </button>
            </div>

            {/* Form Kartı */}
            <div className="relative rounded-3xl overflow-hidden border border-white/5 bg-gradient-to-b from-white/[0.03] to-white/[0.01] shadow-2xl backdrop-blur-sm">
              
              {/* Üst çizgi aksan */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
              
              {/* Slide container */}
              <Motion.div 
                className="flex w-[200%]" 
                animate={{ x: isLoginView ? '0%' : '-50%' }} 
                transition={{ duration: 0.4, ease: 'anticipate' }}
              >
                <div className="w-1/2 p-6 sm:p-8">
                  <LoginForm />
                </div>
                <div className="w-1/2 p-6 sm:p-8">
                  <RegisterForm />
                </div>
              </Motion.div>
            </div>

            {/* Alt küçük bilgi */}
            <div className="text-center pt-2">
              <span className="text-[9px] font-mono font-bold tracking-[0.3em] uppercase text-emerald-200/20">
                TRACEATLAS • GÜVENLİ GİRİŞ • 2026
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPanel;
