import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const icons = {
  Map: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.159.69.159 1.006 0Z" />
    </svg>
  ),
  Profile: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
  ),
  Keşfet: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69.159 1.006 0l4.994 2.497c.317.159.69.159 1.006 0Z" />
    </svg>
  ),
  Default: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
      <circle cx="12" cy="12" r="10" />
    </svg>
  )
};

const MobileMenu = ({ isOpen, items, onClose }) => {
  const location = useLocation();

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998] animate-in fade-in duration-200"
        onClick={handleOverlayClick}
      />

      <div className="fixed top-16 left-0 right-0 z-[9999] px-3 animate-in slide-in-from-top-2 duration-200 pointer-events-none">
        <div className="max-w-md mx-auto pointer-events-auto">
          
          <div className="bg-white/92 backdrop-blur-lg border border-white/30 shadow-lg rounded-2xl overflow-hidden">
            
          
            <div className="p-1.5 space-y-0.5">
              {items.map((item, index) => {
                const isActive = location.pathname === item.href;
                
                return (
                  <Link
                    key={index}
                    to={item.href}
                    onClick={onClose}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150
                      ${isActive 
                        ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-md shadow-emerald-500/20' 
                        : 'text-stone-700 hover:bg-emerald-50/60'
                      }
                    `}
                  >
                    {/* Icon */}
                    <div className={`transition-colors ${
                      isActive ? 'text-white' : 'text-stone-500'
                    }`}>
                      {icons[item.label] || icons.Default}
                    </div>
                    
                    <span className="font-medium text-sm flex-1">
                      {item.label}
                    </span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 20 20" 
                      fill="currentColor" 
                      className={`w-4 h-4 transition-all duration-150 ${
                        isActive 
                          ? 'opacity-100' 
                          : 'opacity-0'
                      }`}
                    >
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                  </Link>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;