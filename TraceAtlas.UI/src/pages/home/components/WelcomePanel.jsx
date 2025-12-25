import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AtlasCard from '../../../common/AtlasCard ';

import zirveler from '../../../assets/atlas/1.sm.webp';
import ormanlar from '../../../assets/atlas/2.sm.webp';
import denizler from '../../../assets/atlas/3.sm.webp';
import yol from '../../../assets/atlas/4.sm.webp';

const atlasItems = [
  { id: 1, title: 'Zirveler', image: zirveler },
  { id: 2, title: 'Ormanlar', image: ormanlar },
  { id: 3, title: 'Denizler', image: denizler },
  { id: 4, title: 'Rotalar', image: yol },
];

const WelcomePanel = () => {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(null);

  const handleHover = useCallback((id) => {
    setActiveId(prev => (prev === id ? prev : id));
  }, []);

  const handleNavigate = (title) => {
    navigate('/map', { state: { autoSearch: title } });
  };

  return (
    <div className="w-full h-full flex flex-col py-4 px-2 select-none">
      <div className="flex flex-col gap-4 flex-grow">
        {atlasItems.map(item => (
          <AtlasCard
            key={item.id}
            item={item}
            isActive={activeId === item.id}
            onHover={() => handleHover(item.id)}
            onClick={() => handleNavigate(item.title)}
          />
        ))}
      </div>
    </div>
  );
};

export default WelcomePanel;
