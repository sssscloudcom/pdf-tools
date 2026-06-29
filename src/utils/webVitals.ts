import { onLCP, onINP, onCLS } from 'web-vitals'

export function initWebVitals() {
  onLCP((metric) => {
    console.log('LCP:', metric)
  })
  
  onINP((metric) => {
    console.log('INP:', metric) // FID deprecated, use INP
  })
  
  onCLS((metric) => {
    console.log('CLS:', metric)
  })
}