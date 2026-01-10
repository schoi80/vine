import type { BilingualText, Translatable } from '@/lib/types/hierarchy';

type Language = 'en' | 'ko';

export function getTranslation(
  item: Translatable | null | undefined,
  field: string,
  language: Language,
  fallback: string = ''
): string {
  if (!item) return fallback;

  if (language === 'ko' && item.translations) {
    const translation = item.translations.find(
      t => t.language === 'ko' && (t.field === field || t.field === field + 'Kr')
    );
    if (translation) return translation.text;
  }

  // If language is 'en', we return the fallback (which should be the English field)
  return fallback;
}

interface WithTitle extends Translatable {
  title?: string;
}

export function getLocalizedTitle(item: WithTitle | null | undefined, language: Language): string {
  if (!item) return '';
  const fallback = item.title ?? '';
  return getTranslation(item, 'title', language, fallback);
}

interface WithBookName extends Translatable {
  title?: string;
  bookName?: string;
}

export function getLocalizedBookName(
  book: WithBookName | null | undefined,
  language: Language
): string {
  if (!book) return '';
  const fallback = book.bookName ?? book.title ?? '';

  // Try 'bookName' first
  const bookName = getTranslation(book, 'bookName', language, '');
  if (bookName) return bookName;

  // Fallback to 'title' if 'bookName' translation is missing but 'title' exists
  // This handles the case where DB stores book titles under 'title' field
  return getTranslation(book, 'title', language, fallback);
}

interface WithShortName extends Translatable {
  shortName?: string;
}

export function getLocalizedShortName(
  item: WithShortName | null | undefined,
  language: Language
): string {
  if (!item) return '';
  const fallback = item.shortName ?? '';
  return getTranslation(item, 'shortName', language, fallback);
}

export function getBilingualText(
  item: BilingualText | null | undefined,
  language: Language
): string {
  if (!item) return '';
  const fallback = item.text ?? '';
  return getTranslation(item, 'text', language, fallback);
}

/**
 * Generic helper to get any localized field
 */
export function getLocalizedValue(
  item: Translatable | null | undefined,
  field: string,
  fallback: string,
  language: Language
): string {
  return getTranslation(item, field, language, fallback);
}
