// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// 1. Swap the React import for Preact
import preact from '@astrojs/preact';

export default defineConfig({
  security: {
    csp: {
      algorithm: 'SHA-512'
    }
  },
  adapter: cloudflare({
    imageService: 'compile', 
  }),
  site: 'https://web.brightonandco.co.uk',
  integrations: [
    // 2. Replace react() with preact({ compat: true })
    preact({ compat: true }), 
    mdx(),     
    sitemap({
      // configuration options
    }),
  ],
redirects: {
    '/cv': '/about-me/cv/',
  },
  fonts: [
    {
      name: 'Raleway',
      cssVariable: '--font-raleway',
      provider: fontProviders.fontsource(), 
      weights: [400, 700],
      styles: ['normal', 'italic'], 
      display: 'swap',
    },
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});