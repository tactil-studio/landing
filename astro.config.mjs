// @ts-check
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import metaTags from "astro-meta-tags";

import react from "@astrojs/react";

import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import vercel from "@astrojs/vercel";
import rehypeExternalLinks from 'rehype-external-links';


// https://astro.build/config
export default defineConfig({
  site: "https://tactilstudio.com",
  prefetch: true,

  experimental: {
    headingIdCompat: true,
    contentIntellisense: true

  },

  i18n: {
    locales: ["es", "en", "it", "ca"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    mdx(),
    sitemap(),
    metaTags(),
    react({ experimentalReactChildren: true }),
  ],
  markdown: {
    rehypePlugins: [
      rehypeHeadingIds,
      [
        rehypeExternalLinks,
        {
          content: { type: 'text', value: ' 🔗' }
        }
      ],
    ]
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["astro:content"],
      include: ["react", "react-dom"],
    },
    server: {
      fs: {
        strict: false,
      },
      watch: {
        usePolling: false,
        ignored: ["**/node_modules/**", "**/.git/**"],
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
  },

  adapter: vercel(),
});