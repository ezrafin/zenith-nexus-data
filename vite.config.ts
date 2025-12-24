import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React core
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router')) {
            return 'react-vendor';
          }
          // UI libraries
          if (id.includes('node_modules/framer-motion') || id.includes('node_modules/@radix-ui')) {
            return 'ui-vendor';
          }
          // Query library
          if (id.includes('node_modules/@tanstack/react-query')) {
            return 'query-vendor';
          }
          // Supabase
          if (id.includes('node_modules/@supabase')) {
            return 'supabase-vendor';
          }
          // Charts
          if (id.includes('node_modules/recharts') || id.includes('node_modules/d3')) {
            return 'charts-vendor';
          }
          // Icons
          if (id.includes('node_modules/lucide-react')) {
            return 'icons-vendor';
          }
          // Large pages - split by route
          if (id.includes('/pages/')) {
            const pageMatch = id.match(/\/pages\/([^/]+)/);
            if (pageMatch) {
              const pageName = pageMatch[1];
              // Group auth pages
              if (pageName === 'auth' || id.includes('/pages/auth/')) {
                return 'auth-pages';
              }
              // Group education pages
              if (pageName === 'education' || id.includes('/pages/education/') || pageName === 'course' || id.includes('/pages/course/')) {
                return 'education-pages';
              }
              // Group video pages
              if (pageName === 'video' || id.includes('/pages/video/')) {
                return 'video-pages';
              }
              // Other pages can be in their own chunks
              return `page-${pageName}`;
            }
          }
        },
        // Optimize chunk size
        chunkSizeWarningLimit: 1000, // Warn if chunk exceeds 1MB
      },
    },
    // Optimize asset handling
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
    // Enable source maps in production for debugging (optional)
    sourcemap: mode === 'development',
    // Minify CSS
    cssMinify: true,
    // Minify JS
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production', // Remove console.log in production
        drop_debugger: mode === 'production',
        pure_funcs: mode === 'production' ? ['console.log', 'console.info', 'console.debug'] : [],
      },
      format: {
        comments: false, // Remove comments
      },
    },
    // Target modern browsers for smaller bundle
    target: 'esnext',
    // Report compressed size
    reportCompressedSize: true,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
  },
}));
