import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import CompressPdf from './pages/CompressPdf'
import CompressImage from './pages/CompressImage'
import PdfToJpg from './pages/PdfToJpg'
import JpgToPdf from './pages/JpgToPdf'
import Privacy from './pages/Privacy'
import About from './pages/About'
import Terms from './pages/Terms'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
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