import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { icons, type IconName } from '@/components/ui/icons';

const iconName = z.enum(Object.keys(icons) as [IconName, ...IconName[]]);

const services = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    /** One or two sentences for cards. */
    summary: z.string().max(220),
    icon: iconName,
    order: z.number().int(),
    /** Typical tasks shown in the "Популярные услуги" block on the home page. */
    popular: z.array(z.object({ title: z.string(), icon: iconName })).default([]),
    /** False until the owner confirms the wording and that the company actually performs this work. */
    ownerConfirmed: z.boolean().default(false),
  }),
});

export const collections = { services };
