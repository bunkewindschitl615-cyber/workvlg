import { PUBLIC_INDEXING } from 'astro:env/server';

export const features = {
  /** When false, the whole site is closed from search engines (robots.txt + noindex). */
  indexing: PUBLIC_INDEXING,
  /**
   * The form opens a Telegram draft. The site does not store the request.
   * Switch off to show direct contacts only, until the own server is connected.
   */
  leadForm: true,
} as const;
