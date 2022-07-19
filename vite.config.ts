import { defineConfig } from 'vite'
import { svgBuilder } from './src/plugins/svgBuilder'
import react from '@vitejs/plugin-react'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgBuilder('./src/assets/svg/')],
  envDir: './src/env',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
