import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Plugin to ensure correct chunk loading order
function chunkOrderPlugin() {
  return {
    name: 'chunk-order',
    generateBundle(options: any, bundle: any) {
      // Ensure react-core is loaded before ui-vendor
      const chunks = Object.keys(bundle);
      const reactCoreChunk = chunks.find((c: string) => c.includes('react-core'));
      const uiVendorChunk = chunks.find((c: string) => c.includes('ui-vendor'));
      
      if (reactCoreChunk && uiVendorChunk) {
        // Vite handles this automatically, but we can add explicit dependencies
        if (bundle[uiVendorChunk] && bundle[reactCoreChunk]) {
          bundle[uiVendorChunk].moduleIds = bundle[uiVendorChunk].moduleIds || [];
        }
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger(),
    mode === "production" && chunkOrderPlugin(),
  ].filter(Boolean),
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
          // Combine React, React-dependent libraries, and lucide icons to ensure correct loading order
          // lucide-react uses forwardRef and must load AFTER React
          if (
            id.includes('node_modules/react') || 
            id.includes('node_modules/react-dom') ||
            id.includes('node_modules/react-router') ||
            id.includes('node_modules/framer-motion') || 
            id.includes('node_modules/@radix-ui') ||
            id.includes('node_modules/lucide-react')
          ) {
            return 'vendor-react';
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
      },
    },
    // Warn if chunk exceeds 1MB
    chunkSizeWarningLimit: 1000,
    // Optimize asset handling
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
    // Enable source maps in production for debugging (optional)
    sourcemap: mode === 'development',
    // Minify CSS
    cssMinify: true,
    // Minify JS - use esbuild for better compatibility and faster builds
    minify: mode === 'production' ? 'esbuild' : false,
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
