// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
  site: 'https://test.brightonandco.co.uk',
  // @ts-ignore
  integrations: [react(),     
    sitemap({
      // configuration options
    }),
  ],
});