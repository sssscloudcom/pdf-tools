import { useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const supportedLanguages = ['en', 'zh', 'es', 'de', 'ja', 'fr', 'ru', 'pt', 'id', 'ar']

export default function LanguageRouter() {
  const { lang } = useParams()
  const { i18n } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // Sync URL lang with i18n
    if (lang && supportedLanguages.includes(lang) && i18n.language !== lang) {
      i18n.changeLanguage(lang)
    }
    
    // If no lang in URL but i18n has language, redirect to lang path
    if (!lang && i18n.language && supportedLanguages.includes(i18n.language.split('-')[0])) {
      const currentLang = i18n.language.split('-')[0]
      const newPath = `/${currentLang}${location.pathname}`
      navigate(newPath, { replace: true })
    }
  }, [lang, i18n, location.pathname, navigate])

  return null
}