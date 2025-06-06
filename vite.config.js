import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React libraries
          'vendor-react': ['react', 'react-dom'],
          
          // Animation libraries
          'vendor-animation': ['framer-motion', 'gsap'],
          
          // Utility libraries
          'vendor-utils': ['clsx', 'tailwind-merge', 'prop-types'],
          
          // Icons and UI
          'vendor-ui': ['react-icons', 'react-helmet-async'],
          
          // 3D and graphics
          'vendor-graphics': ['three', '@react-three/fiber', 'simplex-noise'],
          
          // Analytics
          'vendor-analytics': ['@vercel/analytics', '@vercel/speed-insights'],
          
          // Main components
          'components-core': [
            './src/components/Home',
            './src/components/About',
            './src/components/NavBar'
          ],
          
          // Secondary components
          'components-secondary': [
            './src/components/Projects',
            './src/components/Experience',
            './src/components/Education'
          ],
          
          // UI components
          'components-ui': [
            './src/components/ui/vortex',
            './src/components/ui/card-hover-effect',
            './src/components/ui/floating-navbar'
          ]
        },
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split('/').pop().replace(/\.\w+$/, '')
            : 'chunk';
          return `assets/js/[name]-[hash].js`;
        },
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const extType = info[info.length - 1];
          if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)) {
            return `assets/media/[name]-[hash].${extType}`;
          } else if (/\.(png|jpe?g|gif|svg|ico|webp)(\?.*)?$/i.test(assetInfo.name)) {
            return `assets/img/[name]-[hash].${extType}`;
          } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
            return `assets/fonts/[name]-[hash].${extType}`;
          }
          return `assets/${extType}/[name]-[hash].${extType}`;
        }
      }
    },
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    sourcemap: false,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      'gsap',
      'react-icons',
      'prop-types'
    ],
    exclude: ['three']
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});
