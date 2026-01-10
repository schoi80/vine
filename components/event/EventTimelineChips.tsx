'use client';

import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { EVENT_TIMELINE_CHIPS } from '@/lib/apollo/queriesPanel';
import { useUIConfig } from '@/lib/config/uiConfig';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { useEntityPanel } from '@/lib/contexts/EntityPanelContext';
import { EventTimelineChipsView } from './EventTimelineChipsView';

interface EventTimelineChipsProps {
  id: string;
}

/**
 * EventTimelineChips - Container component for event timeline relationships
 *
 * This is the Container in the Container/View pattern.
 * Handles data fetching, Apollo queries, and entity panel integration.
 * Delegates pure presentation to EventTimelineChipsView.
 */
export function EventTimelineChips({ id }: EventTimelineChipsProps) {
  const config = useUIConfig();
  const { t } = useLanguage();
  const { open } = useEntityPanel();

  const { data, loading } = useQuery(EVENT_TIMELINE_CHIPS, {
    variables: {
      id,
      first: config.pageSizes.events,
    },
    skip: !id,
    fetchPolicy: 'cache-first',
  });

  const handleItemClick = (eventId: string) => {
    open('event', eventId);
  };

  const event = (data as any)?.events?.[0];

  if (loading) {
    return (
      <EventTimelineChipsView
        beforeItems={[]}
        afterItems={[]}
        loading={true}
        title="Timeline"
        beforeLabel="Before"
        afterLabel="After"
        loadingLabel={t('entityPanel.loading')}
        onItemClick={handleItemClick}
      />
    );
  }

  if (!event) return null;

  const precedingEvents =
    event.precedesConnection?.edges?.map(({ node }: any) => ({
      type: 'event' as const,
      slug: node.id,
      label: node.title,
      frequency: 1,
    })) ?? [];

  const followingEvents =
    event.followsConnection?.edges?.map(({ node }: any) => ({
      type: 'event' as const,
      slug: node.id,
      label: node.title,
      frequency: 1,
    })) ?? [];

  return (
    <EventTimelineChipsView
      beforeItems={followingEvents}
      afterItems={precedingEvents}
      loading={false}
      title="Timeline"
      beforeLabel="Before"
      afterLabel="After"
      loadingLabel={t('entityPanel.loading')}
      onItemClick={handleItemClick}
    />
  );
}
