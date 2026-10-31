export const site = {
  name: 'WORKVLG',
  locale: 'ru_RU',
  lang: 'ru',
  region: {
    city: 'Волгоград',
    area: 'Волгоградская область',
  },
  titleTemplate: (title: string) => `${title} — WORKVLG`,
  defaultTitle: 'WORKVLG — строительство и ремонт в Волгограде и области',
  defaultDescription:
    'Ремонт, отделка и строительные работы в Волгограде и Волгоградской области. Одна команда для бытовых задач и комплексных проектов.',
} as const;
