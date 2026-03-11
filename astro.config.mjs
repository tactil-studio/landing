// @ts-check
import mdx from '@astrojs/mdx';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import metaTags from 'astro-meta-tags';

import react from '@astrojs/react';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://tactilstudio.com',
  experimental: { headingIdCompat: true, contentIntellisense: true },

  output: 'server',
  adapter: vercel({

  }),
  i18n: {
    locales: ["es", "en", "ca"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false
    }
  },
  integrations: [mdx(), metaTags(), react()],

  vite: {
    plugins: [tailwindcss()],
  },
});