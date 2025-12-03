// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()], // <--- COMMA is required here
  
  server: {
    proxy: {
      '/api/geocode': {
        target: 'https://geocoding-api.open-meteo.com',
        changeOrigin: true, // <--- COMMA is required here
        rewrite: (path) => path.replace(/^\/api\/geocode/, '')
      }, // <--- COMMA is NOT required here, but if there was another key, it would be
    },
  }, // <--- COMMA is NOT required here
})