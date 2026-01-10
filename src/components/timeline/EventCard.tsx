import Link from 'next/link';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { Badge } from '@/components/ui/Badge';
import type { TimelineEvent } from '@/lib/types/timeline';
import { formatYear } from '@/lib/utils/timeline/clusterByDensity';

interface EventCardProps {
  event: TimelineEvent;
  side: 'left' | 'right';
}

export default function EventCard({ event, side }: EventCardProps) {
  const { language } = useLanguage();

  const verseExcerpt = event.verses?.[0];
  const excerpt =
    language === 'ko'
      ? verseExcerpt?.chapter?.book?.bookNameKr
      : verseExcerpt?.chapter?.book?.shortName;

  const linkHref =
    verseExcerpt?.chapter?.book?.slug && verseExcerpt?.chapter?.chapterNum
      ? `/read/${verseExcerpt.chapter.book.slug}/${verseExcerpt.chapter.chapterNum}`
      : null;

  return (
    <article
      className={`relative rounded-xl border border-neutral-200 bg-white/70 p-4 backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/70 ${
        side === 'left' ? 'md:mr-10' : 'md:ml-10'
      }`}
    >
      <header className="mb-2 flex items-center gap-3">
        {event.startDate != null && (
          <span className="rounded-full border border-neutral-200 bg-white px-2 py-0.5 font-mono text-xs font-semibold text-neutral-600 dark:border-neutral-800 dark:bg-neutral-950">
            {formatYear(event.startDate)}
          </span>
        )}
        <h3 className="text-lg font-semibold">{event.title}</h3>
      </header>

      {excerpt && linkHref && (
        <Link
          href={linkHref}
          className="mb-3 block text-sm text-neutral-700 hover:underline dark:text-neutral-300"
        >
          {excerpt}
        </Link>
      )}

      <footer className="mt-3 flex flex-wrap gap-2">
        {event.participants?.slice(0, 3).map(p => (
          <Link key={p.slug} href={`/person/${p.slug}`}>
            <Badge type="person" label={p.name} size="sm" interactive />
          </Link>
        ))}
        {event.occurredIn?.slice(0, 2).map(pl => (
          <Link key={pl.slug} href={`/place/${pl.slug}`}>
            <Badge type="place" label={pl.name} size="sm" interactive />
          </Link>
        ))}
      </footer>
    </article>
  );
}
