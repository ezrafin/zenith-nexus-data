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
            // Combine all React ecosystem into one chunk to ensure correct order
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
              return 'vendor-query';
            }
            // Supabase
            if (id.includes('node_modules/@supabase')) {
              return 'vendor-supabase';
            }
            // Charts
            if (id.includes('node_modules/recharts') || id.includes('node_modules/d3')) {
              return 'vendor-charts';
            }
          }
          // Let Vite handle app code splitting automatically
        },
      },
    },
    // Warn if chunk exceeds 1MB
    chunkSizeWarningLimit: 1000,
    // Optimize asset handling
    assetsInlineLimit: 4096,
    // Enable source maps in production for debugging
    sourcemap: mode === 'development',
    // Minify CSS
    cssMinify: true,
    // Minify JS - use esbuild for better compatibility
    minify: mode === 'production' ? 'esbuild' : false,
    // Target modern browsers
    target: 'esnext',
    // Report compressed size
    reportCompressedSize: true,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
  },
}));
