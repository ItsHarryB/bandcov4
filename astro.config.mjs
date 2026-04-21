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
      algorithm: 'SHA-512',
      
      // Astro requires scripts to be configured in this special dedicated object
      scriptDirective: {
        resources: [
          "'self'", 
          "'unsafe-inline'", // Allows dynamically injected scripts like the Carbon Badge
          "https://unpkg.com", 
          "https://static.cloudflareinsights.com"
        ]
      },
      
      // Astro requires styles to be configured in this special dedicated object
      styleDirective: {
        resources: [
          "'self'", 
          "'unsafe-inline'" 
        ]
      },
      
      // FIXED: Using Astro's Array syntax bypasses the TypeScript object-key errors entirely!
      directives: [
        "connect-src 'self' https://cloudflareinsights.com"
      ]
    }
  },
  adapter: cloudflare({
    imageService: 'compile', 
  }),
  site: 'https://test.brightonandco.co.uk',
  integrations: [
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