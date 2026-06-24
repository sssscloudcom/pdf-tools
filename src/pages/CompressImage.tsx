import { useState, useCallback } from 'react'
import imageCompression from 'browser-image-compression'
import FileDropZone from '../components/FileDropZone'

export default function CompressImage() {
  const [file, setFile] = useState<File | null>(null)
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<{ originalSize: number; compressedSize: number; blob: Blob } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [quality, setQuality] = useState(0.7)

  const handleFileDrop = useCallback((files: File[]) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (files.length > 0 && validTypes.includes(files[0].type)) {
      setFile(files[0])
      setError(null)
      setResult(null)
    } else {
      setError('Please select a valid image (JPEG, PNG, or WebP)')
    }
  }, [])

  const compressImage = async () => {
    if (!file) return

    setProcessing(true)
    setProgress(0)
    setError(null)

    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        initialQuality: quality,
        onProgress: (p: number) => setProgress(p),
      }

      const compressedBlob = await imageCompression(file, options)
      
      setResult({
        originalSize: file.size,
        compressedSize: compressedBlob.size,
        blob: compressedBlob,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to compress image')
    } finally {
      setProcessing(false)
    }
  }

  const downloadResult = () => {
    if (!result) return
    
    const url = URL.createObjectURL(result.blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `compressed-${file?.name || 'image.jpg'}`
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Compress Image</h1>
        <p className="text-gray-600">
          Reduce image file size for JPEG, PNG, and WebP. All processing happens in your browser.
        </p>
      </div>

      {/* Drop Zone */}
      <FileDropZone onDrop={handleFileDrop} accept="image/jpeg,image/png,image/webp" />

      {/* Quality Slider - Always visible */}
      {!result && (
        <div className="mt-6 bg-white rounded-lg p-4 border border-gray-200">
          <label className="block text-sm text-gray-700 mb-2">
            Quality: {Math.round(quality * 100)}%
          </label>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={quality}
            onChange={(e) => setQuality(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            disabled={processing}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Smaller file</span>
            <span>Better quality</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">\            Tip: Select an image to start compression. Max file size: 50MB
          </p>
        </div>
      )}

      {/* Selected File */}
      {file && !result && (
        <div className="mt-6 bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="font-medium text-gray-900">{file.name}</p>
                <p className="text-sm text-gray-500">{formatSize(file.size)}</p>
              </div>
            </div>
          </div>

          {/* Compress Button */}
          <button
            onClick={compressImage}
            disabled={processing}
            className="btn-primary w-full px-6 py-3 rounded-lg text-white font-medium disabled:opacity-50"
          >
            {processing ? 'Processing...' : 'Compress Image'}
          </button>

          {/* Progress Bar */}
          {processing && (
            <div className="mt-4">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="progress-bar h-full bg-green-500 rounded-full"
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
              <h3 className="text-lg font-semibold text-green-800">Compression Complete!</h3>
              <p className="text-green-600 text-sm">File size reduced by {compressionRatio}%</p>
            </div>
            <button
              onClick={downloadResult}
              className="btn-primary px-6 py-2 rounded-lg text-white font-medium"
            >
              Download Compressed Image
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-500">Original Size</p>
              <p className="text-lg font-semibold text-gray-900">{formatSize(result.originalSize)}</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-500">Compressed Size</p>
              <p className="text-lg font-semibold text-green-600">{formatSize(result.compressedSize)}</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-500">Saved</p>
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
            Compress another image
          </button>
        </div>
      )}

      {/* SEO Content */}
      <div className="mt-12 prose max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Compress Images</h2>
        <p className="text-gray-600 mb-4">
          Our image compressor works entirely in your browser, processing JPEG, PNG, and WebP images
          locally without uploading them to any server. This ensures maximum privacy and provides
          fast compression results.
        </p>
        <p className="text-gray-600 mb-4">
          You can adjust the quality slider to balance between file size and image quality. Higher
          quality means larger files but better visual appearance, while lower quality results in
          smaller files with some visual degradation.
        </p>
        <p className="text-gray-600">
          This tool is perfect for optimizing images for websites, reducing file sizes for email
          attachments, or saving storage space. There are no limits on file size or number of
          compressions you can perform.
        </p>
      </div>
    </div>
  )
}