import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import
import { Mountain, Wind, Compass, Navigation } from 'lucide-react';

import zirveler from '../../../assets/atlas/1.sm.jpg';
import ormanlar from '../../../assets/atlas/2.sm.jpg';
import denizler from '../../../assets/atlas/3.sm.jpg';
import yol from '../../../assets/atlas/4.sm.jpg';

const WelcomePanel = () => {
  const navigate = useNavigate(); // 2. Hook
  const [activeId, setActiveId] = useState(null);
  
  const atlasItems = [
    { id: 1, title: 'Zirveler', image: zirveler },
    { id: 2, title: 'Ormanlar', image: ormanlar },
    { id: 3, title: 'Denizler', image: denizler   },
    { id: 4, title: 'Rotalar',  image: yol     },
  ]

  const handleInteraction = (id) => {
    setActiveId(id);
  };

  // 3. Tıklama Fonksiyonu: Veriyi alıp map'e postalar
  const handleNavigate = (title) => {
    navigate('/map', { state: { autoSearch: title } });
  };

  return (
    <div className="w-full h-full flex flex-col py-4 px-2 select-none">
      
    
      <div className="flex flex-col gap-4 flex-grow w-full h-full">
        {atlasItems.map((item) => {
          const isActive = activeId === item.id;

          return (
            <div 
              key={item.id}
              onMouseEnter={() => handleInteraction(item.id)}
              // 4. Tıklayınca Yönlendir
              onClick={() => handleNavigate(item.title)}
              
              className={`
                relative flex-1 w-full min-h-[120px] 
                rounded-3xl overflow-hidden cursor-pointer 
                bg-zinc-900 border shadow-lg transition-all duration-300
                ${isActive ? 'border-[#10B981]/50 ring-1 ring-[#10B981]/30' : 'border-white/5'}
              `}
            >
               <img 
                 src={item.image} 
                 alt={item.title} 
                 className={`
                   absolute inset-0 w-full h-full object-cover 
                   transition-all duration-500 ease-out
                   ${isActive 
                      ? 'grayscale-0 opacity-100 scale-105' 
                      : 'grayscale opacity-60 scale-100'
                   }
                 `}
                 draggable={false}
               />
               
               <div className={`
                 absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent transition-opacity duration-300
                 ${isActive ? 'opacity-90' : 'opacity-80'}
               `} />

               <div className="absolute inset-0 flex items-center px-6">
                  <div className={`
                    flex items-center gap-4 transform transition-transform duration-300
                    ${isActive ? 'translate-x-2' : 'translate-x-0'}
                  `}>
                     
                    
                
                     
                     <div className="flex flex-col">
                        <span className={`
                          font-bold text-xl tracking-wide transition-colors duration-300
                          ${isActive ? 'text-[#10B981]' : 'text-white'}
                        `}>
                          {item.title}
                        </span>
                        
                        <span className={`
                          text-xs text-gray-300 transition-all duration-300
                          ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
                        `}>
                           Keşfet →
                        </span>
                     </div>
                  </div>
               </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WelcomePanel;