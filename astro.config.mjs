import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://bouldermarina.com',   // ← update to real domain
  integrations: [
    react(),
    sitemap(),       // auto-generates /sitemap-index.xml for SEO
  ],
  // Static output — fully pre-rendered, zero PHP, zero server
  output: 'static',
  // Image optimization — auto WebP, lazy load
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
});
