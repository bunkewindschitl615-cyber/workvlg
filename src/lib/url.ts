/** Prefixes an internal path with the site base (needed for GitHub project pages). */
export function url(path: string): string {
  if (/^(https?:|tel:|mailto:|#)/.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}
