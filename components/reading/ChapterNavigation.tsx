'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ChapterNavigationProps {
  bookSlug: string;
  currentChapter: number;
  bookTitle: string;
  totalChapters: number;
}

export default function ChapterNavigation({
  bookSlug,
  currentChapter,
  bookTitle,
  totalChapters,
}: ChapterNavigationProps) {
  const { t } = useLanguage();

  const prevChapter = currentChapter > 1 ? currentChapter - 1 : null;
  const nextChapter = currentChapter < totalChapters ? currentChapter + 1 : null;

  return (
    <div className="border-border mt-12 border-t pt-8">
      <div className="flex items-center justify-between">
        {/* Previous Chapter */}
        {prevChapter ? (
          <Link
            href={`/read/${bookSlug}/${prevChapter}`}
            className="border-border hover:bg-hover flex items-center gap-2 rounded-lg border px-4 py-2 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="text-xs">{t('reading.previousChapter')}</span>
          </Link>
        ) : (
          <div />
        )}

        {/* Current Chapter Info */}
        <span className="text-text-secondary text-sm">
          {bookTitle} {currentChapter}
        </span>

        {/* Next Chapter */}
        {nextChapter ? (
          <Link
            href={`/read/${bookSlug}/${nextChapter}`}
            className="border-border hover:bg-hover flex items-center gap-2 rounded-lg border px-4 py-2 transition-colors"
          >
            <span className="text-xs">{t('reading.nextChapter')}</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
