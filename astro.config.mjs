// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

import preact from '@astrojs/preact';

import Swup from 'swup';
const swup = new Swup();

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
  integrations: [preact()]
});