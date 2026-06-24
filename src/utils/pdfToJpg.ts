import * as pdfjsLib from 'pdfjs-dist'

// Configure worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`

export interface PdfToJpgResult {
  blobs: Blob[]
  filenames: string[]
}

export async function convertPdfToJpg(file: File, quality = 0.9): Promise<PdfToJpgResult> {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
  
  const blobs: Blob[] = []
  const filenames: string[] = []
  const numPages = pdf.numPages
  
  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i)
    const scale = 2 // 2x scale for better quality
    const viewport = page.getViewport({ scale })
    
    // Create canvas
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.height = viewport.height
    canvas.width = viewport.width
    
    // Render PDF page to canvas
    await page.render({
      canvasContext: context!,
      viewport,
      canvas,
    }).promise
    
    // Convert canvas to JPG blob
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob(
        (b) => resolve(b!),
        'image/jpeg',
        quality
      )
    })
    
    blobs.push(blob)
    const baseName = file.name.replace('.pdf', '')
    filenames.push(`${baseName}_page_${i}.jpg`)
  }
  
  return { blobs, filenames }
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export async function downloadAllAsZip(blobs: Blob[], filenames: string[], _zipFilename: string) {
  // Simple implementation: download each file separately
  // For better UX, could use JSZip library
  for (let i = 0; i < blobs.length; i++) {
    downloadBlob(blobs[i], filenames[i])
    // Small delay between downloads
    await new Promise(r => setTimeout(r, 100))
  }
}