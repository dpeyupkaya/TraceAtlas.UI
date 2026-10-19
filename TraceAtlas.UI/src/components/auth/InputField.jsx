import React from 'react';

const InputField = ({ icon, ...props }) => {
  const IconComponent = icon;
  return (
    <div className="relative group w-full">
      
      {IconComponent && (
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
          <IconComponent 
            className="h-[18px] w-[18px] text-emerald-100/25 transition-all duration-300 ease-out group-focus-within:text-emerald-400 group-focus-within:drop-shadow-[0_0_8px_rgba(16,185,129,0.4)] group-focus-within:scale-110" 
          />
        </div>
      )}

      <input 
        {...props}
        className="peer w-full pl-11 pr-4 py-4 rounded-xl outline-none transition-all duration-300 bg-white/[0.03] border border-white/8 text-emerald-50 placeholder:text-emerald-100/20 hover:bg-white/[0.05] hover:border-white/15 focus:bg-white/[0.06] focus:border-emerald-500/40 focus:shadow-[0_0_25px_rgba(16,185,129,0.06)] text-sm font-medium tracking-wide"
      />

      <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 scale-x-0 transition-all duration-500 ease-out origin-center peer-focus:opacity-60 peer-focus:scale-x-100"></div>

    </div>
  );
};

export default InputField;