import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  base: '/kidGames/',
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: 'Kids Number Game',
        short_name: 'Number Game',
        description: 'A fun game to compare numbers for kids',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#1976d2',
        icons: [
          {
            src: 'vite.svg',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'vite.svg',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        // defining cached files formats
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
      },
    }),
  ],
});
