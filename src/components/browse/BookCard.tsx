'use client';

import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { getLocalizedBookName, getLocalizedShortName } from '@/lib/utils/bilingual';
import type { Book } from '@/app/browse/page';

function divisionColorClass(title: string | undefined) {
  switch ((title || '').toLowerCase()) {
    case 'pentateuch':
    case 'law':
      return 'text-[#5b8a72] border-[#5b8a72]/30';
    case 'historical':
    case 'history':
      return 'text-[#6a7aa2] border-[#6a7aa2]/30';
    case 'poetry-wisdom':
    case 'wisdom':
      return 'text-[#8b6f52] border-[#8b6f52]/30';
    case 'major prophets':
    case 'minor prophets':
    case 'prophets':
      return 'text-[#7c5ea8] border-[#7c5ea8]/30';
    case 'gospels':
      return 'text-[#a85e5e] border-[#a85e5e]/30';
    case 'pauline epistles':
    case 'general epistles':
    case 'letters':
      return 'text-[#7a8a5e] border-[#7a8a5e]/30';
    case 'apocalypse':
    case 'revelation':
      return 'text-[#a25e8f] border-[#a25e8f]/30';
    case 'acts':
      return 'text-[#5e8aa2] border-[#5e8aa2]/30';
    default:
      return 'text-text-secondary border-border';
  }
}

export default function BookCard({ book }: { book: Book }) {
  const { t, language } = useLanguage();

  const primaryTitle = getLocalizedBookName(book, language);
  const secondaryTitle = getLocalizedBookName(book, language === 'ko' ? 'en' : 'ko');

  const primaryShort = getLocalizedShortName(book, language);
  const secondaryShort = getLocalizedShortName(book, language === 'ko' ? 'en' : 'ko');

  // For division label, we use the pre-localized field if translations are missing,
  // but prefer the utility if book has division translations.
  const divisionLabel = language === 'ko' ? book.divisionTitleKr : book.divisionTitle;

  const ariaLabel = `${primaryTitle} · ${secondaryTitle}${
    typeof book.chaptersCount === 'number' ? ` · ${book.chaptersCount} ${t('chaptersLabel')}` : ''
  }`;

  const divisionBadgeClasses = `inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-muted border ${divisionColorClass(book.divisionTitle)}`;

  return (
    <Link
      href={`/read/${book.slug}/1`}
      aria-label={ariaLabel}
      className="group border-border hover:bg-hover hover:border-accent-book/50 focus-visible:ring-accent-book block rounded-lg border p-4 transition-all focus-visible:ring-2 focus-visible:outline-none"
    >
      <div className="flex items-start gap-3">
        <div className="mt-1 flex-shrink-0">
          <BookOpen className="text-text-secondary group-hover:text-accent-book h-5 w-5 transition-colors" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h4
              className={`text-text-primary group-hover:text-accent-book font-semibold transition-colors ${language === 'ko' ? 'font-song-myung' : ''}`}
            >
              {primaryTitle}
            </h4>
            {book.divisionTitle && <span className={divisionBadgeClasses}>{divisionLabel}</span>}
          </div>

          <p
            className={`text-text-secondary mt-1 text-sm ${language !== 'ko' ? 'font-song-myung' : ''}`}
          >
            {secondaryTitle}
          </p>

          <p className="text-text-tertiary mt-2 text-xs">
            {primaryShort} · {secondaryShort}
            {typeof book.chaptersCount === 'number' && (
              <>
                {' '}
                · {book.chaptersCount} {t('chaptersLabel')}
              </>
            )}
          </p>
        </div>
      </div>
    </Link>
  );
}
