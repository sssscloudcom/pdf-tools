import { useTranslation } from 'react-i18next'

export default function Privacy() {
  const { t } = useTranslation()

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{t('legal.privacy.title')}</h1>
      
      <div className="prose max-w-none">
        <p className="text-gray-600 mb-4">
          <strong>{t('legal.privacy.updated', { date: 'June 24, 2026' })}</strong>
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{t('legal.privacy.s1Title')}</h2>
        <p className="text-gray-600 mb-4">
          {t('legal.privacy.s1Desc')}
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{t('legal.privacy.s2Title')}</h2>
        <p className="text-gray-600 mb-4">
          {t('legal.privacy.s2Desc')}
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{t('legal.privacy.s3Title')}</h2>
        <p className="text-gray-600 mb-4">
          {t('legal.privacy.s3Desc')}
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{t('legal.privacy.s4Title')}</h2>
        <p className="text-gray-600 mb-4">
          {t('legal.privacy.s4Desc')}
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{t('legal.privacy.s5Title')}</h2>
        <p className="text-gray-600 mb-4">
          {t('legal.privacy.s5Desc')}
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{t('legal.privacy.s6Title')}</h2>
        <p className="text-gray-600 mb-4">
          {t('legal.privacy.s6Desc')}
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{t('legal.privacy.s7Title')}</h2>
        <p className="text-gray-600 mb-4">
          {t('legal.privacy.s7Desc')}
        </p>
        <p className="text-gray-600">
          {t('legal.privacy.email')}
        </p>
      </div>
    </div>
  )
}
