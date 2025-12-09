import React from 'react';

const InputField = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative group w-full">
      
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
        <Icon 
          className="h-5 w-5 text-slate-500 transition-all duration-300 ease-out group-focus-within:text-emerald-400 group-focus-within:drop-shadow-[0_0_8px_rgba(16,185,129,0.4)] group-focus-within:scale-110" 
        />
      </div>

      <input 
        {...props}
        className="peer w-full pl-11 pr-4 py-4 rounded-xl outline-none transition-all duration-300 bg-slate-900/60 border border-white/10 text-slate-200 placeholder:text-slate-600 hover:bg-slate-900/80 hover:border-white/20 focus:bg-slate-900/90 focus:border-emerald-500/30 focus:shadow-[0_0_20px_rgba(16,185,129,0.05)]"
      />

      <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 scale-x-0 transition-all duration-500 ease-out origin-center peer-focus:opacity-100 peer-focus:scale-x-100"></div>

    </div>
  );
};

export default InputField;