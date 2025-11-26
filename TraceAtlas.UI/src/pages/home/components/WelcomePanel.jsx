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
   
    <div className="relative w-full h-screen bg-[#10b981] overflow-hidden">
      
   
      <div className="hidden md:block w-full h-full absolute inset-0">
          <FlowingMenu items={atlasItems} />
      </div>

  
      <div className="block md:hidden w-full h-full absolute inset-0 z-20">
          <MobileMenu items={atlasItems} />
      </div>

    </div>
  );
};

export default WelcomePanel;