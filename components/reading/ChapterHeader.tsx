'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ChapterHeaderProps {
  bookTitle: string;
  bookTitleKr: string;
  chapterNum: number;
  bookSlug: string;
  currentChapter: number;
  totalChapters: number;
  onClick?: () => void;
}

export default function ChapterHeader({
  bookTitle,
  bookTitleKr,
  chapterNum,
  bookSlug,
  currentChapter,
  totalChapters,
  onClick,
}: ChapterHeaderProps) {
  const { language, t } = useLanguage();

  const prevChapter = currentChapter > 1 ? currentChapter - 1 : null;
  const nextChapter = currentChapter < totalChapters ? currentChapter + 1 : null;

  const headerContent =
    language === 'ko' ? (
      <>
        <h1 className="text-text-primary font-song-myung mb-2 text-3xl font-bold">
          {bookTitleKr} {chapterNum}
        </h1>
        <p className="text-text-secondary">
          {bookTitle} {chapterNum}
        </p>
      </>
    ) : (
      <>
        <h1 className="text-text-primary mb-2 text-3xl font-bold">
          {bookTitle} {chapterNum}
        </h1>
        <p className="text-text-secondary font-song-myung">
          {bookTitleKr} {chapterNum}
        </p>
      </>
    );

  const headerWrapper = onClick ? (
    <button onClick={onClick} className="cursor-pointer transition-opacity hover:opacity-80">
      {headerContent}
    </button>
  ) : (
    headerContent
  );

  return (
    <div className="mb-8 grid grid-cols-3 items-center gap-2 md:gap-4">
      {/* Previous Chapter */}
      <div className="flex justify-start">
        {prevChapter ? (
          <Link
            href={`/read/${bookSlug}/${prevChapter}`}
            className="border-border hover:bg-hover focus-visible:ring-primary/50 inline-flex items-center gap-2 rounded-lg border px-4 py-2 transition-colors focus-visible:ring-2 focus-visible:outline-none"
            aria-label={t('reading.previousChapter')}
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            <span className="text-xs">{t('reading.previousChapter')}</span>
          </Link>
        ) : (
          <div aria-hidden="true" className="h-[42px] w-[140px]" />
        )}
      </div>

      {/* Chapter Title - Centered */}
      <div className="min-w-0 text-center">{headerWrapper}</div>

      {/* Next Chapter */}
      <div className="flex justify-end">
        {nextChapter ? (
          <Link
            href={`/read/${bookSlug}/${nextChapter}`}
            className="border-border hover:bg-hover focus-visible:ring-primary/50 inline-flex items-center gap-2 rounded-lg border px-4 py-2 transition-colors focus-visible:ring-2 focus-visible:outline-none"
            aria-label={t('reading.nextChapter')}
          >
            <span className="text-xs">{t('reading.nextChapter')}</span>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        ) : (
          <div aria-hidden="true" className="h-[42px] w-[140px]" />
        )}
      </div>
    </div>
  );
}
