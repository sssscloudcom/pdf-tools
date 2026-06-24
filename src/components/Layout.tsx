import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import LanguageSwitcher from './LanguageSwitcher'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
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
              <span className="text-xl font-bold text-gray-900">PDF Tools</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link to="/compress-pdf" className="text-gray-600 hover:text-gray-900 transition">PDF Compressor</Link>
              <Link to="/compress-image" className="text-gray-600 hover:text-gray-900 transition">Image Compressor</Link>
              <Link to="/pdf-to-jpg" className="text-gray-600 hover:text-gray-900 transition">PDF to JPG</Link>
              <Link to="/jpg-to-pdf" className="text-gray-600 hover:text-gray-900 transition">JPG to PDF</Link>
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
              <h3 className="font-semibold text-gray-900 mb-3">PDF Tools</h3>
              <p className="text-gray-600 text-sm">
                Free online PDF and image tools. 100% browser-based processing for your privacy.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Tools</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/compress-pdf" className="text-gray-600 hover:text-gray-900">Compress PDF</Link></li>
                <li><Link to="/compress-image" className="text-gray-600 hover:text-gray-900">Compress Image</Link></li>
                <li><Link to="/pdf-to-jpg" className="text-gray-600 hover:text-gray-900">PDF to JPG</Link></li>
                <li><Link to="/jpg-to-pdf" className="text-gray-600 hover:text-gray-900">JPG to PDF</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/privacy" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
                <li><Link to="/about" className="text-gray-600 hover:text-gray-900">About Us</Link></li>
                <li><Link to="/terms" className="text-gray-600 hover:text-gray-900">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} PDF Tools. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}