import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import FileDropZone from '../components/FileDropZone'
import { convertJpgToPdf, downloadBlob } from '../utils/jpgToPdf'

interface ImageFile {
  file: File
  url: string
}

export default function JpgToPdf() {
  const { t } = useTranslation()
  const [images, setImages] = useState<ImageFile[]>([])
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<Blob | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileDrop = useCallback((files: File[]) => {
    const validFiles = files.filter(f => 
      f.type === 'image/jpeg' || f.type === 'image/jpg' || f.type === 'image/png'
    )
    
    if (validFiles.length > 0) {
      const newImages = validFiles.map(file => ({
        file,
        url: URL.createObjectURL(file),
      }))
      setImages(prev => [...prev, ...newImages])
      setError(null)
      setResult(null)
    } else {
      setError(t('error.invalidImage'))
    }
  }, [t])

  const removeImage = (index: number) => {
    setImages(prev => {
      const removed = prev[index]
      URL.revokeObjectURL(removed.url)
      return prev.filter((_, i) => i !== index)
    })
  }

  const mergeToPdf = async () => {
    if (images.length === 0) return

    setProcessing(true)
    setProgress(0)
    setError(null)

    try {
      setProgress(20)
      const files = images.map(img => img.file)
      const pdfBlob = await convertJpgToPdf(files)
      setProgress(100)
      setResult(pdfBlob)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to merge JPG to PDF')
    } finally {
      setProcessing(false)
    }
  }

  const downloadResult = () => {
    if (!result) return
    downloadBlob(result, 'merged-images.pdf')
  }

  const reset = () => {
    images.forEach(img => URL.revokeObjectURL(img.url))
    setImages([])
    setResult(null)
    setError(null)
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('tools.jpgToPdf.title')}</h1>
        <p className="text-gray-600">{t('jpgToPdf.description')}</p>
      </div>

      {/* Drop Zone */}
      {!result && (
        <>
          <FileDropZone onDrop={handleFileDrop} accept="image/jpeg,image/png" />
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>{t('jpgToPdf.tip')}</p>
          </div>
        </>
      )}

      {/* Image Preview Grid */}
      {images.length > 0 && !result && !processing && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {t('jpgToPdf.imagesSelected', { count: images.length })}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={reset}
                className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm"
              >
                {t('common.clear')}
              </button>
              <button
                onClick={mergeToPdf}
                className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
              >
                {t('jpgToPdf.merge')}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {images.map((img, i) => (
              <div key={i} className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                <img
                  src={img.url}
                  alt={`Image ${i + 1}`}
                  className="w-full h-32 object-cover"
                />
                <div className="p-2">
                  <p className="text-xs font-medium text-gray-900 truncate">{img.file.name}</p>
                  <p className="text-xs text-gray-500">{formatSize(img.file.size)}</p>
                </div>
                <button
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full hover:bg-red-600 flex items-center justify-center text-xs"
                  style={{ position: 'absolute' }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Processing */}
      {processing && (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg text-center">
          <div className="animate-spin text-4xl mb-4">⚙️</div>
          <p className="font-medium text-gray-900">{t('jpgToPdf.processing')}</p>
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Result */}
      {result && !processing && (
        <div className="mt-6 p-6 bg-green-50 rounded-lg">
          <div className="text-center">
            <div className="text-4xl mb-4">✅</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('jpgToPdf.result.title')}</h2>
            <p className="text-gray-600 mb-4">
              {t('jpgToPdf.result.pages', { count: images.length })}
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={downloadResult}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                {t('jpgToPdf.download')}
              </button>
              <button
                onClick={reset}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                {t('jpgToPdf.another')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
        </div>
      )}
    </div>
  )
}