import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/Components'),
      '@context': path.resolve(__dirname, 'src/Context'),
      '@hooks': path.resolve(__dirname, 'src/Hooks'),
      '@pages': path.resolve(__dirname, 'src/Pages'),
      '@utils': path.resolve(__dirname, 'src/Utils'),
    },
  },
  server:{
    proxy:{
      '/api':{
        target:'http://localhost:3000',
        changeOrigin:true,
      }
    }
  }
})
