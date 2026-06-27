import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n'
import App from './App.tsx'
import i18n from './i18n'

// Dynamic SEO meta tags based on language
function updateSEO() {
  const lang = i18n.language || 'en'
  document.documentElement.lang = lang
  
  const title = i18n.t('site.title')
  const description = i18n.t('site.description')
  const keywords = i18n.t('site.keywords')
  
  document.title = title
  
  // Update meta tags
  const metaDesc = document.querySelector('meta[name="description"]')
  const metaKeywords = document.querySelector('meta[name="keywords"]')
  const ogTitle = document.querySelector('meta[property="og:title"]')
  const ogDesc = document.querySelector('meta[property="og:description"]')
  const twTitle = document.querySelector('meta[name="twitter:title"]')
  const twDesc = document.querySelector('meta[name="twitter:description"]')
  
  if (metaDesc) metaDesc.setAttribute('content', description)
  if (metaKeywords) metaKeywords.setAttribute('content', keywords)
  if (ogTitle) ogTitle.setAttribute('content', title)
  if (ogDesc) ogDesc.setAttribute('content', description)
  if (twTitle) twTitle.setAttribute('content', title)
  if (twDesc) twDesc.setAttribute('content', description)
}

// Update SEO on initial load
updateSEO()

// Update SEO when language changes
i18n.on('languageChanged', updateSEO)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
