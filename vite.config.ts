import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { generateSW } from 'workbox-build'

function workboxPlugin() {
  return {
    name: 'workbox-generate-sw',
    closeBundle: async () => {
      await generateSW({
        swDest: 'dist/sw.js',
        globDirectory: 'dist',
        globPatterns: ['**/*.{html,js,css,png,svg,json,ico}'],
        importScripts: ['/sw-custom.js'],
        runtimeCaching: [
          {
            urlPattern: /http:\/\/192\.168\.0\.103:8000\/.*$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 24 * 60 * 60,
              },
              networkTimeoutSeconds: 10,
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|ico)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },
            }
          },
          {
            urlPattern: /\.json$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'json-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 7 * 24 * 60 * 60,
              },
            }
          }
        ],
        skipWaiting: true,
        clientsClaim: true
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 5172,
  },
  plugins: [
    react(),
    workboxPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
