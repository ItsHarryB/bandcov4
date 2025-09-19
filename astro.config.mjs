// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

import preact from '@astrojs/preact';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
  site: 'https://test.brightonandco.co.uk',
  // @ts-ignore
  integrations: [,preact(),     
    sitemap({
      // configuration options
    }),
  ],
});