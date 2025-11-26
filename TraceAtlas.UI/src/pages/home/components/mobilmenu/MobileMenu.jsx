import React from 'react';
import { ArrowRight } from 'lucide-react';

const MobileMenu = ({ items }) => {
  return (
    // DÜZELTME: 'fixed' ve 'h-[100dvh]' yerine 'w-full h-full' yapıyoruz.
    // Böylece WelcomePanel ne kadarsa bu da o kadar yer kaplar.
    <div className="w-full h-full flex flex-col bg-[#022c22]">
      {items.map((item, index) => (
        <a 
          key={index} 
          href={item.link} 
          className="relative flex-1 group overflow-hidden border-b border-[#10b981]/20 last:border-0"
        >
          {/* Arka Plan Resmi */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-active:scale-110 opacity-60"
            style={{ backgroundImage: `url(${item.image})` }}
          ></div>
          
          {/* Renk Perdesi */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#022c22] via-[#022c22]/60 to-transparent"></div>

          {/* İçerik */}
          <div className="relative z-10 w-full h-full flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
               <span className="text-xs font-mono text-[#10b981]">0{index + 1}</span>
               <span className="text-xl font-bold text-white tracking-widest uppercase shadow-black drop-shadow-md">
                 {item.text}
               </span>
            </div>
            
            <div className="w-8 h-8 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10 group-active:bg-[#10b981] group-active:text-[#022c22] transition-colors">
              <ArrowRight className="w-4 h-4 text-white group-active:text-[#022c22]" />
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default MobileMenu;