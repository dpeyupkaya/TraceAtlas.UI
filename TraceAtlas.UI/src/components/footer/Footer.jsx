import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Github, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 z-50 w-full bg-[#022c22] border-t border-[#10b981]/20 select-none">
      
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#10b981] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
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
              <Link to="/about" className="block text-emerald-100/70 hover:text-[#10b981] transition-colors duration-300 text-sm">
                Hakkımızda
              </Link>
              <Link to="/contact" className="block text-emerald-100/70 hover:text-[#10b981] transition-colors duration-300 text-sm">
                İletişim
              </Link>
              <Link to="/privacy" className="block text-emerald-100/70 hover:text-[#10b981] transition-colors duration-300 text-sm">
                Gizlilik Politikası
              </Link>
              <Link to="/terms" className="block text-emerald-100/70 hover:text-[#10b981] transition-colors duration-300 text-sm">
                Kullanım Şartları
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg mb-4">İletişim</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-emerald-100/70 text-sm">
                <Mail className="w-4 h-4 text-[#10b981]" />
                <span>info@traceatlas.com</span>
              </div>
              <div className="flex items-center gap-3 text-emerald-100/70 text-sm">
                <MapPin className="w-4 h-4 text-[#10b981]" />
                <span>İstanbul, Türkiye</span>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-[#10b981]/20 transition-colors duration-300">
                <Github className="w-4 h-4 text-emerald-100/70 hover:text-[#10b981]" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-[#10b981]/20 transition-colors duration-300">
                <Twitter className="w-4 h-4 text-emerald-100/70 hover:text-[#10b981]" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-[#10b981]/20 transition-colors duration-300">
                <Instagram className="w-4 h-4 text-emerald-100/70 hover:text-[#10b981]" />
              </a>
            </div>
          </div>

        </div>
      </div>

      <div className="border-t border-[#10b981]/10 bg-[#022c22]">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-emerald-100/50 text-sm text-center md:text-left">
              © 2025 TraceAtlas. Tüm hakları saklıdır.
            </div>
            <div className="flex items-center gap-6 text-xs text-emerald-100/40">
              <span>🚀 Keşfetmeye Devam Et</span>
              <span>🌍 Doğaya Saygı</span>
              <span>🔒 Güvenli Platform</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[2px] bg-[#10b981]/20"></div>
    </footer>
  );
};

export default Footer;