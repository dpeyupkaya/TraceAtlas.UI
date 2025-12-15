import React, { useState, useEffect } from 'react';

const MiniatureWidget = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="absolute bottom-8 left-8 z-[9999] flex items-end pointer-events-none transition-opacity duration-700 ease-in-out">
      
      <div className="relative w-36 h-44 mr-3 pointer-events-auto hover:-translate-y-1 transition-transform duration-300">
        <img 
          src="robot/robot.png" 
          alt="Robot Asistan"
          className="w-full h-full object-contain drop-shadow-2xl"
        />
      </div>

      <div className="bg-gradient-to-br from-white/95 to-gray-50/90 backdrop-blur-xl border border-white/60 p-5 rounded-2xl rounded-bl-none shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] pointer-events-auto mb-14 max-w-[280px] transform transition-all hover:scale-[1.02] relative">
        
        <div className="absolute -left-[18px] bottom-0 w-0 h-0 
                        border-t-[18px] border-t-transparent
                        border-r-[20px] border-r-white/95
                        border-b-[0px] border-b-transparent drop-shadow-sm">
        </div>

        <h3 className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent text-lg font-extrabold mb-2 leading-tight">
          Hoş Geldin Kâşif! 👋
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed font-medium">
          Haritadaki yeni yerleri keşfetmeye ve kendi izini bırakmaya hazır mısın?
        </p>
        
      </div>

    </div>
  );
};

export default MiniatureWidget;