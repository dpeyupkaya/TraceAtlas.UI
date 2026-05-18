import React from 'react';
import { useTranslation } from 'react-i18next';

const AtlasCard = ({ item, isActive, onHover, onClick }) => {
  const { t } = useTranslation();

  return (
    <div
      onMouseEnter={onHover}
      onFocus={onHover}
      onClick={onClick}
      tabIndex={0}
      className={`
        relative flex-1 w-full min-h-[120px]
        rounded-3xl overflow-hidden cursor-pointer
        bg-zinc-900 border shadow-lg
        transition-all duration-300
        ${isActive
          ? 'border-[#10B981]/50 ring-1 ring-[#10B981]/30'
          : 'border-white/5'
        }
      `}
    >
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        decoding="async"
        draggable={false}
        className={`
          absolute inset-0 w-full h-full object-cover
          transition-all duration-500 ease-out
          ${isActive
            ? 'opacity-100 scale-105'
            : 'opacity-60 grayscale'
          }
        `}
      />

      <div
        className={`
          absolute inset-0
          bg-gradient-to-r from-black/80 via-black/30 to-transparent
          transition-opacity duration-300
          ${isActive ? 'opacity-90' : 'opacity-80'}
        `}
      />

      <div className="absolute inset-0 flex items-center px-6">
        <div
          className={`
            transition-transform duration-300
            ${isActive ? 'translate-x-2' : ''}
          `}
        >
          <span
            className={`
              block font-bold text-xl tracking-wide
              transition-colors duration-300
              ${isActive ? 'text-[#10B981]' : 'text-white'}
            `}
          >
            {item.title}
          </span>

          <span
            className={`
              block text-xs text-gray-300
              transition-all duration-300
              ${isActive
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 -translate-y-2'
              }
            `}
          >
            {t('home.welcome.explore')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AtlasCard);
