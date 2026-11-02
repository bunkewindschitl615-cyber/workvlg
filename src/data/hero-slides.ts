import type { IconName } from '@/components/ui/icons';

export interface HeroSlide {
  title: string;
  caption: string;
  icon: IconName;
  /** Service page the slide leads to. Root path, prefixed with the site base in the component. */
  href: string;
}

/** Shown until real object photos are added. Each slide is explicitly marked as a demo. */
export const heroSlides: readonly HeroSlide[] = [
  {
    title: 'Мелкий бытовой ремонт',
    caption: 'Электрика, сантехника, навеска, локальная отделка',
    icon: 'wrench',
    href: '/uslugi/melkiy-remont/',
  },
  {
    title: 'Косметический ремонт',
    caption: 'Стены, полы, обои, покраска и двери',
    icon: 'paint',
    href: '/uslugi/kosmeticheskiy-remont/',
  },
  {
    title: 'Капитальный ремонт',
    caption: 'Коммуникации, стяжка, перепланировка, чистовая отделка',
    icon: 'building',
    href: '/uslugi/kapitalnyy-remont/',
  },
  {
    title: 'Строительство под ключ',
    caption: 'Фундамент, стены, кровля и инженерные системы',
    icon: 'layers',
    href: '/uslugi/pod-klyuch/',
  },
];
