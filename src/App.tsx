import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import LanguageRouter from './components/LanguageRouter'
import Home from './pages/Home'
import CompressPdf from './pages/CompressPdf'
import CompressImage from './pages/CompressImage'
import PdfToJpg from './pages/PdfToJpg'
import JpgToPdf from './pages/JpgToPdf'
import Privacy from './pages/Privacy'
import About from './pages/About'
import Terms from './pages/Terms'

// Supported languages
const supportedLanguages = ['en', 'zh', 'es', 'de', 'ja', 'fr', 'ru', 'pt', 'id', 'ar']

function App() {
  return (
    <Router>
      <LanguageRouter />
      <Layout>
        <Routes>
          {/* Root redirect to default language */}
          <Route path="/" element={<Navigate to="/en" replace />} />
          
          {/* Language-specific routes */}
          {supportedLanguages.map(lang => (
            <>
              <Route path={`/${lang}`} element={<Home />} key={`${lang}-home`} />
              <Route path={`/${lang}/compress-pdf`} element={<CompressPdf />} key={`${lang}-compress-pdf`} />
              <Route path={`/${lang}/compress-image`} element={<CompressImage />} key={`${lang}-compress-image`} />
              <Route path={`/${lang}/pdf-to-jpg`} element={<PdfToJpg />} key={`${lang}-pdf-to-jpg`} />
              <Route path={`/${lang}/jpg-to-pdf`} element={<JpgToPdf />} key={`${lang}-jpg-to-pdf`} />
              <Route path={`/${lang}/privacy`} element={<Privacy />} key={`${lang}-privacy`} />
              <Route path={`/${lang}/about`} element={<About />} key={`${lang}-about`} />
              <Route path={`/${lang}/terms`} element={<Terms />} key={`${lang}-terms`} />
            </>
          ))}
          
          {/* Legacy query parameter routes (backward compatibility) */}
          <Route path="/compress-pdf" element={<CompressPdf />} />
          <Route path="/compress-image" element={<CompressImage />} />
          <Route path="/pdf-to-jpg" element={<PdfToJpg />} />
          <Route path="/jpg-to-pdf" element={<JpgToPdf />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App