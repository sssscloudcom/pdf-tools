import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend from 'i18next-http-backend'

// Only import en as fallback (small footprint)
import en from './locales/en.json'

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en }, // Inline fallback for en
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}.json',
    },
    detection: {
      order: ['path', 'querystring', 'navigator', 'htmlTag'],
      lookupQuerystring: 'lang',
      lookupFromPathIndex: 0,
      caches: ['localStorage'],
    },
    load: 'languageOnly',
  })

export default i18n
