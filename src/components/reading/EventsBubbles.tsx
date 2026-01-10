'use client';

import { useState, useEffect } from 'react';
import { print } from 'graphql';
import { GET_EVENT_DETAIL } from '@/lib/apollo/queries';
import type { TimelineEvent } from '@/lib/types/timeline';
import { classifyEventEra } from '@/lib/utils/eraClassifier';
import EventDetailPanel from '@/components/visualizations/EventDetailPanel';

interface Event {
  id: string;
  title: string;
  startDate?: number;
}

interface EventsBubblesProps {
  verses: Array<{
    describesEvents?: Event[];
  }>;
}

export default function EventsBubbles({ verses }: EventsBubblesProps) {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  // Extract distinct events from all verses
  const eventMap = new Map<string, Event>();
  verses.forEach(verse => {
    verse.describesEvents?.forEach(event => {
      if (!eventMap.has(event.id)) {
        eventMap.set(event.id, event);
      }
    });
  });

  const distinctEvents = Array.from(eventMap.values());

  // Fetch full event details when one is selected
  useEffect(() => {
    if (!selectedEventId) {
      // Reset selected event when ID changes
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedEvent(null);
      return;
    }

    const graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL || '/api/graphql';

    const queryString = print(GET_EVENT_DETAIL);
    const eventId = selectedEventId; // Store in local variable for TypeScript

    let cancelled = false;

    const fetchEvent = async () => {
      try {
        const res = await fetch(graphqlUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: queryString,
            variables: { id: eventId },
          }),
        });

        if (!res.ok) {
          const errorMessage = `HTTP error! status: ${res.status}`;
          console.error(errorMessage);
          return;
        }

        const result = await res.json();

        if (cancelled) return;

        if (result.errors) {
          console.error('GraphQL errors:', result.errors);
          return;
        }

        const event = result.data?.events?.[0];
        if (event) {
          setSelectedEvent({
            id: event.id,
            title: event.title,
            startDate: event.startDate,
            duration: event.duration,
            sortKey: event.sortKey,
            era: classifyEventEra(event),
            participants: event.participants || [],
            occurredIn: event.occurredIn || [],
            verses: event.verses || [],
            precedes: event.precedes || [],
            follows: event.follows || [],
          });
        } else {
          console.warn('No event found for id:', eventId);
        }
      } catch (error) {
        if (cancelled) return;
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();

    return () => {
      cancelled = true;
    };
  }, [selectedEventId]);

  if (distinctEvents.length === 0) {
    return null;
  }

  return (
    <>
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {distinctEvents.map(event => (
            <button
              key={event.id}
              onClick={() => {
                console.log('Event bubble clicked:', event.id);
                setSelectedEventId(event.id);
              }}
              className="bg-accent-event/10 text-accent-event border-accent-event/20 hover:bg-accent-event/20 hover:border-accent-event/40 inline-flex cursor-pointer items-center rounded-full border px-3 py-1.5 text-sm font-medium transition-colors"
            >
              {event.title}
            </button>
          ))}
        </div>
      </div>

      {selectedEventId && (
        <EventDetailPanel
          event={selectedEvent}
          isOpen={selectedEventId !== null}
          onClose={() => {
            setSelectedEventId(null);
            setSelectedEvent(null);
          }}
          onEventSelect={eventId => setSelectedEventId(eventId)}
        />
      )}
    </>
  );
}
