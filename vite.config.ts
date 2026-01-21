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
  plugins: [
    react(), 
    mode === "development" && componentTagger(),
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
          // Only split vendor libraries - let Vite handle app code
          // This prevents circular dependency issues
          if (id.includes('node_modules')) {
            // React core + UI libraries - must be together as UI libs depend on React
            // Keep together to ensure React is available when UI components initialize
            if (
              id.includes('node_modules/react') || 
              id.includes('node_modules/react-dom') ||
              id.includes('node_modules/react-router') ||
              id.includes('node_modules/@radix-ui') ||
              id.includes('node_modules/lucide-react')
            ) {
              return 'vendor-react-ui';
            }
            // Animation library - separate chunk as it's large (can be lazy loaded)
            if (id.includes('node_modules/framer-motion')) {
              return 'vendor-animation';
            }
            // Query library - used throughout app (keep separate for caching)
            if (id.includes('node_modules/@tanstack/react-query')) {
              return 'vendor-query';
            }
            // Supabase - large library, separate chunk (can be lazy loaded if needed)
            if (id.includes('node_modules/@supabase')) {
              return 'vendor-supabase';
            }
            // Charts - separate chunk as it's large and not always needed
            if (id.includes('node_modules/recharts') || id.includes('node_modules/d3')) {
              return 'vendor-charts';
            }
            // Form libraries - used in forms, can be lazy loaded
            if (
              id.includes('node_modules/react-hook-form') ||
              id.includes('node_modules/@hookform') ||
              id.includes('node_modules/zod')
            ) {
              return 'vendor-forms';
            }
            // Vercel analytics - separate as it's optional and loads async
            if (id.includes('node_modules/@vercel')) {
              return 'vendor-analytics';
            }
            // All other node_modules go into a common vendor chunk
            return 'vendor';
          }
          // Let Vite handle app code splitting automatically
          // This allows route-based code splitting for optimal loading
        },
        // Optimize chunk file names for better caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    // Warn if chunk exceeds 500KB (more aggressive limit for better performance)
    chunkSizeWarningLimit: 500,
    // Optimize asset handling - inline small assets to reduce HTTP requests
    assetsInlineLimit: 4096,
    // Enable source maps only in development for faster builds
    sourcemap: mode === 'development',
    // Minify CSS for smaller bundle size
    cssMinify: true,
    // Minify JS - use esbuild for faster builds and better compatibility
    minify: mode === 'production' ? 'esbuild' : false,
    // Target modern browsers for smaller bundle size
    target: 'esnext',
    // Report compressed size to track bundle optimization
    reportCompressedSize: true,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom', 
      'framer-motion',
      'recharts',
      'd3-scale',
      'd3-shape',
      'd3-time',
      'd3-time-format',
    ],
    // Force pre-bundling of recharts dependencies
    esbuildOptions: {
      target: 'esnext',
    },
  },
}));
