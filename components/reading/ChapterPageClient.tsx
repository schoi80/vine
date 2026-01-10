'use client';

import { useState } from 'react';
import ChapterHeader from './ChapterHeader';
import ChapterSelectorModal from './ChapterSelectorModal';

interface Verse {
  verseNum: number;
  mentionsPlaces?: Array<{
    id: string;
    slug: string;
    name: string;
    latitude?: number;
    longitude?: number;
    featureType?: string;
  }>;
  describesEvents?: Array<{
    id: string;
    title: string;
    startDate?: number;
  }>;
}

interface ChapterPageClientProps {
  bookTitle: string;
  bookTitleKr: string;
  chapterNum: number;
  bookSlug: string;
  currentChapter: number;
  totalChapters: number;
  verses: Verse[];
}

export default function ChapterPageClient({
  bookTitle,
  bookTitleKr,
  chapterNum,
  bookSlug,
  currentChapter,
  totalChapters,
}: ChapterPageClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <ChapterHeader
        bookTitle={bookTitle}
        bookTitleKr={bookTitleKr}
        chapterNum={chapterNum}
        bookSlug={bookSlug}
        currentChapter={currentChapter}
        totalChapters={totalChapters}
        onClick={() => setIsModalOpen(true)}
      />
      <ChapterSelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bookTitle={bookTitle}
        bookTitleKr={bookTitleKr}
        bookSlug={bookSlug}
        currentChapter={currentChapter}
        totalChapters={totalChapters}
      />
    </>
  );
}
