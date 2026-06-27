import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { PDFDocument } from 'pdf-lib'
import FileDropZone from '../components/FileDropZone'

export default function CompressPdf() {
  const { t } = useTranslation()
  const [file, setFile] = useState<File | null>(null)
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<{ originalSize: number; compressedSize: number; blob: Blob } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileDrop = useCallback((files: File[]) => {
    if (files.length > 0 && files[0].type === 'application/pdf') {
      setFile(files[0])
      setError(null)
      setResult(null)
    } else {
      setError(t('error.invalidPdf'))
    }
  }, [t])

  const compressPdf = async () => {
    if (!file) return

    setProcessing(true)
    setProgress(0)
    setError(null)

    try {
      setProgress(10)
      
      // Read file
      const arrayBuffer = await file.arrayBuffer()
      const originalSize = arrayBuffer.byteLength
      setProgress(20)

      // Load PDF
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true })
      setProgress(40)

      // Compress by saving with optimization
      const compressedBytes = await pdfDoc.save({
        useObjectStreams: true,
      })
      setProgress(80)

      const compressedSize = compressedBytes.length
      const blob = new Blob([new Uint8Array(compressedBytes)], { type: 'application/pdf' })

      setProgress(100)
      setResult({ originalSize, compressedSize, blob })
    } catch (err) {
      setError(err instanceof Error ? err.message : t('common.error'))
    } finally {
      setProcessing(false)
    }
  }

  const downloadResult = () => {
    if (!result) return
    
    const url = URL.createObjectURL(result.blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `compressed-${file?.name || 'document.pdf'}`
    a.click()
    URL.revokeObjectURL(url)
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }

  const compressionRatio = result 
    ? ((result.originalSize - result.compressedSize) / result.originalSize * 100).toFixed(1)
    : 0

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('compressPdf.title')}</h1>
        <p className="text-gray-600">
          {t('compressPdf.description')}
        </p>
      </div>

      {/* Drop Zone */}
      <FileDropZone onDrop={handleFileDrop} accept="application/pdf" />
      
      {/* Tip */}
      {!result && (
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>{t('pdfToJpg.tip')}</p>
        </div>
      )}

      {/* Selected File */}
      {file && !result && (
        <div className="mt-6 bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="font-medium text-gray-900">{file.name}</p>
                <p className="text-sm text-gray-500">{formatSize(file.size)}</p>
              </div>
            </div>
            <button
              onClick={compressPdf}
              disabled={processing}
              className="btn-primary px-6 py-2 rounded-lg text-white font-medium disabled:opacity-50"
            >
              {processing ? t('common.processing') : t('compressPdf.compress')}
            </button>
          </div>

          {/* Progress Bar */}
          {processing && (
            <div className="mt-4">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="progress-bar h-full bg-blue-500 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-2 text-center">{progress}%</p>
            </div>
          )}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-green-800">{t('compressPdf.result.title')}</h3>
              <p className="text-green-600 text-sm">{t('compressPdf.result.saved', { ratio: compressionRatio })}</p>
            </div>
            <button
              onClick={downloadResult}
              className="btn-primary px-6 py-2 rounded-lg text-white font-medium"
            >
              {t('compressPdf.result.download')}
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-500">{t('compressPdf.result.originalSize')}</p>
              <p className="text-lg font-semibold text-gray-900">{formatSize(result.originalSize)}</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-500">{t('compressPdf.result.compressedSize')}</p>
              <p className="text-lg font-semibold text-green-600">{formatSize(result.compressedSize)}</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-500">{t('compressPdf.result.savedLabel')}</p>
              <p className="text-lg font-semibold text-green-600">{compressionRatio}%</p>
            </div>
          </div>

          <button
            onClick={() => {
              setFile(null)
              setResult(null)
            }}
            className="mt-4 text-sm text-gray-600 hover:text-gray-900 underline"
          >
            {t('compressPdf.result.another')}
          </button>
        </div>
      )}

      {/* SEO Content */}
      <div className="mt-12 prose max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('compressPdf.seo.title')}</h2>
        <p className="text-gray-600 mb-4">
          {t('compressPdf.seo.p1')}
        </p>
        <p className="text-gray-600 mb-4">
          {t('compressPdf.seo.p2')}
        </p>
        <p className="text-gray-600">
          {t('compressPdf.seo.p3')}
        </p>
      </div>
    </div>
  )
}
