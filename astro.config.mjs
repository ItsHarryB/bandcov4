// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react'

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
  site: 'https://test.brightonandco.co.uk',
  // @ts-ignore
  integrations: [react(), mdx(),     
    sitemap({
      // configuration options
    }),
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