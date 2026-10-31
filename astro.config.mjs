// @ts-check
import { existsSync } from 'node:fs';
import { defineConfig, envField, fontProviders } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

// astro.config is evaluated before Astro loads .env, so read it here for SITE_URL.
if (existsSync('.env')) process.loadEnvFile('.env');

const SITE_URL = process.env.SITE_URL || 'http://localhost:4321';

/** Service pages that must never appear in the sitemap. */
const SITEMAP_EXCLUDE = ['/404/', '/spasibo/', '/styleguide/'];

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  build: { format: 'directory' },

  // Pages are prerendered to static HTML; only routes with `export const prerender = false`
  // (the lead endpoint) run on the Node server.
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  session: false,

  integrations: [
    sitemap({
      filter: (page) => !SITEMAP_EXCLUDE.some((path) => new URL(page).pathname === path),
    }),
  ],

  // Font files are downloaded at build time and served from our own origin (no third-party requests).
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Onest',
      cssVariable: '--font-sans',
      weights: ['400', '500', '600', '700', '800'],
      styles: ['normal'],
      subsets: ['cyrillic', 'latin'],
      fallbacks: ['system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
      display: 'swap',
    },
  ],

  env: {
    schema: {
      PUBLIC_INDEXING: envField.boolean({ context: 'server', access: 'public', default: false }),

      PUBLIC_CONTACT_PHONE: envField.string({ context: 'server', access: 'public', optional: true }),
      PUBLIC_CONTACT_EMAIL: envField.string({ context: 'server', access: 'public', optional: true }),
      PUBLIC_TELEGRAM_URL: envField.string({ context: 'server', access: 'public', optional: true, url: true }),
      PUBLIC_MAX_URL: envField.string({ context: 'server', access: 'public', optional: true, url: true }),
      PUBLIC_VK_URL: envField.string({ context: 'server', access: 'public', optional: true, url: true }),
      PUBLIC_INSTAGRAM_URL: envField.string({ context: 'server', access: 'public', optional: true, url: true }),
      PUBLIC_SHOW_INSTAGRAM: envField.boolean({ context: 'server', access: 'public', default: false }),

      PUBLIC_YANDEX_VERIFICATION: envField.string({ context: 'server', access: 'public', optional: true }),
      PUBLIC_GOOGLE_VERIFICATION: envField.string({ context: 'server', access: 'public', optional: true }),
    },
  },
});
