import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Instagram, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../i18n/LanguageSwitcher';

const Footer = () => {
  const { t } = useTranslation();
  
  // Sayfa geçişlerinde en başa dönmeyi sağlar
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-gradient-to-br from-[#0a1f1a] via-[#0c2b22] to-[#0e382a] select-none border-t border-emerald-500/10">
      
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Logo ve Açıklama Alanı */}
          <div className="md:col-span-2">
            <Link 
              to="/" 
              onClick={scrollToTop} 
              className="inline-flex items-center gap-3 mb-6 group transition-transform active:scale-95"
            >
              <span className="text-white font-bold text-2xl group-hover:text-[#10b981] transition-colors tracking-tighter">
                TRACE<span className="text-[#10b981]">ATLAS</span>
              </span>
            </Link>
            <p className="text-emerald-100/70 text-sm leading-relaxed max-w-md">
              {t('footer.description')}
            </p>
          </div>

          {/* Sitelinks Tetikleyici: Navigasyon Bölümü */}
          <nav aria-label={t('footer.corporateNavigation')} className="space-y-4">
            <h3 className="text-white font-semibold text-lg mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/about" 
                  onClick={scrollToTop}
                  className="text-emerald-100/70 hover:text-[#10b981] transition-all duration-300 text-sm flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-[1px] bg-[#10b981] transition-all"></span>
                  {t('footer.about')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  onClick={scrollToTop}
                  className="text-emerald-100/70 hover:text-[#10b981] transition-all duration-300 text-sm flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-[1px] bg-[#10b981] transition-all"></span>
                  {t('footer.contact')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy-policy" 
                  onClick={scrollToTop}
                  className="text-emerald-100/70 hover:text-[#10b981] transition-all duration-300 text-sm flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-[1px] bg-[#10b981] transition-all"></span>
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  onClick={scrollToTop}
                  className="text-emerald-100/70 hover:text-[#10b981] transition-all duration-300 text-sm flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-[1px] bg-[#10b981] transition-all"></span>
                  {t('footer.terms')}
                </Link>
              </li>
            </ul>
          </nav>

       
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg mb-4">{t('footer.reachUs')}</h3>
           
            <LanguageSwitcher variant="footer" />
            

            <div className="flex items-center gap-4 pt-6">
              <a 
                href="https://github.com/dpeyupkaya" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 bg-white/5 rounded-xl hover:bg-[#10b981]/20 hover:scale-110 transition-all duration-300 border border-white/5 hover:border-emerald-500/30"
                title="GitHub"
              >
                <Github className="w-5 h-5 text-emerald-100/70 hover:text-[#10b981]" />
              </a>
              
              <a 
                href="https://instagram.com/kaya_eyuup" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 bg-white/5 rounded-xl hover:bg-[#10b981]/20 hover:scale-110 transition-all duration-300 border border-white/5 hover:border-emerald-500/30"
                title="Instagram"
              >
                <Instagram className="w-5 h-5 text-emerald-100/70 hover:text-[#10b981]" />
              </a>

              <a 
                href="https://linkedin.com/in/dp-eyup-kaya" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 bg-white/5 rounded-xl hover:bg-[#10b981]/20 hover:scale-110 transition-all duration-300 border border-white/5 hover:border-emerald-500/30"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-emerald-100/70 hover:text-[#10b981]" />
              </a>
            </div>
             <div className="text-emerald-100/50 text-sm text-center md:text-left">
              {t('footer.rights')}
            </div>
          </div>

        </div>
      </div>

    
    </footer>
  );
};

export default Footer;
