import React from 'react';
import { ScrollText } from 'lucide-react';
import { parseEntityMentions, parseItalics } from '@/lib/utils/parseEntityMentions';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface Verse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface RelatedVersesViewProps {
  /** Array of verses to display */
  verses: Verse[];
  /** Total count of verses (for display in header) */
  totalCount: number;
  /** Whether to show "Show More" button */
  hasMore: boolean;
  /** Callback when Show More is clicked */
  onShowMore: () => void;
  /** Loading state */
  loading?: boolean;
  /** Error state */
  error?: string;
  /** Section title */
  title: string;
  /** "Show More" button label */
  showMoreLabel: string;
  /** "Loading" aria label */
  loadingLabel: string;
  /** Whether to use Korean fonts */
  useKoreanFonts?: boolean;
  /** Additional className for container */
  className?: string;
}

/**
 * RelatedVersesView - Pure presentational component for displaying related verses
 *
 * This is the View component for the Container/View pattern.
 * All data fetching and state management should be handled by the container (RelatedVerses).
 *
 * Displays a list of verses with book/chapter/verse references and parsed text
 * with entity mentions and italic formatting support.
 */
export function RelatedVersesView({
  verses,
  totalCount,
  hasMore,
  onShowMore,
  loading = false,
  error,
  title,
  showMoreLabel,
  loadingLabel,
  useKoreanFonts = false,
  className = '',
}: RelatedVersesViewProps) {
  const renderTextSegments = (text: string) => {
    const segments = parseEntityMentions(text);
    return segments.map((segment, index) => {
      if (segment.type === 'text') {
        const parts = parseItalics(segment.content);
        return (
          <span key={index}>
            {parts.map((part, partIndex) =>
              part.italic ? (
                <em key={partIndex}>{part.text}</em>
              ) : (
                <span key={partIndex}>{part.text}</span>
              )
            )}
          </span>
        );
      }
      return <span key={index}>{segment.entity?.displayText}</span>;
    });
  };

  if (loading && verses.length === 0) {
    return (
      <div className={`space-y-3 ${className}`}>
        <h3 className="text-neutral-11 dark:text-neutral-dark-11 flex items-center gap-1.5 text-sm font-semibold tracking-wider uppercase">
          <ScrollText className="h-3.5 w-3.5" />
          {title}
          <LoadingSpinner size="sm" ariaLabel={loadingLabel} className="ml-1" />
        </h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`space-y-3 ${className}`}>
        <h3 className="text-neutral-11 dark:text-neutral-dark-11 flex items-center gap-1.5 text-sm font-semibold tracking-wider uppercase">
          <ScrollText className="h-3.5 w-3.5" />
          {title}
        </h3>
        <p className="text-xs text-red-500">{error}</p>
      </div>
    );
  }

  if (verses.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <h3 className="text-neutral-11 dark:text-neutral-dark-11 flex items-center gap-1.5 text-sm font-semibold tracking-wider uppercase">
        <ScrollText className="h-3.5 w-3.5" />
        {title} ({totalCount})
      </h3>
      <div className="space-y-4">
        {verses.map((verse, idx) => (
          <div key={idx} className="group">
            <div
              className={`text-neutral-10 dark:text-neutral-dark-10 mb-2 text-xs font-medium ${useKoreanFonts ? 'font-song-myung' : ''}`}
            >
              {verse.book} {verse.chapter}:{verse.verse}
            </div>
            <p
              className={`text-xs ${useKoreanFonts ? 'font-noto-serif-kr' : 'font-source-serif'} text-neutral-12 dark:text-neutral-dark-12 leading-relaxed`}
            >
              {renderTextSegments(verse.text)}
            </p>
          </div>
        ))}
      </div>
      {hasMore && (
        <button
          onClick={onShowMore}
          className="bg-neutral-3 hover:bg-neutral-4 dark:bg-neutral-dark-3 dark:hover:bg-neutral-dark-4 text-neutral-12 dark:text-neutral-dark-12 mt-4 inline-flex w-full items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all hover:shadow-sm"
        >
          {showMoreLabel}
        </button>
      )}
    </div>
  );
}
