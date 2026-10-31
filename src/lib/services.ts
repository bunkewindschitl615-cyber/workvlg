import { getCollection, type CollectionEntry } from 'astro:content';
import { leadHref } from '@/config/navigation';

export type Service = CollectionEntry<'services'>;

export async function getServices(): Promise<Service[]> {
  return (await getCollection('services')).sort((a, b) => a.data.order - b.data.order);
}

export function servicePath(service: Service): string {
  return `/uslugi/${service.id}/`;
}

/** Service page if it exists, otherwise the lead form with this direction preselected. */
export function serviceHref(service: Service): string {
  return service.data.hasPage ? servicePath(service) : leadHref(service.id);
}
