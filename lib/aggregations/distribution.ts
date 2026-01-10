type VerseNode = {
  chapter?: {
    book?: {
      title?: string;
      bookNameKr?: string;
      slug?: string;
    };
  };
};

export function groupByBook(verses: VerseNode[], language: 'en' | 'ko') {
  const map = new Map<string, { label: string; slug: string; count: number }>();

  for (const verse of verses) {
    const book = verse.chapter?.book;
    if (!book || !book.slug) continue;

    const label =
      language === 'ko'
        ? book.bookNameKr || book.title || book.slug
        : book.title || book.bookNameKr || book.slug;

    if (!map.has(book.slug)) {
      map.set(book.slug, { label, slug: book.slug, count: 0 });
    }
    map.get(book.slug)!.count++;
  }

  return Array.from(map.values()).sort((a, b) => b.count - a.count);
}
