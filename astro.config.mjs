// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react'

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
  site: 'https://web.brightonandco.co.uk',
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
      provider: fontProviders.fontsource(), // Switched to Fontsource!
      weights: [400, 500, 600, 700, 800],
      styles: ['normal', 'italic'], // This will reliably grab the true italics from the NPM package
      display: 'swap',
    },
  ],
  markdown: {
    // Automatically optimize images in markdown
    shikiConfig: {
      theme: 'github-dark',
    },
  },
  image: {
    // Configure image optimization
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
    domains: [], // Add external domains if needed
  },
});