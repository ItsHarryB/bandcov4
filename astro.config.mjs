// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import preact from '@astrojs/preact';

export default defineConfig({
  security: {
    csp: {
      // 1. REMOVE the algorithm property entirely!
      // This stops Astro from automatically hashing inline styles and scripts.
      
      scriptDirective: {
        resources: [
          "'self'", 
          "'unsafe-inline'", // Now this actually works because there are no hashes!
          "'unsafe-eval'", 
          "https://unpkg.com", 
          "https://static.cloudflareinsights.com",
          "https://api.websitecarbon.com"
        ]
      },
      
      styleDirective: {
        resources: [
          "'self'", 
          "'unsafe-inline'", // This now allows Preact to use style="..." attributes!
          // We no longer need 'unsafe-hashes' because we aren't using hashes anymore
        ]
      },
      
      directives: [
        "connect-src 'self' https://cloudflareinsights.com https://api.websitecarbon.com"
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