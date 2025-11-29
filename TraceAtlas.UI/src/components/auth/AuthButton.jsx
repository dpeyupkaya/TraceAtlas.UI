import React from 'react';
import { ArrowRight } from 'lucide-react';

const AuthButton = ({ text, onClick, type = "button" }) => {
  return (
    <button 
      type={type}
      onClick={(e) => {
        // Eğer bir onClick fonksiyonu gönderildiyse çalıştır, yoksa hata verme
        if (onClick) {
            e.preventDefault(); // Sadece özel onClick varsa default'u engelle
            onClick(e);
        }
        // Eğer type="submit" ise ve onClick yoksa, bırak form submit olsun (preventDefault yapma)
      }}
      className="
        group relative w-full py-4 rounded-xl 
        cursor-pointer outline-none 
        transition-all duration-300
        select-none
        
        /* TEMEL GÖRÜNÜM */
        bg-slate-900/50 
        border border-white/10
        text-slate-200 font-bold tracking-wide
        
        /* HOVER (ÜZERİNE GELİNCE) */
        hover:bg-slate-800/80
        hover:border-[#10b981]/60
        hover:text-[#10b981]
        hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]
        
        /* FOCUS (ODAKLANINCA) */
        focus:border-[#10b981]/80
        focus:text-[#10b981]
        focus:shadow-[0_0_25px_rgba(16,185,129,0.2)]
        
        /* CLICK (BASINCA) */
        active:scale-[0.98]
        active:bg-[#10b981]/5
      "
    >
      {/* İÇERİK */}
      <div className="relative z-10 flex items-center justify-center gap-2">
        <span className="transition-colors duration-300">{text}</span>
        {/* Ok işareti hover'da belirir ve kayar */}
        <ArrowRight 
          className="w-5 h-5 opacity-50 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 group-hover:text-[#10b981]" 
        />
      </div>

      {/* SHIMMER EFEKTİ */}
      <div className="
        absolute inset-0 
        bg-gradient-to-r from-transparent via-[#10b981]/10 to-transparent 
        -translate-x-[100%] group-hover:translate-x-[100%] 
        transition-transform duration-700 ease-in-out
      "></div>

      {/* EK GLOW EFEKTİ */}
      <div className="
        absolute inset-0 rounded-xl 
        bg-[#10b981]/0 
        transition-all duration-500
        group-hover:bg-[#10b981]/3
        group-focus:bg-[#10b981]/5
      "></div>

    </button>
  );
};

export default AuthButton;