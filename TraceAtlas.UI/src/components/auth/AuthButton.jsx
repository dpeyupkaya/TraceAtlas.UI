import React from 'react';
import { ArrowRight } from 'lucide-react';

const AuthButton = ({ text, onClick }) => {
  return (
    <button 
      onClick={(e) => { e.preventDefault(); onClick(); }}
      className="
        group relative w-full py-4 rounded-xl 
        cursor-target outline-none 
        transition-all duration-300
        
        /* TEMEL GÖRÜNÜM (Input ile Birebir Aynı) */
        bg-slate-900/50 
        border border-white/10
        text-slate-200 font-bold tracking-wide
        
        /* HOVER (ÜZERİNE GELİNCE) */
        hover:bg-slate-800/80
        hover:border-cyan-400/50
        hover:text-cyan-400
        hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]
        
        /* CLICK (BASINCA) */
        active:scale-[0.98]
      "
    >
      {/* İÇERİK */}
      <div className="relative z-10 flex items-center justify-center gap-2">
        <span>{text}</span>
        {/* Ok işareti hover'da belirir ve kayar */}
        <ArrowRight 
          className="w-5 h-5 opacity-50 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 group-hover:text-cyan-400" 
        />
      </div>

     
      <div className="
        absolute inset-0 
        bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent 
        -translate-x-[100%] group-hover:translate-x-[100%] 
        transition-transform duration-700 ease-in-out
      "></div>

    </button>
  );
};

export default AuthButton;