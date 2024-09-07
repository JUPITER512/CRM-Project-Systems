import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

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
<<<<<<< HEAD
  server: {
    proxy: {
      '/api': 'http://localhost:3000' // Proxy '/api' to backend
    },
  },
=======
  server:{
    proxy:{
      '/api':'http://localhost:3000'
    }
  }
>>>>>>> 9981cd9b43c8af7d109836a9feee411559404955
});

