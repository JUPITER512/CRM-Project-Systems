
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
    server: {
      proxy: {
        '/api': 'http://localhost:3000' // Proxy '/api' to backend
      },
    },
    build: {
      rollupOptions: {
          output:{
              manualChunks(id) {
                  if (id.includes('node_modules')) {
                      return id.toString().split('node_modules/')[1].split('/')[0].toString();
                  }
              }
          }
      }
  }
  });
