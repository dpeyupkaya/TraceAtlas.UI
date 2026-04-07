import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Github, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="w-full bg-gradient-to-br from-[#0a1f1a] via-[#0c2b22] to-[#0e382a] select-none">
      
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-white font-bold text-2xl">TraceAtlas</span>
            </div>
            <p className="text-emerald-100/70 text-sm leading-relaxed max-w-md">
              Doğanın ritmini yakala, izini sonsuzluğa bırak. TraceAtlas ile keşfettiğin 
              her anı kaydet, rotalarını paylaş ve gezginler topluluğuna katıl.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg mb-4">Bağlantılar</h3>
            <div className="space-y-2">
              <Link 
                to="/about" 
                onClick={scrollToTop}
                className="block text-emerald-100/70 hover:text-[#10b981] transition-colors duration-300 text-sm"
              >
                Hakkımızda
              </Link>
              <Link 
                to="/contact" 
                onClick={scrollToTop}
                className="block text-emerald-100/70 hover:text-[#10b981] transition-colors duration-300 text-sm"
              >
                İletişim
              </Link>
              <Link 
                to="/privacy-policy" 
                onClick={scrollToTop}
                className="block text-emerald-100/70 hover:text-[#10b981] transition-colors duration-300 text-sm"
              >
                Gizlilik Politikası
              </Link>
              <Link 
                to="/terms" 
                onClick={scrollToTop}
                className="block text-emerald-100/70 hover:text-[#10b981] transition-colors duration-300 text-sm"
              >
                Kullanım Şartları
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg mb-4">İletişim</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-emerald-100/70 text-sm">
                <Mail className="w-4 h-4 text-[#10b981]" />
                <span>dpeyupkaya@gmail.com</span>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <a href="https://github.com/dpeyupkaya" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-lg hover:bg-[#10b981]/20 transition-colors duration-300">
                <Github className="w-4 h-4 text-emerald-100/70 hover:text-[#10b981]" />
              </a>
              
              <a href="https://instagram.com/kaya_eyuup" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-lg hover:bg-[#10b981]/20 transition-colors duration-300">
                <Instagram className="w-4 h-4 text-emerald-100/70 hover:text-[#10b981]" />
              </a>
               <a href="https://linkedin.com/in/dp-eyup-kaya" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-lg hover:bg-[#10b981]/20 transition-colors duration-300">
                <Linkedin className="w-4 h-4 text-emerald-100/70 hover:text-[#10b981]" />
              </a>
            </div>

             <div className="text-emerald-100/50 text-sm text-center md:text-left">
              © 2026 TraceAtlas. Tüm hakları saklıdır.
            </div>
          </div>

        </div>
      </div>

      <div className="w-full h-[2px] bg-[#10b981]/20"></div>
    </footer>
  );
};

export default Footer;