import { PUBLIC_INDEXING } from 'astro:env/server';

export const features = {
  /** When false, the whole site is closed from search engines (robots.txt + noindex). */
  indexing: PUBLIC_INDEXING,
  /** Lead endpoint is not implemented yet (stage 7); forms must show a fallback instead of a fake submit. */
  leadForm: false,
} as const;
