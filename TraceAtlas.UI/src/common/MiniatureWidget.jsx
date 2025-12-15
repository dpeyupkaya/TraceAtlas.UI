import React, { useState, useEffect } from 'react';

const MiniatureWidget = () => {
  const [isVisible, setIsVisible] = useState(true);
  
  // Widget ekrana girerken animasyon tetikleyicisi
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 10 saniye sonra otomatik kapanma
    const timer = setTimeout(() => setIsVisible(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={`
        fixed bottom-8 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 z-[9999]
        transition-all duration-700 ease-spring
        ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
      `}
    >
      {/* ANA KONTEYNER: 
        Eski balon yerine "Hap (Pill)" şeklinde modern bir kart yapısı.
        Flex-row kullanarak robotu ve metni yan yana getirdik.
      */}
      <div className="relative group flex items-center bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-stone-100 pr-10 pl-3 py-3 rounded-full hover:shadow-[0_8px_40px_rgba(16,185,129,0.15)] transition-shadow duration-300 max-w-[90vw] w-auto md:w-[420px]">
        
        {/* SOL TARA: ROBOT (Avatar Gibi) */}
        <div className="relative shrink-0 mr-4">
          {/* Robotun arkasındaki daire (Avatar background) */}
          <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-teal-50 rounded-full flex items-center justify-center border border-emerald-100/50 shadow-inner overflow-visible">
             {/* Robot Resmi: Daireden dışarı taşması için scale ve translate kullanıldı */}
             <img 
               src="robot/robot.png" 
               alt="AI" 
               className="w-20 max-w-none -mt-4 drop-shadow-lg transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-110"
             />
          </div>
          
          {/* Online durumu gösteren yeşil nokta */}
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full animate-pulse"></span>
        </div>

        {/* ORTA: METİN ALANI (Daha clean typography) */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-0.5">
            <h4 className="text-stone-800 font-bold text-sm tracking-tight">Yeni Rota Önerisi</h4>
            <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">Keşfet</span>
          </div>
          <p className="text-stone-500 text-xs leading-tight font-medium line-clamp-2">
            Harita üzerinde keşfedilmemiş 3 yeni nokta belirdi. İncelemek ister misin?
          </p>
        </div>

        {/* KAPAT BUTONU (Sağ üst köşeye gizli değil, kartın bir parçası) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsVisible(false);
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-stone-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200"
          aria-label="Kapat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* DEKORATİF: İlerleme Çubuğu (Zamanlayıcıyı görselleştirmek için) */}
        <div className="absolute bottom-0 left-8 right-8 h-[2px] bg-stone-100 overflow-hidden rounded-full mx-auto">
             <div className="h-full bg-emerald-500/50 w-full animate-[shrink_10s_linear_forwards] origin-left" />
        </div>
      </div>
      
      {/* Tailwind Config'e eklenmesi gereken keyframes için not: 
          shrink: { from: { transform: 'scaleX(1)' }, to: { transform: 'scaleX(0)' } } 
      */}
      <style>{`
        @keyframes shrink {
          from { transform: scaleX(1); }
          to { transform: scaleX(0); }
        }
      `}</style>
    </div>
  );
};

export default MiniatureWidget;