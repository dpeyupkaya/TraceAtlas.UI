import React from 'react';
import { Link } from 'react-router-dom';
import { UserCircle, ArrowRight, LogIn, Map, Users, Star, Compass } from 'lucide-react';

const RegisterPanel = () => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-[#1E3A3A] via-[#2D554F] to-[#3E6B65] text-emerald-50 flex flex-col justify-center items-center p-4 relative overflow-hidden select-none">
      
      {/* ARKA PLAN EFEKTLERİ */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none select-none"></div>
      
      {/* Dekoratif Elementler */}
      <div className="absolute top-10 left-5 w-24 h-24 bg-emerald-500/10 rounded-full blur-[40px] pointer-events-none select-none"></div>
      <div className="absolute bottom-10 right-5 w-32 h-32 bg-amber-400/10 rounded-full blur-[50px] pointer-events-none select-none"></div>
      
      {/* Yüzen İkonlar */}
      <div className="absolute top-1/4 left-1/6 opacity-[0.08] pointer-events-none animate-float select-none">
        <Compass size={40} />
      </div>
      <div className="absolute bottom-1/3 right-1/5 opacity-[0.06] pointer-events-none animate-float-delayed select-none">
        <Star size={32} />
      </div>

      {/* ANA İÇERİK */}
      <div className="w-full max-w-[320px] relative z-10 flex flex-col items-center text-center select-none">
        
        {/* Logo/İkon Alanı */}
        <div className="relative mb-6 select-none">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-amber-400 rounded-2xl flex items-center justify-center shadow-lg shadow-black/30 rotate-12 select-none">
            <LogIn className="w-10 h-10 text-white select-none" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center select-none">
            <Star className="w-3 h-3 text-white fill-current select-none" />
          </div>
        </div>

        {/* Başlık ve Açıklama */}
        <div className="mb-6 select-none">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent mb-3 select-none">
            Yolculuğa Sen de Katıl
          </h2>
          <p className="text-emerald-100/80 text-sm leading-relaxed px-2 select-none">
            Sadece hayal etme, harekete geç! Binlerce gezginle birlikte keşfetmeye başla.
          </p>
        </div>

        {/* ÖNE ÇIKAN ÖZELLİKLER */}
        <div className="grid grid-cols-2 gap-3 w-full mb-6 select-none">
          <div className="p-3 rounded-xl bg-white/8 border border-white/15 backdrop-blur-sm flex flex-col items-center transform hover:scale-[1.02] transition-all duration-200 select-none">
            <div className="relative select-none">
              <Map className="w-6 h-6 text-amber-400 mb-2 select-none" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full select-none"></div>
            </div>
            <div className="text-lg font-bold text-white select-none">1.2K+</div>
            <div className="text-[10px] text-emerald-200/70 uppercase tracking-wider font-semibold select-none">Özel Rota</div>
          </div>
          
          <div className="p-3 rounded-xl bg-white/8 border border-white/15 backdrop-blur-sm flex flex-col items-center transform hover:scale-[1.02] transition-all duration-200 select-none">
            <div className="relative select-none">
              <Users className="w-6 h-6 text-emerald-400 mb-2 select-none" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full select-none"></div>
            </div>
            <div className="text-lg font-bold text-white select-none">50K+</div>
            <div className="text-[10px] text-emerald-200/70 uppercase tracking-wider font-semibold select-none">Gezgin</div>
          </div>
        </div>

        {/* CTA BUTONU */}
        <Link to="/auth" className="w-full mb-3 select-none">
          <button className="w-full bg-gradient-to-r from-amber-400 to-amber-500 text-[#1A2F33] font-bold py-4 rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group select-none">
            <span className="select-none">Keşfetmeye Başla</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform select-none" />
          </button>
        </Link>

        {/* ALT BİLGİ */}
        <div className="text-center select-none">
          <p className="text-xs text-white/60 font-medium mb-1 select-none">
            📍 7/24 erişim • 🌍 Offline haritalar
          </p>
          <p className="text-[10px] text-white/40 font-semibold select-none">
            Üyelik tamamen ücretsiz
          </p>
        </div>

      </div>

      {/* MOBİL OPTİMİZASYONU */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(-5px) rotate(0deg); }
          50% { transform: translateY(5px) rotate(-5deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        /* Tüm elementler için seçilemezlik */
        * {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
      `}</style>
    </div>
  );
};

export default RegisterPanel;