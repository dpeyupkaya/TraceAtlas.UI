import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AtlasCard from '../../../common/AtlasCard ';

import zirveler from '../../../assets/atlas/1.sm.webp';
import ormanlar from '../../../assets/atlas/2.sm.webp';
import denizler from '../../../assets/atlas/3.sm.webp';
import yol from '../../../assets/atlas/4.sm.webp';

const atlasItems = [
  { id: 1, titleKey: 'home.welcome.atlasItems.peaks', image: zirveler },
  { id: 2, titleKey: 'home.welcome.atlasItems.forests', image: ormanlar },
  { id: 3, titleKey: 'home.welcome.atlasItems.seas', image: denizler },
  { id: 4, titleKey: 'home.welcome.atlasItems.routes', image: yol },
];

const WelcomePanel = () => {
  const { t } = useTranslation();
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
            item={{ ...item, title: t(item.titleKey) }}
            isActive={activeId === item.id}
            onHover={() => handleHover(item.id)}
            onClick={() => handleNavigate(t(item.titleKey))}
          />
        ))}
      </div>
    </div>
  );
};

export default WelcomePanel;
