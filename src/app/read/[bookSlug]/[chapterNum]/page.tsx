import { getLocalizedBookName } from '@/lib/utils/bilingual';

import { getClient } from '@/lib/apollo/client';
import { GET_CHAPTER_FOR_READING } from '@/lib/apollo/queries';
import { notFound } from 'next/navigation';
import ChapterView from '@/components/reading/ChapterView';
import ChapterNavigation from '@/components/reading/ChapterNavigation';
import ChapterPageClient from '@/components/reading/ChapterPageClient';

interface PageProps {
  params: Promise<{
    bookSlug: string;
    chapterNum: string;
  }>;
}

export default async function ChapterPage({ params }: PageProps) {
  const { bookSlug, chapterNum } = await params;
  const chapterNumber = parseInt(chapterNum, 10);

  if (isNaN(chapterNumber)) {
    notFound();
  }

  const client = getClient();

  const { data } = (await client.query({
    query: GET_CHAPTER_FOR_READING,
    variables: {
      bookSlug,
      chapterNum: chapterNumber,
    },
  })) as any;

  const book = data?.books?.[0];
  const chapterEdge = book?.chaptersConnection?.edges?.[0];
  const chapter = chapterEdge?.node;
  const totalChapters = book?.allChapters?.totalCount || 0;

  if (!book || !chapter) {
    notFound();
  }

  // Extract verses from connection structure
  const verses = chapter.versesConnection?.edges?.map((edge: any) => edge.node) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <ChapterPageClient
          bookTitle={book.title}
          bookTitleKr={getLocalizedBookName(book, 'ko')}
          chapterNum={chapter.chapterNum}
          bookSlug={bookSlug}
          currentChapter={chapterNumber}
          totalChapters={totalChapters}
          verses={verses}
        />

        <ChapterView verses={verses} writers={chapter.writers} />

        <ChapterNavigation
          bookSlug={bookSlug}
          currentChapter={chapterNumber}
          bookTitle={book.title}
          totalChapters={totalChapters}
        />
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { bookSlug, chapterNum } = await params;
  const chapterNumber = parseInt(chapterNum, 10);

  const client = getClient();

  try {
    const { data } = (await client.query({
      query: GET_CHAPTER_FOR_READING,
      variables: {
        bookSlug,
        chapterNum: chapterNumber,
      },
    })) as any;

    const book = data?.books?.[0];
    const chapterEdge = book?.chaptersConnection?.edges?.[0];
    const chapter = chapterEdge?.node;

    if (!book || !chapter) {
      return {
        title: 'Chapter Not Found',
      };
    }

    const firstVerseEdge = chapter.versesConnection?.edges?.[0];
    const firstVerse = firstVerseEdge?.node;
    const description = firstVerse?.verseText
      ? firstVerse.verseText.slice(0, 160)
      : `Read ${book.title} chapter ${chapter.chapterNum}`;

    return {
      title: `${book.title} ${chapter.chapterNum} - in the vine`,
      description,
    };
  } catch (_error) {
    return {
      title: 'in the vine',
    };
  }
}
