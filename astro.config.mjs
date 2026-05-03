// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import preact from '@astrojs/preact';

export default defineConfig({
  security: {
    csp: {
      algorithm: 'SHA-512',
      
      scriptDirective: {
        resources: [
          "'self'", 
          "'unsafe-inline'", 
          "'unsafe-eval'", 
          "https://unpkg.com", 
          "https://static.cloudflareinsights.com",
          "https://api.websitecarbon.com"
        ]
      },
      
      styleDirective: {
        resources: [
          "'self'", 
          "'unsafe-inline'",
          // FIXED: Moved 'unsafe-hashes' up here where Astro expects style rules!
          "'unsafe-hashes'" 
        ]
      },
      
      directives: [
        // FIXED: Removed the unrecognised style-src-attr rule
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