// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import preact from '@astrojs/preact';

export default defineConfig({
  adapter: cloudflare({
    imageService: 'compile', 
  }),
  site: 'https://web.brightonandco.co.uk',
  integrations: [
    preact({ compat: true }), 
    mdx(),    
    sitemap({}),
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