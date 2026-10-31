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

/** Target of every "Оставить заявку" button; the form section with this id is built in stage 3. */
export const LEAD_HREF = '/#zayavka';

export function isActive(href: string, pathname: string): boolean {
  return href === '/' ? pathname === '/' : pathname.startsWith(href);
}
