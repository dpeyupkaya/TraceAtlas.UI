import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Instagram, Linkedin, Compass, ArrowUp, Map, ShieldCheck, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../i18n/LanguageSwitcher';

const Footer = () => {
  const { t } = useTranslation();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#03150f] text-emerald-50 select-none border-t border-white/5 relative overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[200px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px] bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/5">
          
          {/* Col 1: Brand & Tagline (5 cols) */}
          <div className="md:col-span-5 space-y-5">
            <Link 
              to="/" 
              onClick={scrollToTop} 
              className="inline-flex items-center gap-2 group transition-transform active:scale-95"
            >
              <span className="text-white font-black text-2xl tracking-tighter group-hover:text-emerald-400 transition-colors">
                TRACE<span className="text-emerald-500">ATLAS</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-mono font-bold text-emerald-400 tracking-wider">
                2026
              </span>
            </Link>

            <p className="text-emerald-100/60 text-xs sm:text-sm leading-relaxed max-w-sm font-light">
              {t('footer.description')}
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-mono font-bold text-emerald-400/80 tracking-widest uppercase">
                CANLI VE TOPLULUK KATKILI ATLAS
              </span>
            </div>
          </div>

          {/* Col 2: Navigation (3 cols) */}
          <nav aria-label={t('footer.corporateNavigation')} className="md:col-span-3 space-y-4">
            <h3 className="text-white font-mono font-bold text-xs uppercase tracking-widest flex items-center gap-2">
              <Compass size={14} className="text-emerald-400" />
              <span>{t('footer.quickLinks')}</span>
            </h3>

            <ul className="space-y-2.5 text-xs">
              <li>
                <Link 
                  to="/about" 
                  onClick={scrollToTop}
                  className="text-emerald-100/60 hover:text-white transition-all flex items-center gap-2 group py-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/40 group-hover:bg-emerald-400 transition-colors"></span>
                  <span className="group-hover:translate-x-1 transition-transform">{t('footer.about')}</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  onClick={scrollToTop}
                  className="text-emerald-100/60 hover:text-white transition-all flex items-center gap-2 group py-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/40 group-hover:bg-emerald-400 transition-colors"></span>
                  <span className="group-hover:translate-x-1 transition-transform">{t('footer.contact')}</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy-policy" 
                  onClick={scrollToTop}
                  className="text-emerald-100/60 hover:text-white transition-all flex items-center gap-2 group py-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/40 group-hover:bg-emerald-400 transition-colors"></span>
                  <span className="group-hover:translate-x-1 transition-transform">{t('footer.privacy')}</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  onClick={scrollToTop}
                  className="text-emerald-100/60 hover:text-white transition-all flex items-center gap-2 group py-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/40 group-hover:bg-emerald-400 transition-colors"></span>
                  <span className="group-hover:translate-x-1 transition-transform">{t('footer.terms')}</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Col 3: Language & Socials (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-white font-mono font-bold text-xs uppercase tracking-widest">
              {t('footer.reachUs')}
            </h3>

            <div>
              <LanguageSwitcher variant="footer" />
            </div>

            <div className="flex items-center gap-2.5 pt-2">
              <a 
                href="https://github.com/dpeyupkaya" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] hover:text-white border border-white/5 hover:border-emerald-500/30 flex items-center justify-center text-emerald-100/60 transition-all duration-300 hover:scale-105"
                title="GitHub"
              >
                <Github size={17} />
              </a>
              
              <a 
                href="https://instagram.com/kaya_eyuup" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-xl bg-white/[0.03] hover:bg-pink-500/10 hover:text-pink-400 border border-white/5 hover:border-pink-500/30 flex items-center justify-center text-emerald-100/60 transition-all duration-300 hover:scale-105"
                title="Instagram"
              >
                <Instagram size={17} />
              </a>

              <a 
                href="https://linkedin.com/in/dp-eyup-kaya" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-xl bg-white/[0.03] hover:bg-[#0077b5]/10 hover:text-[#0077b5] border border-white/5 hover:border-[#0077b5]/30 flex items-center justify-center text-emerald-100/60 transition-all duration-300 hover:scale-105"
                title="LinkedIn"
              >
                <Linkedin size={17} />
              </a>

              <button
                onClick={scrollToTop}
                aria-label="Yukarı Çık"
                className="w-10 h-10 ml-auto rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
                title="Başa Dön"
              >
                <ArrowUp size={16} />
              </button>
            </div>
          </div>

        </div>

        {/* Sub-footer Rights & Made with */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-emerald-100/40">
          <p>
            {t('footer.rights')}
          </p>

          <div className="flex items-center gap-1.5 text-[11px]">
            <span>Doğa ve keşif tutkusuyla tasarlandı</span>
            <Heart size={12} className="text-emerald-400 fill-emerald-500/30" />
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
