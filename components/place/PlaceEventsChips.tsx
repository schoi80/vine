'use client';

import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { CalendarDays } from 'lucide-react';
import { PLACE_EVENTS_CHIPS } from '@/lib/apollo/queriesPanel';
import { useUIConfig } from '@/lib/config/uiConfig';
import { TagList, type TagItem } from '@/components/shared/TagList';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface PlaceEventsChipsProps {
  slug: string;
}

export function PlaceEventsChips({ slug }: PlaceEventsChipsProps) {
  const config = useUIConfig();
  const { t } = useLanguage();

  const { data, loading } = useQuery(PLACE_EVENTS_CHIPS, {
    variables: {
      slug,
      first: config.pageSizes.events,
    },
    skip: !slug,
    fetchPolicy: 'cache-first',
  });

  if (loading) {
    return (
      <div className="space-y-2">
        <h3 className="text-neutral-11 flex items-center gap-1.5 text-sm font-semibold tracking-wider uppercase">
          <CalendarDays className="h-3.5 w-3.5" />
          {t('place.eventsAtLocation')}
          <LoadingSpinner size="sm" ariaLabel={t('entityPanel.loading')} className="ml-1" />
        </h3>
      </div>
    );
  }

  const place = (data as any)?.places?.[0];
  if (!place) return null;

  const totalCount = place.eventsConnection?.totalCount ?? 0;
  if (totalCount === 0) return null;

  const items: TagItem[] =
    place.eventsConnection?.edges?.map(({ node }: any) => ({
      label: node.title,
      color: 'event' as const,
      entity: { kind: 'event' as const, id: node.id },
    })) ?? [];

  return (
    <div className="space-y-2">
      <h3 className="text-neutral-11 flex items-center gap-1.5 text-sm font-semibold tracking-wider uppercase">
        <CalendarDays className="h-3.5 w-3.5" />
        {t('place.eventsAtLocation')} ({totalCount})
      </h3>
      <TagList items={items} />
    </div>
  );
}
