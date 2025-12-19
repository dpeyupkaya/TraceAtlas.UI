import React from 'react';

const ChristmasButton = ({ children, className = "", ...props }) => {
  return (
    <div className={`relative inline-block ${className.includes('w-full') ? 'w-full' : ''} group`}>
      {/* Kar Birikintisi - Boyutu biraz küçültüldü ki taşma yapmasın */}
      <svg
        className="absolute -top-[14px] left-2 z-20 w-24 h-auto pointer-events-none transition-transform group-hover:-translate-y-1"
        viewBox="0 0 130 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 35C0 35 15 10 40 15C65 20 85 5 110 10C135 15 130 40 130 40H0V35Z" fill="white" />
      </svg>

      {/* Noel Baba Şapkası */}
      <svg
        className="absolute -top-[22px] -right-2 z-20 w-12 h-12 pointer-events-none transition-transform duration-300 group-hover:rotate-12"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20 65C20 65 35 15 85 10L95 35L30 75L20 65Z" fill="#ef4444" />
        <circle cx="85" cy="10" r="10" fill="white" />
        <path d="M15 60C15 60 20 80 45 75C70 70 35 50 15 60Z" fill="white" />
      </svg>

      <button
        {...props}
        className={`
          relative w-full overflow-hidden
          bg-[#d92525] p-1.5 rounded-full
          transition-all duration-300
          hover:shadow-[0_0_20px_rgba(217,37,37,0.4)]
          active:scale-[0.97]
          ${className}
        `}
      >
        <div className="bg-[#a5c93f] py-3 px-4 rounded-full border-t border-white/30 flex items-center justify-center">
          <span className="text-white font-black italic tracking-wider text-lg drop-shadow-sm uppercase">
            {children}
          </span>
        </div>
      </button>
    </div>
  );
};

export default ChristmasButton;