const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

async function createTestPdf() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]);
  page.drawText('Test PDF for Compression - ' + new Date().toISOString(), {
    x: 50,
    y: 750,
    size: 20
  });
  
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('test.pdf', pdfBytes);
  console.log('Test PDF created:', pdfBytes.length, 'bytes');
}

createTestPdf();
