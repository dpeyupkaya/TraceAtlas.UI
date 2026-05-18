import React from 'react';
import { Globe2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { supportedLanguages } from '../../i18n';

const LanguageSwitcher = ({ variant = 'floating' }) => {
  const { t, i18n } = useTranslation();

  const handleChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  const isFooter = variant === 'footer';

  return (
    <label
      className={`
        inline-flex items-center gap-2 rounded-full border backdrop-blur-xl transition-all
        ${isFooter
          ? 'border-white/10 bg-white/5 px-3 py-2 text-emerald-50/80'
          : 'border-white/15 bg-black/25 px-3 py-2 text-white shadow-2xl shadow-black/20 hover:bg-black/35'}
      `}
      title={t('common.selectLanguage')}
    >
      <Globe2 className={isFooter ? 'h-4 w-4 text-emerald-300' : 'h-4 w-4 text-emerald-300'} />
      <span className="sr-only">{t('common.selectLanguage')}</span>
      <select
        value={i18n.resolvedLanguage || i18n.language}
        onChange={handleChange}
        aria-label={t('common.selectLanguage')}
        className={`
          cursor-pointer bg-transparent text-xs font-bold uppercase tracking-widest outline-none
          ${isFooter ? 'text-emerald-50/80' : 'text-white'}
        `}
      >
        {supportedLanguages.map((language) => (
          <option key={language} value={language} className="bg-[#04150f] text-white">
            {language.toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  );
};

export default LanguageSwitcher;
