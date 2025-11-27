// components/button/AddMarkerButton.jsx
import React from 'react';

const AddMarkerButton = ({ onClick, isActive }) => {
  return (
    <button
      onClick={onClick}
      // Butonun üzerine gelince çıkan açıklama
      title="Konum Ekle"
      className={`
        group flex items-center justify-center
        w-16 h-16 rounded-full 
        backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]
        transition-all duration-300 ease-in-out
        ${
          isActive 
            ? "bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.6)] scale-110" // Aktifse Parlak Yeşil
            : "bg-emerald-900/60 text-emerald-100 hover:bg-emerald-800/80 hover:scale-105" // Pasifse Koyu Cam
        }
      `}
    >
      {/* İkon: Artı İşareti */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="32" 
        height="32" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={`transition-transform duration-300 ${isActive ? 'rotate-90' : 'rotate-0'}`}
      >
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </button>
  );
};

export default AddMarkerButton;