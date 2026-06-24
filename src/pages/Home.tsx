import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Home() {
  const { t } = useTranslation()
  
  const tools = [
    {
      title: t('tools.compressPdf.title'),
      description: t('tools.compressPdf.desc'),
      icon: '📄',
      link: '/compress-pdf',
    },
    {
      title: t('tools.compressImage.title'),
      description: t('tools.compressImage.desc'),
      icon: '🖼️',
      link: '/compress-image',
    },
    {
      title: t('tools.pdfToJpg.title'),
      description: t('tools.pdfToJpg.desc'),
      icon: '📸',
      link: '/pdf-to-jpg',
    },
    {
      title: t('tools.jpgToPdf.title'),
      description: t('tools.jpgToPdf.desc'),
      icon: '📑',
      link: '/jpg-to-pdf',
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {t('home.title')}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {t('home.subtitle')}
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {tools.map((tool) => (
          <Link
            key={tool.link}
            to={tool.link}
            className="tool-card bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:border-gray-300"
          >
            <div className="text-4xl mb-4">{tool.icon}</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.title}</h3>
            <p className="text-gray-600 text-sm">{tool.description}</p>
          </Link>
        ))}
      </div>

      {/* Features Section */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose PDF Tools?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="font-semibold text-gray-900 mb-2">{t('home.features.private.title')}</h3>
            <p className="text-gray-600 text-sm">{t('home.features.private.desc')}</p>
          </div>
          <div>
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-900 mb-2">{t('home.features.fast.title')}</h3>
            <p className="text-gray-600 text-sm">{t('home.features.fast.desc')}</p>
          </div>
          <div>
            <div className="text-3xl mb-3">💰</div>
            <h3 className="font-semibold text-gray-900 mb-2">{t('home.features.free.title')}</h3>
            <p className="text-gray-600 text-sm">{t('home.features.free.desc')}</p>
          </div>
        </div>
      </div>

      {/* SEO Content */}
      <div className="prose max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use PDF Tools</h2>
        <p className="text-gray-600 mb-4">
          Our PDF and image tools are designed to be simple and intuitive. Just select the tool you need,
          upload your file, and let our browser-based processor do the work. No software installation required.
        </p>
        <p className="text-gray-600 mb-4">
          Whether you need to compress a large PDF for email, convert images to PDF for documents,
          or extract images from PDF files, our tools handle it all. All processing happens locally
          in your browser, ensuring your files stay private and secure.
        </p>
        <p className="text-gray-600">
          PDF Tools works on all modern browsers including Chrome, Firefox, Safari, and Edge.
          There are no file size limits or daily restrictions. Use our tools as much as you need,
          completely free.
        </p>
      </div>
    </div>
  )
}