import type { BilingualText } from '@/lib/types/hierarchy';

type Language = 'en' | 'ko';

interface WithBilingualTitle {
  title?: string;
  titleKr?: string;
}

export function getLocalizedTitle(
  item: WithBilingualTitle | null | undefined,
  language: Language
): string {
  if (!item) return '';

  if (language === 'ko') {
    return item.titleKr ?? item.title ?? '';
  }

  return item.title ?? item.titleKr ?? '';
}

interface WithBilingualBookName extends WithBilingualTitle {
  bookNameKr?: string;
}

export function getLocalizedBookName(
  book: WithBilingualBookName | null | undefined,
  language: Language
): string {
  if (!book) return '';

  if (language === 'ko') {
    return book.bookNameKr ?? book.title ?? '';
  }

  return book.title ?? book.bookNameKr ?? '';
}

interface WithBilingualShortName {
  shortName?: string;
  shortNameKr?: string;
}

export function getLocalizedShortName(
  item: WithBilingualShortName | null | undefined,
  language: Language
): string {
  if (!item) return '';

  if (language === 'ko') {
    return item.shortNameKr ?? item.shortName ?? '';
  }

  return item.shortName ?? item.shortNameKr ?? '';
}

export function getBilingualText(
  item: BilingualText | null | undefined,
  language: Language
): string {
  if (!item) return '';

  if (language === 'ko') {
    return item.textKr ?? item.text ?? '';
  }

  return item.text ?? item.textKr ?? '';
}
