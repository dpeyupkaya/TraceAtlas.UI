import React from 'react';
import { ArrowRight } from 'lucide-react';

const AuthButton = ({ text, onClick, type = "button" }) => {
  return (
    <button 
      type={type}
      onClick={(e) => {
        if (onClick) {
            e.preventDefault();
            onClick(e);
        }
      }}
      className="group relative w-full py-4 rounded-xl cursor-pointer overflow-hidden bg-slate-900/80 border border-white/10 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] active:scale-[0.98]"
    >
      
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out z-0"></div>
      
      <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-emerald-500 transition-all duration-500 group-hover:w-full opacity-50"></div>

      <div className="relative z-10 flex items-center justify-center gap-3">
        <span className="font-bold text-slate-300 tracking-wide group-hover:text-white transition-colors duration-300">
          {text}
        </span>
        <ArrowRight 
          className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-300" 
        />
      </div>
    </button>
  );
};

export default AuthButton;