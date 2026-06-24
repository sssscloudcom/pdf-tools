export default function About() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About PDF Tools</h1>
      
      <div className="prose max-w-none">
        <p className="text-gray-600 mb-4">
          PDF Tools is a free online platform that provides easy-to-use PDF and image processing tools.
          Our mission is to make document management accessible to everyone, without compromising privacy or security.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Philosophy</h2>
        <p className="text-gray-600 mb-4">
          We believe that file processing tools should be:
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li><strong>Private</strong> - Your files should never leave your device</li>
          <li><strong>Free</strong> - Essential tools should be available to everyone</li>
          <li><strong>Easy</strong> - No technical knowledge required</li>
          <li><strong>Fast</strong> - Instant processing without upload delays</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How It Works</h2>
        <p className="text-gray-600 mb-4">
          Unlike traditional online tools that upload your files to remote servers, PDF Tools processes everything
          locally in your web browser. We use modern JavaScript libraries (like pdf-lib and Mozilla's PDF.js)
          to handle PDF manipulation directly on your device.
        </p>
        <p className="text-gray-600 mb-4">
          This approach has several advantages:
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li>No upload time - processing starts immediately</li>
          <li>No server costs - we can keep the service free</li>
          <li>No data breaches - your files never leave your device</li>
          <li>Works offline - once loaded, tools work without internet</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Available Tools</h2>
        <p className="text-gray-600 mb-4">
          Currently, we offer the following tools:
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li>PDF Compressor - Reduce PDF file size</li>
          <li>Image Compressor - Compress JPEG, PNG, WebP images</li>
          <li>PDF to JPG (coming soon)</li>
          <li>JPG to PDF (coming soon)</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact</h2>
        <p className="text-gray-600">
          Have suggestions or feedback? Email us at: contact@nextapi.pro
        </p>
      </div>
    </div>
  )
}