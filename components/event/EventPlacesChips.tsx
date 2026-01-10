'use client';

import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { MapPin } from 'lucide-react';
import { EVENT_PLACES_CHIPS } from '@/lib/apollo/queriesPanel';
import { useUIConfig } from '@/lib/config/uiConfig';
import { TagList, type TagItem } from '@/components/shared/TagList';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface EventPlacesChipsProps {
  id: string;
}

export function EventPlacesChips({ id }: EventPlacesChipsProps) {
  const config = useUIConfig();
  const { t } = useLanguage();

  const { data, loading } = useQuery(EVENT_PLACES_CHIPS, {
    variables: {
      id,
      first: config.pageSizes.relations,
    },
    skip: !id,
    fetchPolicy: 'cache-first',
  });

  if (loading) {
    return (
      <div className="space-y-2">
        <h3 className="text-neutral-11 flex items-center gap-1.5 text-sm font-semibold tracking-wider uppercase">
          <MapPin className="h-3.5 w-3.5" />
          {t('place.location')}
          <LoadingSpinner size="sm" ariaLabel={t('entityPanel.loading')} className="ml-1" />
        </h3>
      </div>
    );
  }

  const event = (data as any)?.events?.[0];
  if (!event) return null;

  const totalCount = event.occurredInConnection?.totalCount ?? 0;
  if (totalCount === 0) return null;

  const items: TagItem[] =
    event.occurredInConnection?.edges?.map(({ node }: any) => ({
      label: node.name,
      color: 'place' as const,
      entity: { kind: 'place' as const, id: node.slug },
    })) ?? [];

  return (
    <div className="space-y-2">
      <h3 className="text-neutral-11 flex items-center gap-1.5 text-sm font-semibold tracking-wider uppercase">
        <MapPin className="h-3.5 w-3.5" />
        {t('place.location')} ({totalCount})
      </h3>
      <TagList items={items} />
    </div>
  );
}
