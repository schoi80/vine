'use client';

import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { Link } from 'lucide-react';
import { EVENT_VERSES_QUERY } from '@/lib/apollo/queries';
import { CoMentionTagList } from '@/components/shared/CoMentionTagList';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { topCoMentionsFromRelations } from '@/lib/aggregations/coMentions';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface EventCoMentionsProps {
  id: string;
}

export function EventCoMentions({ id }: EventCoMentionsProps) {
  const { t } = useLanguage();

  const { data, loading } = useQuery(EVENT_VERSES_QUERY, {
    variables: {
      id,
      first: 500,
    },
    skip: !id,
    fetchPolicy: 'cache-first',
  });

  if (loading) {
    return (
      <div className="space-y-2">
        <h3 className="text-neutral-11 flex items-center gap-1.5 text-sm font-semibold tracking-wider uppercase">
          <Link className="h-3.5 w-3.5" />
          {t('coMentions.title')}
          <LoadingSpinner size="sm" ariaLabel={t('entityPanel.loading')} className="ml-1" />
        </h3>
      </div>
    );
  }

  const verses = (data as any)?.events?.[0]?.versesConnection?.edges?.map((e: any) => e.node) ?? [];
  if (verses.length === 0) return null;

  const coMentions = topCoMentionsFromRelations(verses, { type: 'event', id }, 20);

  const peopleItems = coMentions.people.map(({ slug: coSlug, displayText, count }) => ({
    type: 'person' as const,
    slug: coSlug,
    label: displayText,
    frequency: count,
  }));

  const placeItems = coMentions.places.map(({ slug: coSlug, displayText, count }) => ({
    type: 'place' as const,
    slug: coSlug,
    label: displayText,
    frequency: count,
  }));

  const eventItems = coMentions.events.map(({ slug: eventId, displayText, count }) => ({
    type: 'event' as const,
    slug: eventId,
    label: displayText,
    frequency: count,
  }));

  if (peopleItems.length === 0 && placeItems.length === 0 && eventItems.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-neutral-11 flex items-center gap-1.5 text-sm font-semibold tracking-wider uppercase">
        <Link className="h-3.5 w-3.5" />
        {t('coMentions.title')}
      </h3>
      {peopleItems.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-neutral-10 text-sm font-medium">{t('coMentions.people')}</h4>
          <CoMentionTagList items={peopleItems} />
        </div>
      )}
      {placeItems.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-neutral-10 text-sm font-medium">{t('coMentions.places')}</h4>
          <CoMentionTagList items={placeItems} />
        </div>
      )}
      {eventItems.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-neutral-10 text-sm font-medium">{t('coMentions.events')}</h4>
          <CoMentionTagList items={eventItems} />
        </div>
      )}
    </div>
  );
}
