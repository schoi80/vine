'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { getLocalizedTitle } from '@/lib/utils/bilingual';
import BookCard from './BookCard';
import type { Testament } from '@/app/browse/page';

interface BrowseContentProps {
  testaments: Testament[];
}

type GroupingMode = 'division' | 'bookOrder';

export default function BrowseContent({ testaments }: BrowseContentProps) {
  const { t, language } = useLanguage();
  const [groupingMode, setGroupingMode] = useState<GroupingMode>('bookOrder');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <h1 className="text-text-primary mb-2 text-4xl font-bold">{t('browse.title')}</h1>
          <p className="text-text-secondary text-lg">{t('browse.subtitle')}</p>
        </div>

        <div className="mb-8 flex gap-2">
          <button
            onClick={() => setGroupingMode('bookOrder')}
            className={`rounded-lg border px-4 py-2 transition-colors ${
              groupingMode === 'bookOrder'
                ? 'bg-accent-book border-accent-book text-white'
                : 'bg-background border-border text-text-secondary hover:bg-hover'
            }`}
            aria-pressed={groupingMode === 'bookOrder'}
          >
            {t('browse.groupByBookOrder')}
          </button>
          <button
            onClick={() => setGroupingMode('division')}
            className={`rounded-lg border px-4 py-2 transition-colors ${
              groupingMode === 'division'
                ? 'bg-accent-book border-accent-book text-white'
                : 'bg-background border-border text-text-secondary hover:bg-hover'
            }`}
            aria-pressed={groupingMode === 'division'}
          >
            {t('browse.groupByDivision')}
          </button>
        </div>

        <div className="space-y-16">
          {testaments.map(testament => (
            <section key={testament.title} className="space-y-8">
              <div className="border-border border-b pb-2">
                <h2 className="text-text-primary text-2xl font-semibold">
                  {getLocalizedTitle(testament, language)}
                </h2>
              </div>

              {groupingMode === 'division' ? (
                testament.divisions && testament.divisions.length > 0 ? (
                  <div className="space-y-8">
                    {testament.divisions.map(division => (
                      <div key={division.title}>
                        <h3 className="text-text-secondary mb-4 text-lg font-medium">
                          {getLocalizedTitle(division, language)}
                        </h3>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          {division.books.map(book => (
                            <BookCard key={book.slug} book={book} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {testament.books.map(book => (
                      <BookCard key={book.slug} book={book} />
                    ))}
                  </div>
                )
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {testament.books
                    .slice()
                    .sort((a, b) => a.bookOrder - b.bookOrder)
                    .map(book => (
                      <BookCard key={book.slug} book={book} />
                    ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
