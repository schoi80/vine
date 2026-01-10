import { getLocalizedBookName } from '@/lib/utils/bilingual';
import { Book } from '@/lib/types/hierarchy';

type VerseNode = {
  chapter?: {
    book?: Book;
  };
};

export function groupByBook(verses: VerseNode[], language: 'en' | 'ko') {
  const map = new Map<string, { label: string; slug: string; count: number }>();

  for (const verse of verses) {
    const book = verse.chapter?.book;
    if (!book || !book.slug) continue;

    const label = getLocalizedBookName(book, language) || book.slug;

    if (!map.has(book.slug)) {
      map.set(book.slug, { label, slug: book.slug, count: 0 });
    }
    map.get(book.slug)!.count++;
  }

  return Array.from(map.values()).sort((a, b) => b.count - a.count);
}
