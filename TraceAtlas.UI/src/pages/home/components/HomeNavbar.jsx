import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Map, LogIn, Compass, User } from 'lucide-react';
import LanguageSwitcher from '../../../components/i18n/LanguageSwitcher';

const HomeNavbar = ({ isLoggedIn, onGuestAccess }) => {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#041a14]/80 border-b border-white/5 select-none transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Status Badge */}
          <div className="flex items-center gap-3">
            <Link 
              to="/" 
              className="flex items-center gap-2 group transition-transform active:scale-95"
            >
              <span className="text-white font-black text-xl sm:text-2xl tracking-tighter group-hover:text-emerald-400 transition-colors">
                TRACE<span className="text-emerald-500">ATLAS</span>
              </span>
            </Link>

            
          </div>

          {/* Quick Nav Anchors (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold tracking-widest uppercase text-emerald-100/60">
            <a 
              href="#atlas-realms" 
              className="hover:text-emerald-400 transition-colors py-1"
            >
              {t('home.welcome.atlasItems.routes')}
            </a>
            <a 
              href="#discovery-pillars" 
              className="hover:text-emerald-400 transition-colors py-1"
            >
              {t('home.explore')}
            </a>
            <Link 
              to="/map" 
              className="hover:text-emerald-400 transition-colors py-1 flex items-center gap-1"
            >
              <span>{t('navbar.map')}</span>
            </Link>
          </nav>

          {/* Actions & Language Switcher */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher variant="floating" />

            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/profile"
                  className="p-2 sm:px-3.5 sm:py-2 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-100 border border-white/10 hover:border-emerald-500/30 text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2"
                  title="Profil"
                >
                  <User size={15} className="text-emerald-400" />
                  <span className="hidden sm:inline">Profil</span>
                </Link>
                <Link
                  to="/map"
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-[1.02] active:scale-95 flex items-center gap-2"
                >
                  <Map size={15} />
                  <span className="hidden sm:inline">{t('navbar.map')}</span>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={onGuestAccess}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 hover:border-emerald-500/20 text-[11px] font-bold uppercase tracking-wider text-emerald-100/70 hover:text-white transition-all"
                >
                  <Compass size={14} className="text-emerald-400" />
                  <span>{t('home.register.guest')}</span>
                </button>
                <Link
                  to="/auth"
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-[1.02] active:scale-95 flex items-center gap-1.5"
                >
                  <LogIn size={15} />
                  <span>{t('navbar.login')}</span>
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default React.memo(HomeNavbar);
