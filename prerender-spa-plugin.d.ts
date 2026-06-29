declare module 'prerender-spa-plugin' {
  interface PrerenderOptions {
    routes: string[]
    renderAfterDocumentEvent?: string
    headless?: boolean
    port?: number
  }

  function prerender(options: PrerenderOptions): any
  export = prerender
}