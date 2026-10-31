export interface NavItem {
  label: string;
  href: string;
}

export const mainNav: readonly NavItem[] = [
  { label: 'Услуги', href: '/uslugi/' },
  { label: 'Наши работы', href: '/raboty/' },
  { label: 'Как мы работаем', href: '/kak-my-rabotaem/' },
  { label: 'О нас', href: '/o-nas/' },
  { label: 'Контакты', href: '/kontakty/' },
];

/** Target of every "Оставить заявку" button: the lead section on the home page. */
export const LEAD_HREF = '/#zayavka';

/** Lead link with a preselected work category, read by the lead form (stage 7). */
export function leadHref(category?: string): string {
  return category ? `/?kategoriya=${encodeURIComponent(category)}#zayavka` : LEAD_HREF;
}

export function isActive(href: string, pathname: string): boolean {
  return href === '/' ? pathname === '/' : pathname.startsWith(href);
}
