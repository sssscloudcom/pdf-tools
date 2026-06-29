import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split React ecosystem
          if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
            return 'react-vendor'
          }
          // Split i18n
          if (id.includes('i18next') || id.includes('react-i18next')) {
            return 'i18n-vendor'
          }
        }
      }
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 600,
  }
})