import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    resources: {
        en: {
          translation: require('./locales/en.json')
        },
        ka: {
          translation: require('./locales/ka.json')
      },
      hi: {
        translation: require('./locales/hi.json')
      },

  }});

export default i18n;