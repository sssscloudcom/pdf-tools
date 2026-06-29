addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  
  // Serve static assets directly
  if (url.pathname.startsWith('/assets/') || 
      url.pathname.startsWith('/locales/') ||
      url.pathname.endsWith('.png') || 
      url.pathname.endsWith('.svg') ||
      url.pathname.endsWith('.json')) {
    return fetch(request)
  }
  
  // Inject SEO tags for HTML pages
  const response = await fetch(request)
  const contentType = response.headers.get('content-type')
  
  if (!contentType || !contentType.includes('text/html')) {
    return response
  }
  
  // Extract language from path
  const pathLang = url.pathname.match(/^\/([a-z]{2})(\/|$)/)?.[1] || 'en'
  
  // Generate hreflang tags
  const supportedLanguages = ['en', 'zh', 'es', 'de', 'ja', 'fr', 'ru', 'pt', 'id', 'ar']
  const currentPath = url.pathname.replace(/^\/[a-z]{2}/, '') || '/'
  
  let hreflangTags = ''
  supportedLanguages.forEach(lang => {
    hreflangTags += `<link rel="alternate" hreflang="${lang}" href="https://pdftools.nextapi.pro/${lang}${currentPath}">\n`
  })
  hreflangTags += `<link rel="alternate" hreflang="x-default" href="https://pdftools.nextapi.pro/en${currentPath}">`
  
  // Inject into HTML
  return new HTMLRewriter()
    .on('head', {
      element(element) {
        element.append(hreflangTags, { html: true })
      }
    })
    .on('link[rel="canonical"]', {
      element(element) {
        element.setAttribute('href', `https://pdftools.nextapi.pro${url.pathname}`)
      }
    })
    .transform(response)
}