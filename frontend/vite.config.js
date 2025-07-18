import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      // All configuration now happens here
      config: {
        content: [
          './index.html',
          './src/**/*.{js,ts,jsx,tsx}'
        ],
        // Optional theme customization
        theme: {
          extend: {}
        }
      }
    })
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})