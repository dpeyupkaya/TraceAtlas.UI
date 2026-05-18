import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import tr from './locales/tr.json';
import en from './locales/en.json';
import it from './locales/it.json';
import es from './locales/es.json';
import ar from './locales/ar.json';

export const supportedLanguages = ['tr', 'en', 'it', 'es' , 'ar'];

const savedLanguage = localStorage.getItem('traceatlas-language');
const browserLanguage = navigator.language?.split('-')[0];
const initialLanguage = supportedLanguages.includes(savedLanguage)
  ? savedLanguage
  : supportedLanguages.includes(browserLanguage)
    ? browserLanguage
    : 'tr';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      tr: { translation: tr },
      en: { translation: en },
      it: { translation: it },
      es: { translation: es },
      ar: { translation: ar }
    },
    lng: initialLanguage,
    fallbackLng: 'tr',
    interpolation: {
      escapeValue: false
    }
  });

i18n.on('languageChanged', (language) => {
  localStorage.setItem('traceatlas-language', language);
  document.documentElement.lang = language;
});

document.documentElement.lang = initialLanguage;

export default i18n;
