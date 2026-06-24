import { PDFDocument } from 'pdf-lib'

export async function convertJpgToPdf(files: File[]): Promise<Blob> {
  const pdfDoc = await PDFDocument.create()
  
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer()
    let image
    
    // Determine image type and embed
    if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
      image = await pdfDoc.embedJpg(arrayBuffer)
    } else if (file.type === 'image/png') {
      image = await pdfDoc.embedPng(arrayBuffer)
    } else {
      throw new Error(`Unsupported image format: ${file.type}`)
    }
    
    // Add page with image dimensions
    const page = pdfDoc.addPage([image.width, image.height])
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    })
  }
  
  const pdfBytes = await pdfDoc.save()
  return new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' })
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}