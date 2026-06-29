import { onLCP, onFID, onCLS } from 'web-vitals'

export function initWebVitals() {
  onLCP((metric) => {
    console.log('LCP:', metric)
    // Send to analytics
  })
  
  onFID((metric) => {
    console.log('FID:', metric)
  })
  
  onCLS((metric) => {
    console.log('CLS:', metric)
  })
}
