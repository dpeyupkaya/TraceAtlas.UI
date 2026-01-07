import React from 'react';
import { ArrowRight } from 'lucide-react';

const AuthButton = ({ children, onClick, type = "button", disabled = false, className = "" }) => {
  return (
    <button 
      type={type}
      disabled={disabled}
      onClick={(e) => {
        if (onClick && !disabled) {
          onClick(e);
        }
      }}
      className={`
        group relative w-full py-4 rounded-2xl cursor-pointer overflow-hidden 
        bg-emerald-600/10 border border-emerald-500/20 
        hover:bg-emerald-600/20 hover:border-emerald-500/40 
        transition-all duration-300 shadow-lg shadow-emerald-900/10 
        active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {/* Parlama Efekti (Işık Geçişi) */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out z-0"></div>
      
      {/* Alt Kenar Çizgisi Animasyonu */}
      <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-emerald-400 transition-all duration-500 group-hover:w-full opacity-50"></div>

      <div className="relative z-10 flex items-center justify-center gap-3">
        <span className="font-black text-emerald-50 tracking-[0.2em] uppercase text-xs group-hover:text-white transition-colors duration-300">
          {children}
        </span>
        <ArrowRight 
          className="w-4 h-4 text-emerald-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-300" 
        />
      </div>
    </button>
  );
};

export default AuthButton;