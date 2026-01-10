import { getClient } from '@/lib/apollo/client';
import { GET_ALL_TIMELINE_EVENTS } from '@/lib/apollo/queries';
import TimelineView from '@/components/timeline/TimelineView';
import type { TimelineEvent } from '@/lib/types/timeline';
import { classifyEventEra } from '@/lib/utils/eraClassifier';
import { extractYearFromDateString } from '@/lib/utils/dateHelpers';

export default async function TimelinePage() {
  const client = getClient();

  let events: TimelineEvent[] = [];

  try {
    const { data } = await client.query<{ events: any[] }>({
      query: GET_ALL_TIMELINE_EVENTS,
    });

    events = (data?.events || [])
      .map((event: any) => ({
        id: event.id,
        title: event.title,
        startDate: extractYearFromDateString(event.startDate),
        duration: event.duration,
        sortKey: event.sortKey,
        era: classifyEventEra(event),
        participants: event.participants || [],
        occurredIn: event.occurredIn || [],
        verses: event.verses || [],
        precedes: event.precedes || [],
        follows: event.follows || [],
      }))
      .sort((a: any, b: any) => (a.sortKey || '').localeCompare(b.sortKey || ''));
  } catch (error) {
    console.error('Error fetching timeline events:', error);
  }

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950">
      <TimelineView initialEvents={events} />
    </main>
  );
}

export async function generateMetadata() {
  return {
    title: 'Biblical Timeline - in the vine',
    description:
      'Explore the chronological sequence of biblical events in a vertical timeline view with eras, people, and places.',
  };
}
