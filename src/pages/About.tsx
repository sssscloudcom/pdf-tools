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
      </div>
    </div>
  )
}
