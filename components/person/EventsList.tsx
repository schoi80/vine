'use client';

import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { print } from 'graphql';
import { GET_EVENT_DETAIL } from '@/lib/apollo/queries';
import type { TimelineEvent } from '@/lib/types/timeline';
import { classifyEventEra } from '@/lib/utils/eraClassifier';
import EventDetailPanel from '@/components/visualizations/EventDetailPanel';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { useEntityPanel } from '@/lib/contexts/EntityPanelContext';

interface Event {
  id: string;
  title: string;
  startDate?: number;
  duration?: string;
  sortKey?: string;
  occurredIn?: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  verses?: any[];
}

interface EventsListProps {
  events: Event[];
}

export default function EventsList({ events }: EventsListProps) {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const { t } = useLanguage();
  const { open } = useEntityPanel();

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

  if (events.length === 0) {
    return null;
  }

  return (
    <>
      <div className="mb-8">
        <h2 className="text-text-primary mb-4 text-2xl font-bold">{t('events.title')}</h2>
        <div className="space-y-3">
          {events.map(event => (
            <button
              key={event.id}
              onClick={() => setSelectedEventId(event.id)}
              className="border-border hover:bg-hover w-full rounded-lg border p-4 text-left transition-colors"
            >
              <div className="flex items-start gap-3">
                <Calendar className="text-accent-event mt-0.5 h-5 w-5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-text-primary mb-1 font-medium">{event.title}</h3>
                  {event.occurredIn && event.occurredIn.length > 0 && (
                    <p className="text-text-secondary mb-1 text-sm">
                      {t('events.location')}:{' '}
                      {event.occurredIn.map((place, index) => (
                        <span key={place.id}>
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              open('place', place.slug);
                            }}
                            className="text-accent-place hover:underline"
                          >
                            {place.name}
                          </button>
                          {index < event.occurredIn!.length - 1 && ', '}
                        </span>
                      ))}
                    </p>
                  )}
                  {event.verses && event.verses.length > 0 && (
                    <p className="text-text-secondary text-xs">
                      {event.verses.length}{' '}
                      {event.verses.length !== 1 ? t('events.verses') : t('events.verse')}{' '}
                      {event.verses.length !== 1 ? t('events.references') : t('events.reference')}
                    </p>
                  )}
                </div>
              </div>
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
