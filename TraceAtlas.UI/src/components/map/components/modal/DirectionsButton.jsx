import React from 'react';

const MapIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M8.161 2.58a1.875 1.875 0 011.678 0l4.993 2.498c.106.052.23.052.336 0l3.869-1.935A1.875 1.875 0 0121.75 4.82v12.485c0 .71-.401 1.36-1.037 1.677l-4.875 2.437a1.875 1.875 0 01-1.676 0l-4.994-2.497a.375.375 0 00-.336 0l-3.868 1.935A1.875 1.875 0 012.25 19.18V6.695c0-.71.401-1.36 1.036-1.677l4.875-2.437zM9 6a.75.75 0 01.75.75v10.5a.75.75 0 01-1.5 0V6.75A.75.75 0 019 6zm6.75 3a.75.75 0 01.75.75v10.5a.75.75 0 01-1.5 0V9.75a.75.75 0 01.75-.75z" clipRule="evenodd" />
  </svg>
);

const DirectionsButton = ({ latitude, longitude, className = "" }) => {
  const handleDirections = () => {
    if (latitude && longitude) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
      window.open(url, '_blank');
    }
  };

  return (
    <button 
      onClick={handleDirections}
      className={`flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-br from-[#1E3A3A] via-[#2D554F] to-[#3E6B65]  text-white font-medium rounded-xl shadow-lg shadow-blue-600/20 transition-all duration-200  ${className}`}
    >
      <MapIcon className="w-5 h-5" />
      <span>Yol Tarifi</span>
    </button>
  );
};

export default DirectionsButton;