import { url } from '@/lib/url';

export interface NavItem {
  label: string;
  href: string;
}

export const mainNav: readonly NavItem[] = [
  { label: 'Услуги', href: url('/uslugi/') },
  { label: 'Наши работы', href: url('/raboty/') },
  { label: 'Как мы работаем', href: url('/kak-my-rabotaem/') },
  { label: 'О нас', href: url('/o-nas/') },
  { label: 'Контакты', href: url('/kontakty/') },
];

/** Target of every "Оставить заявку" button: the lead section on the home page. */
export const LEAD_HREF = `${url('/')}#zayavka`;

/** Lead link with a preselected work category, read by the lead form. */
export function leadHref(category?: string): string {
  return category ? `${url('/')}?kategoriya=${encodeURIComponent(category)}#zayavka` : LEAD_HREF;
}

export function isActive(href: string, pathname: string): boolean {
  const path = href.split(/[?#]/)[0] ?? href;
  const home = url('/');
  if (path === home) return pathname === home || pathname === home.replace(/\/$/, '');
  return pathname === path || pathname.startsWith(path);
}
