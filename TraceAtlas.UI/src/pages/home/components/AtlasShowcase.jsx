import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Compass } from 'lucide-react';

import zirveler from '../../../assets/atlas/1.sm.webp';
import ormanlar from '../../../assets/atlas/2.sm.webp';
import denizler from '../../../assets/atlas/3.sm.webp';
import yol from '../../../assets/atlas/4.sm.webp';

const atlasItems = [
  { id: 1, titleKey: 'home.welcome.atlasItems.peaks', image: zirveler, code: '01' },
  { id: 2, titleKey: 'home.welcome.atlasItems.forests', image: ormanlar, code: '02' },
  { id: 3, titleKey: 'home.welcome.atlasItems.seas', image: denizler, code: '03' },
  { id: 4, titleKey: 'home.welcome.atlasItems.routes', image: yol, code: '04' },
];

const AtlasShowcase = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState(null);

  const handleNavigate = (title) => {
    navigate('/map', { state: { autoSearch: title } });
  };

  return (
    <section id="atlas-realms" className="w-full py-16 md:py-24 relative select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 mb-4">
            <Compass size={13} className="text-emerald-400" />
            <span className="text-[10px] font-mono font-bold text-emerald-400 tracking-[0.2em] uppercase">
              COĞRAFİ ATLAS
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Doğanın Dört Farklı Rotası
          </h2>

          <p className="text-sm sm:text-base text-emerald-100/60 max-w-xl font-light">
            Zirvelerden vadilere, derin ormanlardan ıssız sahillere kadar ilgilendiğin coğrafyayı seç ve haritada hemen keşfet.
          </p>
        </div>

        {/* 4 Cards Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {atlasItems.map((item) => {
            const title = t(item.titleKey);
            const isHovered = hoveredId === item.id;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(item.id)}
                onBlur={() => setHoveredId(null)}
                onClick={() => handleNavigate(title)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleNavigate(title);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`${title} - ${t('home.welcome.explore')}`}
                className={`
                  group relative h-[360px] sm:h-[400px] lg:h-[440px]
                  rounded-3xl overflow-hidden cursor-pointer
                  bg-[#031510] border
                  transition-all duration-500 ease-out
                  focus:outline-none focus:ring-2 focus:ring-emerald-400/50
                  ${isHovered 
                    ? 'border-emerald-500/60 shadow-[0_0_35px_rgba(16,185,129,0.25)] -translate-y-1.5' 
                    : 'border-white/10 hover:border-white/20'
                  }
                `}
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={title}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className={`
                    absolute inset-0 w-full h-full object-cover
                    transition-all duration-700 ease-out
                    ${isHovered ? 'scale-110 opacity-100' : 'scale-100 opacity-65 grayscale-[30%]'}
                  `}
                />

                {/* Dark Vignette Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#041a14] via-[#041a14]/50 to-transparent opacity-90 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Top Code Badge */}
                <div className="absolute top-5 left-5 z-10">
                  <span className="px-3 py-1 rounded-full backdrop-blur-md bg-black/40 border border-white/10 text-[10px] font-mono font-bold tracking-widest text-emerald-300 uppercase">
                    {item.code} / ATLAS
                  </span>
                </div>

                {/* Bottom Card Content */}
                <div className="absolute inset-x-0 bottom-0 p-6 z-10 flex flex-col justify-end text-left">
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight group-hover:text-emerald-400 transition-colors duration-300">
                    {title}
                  </h3>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                    <span className="text-xs font-bold text-emerald-200/80 uppercase tracking-widest flex items-center gap-1.5 group-hover:text-white transition-colors">
                      {t('home.welcome.explore')}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-[#041a14] transition-all duration-300 group-hover:scale-110">
                      <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default React.memo(AtlasShowcase);
