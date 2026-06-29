import { useTranslation } from 'react-i18next'

export default function About() {
  const { t } = useTranslation()

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{t('legal.about.title')}</h1>
      
      <div className="prose max-w-none">
        <p className="text-gray-600 mb-4">
          {t('legal.about.p1')}
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{t('legal.about.philosophy')}</h2>
        <p className="text-gray-600 mb-4">
          {t('legal.about.philosophyDesc')}
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li><strong>{t('legal.about.private')}</strong></li>
          <li><strong>{t('legal.about.free')}</strong></li>
          <li><strong>{t('legal.about.easy')}</strong></li>
          <li><strong>{t('legal.about.fast')}</strong></li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{t('legal.about.howItWorks')}</h2>
        <p className="text-gray-600 mb-4">
          {t('legal.about.howItWorksP1')}
        </p>
        <p className="text-gray-600 mb-4">
          {t('legal.about.howItWorksP2')}
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li>{t('legal.about.adv1')}</li>
          <li>{t('legal.about.adv2')}</li>
          <li>{t('legal.about.adv3')}</li>
          <li>{t('legal.about.adv4')}</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{t('legal.about.availableTools')}</h2>
        <p className="text-gray-600 mb-4">
          {t('legal.about.availableToolsDesc')}
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li>{t('legal.about.tool1')}</li>
          <li>{t('legal.about.tool2')}</li>
          <li>{t('legal.about.tool3')}</li>
          <li>{t('legal.about.tool4')}</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{t('footer.about')}</h2>
        <p className="text-gray-600">
          {t('legal.about.contact')}
        </p>
        
        {/* Copyright Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Copyright & License</h2>
          <p className="text-gray-600 mb-2">
            © {new Date().getFullYear()} PDF Tools. All rights reserved.
          </p>
          <p className="text-gray-600 text-sm">
            This project is open source and available at: 
            <a 
              href="https://github.com/sssscloudcom/pdf-tools" 
              className="text-blue-600 hover:text-blue-800 ml-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repository
            </a>
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Built with React, Vite, Tailwind CSS, and pdf-lib. 
            Hosted on Cloudflare Pages.
          </p>
        </div>
      </div>
    </div>
  )
}