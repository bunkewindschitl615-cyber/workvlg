import {
  PUBLIC_CONTACT_EMAIL,
  PUBLIC_CONTACT_PHONE,
  PUBLIC_INSTAGRAM_URL,
  PUBLIC_MAX_URL,
  PUBLIC_SHOW_INSTAGRAM,
  PUBLIC_TELEGRAM_URL,
  PUBLIC_VK_URL,
} from 'astro:env/server';

export type ContactChannelId = 'phone' | 'telegram' | 'max' | 'vk' | 'instagram' | 'email';

export interface ContactChannel {
  id: ContactChannelId;
  label: string;
  href: string;
  display: string;
  external: boolean;
  /** Mandatory disclaimer that must be shown next to the channel. */
  legalNote?: string;
}

export const INSTAGRAM_LEGAL_NOTE =
  'Instagram принадлежит компании Meta, деятельность которой признана экстремистской и запрещена в России.';

function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8'))) {
    return `+7${digits.slice(1)}`;
  }
  return null;
}

function handleFromUrl(url: string): string {
  const path = new URL(url).pathname.replace(/\/+$/, '');
  return path.split('/').pop() || url;
}

function buildChannels(): ContactChannel[] {
  const channels: ContactChannel[] = [];

  if (PUBLIC_CONTACT_PHONE) {
    const phone = normalizePhone(PUBLIC_CONTACT_PHONE);
    if (!phone) {
      throw new Error(`PUBLIC_CONTACT_PHONE: ожидается российский номер из 11 цифр, получено "${PUBLIC_CONTACT_PHONE}"`);
    }
    channels.push({ id: 'phone', label: 'Телефон', href: `tel:${phone}`, display: PUBLIC_CONTACT_PHONE, external: false });
  }
  if (PUBLIC_TELEGRAM_URL) {
    channels.push({ id: 'telegram', label: 'Telegram', href: PUBLIC_TELEGRAM_URL, display: `@${handleFromUrl(PUBLIC_TELEGRAM_URL)}`, external: true });
  }
  if (PUBLIC_MAX_URL) {
    channels.push({ id: 'max', label: 'MAX', href: PUBLIC_MAX_URL, display: 'Написать в MAX', external: true });
  }
  if (PUBLIC_VK_URL) {
    channels.push({ id: 'vk', label: 'ВКонтакте', href: PUBLIC_VK_URL, display: 'Сообщество ВКонтакте', external: true });
  }
  if (PUBLIC_SHOW_INSTAGRAM && PUBLIC_INSTAGRAM_URL) {
    channels.push({
      id: 'instagram',
      label: 'Instagram*',
      href: PUBLIC_INSTAGRAM_URL,
      display: `@${handleFromUrl(PUBLIC_INSTAGRAM_URL)}`,
      external: true,
      legalNote: INSTAGRAM_LEGAL_NOTE,
    });
  }
  if (PUBLIC_CONTACT_EMAIL) {
    channels.push({ id: 'email', label: 'Email', href: `mailto:${PUBLIC_CONTACT_EMAIL}`, display: PUBLIC_CONTACT_EMAIL, external: false });
  }

  return channels;
}

/** Only channels that are actually configured; unset ones are never rendered. */
export const contactChannels: readonly ContactChannel[] = buildChannels();

export function getChannel(id: ContactChannelId): ContactChannel | undefined {
  return contactChannels.find((channel) => channel.id === id);
}

export const hasAnyContact = contactChannels.length > 0;
