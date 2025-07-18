import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const reactPlugin = require('@vitejs/plugin-react')
const tailwindPlugin = require('@tailwindcss/vite')

export default {
  plugins: [
    reactPlugin({
      jsxRuntime: 'automatic'
    }),
    tailwindPlugin()
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
}