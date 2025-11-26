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
            
            /* Focus olunca İkon Parlasın ve Rengi Değişsin */
            group-focus-within:text-cyan-400 
            group-focus-within:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]
            group-focus-within:scale-110
          " 
        />
      </div>

      {/* 2. INPUT ALANI */}
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
          
          /* Focus Durumu (Border rengini kaldırdık çünkü alttan çizgi gelecek) */
          focus:bg-slate-900/80
          focus:border-white/10
        "
      />

    
      <div className="
        absolute bottom-0 left-0 h-[2px] w-full 
        bg-gradient-to-r from-transparent via-cyan-400 to-transparent 
        opacity-0 scale-x-0 
        transition-all duration-500 ease-out 
        origin-center
        
        /* Input focus olunca tetiklenir */
        peer-focus:opacity-100 
        peer-focus:scale-x-100
      "></div>
      
    </div>
  );
};

export default InputField;