import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import profileService from '../../../services/profileService';
import { ArrowRight, LogIn, Map, Users, Star, Compass } from 'lucide-react';

const RegisterPanel = () => {
  const navigate = useNavigate();
  
  const [stats, setStats] = useState({
    routeCount: 0,
    userCount: 0
  });

  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M+';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K+';
    return num.toString();
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
    }

    const fetchStats = async () => {
      try {
        const data = await profileService.getPublicStats();
        if(data) {
            setStats({
                routeCount: data.routeCount, 
                userCount: data.userCount
            });
        }
      } catch (error) {
        setStats({ routeCount: 1200, userCount: 50000 });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleGuestAccess = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    navigate('/map');
  };

  // Ortak yazı efekti sınıfı: Geçişli parlama
  const textHoverClass = "transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] cursor-default";

  return (
    <div className="w-full h-full bg-gradient-to-br from-[#0a1f1a] via-[#0c2b22] to-[#0e382a] text-emerald-50 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      
      {/* Statik Arkaplan */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-10 left-5 w-24 h-24 bg-emerald-500/10 rounded-full blur-[40px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-5 w-32 h-32 bg-teal-400/10 rounded-full blur-[50px] pointer-events-none"></div>
      
      {/* İkonlar (Tamamen Sabit) */}
      <div className="absolute top-1/4 left-1/6 opacity-[0.08] pointer-events-none">
        <Compass size={40} />
      </div>
      <div className="absolute bottom-1/3 right-1/5 opacity-[0.06] pointer-events-none">
        <Star size={32} />
      </div>

      <div className="w-full max-w-[320px] relative z-10 flex flex-col items-center text-center">
        
        {/* LOGO */}
        <div className="relative mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-400 rounded-2xl flex items-center justify-center shadow-lg shadow-black/30 rotate-12">
            <LogIn className="w-10 h-10 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center">
            <Star className="w-3 h-3 text-white fill-current" />
          </div>
        </div>

        {/* METİN ALANI */}
        <div className="mb-6">
          {/* Başlık: Hoverda hafif parlama */}
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent mb-3 hover:brightness-125 transition-all duration-300 cursor-default">
            TraceAtlas'a Katıl
          </h2>
          {/* Açıklama: Hoverda beyazlaşma ve parlama */}
          <p className={`text-emerald-100/80 text-sm leading-relaxed px-2 ${textHoverClass}`}>
            Doğa maceralarını kaydet, keşiflerini paylaş, topluluğa dahil ol.
          </p>
        </div>

        {/* İSTATİSTİKLER */}
        <div className="grid grid-cols-2 gap-3 w-full mb-6">
          <div className="p-3 rounded-xl bg-white/8 border border-white/15 backdrop-blur-sm flex flex-col items-center">
            <div className="relative">
              <Map className="w-6 h-6 text-emerald-400 mb-2" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full"></div>
            </div>
            {/* Sayı Efekti */}
            <div className={`text-lg font-bold text-white ${textHoverClass}`}>
                {loading ? "..." : formatNumber(stats.routeCount)}
            </div>
            {/* Alt Metin Efekti */}
            <div className={`text-[10px] text-emerald-200/70 uppercase tracking-wider font-semibold ${textHoverClass}`}>
                İşaretlemiş Mekan
            </div>
          </div>
          
          <div className="p-3 rounded-xl bg-white/8 border border-white/15 backdrop-blur-sm flex flex-col items-center">
            <div className="relative">
              <Users className="w-6 h-6 text-teal-400 mb-2" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full"></div>
            </div>
            {/* Sayı Efekti */}
            <div className={`text-lg font-bold text-white ${textHoverClass}`}>
                {loading ? "..." : formatNumber(stats.userCount)}
            </div>
            {/* Alt Metin Efekti */}
            <div className={`text-[10px] text-emerald-200/70 uppercase tracking-wider font-semibold ${textHoverClass}`}>
                Kullanıcı
            </div>
          </div>
        </div>

        {isLoggedIn ? (
          <Link to="/map" className="w-full mb-3">
            <button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2">
              <span>Devam Et</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        ) : (
          <>
            <Link to="/auth" className="w-full mb-3">
              <button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2">
                <span>Giriş Yap</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>

            <div 
                onClick={handleGuestAccess}
                className="cursor-pointer flex flex-col items-center justify-center mt-2 mb-4"
            >
                {/* Link Yazısı Efekti */}
                <span className={`text-sm font-medium text-emerald-100/70 border-b border-transparent pb-0.5 ${textHoverClass}`}>
                  Kayıt olmadan devam et
                </span>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default RegisterPanel;