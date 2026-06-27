import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { t } = useTranslation()
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2">
              <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span className="text-xl font-bold text-gray-900">{t('footer.title')}</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link to="/compress-pdf" className="text-gray-600 hover:text-gray-900 transition">{t('nav.compressPdf')}</Link>
              <Link to="/compress-image" className="text-gray-600 hover:text-gray-900 transition">{t('nav.compressImage')}</Link>
              <Link to="/pdf-to-jpg" className="text-gray-600 hover:text-gray-900 transition">{t('nav.pdfToJpg')}</Link>
              <Link to="/jpg-to-pdf" className="text-gray-600 hover:text-gray-900 transition">{t('nav.jpgToPdf')}</Link>
            </nav>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">{t('footer.title')}</h3>
              <p className="text-gray-600 text-sm">
                {t('footer.desc')}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">{t('footer.tools')}</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/compress-pdf" className="text-gray-600 hover:text-gray-900">{t('tools.compressPdf.title')}</Link></li>
                <li><Link to="/compress-image" className="text-gray-600 hover:text-gray-900">{t('tools.compressImage.title')}</Link></li>
                <li><Link to="/pdf-to-jpg" className="text-gray-600 hover:text-gray-900">{t('tools.pdfToJpg.title')}</Link></li>
                <li><Link to="/jpg-to-pdf" className="text-gray-600 hover:text-gray-900">{t('tools.jpgToPdf.title')}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">{t('footer.legal')}</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/privacy" className="text-gray-600 hover:text-gray-900">{t('footer.privacy')}</Link></li>
                <li><Link to="/about" className="text-gray-600 hover:text-gray-900">{t('footer.about')}</Link></li>
                <li><Link to="/terms" className="text-gray-600 hover:text-gray-900">{t('footer.terms')}</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </div>
        </div>
      </footer>
    </div>
  )
}