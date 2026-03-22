// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react'

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare({
    imageService: 'compile',
  }),
  site: 'https://test.brightonandco.co.uk',
  // @ts-ignore
  integrations: [react(), mdx(),     
    sitemap({
      // configuration options
    }),
  ],
  fonts: [
    {
      name: 'Raleway',
      cssVariable: '--font-raleway',
      provider: fontProviders.fontsource(), 
      weights: [400, 700], /* Slimmed down from [400, 500, 600, 700, 800] */
      styles: ['normal', 'italic'], 
      display: 'swap',
    },
  ],
  markdown: {
    // Automatically optimize images in markdown
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});