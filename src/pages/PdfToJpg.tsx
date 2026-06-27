import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import FileDropZone from '../components/FileDropZone'
import { convertPdfToJpg, downloadBlob } from '../utils/pdfToJpg'

interface PageResult {
  blob: Blob
  filename: string
  url: string
}

export default function PdfToJpg() {
  const { t } = useTranslation()
  const [file, setFile] = useState<File | null>(null)
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [pages, setPages] = useState<PageResult[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleFileDrop = useCallback((files: File[]) => {
    const validFile = files.find(f => f.type === 'application/pdf')
    if (validFile) {
      setFile(validFile)
      setError(null)
      setPages([])
    } else {
      setError(t('error.invalidPdf'))
    }
  }, [t])

  const convertToJpg = async () => {
    if (!file) return

    setProcessing(true)
    setProgress(0)
    setError(null)

    try {
      setProgress(10)
      const result = await convertPdfToJpg(file, 0.9)
      setProgress(90)

      const pageResults = result.blobs.map((blob, i) => ({
        blob,
        filename: result.filenames[i],
        url: URL.createObjectURL(blob),
      }))

      setProgress(100)
      setPages(pageResults)
    } catch (err) {
      setError(err instanceof Error ? err.message : t('common.error') + ': PDF → JPG')
    } finally {
      setProcessing(false)
    }
  }

  const downloadPage = (page: PageResult) => {
    downloadBlob(page.blob, page.filename)
  }

  const downloadAll = () => {
    pages.forEach(page => downloadPage(page))
  }

  const reset = () => {
    setFile(null)
    setPages([])
    setError(null)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('tools.pdfToJpg.title')}</h1>
        <p className="text-gray-600">{t('pdfToJpg.description')}</p>
      </div>

      {/* Drop Zone */}
      {!pages.length && (
        <>
          <FileDropZone onDrop={handleFileDrop} accept="application/pdf" />
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>{t('pdfToJpg.tip')}</p>
          </div>
        </>
      )}

      {/* Selected File */}
      {file && !pages.length && !processing && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📄</span>
              <div>
                <p className="font-medium text-gray-900">{file.name}</p>
                <p className="text-sm text-gray-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <button
              onClick={convertToJpg}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              {t('pdfToJpg.convert')}
            </button>
          </div>
        </div>
      )}

      {/* Processing */}
      {processing && (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg text-center">
          <div className="animate-spin text-4xl mb-4">⚙️</div>
          <p className="font-medium text-gray-900">{t('pdfToJpg.processing')}</p>
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Results */}
      {pages.length > 0 && !processing && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {t('pdfToJpg.result.title', { count: pages.length })}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={downloadAll}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
              >
                {t('pdfToJpg.downloadAll')}
              </button>
              <button
                onClick={reset}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm"
              >
                {t('pdfToJpg.another')}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pages.map((page, i) => (
              <div key={i} className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                <img
                  src={page.url}
                  alt={`Page ${i + 1}`}
                  className="w-full h-40 object-cover"
                />
                <div className="p-3">
                  <p className="text-sm font-medium text-gray-900 mb-2">Page {i + 1}</p>
                  <button
                    onClick={() => downloadPage(page)}
                    className="w-full px-3 py-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition text-sm font-medium"
                  >
                    {t('pdfToJpg.download')}
                  </button>
                </div>
              </div>
            ))}
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