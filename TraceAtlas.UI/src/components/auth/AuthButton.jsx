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
        group relative w-full py-4 rounded-xl cursor-pointer overflow-hidden 
        bg-emerald-600 hover:bg-emerald-500
        transition-all duration-300 
        shadow-[0_0_25px_rgba(16,185,129,0.2)] hover:shadow-[0_0_35px_rgba(16,185,129,0.35)]
        active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {/* Parlama Efekti (Işık Geçişi) */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out z-0"></div>
      
      <div className="relative z-10 flex items-center justify-center gap-3">
        <span className="font-black text-white tracking-[0.2em] uppercase text-xs">
          {children}
        </span>
        <ArrowRight 
          className="w-4 h-4 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" 
        />
      </div>
    </button>
  );
};

export default AuthButton;