import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // The React plugin handles JSX transformation and provides React-specific optimizations
    react({
      // Use the automatic JSX runtime - no need to import React in every file
      jsxRuntime: 'automatic',
      // Configure babel for react-native-web support
      babel: {
        plugins: ['babel-plugin-react-native-web']
      }
    })
  ],
  // Path aliases for cleaner imports
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'components': path.resolve(__dirname, './src/components'),
      'contexts': path.resolve(__dirname, './src/contexts'),
      'services': path.resolve(__dirname, './src/services'),
      'styles': path.resolve(__dirname, './src/styles')
    },
    // Automatically resolve these extensions
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json']
  },
  // Development server configuration
  server: {
    port: 3000,
    // Hot Module Replacement
    hmr: true,
    // Proxy API requests to your backend server
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
      '/socket.io': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    }
  },
  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Generate source maps for better debugging
    sourcemap: true,
    // Minify output for production
    minify: 'terser',
    // Split chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@mui/material', '@emotion/react', '@emotion/styled'],
        }
      }
    }
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'socket.io-client']
  }
});
