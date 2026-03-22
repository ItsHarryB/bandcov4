// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import preact from '@astrojs/preact'; // 1. Preact imported

export default defineConfig({
  adapter: cloudflare({
    imageService: 'compile', // 2. Fixes live images
  }),
  site: 'https://web.brightonandco.co.uk',
  integrations: [
    preact({ compat: true }), // 3. Preact with React compatibility
    mdx(),     
    sitemap({}),
  ],
  fonts: [
    {
      name: 'Raleway',
      cssVariable: '--font-raleway',
      provider: fontProviders.fontsource(), 
      weights: [400, 700], // 4. Trimmed font weights
      styles: ['normal', 'italic'], 
      display: 'swap',
    },
  ],
  markdown: { shikiConfig: { theme: 'github-dark' } },
});