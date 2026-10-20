// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://bakinamconstruction.com',
  output: 'static',

  integrations: [sitemap(), robotsTxt(), mdx()],

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Oswald',
      cssVariable: '--font-display',
      weights: ['400', '600', '700'],
      styles: ['normal'],
    },
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-body',
      weights: ['400', '500', '700'],
      styles: ['normal'],
    },
    {
      provider: fontProviders.google(),
      name: 'Cairo',
      cssVariable: '--font-arabic',
      weights: ['500', '700', '800'],
      styles: ['normal'],
    },
    {
      provider: fontProviders.google(),
      name: 'Mulish',
      cssVariable: '--font-logo',
      weights: ['400', '600', '700', '800'],
      styles: ['normal'],
    },
  ],

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },

  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: 'lightningcss',
    },
  },
});
