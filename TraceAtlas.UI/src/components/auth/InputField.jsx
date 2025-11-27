import React from 'react';

const InputField = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative group w-full">
      
      {/* 1. İKON ALANI */}
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
        <Icon 
          className="
            h-5 w-5 
            text-slate-400 
            transition-all duration-300 ease-out
            
            /* Focus olunca İkon Emerald Rengi ve Parlama */
            group-focus-within:text-[#10b981]
            group-focus-within:drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]
            group-focus-within:scale-110
          " 
        />
      </div>

      <input 
        {...props} // type, placeholder, value, onChange vb. hepsini kapsar
        className="
          peer
          w-full pl-11 pr-4 py-4 
          rounded-xl 
          outline-none 
          transition-colors duration-300
          cursor-target
          
          /* Arka Plan ve Kenarlık (Glassy) */
          bg-slate-900/50
          border border-white/10
          text-slate-100 
          placeholder:text-slate-500
          
          /* Hover Durumu */
          hover:bg-slate-800/50
          hover:border-white/20
          
          /* Focus Durumu */
          focus:bg-slate-900/80
          focus:border-white/10
        "
      />

      {/* ALT ÇİZGİ - EMERALD GRADIENT */}
      <div className="
        absolute bottom-0 left-0 h-[2px] w-full 
        bg-gradient-to-r from-transparent via-[#10b981] to-transparent 
        opacity-0 scale-x-0 
        transition-all duration-500 ease-out 
        origin-center
        
        /* Input focus olunca tetiklenir */
        peer-focus:opacity-100 
        peer-focus:scale-x-100
      "></div>

      {/* EK GLOW EFEKTİ (Opsiyonel) */}
      <div className="
        absolute inset-0 rounded-xl 
        bg-[#10b981]/0 
        transition-all duration-500 ease-out
        pointer-events-none
        
        /* Focus durumunda hafif glow */
        peer-focus:bg-[#10b981]/5
        peer-focus:shadow-[0_0_20px_rgba(16,185,129,0.1)]
      "></div>
      
    </div>
  );
};

export default InputField;