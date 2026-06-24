import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './locales/en.json'
import zh from './locales/zh.json'
import es from './locales/es.json'
import de from './locales/de.json'
import ja from './locales/ja.json'
import fr from './locales/fr.json'
import ru from './locales/ru.json'
import pt from './locales/pt.json'
import id from './locales/id.json'
import ar from './locales/ar.json'

const resources = {
  en: { translation: en },
  zh: { translation: zh },
  es: { translation: es },
  de: { translation: de },
  ja: { translation: ja },
  fr: { translation: fr },
  ru: { translation: ru },
  pt: { translation: pt },
  id: { translation: id },
  ar: { translation: ar },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['querystring', 'navigator', 'htmlTag'],
      lookupQuerystring: 'lang',
      caches: ['localStorage'],
    },
  })

export default i18n