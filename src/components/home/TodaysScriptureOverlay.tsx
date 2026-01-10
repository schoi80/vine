'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_DAILY_READING, BOOKS_WITH_COUNTS } from '@/lib/apollo/queries';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { dailySeed, mulberry32 } from '@/lib/utils/random';

const STORAGE_KEY = 'bible-daily-reading-date';

type ChapterNode = {
  id: string;
  chapterNum: number;
  slug: string;
  book: {
    id: string;
    slug: string;
    title: string;
    bookNameKr: string;
    shortName: string;
    shortNameKr: string;
    bookOrder: number;
  };
};

type DailyReadingQuery = {
  dailyReadings: Array<{
    id: string;
    date: string;
    chaptersConnection: {
      edges: Array<{
        node: ChapterNode;
      }>;
    };
  }>;
};

type BookNode = {
  slug: string;
  title: string;
  bookNameKr: string;
  chaptersConnection: { totalCount: number };
};

type BooksQuery = { books: BookNode[] };

function getLocalDate(): string {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: tz,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
}

function formatDisplayDate(dateStr: string, language: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  const locale = language === 'ko' ? 'ko-KR' : 'en-US';
  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
  }).format(date);
}

function getInitialDate(today: string): string {
  if (typeof window === 'undefined') return today;
  return localStorage.getItem(STORAGE_KEY) || today;
}

export default function TodaysScriptureOverlay() {
  const { t, language } = useLanguage();
  const today = getLocalDate();

  const [state, setState] = useState(() => ({
    selectedDate: today,
    isHydrated: false,
  }));

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState({
      selectedDate: getInitialDate(today),
      isHydrated: true,
    });
  }, [today]);

  const handleDateChange = useCallback((newDate: string) => {
    setState(prev => ({ ...prev, selectedDate: newDate }));
    localStorage.setItem(STORAGE_KEY, newDate);
  }, []);

  const { selectedDate, isHydrated } = state;

  const { data: dailyReadingData } = useSuspenseQuery<DailyReadingQuery>(GET_DAILY_READING, {
    variables: { date: selectedDate },
    fetchPolicy: 'cache-first',
  });

  const { data: booksData } = useSuspenseQuery<BooksQuery>(BOOKS_WITH_COUNTS, {
    fetchPolicy: 'cache-first',
  });

  const dailyReading = dailyReadingData?.dailyReadings?.[0];
  const chapters = dailyReading?.chaptersConnection?.edges?.map(edge => edge.node) ?? [];

  const sortedChapters = [...chapters].sort((a, b) => {
    if (a.book.bookOrder !== b.book.bookOrder) {
      return a.book.bookOrder - b.book.bookOrder;
    }
    return a.chapterNum - b.chapterNum;
  });

  const isToday = selectedDate === today;
  const title = isToday ? t('home.todaysScripture') : formatDisplayDate(selectedDate, language);

  const datePicker = (
    <div className="mt-3 flex items-center gap-2">
      <input
        type="date"
        value={selectedDate}
        onChange={e => handleDateChange(e.target.value)}
        className="pointer-events-auto cursor-pointer rounded-md border border-white/30 bg-white/10 px-3 py-1.5 text-sm text-white backdrop-blur-sm transition-all hover:bg-white/20 focus:border-white/50 focus:outline-none"
        aria-label={t('home.selectDate')}
      />
    </div>
  );

  if (sortedChapters.length > 0) {
    return (
      <div className="z-header pointer-events-none absolute top-20 left-10 md:top-20 md:left-20">
        <div
          className={`text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] ${language === 'ko' ? 'font-song-myung' : ''}`}
        >
          <div className="text-[clamp(2rem,6vw,4rem)] leading-tight font-extrabold tracking-tight">
            {title}
          </div>
          <div className="mt-1 space-y-1">
            {sortedChapters.map(chapter => {
              const label = language === 'ko' ? chapter.book.bookNameKr : chapter.book.title;
              return (
                <Link
                  key={chapter.id}
                  href={`/read/${chapter.book.slug}/${chapter.chapterNum}`}
                  className="pointer-events-auto block text-[clamp(1.25rem,3.5vw,2rem)] font-semibold opacity-95 transition-opacity hover:opacity-100"
                  title={`${label} ${chapter.chapterNum}`}
                >
                  {label} {chapter.chapterNum}
                </Link>
              );
            })}
          </div>
          {isHydrated && datePicker}
        </div>
      </div>
    );
  }

  const books = booksData?.books ?? [];
  if (books.length > 0 && isToday) {
    const rand = mulberry32(dailySeed());
    const book = books[Math.floor(rand() * books.length)];
    const maxChapter = Math.max(1, book?.chaptersConnection?.totalCount ?? 1);
    const chapter = Math.floor(rand() * maxChapter) + 1;
    const label = language === 'ko' ? book.bookNameKr : book.title;

    return (
      <div className="z-header pointer-events-none absolute top-20 left-10 md:top-20 md:left-20">
        <Link
          href={`/read/${book.slug}/${chapter}`}
          className="pointer-events-auto block"
          title={t('home.todaysScripture')}
        >
          <div
            className={`text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] ${language === 'ko' ? 'font-song-myung' : ''}`}
          >
            <div className="text-[clamp(2rem,6vw,4rem)] leading-tight font-extrabold tracking-tight">
              {t('home.todaysScripture')}
            </div>
            <div className="mt-1 text-[clamp(1.25rem,3.5vw,2rem)] font-semibold opacity-95">
              {label} {chapter}
            </div>
          </div>
        </Link>
        {isHydrated && datePicker}
      </div>
    );
  }

  return (
    <div className="z-header pointer-events-none absolute top-20 left-10 md:top-20 md:left-20">
      <div
        className={`text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] ${language === 'ko' ? 'font-song-myung' : ''}`}
      >
        <div className="text-[clamp(2rem,6vw,4rem)] leading-tight font-extrabold tracking-tight">
          {title}
        </div>
        <div className="mt-1 text-[clamp(1rem,2.5vw,1.5rem)] font-medium opacity-80">
          {t('home.noReadingForDate')}
        </div>
        {isHydrated && datePicker}
      </div>
    </div>
  );
}
