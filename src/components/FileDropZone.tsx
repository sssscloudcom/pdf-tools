import { useCallback } from 'react'

interface FileDropZoneProps {
  onDrop: (files: File[]) => void
  accept?: string
}

export default function FileDropZone({ onDrop, accept }: FileDropZoneProps) {
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    onDrop(files)
  }, [onDrop])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.currentTarget.classList.add('drag-over')
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.currentTarget.classList.remove('drag-over')
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      onDrop(files)
    }
  }, [onDrop])

  return (
    <div
      className="drop-zone border-2 border-dashed border-gray-300 rounded-xl p-12 text-center bg-white hover:border-blue-400 transition cursor-pointer"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => document.getElementById('file-input')?.click()}
    >
      <input
        id="file-input"
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleFileInput}
      />
      
      <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
      
      <p className="text-lg text-gray-700 mb-2">
        Drag and drop your file here
      </p>
      <p className="text-sm text-gray-500">
        or click to browse from your device
      </p>
    </div>
  )
}