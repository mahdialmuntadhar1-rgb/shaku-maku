import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-dom/client', 'lucide-react', 'motion/react']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5175,
    strictPort: true,
    cors: true,
    proxy: {
      '/api': {
        target: 'https://shaku-maku.mahdialmuntadhar1.workers.dev',
        changeOrigin: true,
        secure: true
      },
      '/health': {
        target: 'https://shaku-maku.mahdialmuntadhar1.workers.dev',
        changeOrigin: true,
        secure: true
      }
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: true
  }
});