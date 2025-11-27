import React from 'react';
import MobileMenu from './mobilmenu/MobileMenu'; 
import FlowingMenu from '../../../bits/FlowingMenu'; 

const atlasItems = [
  { link: '#', text: 'Zirveler', image: 'https://images.unsplash.com/photo-1519681393797-29e96394526f?auto=format&fit=crop&w=600&q=80' },
  { link: '#', text: 'Ormanlar', image: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=600&q=80' },
  { link: '#', text: 'Kanyonlar', image: 'https://images.unsplash.com/photo-1474044159687-1ee9fc3cfd1c?auto=format&fit=crop&w=600&q=80' },
  { link: '#', text: 'Rotalar', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80' }
];

const WelcomePanel = () => {
  return (
    <div className="relative w-full h-screen bg-[#3E6B65] overflow-hidden select-none">
      
      {/* DEKORATİF ARKA PLAN ELEMENTLERİ */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#3E6B65]/80 via-[#2D554F]/60 to-[#1E3A3A]/40 pointer-events-none select-none"></div>
        
        {/* Desen */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none select-none"></div>
        
        {/* Glow efektleri */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-400/10 rounded-full blur-[80px] pointer-events-none select-none"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-amber-400/5 rounded-full blur-[100px] pointer-events-none select-none"></div>
      </div>

      {/* MASRAFÜSTÜ MENÜ */}
      <div className="hidden md:block w-full h-full absolute inset-0 select-none">
        <FlowingMenu items={atlasItems} />
      </div>

      {/* MOBİL MENÜ */}
      <div className="block md:hidden w-full h-full absolute inset-0 z-20 select-none">
        <MobileMenu items={atlasItems} />
      </div>

    

      {/* GLOBAL STİLLER */}
      <style jsx>{`
        /* Tüm elementler için seçilemezlik */
        * {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        
        /* Buton ve linkler için pointer cursor */
        button, a, [role="button"] {
          cursor: pointer;
        }
        
        /* Görseller için seçilemezlik */
        img {
          -webkit-user-drag: none;
          -khtml-user-drag: none;
          -moz-user-drag: none;
          -o-user-drag: none;
          user-drag: none;
        }
      `}</style>
    </div>
  );
};

export default WelcomePanel;