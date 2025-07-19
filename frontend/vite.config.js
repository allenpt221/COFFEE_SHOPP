// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist', // ✅ make sure Vite outputs to ./frontend/dist
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // only applies locally
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
