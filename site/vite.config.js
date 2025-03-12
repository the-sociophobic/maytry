import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr' 
import path from 'path' 
import { reactRouter } from '@react-router/dev/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    reactRouter(),
    svgr({
      exportAsDefault: true,
      include: '**/*.svg'
    }),
  ],
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    }
  },
  // base: '/maytry'
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
})
