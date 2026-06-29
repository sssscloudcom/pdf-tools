const fs = require('fs')
const path = require('path')

const supportedLanguages = ['en', 'zh', 'es', 'de', 'ja', 'fr', 'ru', 'pt', 'id', 'ar']
const routes = [
  { path: '/', title: 'site.title', desc: 'site.description' },
  { path: '/compress-pdf', title: 'compressPdf.title', desc: 'compressPdf.description' },
  { path: '/compress-image', title: 'compressImage.title', desc: 'compressImage.description' },
  { path: '/pdf-to-jpg', title: 'pdfToJpg.title', desc: 'pdfToJpg.description' },
  { path: '/jpg-to-pdf', title: 'jpgToPdf.title', desc: 'jpgToPdf.description' },
]

// Read base index.html
const baseHtml = fs.readFileSync('dist/index.html', 'utf-8')

// Load translations
const translations = {}
supportedLanguages.forEach(lang => {
  const langFile = fs.readFileSync(`public/locales/${lang}.json`, 'utf-8')
  translations[lang] = JSON.parse(langFile)
})

// Generate hreflang tags
function generateHreflangTags(currentLang, currentPath) {
  let tags = ''
  supportedLanguages.forEach(lang => {
    const url = `https://pdftools.nextapi.pro/${lang}${currentPath}`
    tags += `    <link rel="alternate" hreflang="${lang}" href="${url}" />\n`
  })
  tags += `    <link rel="alternate" hreflang="x-default" href="https://pdftools.nextapi.pro/en${currentPath}" />\n`
  return tags
}

// Generate HTML for each language and route
supportedLanguages.forEach(lang => {
  routes.forEach(route => {
    const outputPath = route.path === '/' ? `dist/${lang}/index.html` : `dist/${lang}${route.path}/index.html`
    const outputDir = path.dirname(outputPath)
    
    // Create directory
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }
    
    // Get translations
    const t = translations[lang]
    const title = t[route.title] || 'PDF Tools'
    const desc = t[route.desc] || 'Free online PDF tools'
    
    // Generate hreflang tags
    const hreflangTags = generateHreflangTags(lang, route.path)
    
    // Replace HTML
    let html = baseHtml
      .replace(/<html lang="en">/, `<html lang="${lang}">`)
      .replace(/<title>.*<\/title>/, `<title>${title}</title>`)
      .replace(/<meta name="description" content=".*" \/>/, `<meta name="description" content="${desc}" />`)
      .replace(/<meta property="og:title" content=".*" \/>/, `<meta property="og:title" content="${title}" />`)
      .replace(/<meta property="og:description" content=".*" \/>/, `<meta property="og:description" content="${desc}" />`)
      .replace(/<meta name="twitter:title" content=".*" \/>/, `<meta name="twitter:title" content="${title}" />`)
      .replace(/<meta name="twitter:description" content=".*" \/>/, `<meta name="twitter:description" content="${desc}" />`)
      .replace(/<link rel="canonical" href=".*" \/>/, `<link rel="canonical" href="https://pdftools.nextapi.pro/${lang}${route.path}" />`)
      .replace(/<!-- hreflang will be dynamically generated -->/, hreflangTags)
    
    // Write file
    fs.writeFileSync(outputPath, html)
    console.log(`✅ Generated: ${outputPath}`)
  })
})

console.log('\n✅ All multilingual HTML files generated!')