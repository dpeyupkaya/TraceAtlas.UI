import React from 'react';
import { Mountain, TreePine, Waves, Tent, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const categoriesMeta = [
  { icon: Mountain, queryKey: 'Zirveler' },
  { icon: TreePine, queryKey: 'Ormanlar' },
  { icon: Waves, queryKey: 'Denizler' },
  { icon: Tent, queryKey: 'Kamp' }
];

const DiscoveryPillars = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const translatedCategories = t('home.info.categories', { returnObjects: true }) || [];

  const handleCardClick = (title) => {
    navigate('/map', { state: { autoSearch: title } });
  };

  return (
    <section id="discovery-pillars" className="w-full py-16 md:py-24 relative select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 mb-4">
            <Sparkles size={13} className="text-emerald-400" />
            <span className="text-[10px] font-mono font-bold text-emerald-400 tracking-[0.2em] uppercase">
              KEŞİF ALANLARI
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Sınırların Ötesindeki Deneyimler
          </h2>

          <p className="text-sm sm:text-base text-emerald-100/60 max-w-xl font-light">
            Topluluğun el değmemiş patikaları, gizli kalmış gölleri ve sessiz kamp noktalarını keşfet.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoriesMeta.map((cat, index) => {
            const itemData = translatedCategories[index] || { title: '', desc: '' };
            const Icon = cat.icon;

            return (
              <div
                key={index}
                onClick={() => handleCardClick(itemData.title)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(itemData.title);
                  }
                }}
                tabIndex={0}
                role="button"
                className="group relative p-7 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 hover:bg-white/[0.05] transition-all duration-300 flex flex-col justify-between text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400/40 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                <div>
                  {/* Glowing Icon Container */}
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-[#041a14] group-hover:shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all duration-300 mb-6">
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-2.5 tracking-wide group-hover:text-emerald-400 transition-colors">
                    {itemData.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-emerald-100/50 leading-relaxed font-normal">
                    {itemData.desc}
                  </p>
                </div>

                {/* Bottom Action Prompt */}
                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400/80 group-hover:text-white transition-colors">
                    Haritada Keşfet
                  </span>
                  <ArrowRight size={13} className="text-emerald-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default React.memo(DiscoveryPillars);
