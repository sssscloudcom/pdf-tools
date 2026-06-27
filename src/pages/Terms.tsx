import { useTranslation } from 'react-i18next'

export default function Terms() {
  const { t } = useTranslation()

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{t('legal.terms.title')}</h1>
      
      <div className="prose max-w-none">
        <p className="text-gray-600 mb-4">
          <strong>{t('legal.terms.updated', { date: 'June 24, 2026' })}</strong>
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{t('legal.terms.s1Title')}</h2>
        <p className="text-gray-600 mb-4">
          {t('legal.terms.s1Desc')}
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{t('legal.terms.s2Title')}</h2>
        <p className="text-gray-600 mb-4">
          {t('legal.terms.s2Desc')}
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li>{t('legal.terms.license1')}</li>
          <li>{t('legal.terms.license2')}</li>
          <li>{t('legal.terms.license3')}</li>
          <li>{t('legal.terms.license4')}</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{t('legal.terms.s3Title')}</h2>
        <p className="text-gray-600 mb-4">
          {t('legal.terms.s3Desc')}
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li>{t('legal.terms.disclaimer1')}</li>
          <li>{t('legal.terms.disclaimer2')}</li>
          <li>{t('legal.terms.disclaimer3')}</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{t('legal.terms.s4Title')}</h2>
        <p className="text-gray-600 mb-4">
          {t('legal.terms.s4Desc')}
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{t('legal.terms.s5Title')}</h2>
        <p className="text-gray-600 mb-4">
          {t('legal.terms.s5Desc')}
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li>{t('legal.terms.resp1')}</li>
          <li>{t('legal.terms.resp2')}</li>
          <li>{t('legal.terms.resp3')}</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{t('legal.terms.s6Title')}</h2>
        <p className="text-gray-600 mb-4">
          {t('legal.terms.s6Desc')}
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{t('legal.terms.s7Title')}</h2>
        <p className="text-gray-600 mb-4">
          {t('legal.terms.s7Desc')}
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{t('legal.terms.s8Title')}</h2>
        <p className="text-gray-600">
          {t('legal.terms.s8Desc')}
        </p>
      </div>
    </div>
  )
}
