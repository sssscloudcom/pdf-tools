import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const supportedLanguages = ['en', 'zh', 'es', 'de', 'ja', 'fr', 'ru', 'pt', 'id', 'ar']

export default function LanguageRouter() {
  const { lang } = useParams()
  const { i18n } = useTranslation()

  useEffect(() => {
    // Only sync: if URL has lang, update i18n
    // Do NOT redirect if URL already has lang!
    if (lang && supportedLanguages.includes(lang)) {
      if (i18n.language !== lang) {
        i18n.changeLanguage(lang)
      }
    }
  }, [lang, i18n])

  return null
}