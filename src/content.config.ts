import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { icons, type IconName } from '@/components/ui/icons';

const iconName = z.enum(Object.keys(icons) as [IconName, ...IconName[]]);

const services = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/services' }),
  schema: z
    .object({
      title: z.string(),
      /** One or two sentences for cards. */
      summary: z.string().max(220),
      icon: iconName,
      order: z.number().int(),
      /** Typical tasks shown in the "Популярные услуги" block on the home page. */
      popular: z.array(z.object({ title: z.string(), icon: iconName })).default([]),
      /** False until the owner confirms the wording and that the company actually performs this work. */
      ownerConfirmed: z.boolean().default(false),

      /** Generates /uslugi/<id>/. Only for directions with enough unique content. */
      hasPage: z.boolean().default(false),
      /** Page heading; defaults to title. */
      h1: z.string().optional(),
      seo: z
        .object({
          /** Without the brand: SeoHead appends " — WORKVLG". */
          title: z.string().max(55),
          description: z.string().min(70).max(165),
        })
        .optional(),
      audience: z.array(z.string()).default([]),
      tasks: z.array(z.string()).default([]),
      /** Named groups of works. The list is extended by editing the service file. */
      groups: z.array(z.object({ title: z.string(), items: z.array(z.string()).min(1) })).default([]),
      benefits: z.array(z.object({ title: z.string(), text: z.string(), icon: iconName })).default([]),
      related: z.array(reference('services')).default([]),
    })
    .superRefine((data, ctx) => {
      if (!data.hasPage) return;
      for (const field of ['seo', 'h1'] as const) {
        if (!data[field]) ctx.addIssue({ code: 'custom', path: [field], message: `Для страницы услуги нужно поле ${field}` });
      }
      for (const field of ['audience', 'benefits'] as const) {
        if (data[field].length === 0) ctx.addIssue({ code: 'custom', path: [field], message: `Для страницы услуги нужен список ${field}` });
      }
      if (data.tasks.length === 0 && data.groups.length === 0) {
        ctx.addIssue({ code: 'custom', path: ['groups'], message: 'Для страницы услуги нужен список groups или tasks' });
      }
    }),
});

export const collections = { services };
