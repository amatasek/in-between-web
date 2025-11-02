import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    react(),
    eslint(),
    viteStaticCopy({
      targets: [
        {
          src: 'icons/*',
          dest: 'icons'
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:3001',
      '/socket.io': {
        target: 'http://localhost:3001',
        ws: true
      }
    }
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          socket: ['socket.io-client'],
          audio: ['howler']
        }
      }
    },
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    sourcemap: false,
    modulePreload: {
      polyfill: true
    }
  },
  base: './',
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'socket.io-client', 'howler']
  }
});
