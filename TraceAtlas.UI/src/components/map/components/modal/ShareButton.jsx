import React from 'react';
import { useTranslation } from 'react-i18next';

const ShareIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z" clipRule="evenodd" />
  </svg>
);

const ShareButton = ({ onClick, className = "" }) => {
  const { t } = useTranslation();

  return (
    <button 
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all duration-200 active:scale-95 ${className}`}
    >
      <ShareIcon className="w-5 h-5" />
      <span>{t('common.buttons.share')}</span>
    </button>
  );
};

export default ShareButton;
