import type { APIRoute } from 'astro';
import { features } from '@/config/features';

export const GET: APIRoute = ({ site }) => {
  const body = features.indexing
    ? ['User-agent: *', 'Allow: /', '', `Sitemap: ${new URL('sitemap-index.xml', site).href}`]
    : ['# Индексация отключена (PUBLIC_INDEXING=false)', 'User-agent: *', 'Disallow: /'];

  return new Response(`${body.join('\n')}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
