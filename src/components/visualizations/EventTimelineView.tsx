'use client';

import dynamic from 'next/dynamic';
import { useState, useMemo, useEffect, useRef } from 'react';
import { Calendar, Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TimelineEvent, TimelineFilters as TimelineFiltersType } from '@/lib/types/timeline';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { filterGraphData, buildGraphData } from '@/lib/utils/timelineLayout';
import { classifyEventEra } from '@/lib/utils/eraClassifier';
import EventDetailPanel from './EventDetailPanel';
import TimelineFilters from './TimelineFilters';

/**
 * Dynamically import EventTimeline component with SSR disabled
 * d3-force requires browser APIs and must be loaded client-side only
 */
const EventTimeline = dynamic(() => import('./EventTimeline'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full animate-pulse items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-100">
      <Calendar className="h-8 w-8 text-gray-400" />
    </div>
  ),
});

interface EventTimelineViewProps {
  events: TimelineEvent[];
  mode?: 'full' | 'inline';
  title?: string;
  initialFilters?: {
    personSlugs?: string[];
    placeSlugs?: string[];
  };
}

/**
 * Event Timeline View Wrapper
 * Provides collapsible UI, filters, and detail panel
 * Supports both full page mode and inline widget mode
 */
export default function EventTimelineView({
  events,
  mode = 'full',
  title,
  initialFilters = {},
}: EventTimelineViewProps) {
  const { t } = useLanguage();

  // State
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [filters, setFilters] = useState<TimelineFiltersType>({
    personSlugs: new Set(initialFilters.personSlugs || []),
    placeSlugs: new Set(initialFilters.placeSlugs || []),
    eras: new Set(),
    searchQuery: '',
  });

  // Mobile filter drawer state
  const [isFiltersOpen, setIsFiltersOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedState = sessionStorage.getItem('timelineFiltersOpen');
      return savedState === 'true';
    }
    return false;
  });
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Persist drawer state to sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('timelineFiltersOpen', String(isFiltersOpen));
    }
  }, [isFiltersOpen]);

  // Body scroll lock when drawer is open
  useEffect(() => {
    const original = document.body.style.overflow;
    if (isFiltersOpen && mode === 'full') document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [isFiltersOpen, mode]);

  // Focus management
  useEffect(() => {
    if (isFiltersOpen && mode === 'full') {
      const toFocus =
        panelRef.current?.querySelector<HTMLElement>(
          'button, [href], input, select, [tabindex]:not([tabindex="-1"])'
        ) || panelRef.current;
      toFocus?.focus();
    } else {
      triggerRef.current?.focus();
    }
  }, [isFiltersOpen, mode]);

  // Keyboard handling (Escape to close, Tab trap)
  useEffect(() => {
    if (!isFiltersOpen || mode !== 'full') return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsFiltersOpen(false);
        return;
      }
      if (e.key === 'Tab' && panelRef.current) {
        const focusables = Array.from(
          panelRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        ).filter(el => !el.hasAttribute('disabled'));
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;

        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isFiltersOpen, mode]);

  // Ensure all events have eras
  const eventsWithEra = useMemo(
    () =>
      events.map(event => ({
        ...event,
        era: event.era || classifyEventEra(event),
      })),
    [events]
  );

  // Apply filters
  const filteredEvents = useMemo(() => {
    const graphData = buildGraphData(eventsWithEra);
    const filtered = filterGraphData(graphData, filters);
    return filtered.nodes.map(node => node.event);
  }, [eventsWithEra, filters]);

  // Find selected event
  const selectedEvent = useMemo(
    () => filteredEvents.find(e => e.id === selectedEventId) || null,
    [filteredEvents, selectedEventId]
  );

  // Handle event selection
  const handleEventSelect = (eventId: string) => {
    setSelectedEventId(eventId);
  };

  const hasFilters =
    filters.personSlugs.size > 0 ||
    filters.placeSlugs.size > 0 ||
    filters.eras.size > 0 ||
    filters.searchQuery.length > 0;

  const activeFilterCount =
    filters.personSlugs.size +
    filters.placeSlugs.size +
    filters.eras.size +
    (filters.searchQuery.length > 0 ? 1 : 0);

  // Full page mode: Sidebar + Timeline + Detail Panel
  if (mode === 'full') {
    return (
      <>
        <div className="flex h-screen">
          <div className="border-border hidden w-80 overflow-y-auto border-r bg-white p-6 md:block dark:bg-gray-100">
            <TimelineFilters
              events={eventsWithEra}
              filters={filters}
              onFiltersChange={setFilters}
              mode="full"
            />

            <div className="border-border mt-6 border-t pt-6">
              <p className="text-text-secondary text-sm">
                {t('timeline.showing')
                  .replace('{count}', filteredEvents.length.toString())
                  .replace('{total}', events.length.toString())}
              </p>
            </div>
          </div>

          <div className="relative flex-1">
            <div className="absolute top-4 right-4 z-10 md:hidden">
              <button
                ref={triggerRef}
                onClick={() => setIsFiltersOpen(true)}
                className="bg-accent-event hover:bg-accent-event/90 flex items-center gap-2 rounded-lg px-4 py-2 font-semibold text-white shadow-lg transition-colors"
                aria-label={t('timeline.filters')}
                aria-expanded={isFiltersOpen}
              >
                <Filter className="h-4 w-4" aria-hidden="true" />
                <span>{t('timeline.filters')}</span>
                {activeFilterCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-purple-600">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>

            <EventTimeline
              events={filteredEvents}
              selectedEventId={selectedEventId}
              onEventSelect={handleEventSelect}
              width={1200}
              height={800}
            />
          </div>

          <EventDetailPanel
            event={selectedEvent}
            isOpen={selectedEventId !== null}
            onClose={() => setSelectedEventId(null)}
            onEventSelect={handleEventSelect}
          />
        </div>

        <AnimatePresence>
          {isFiltersOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="z-overlay fixed inset-0 bg-black/25 backdrop-blur-sm"
                role="presentation"
                onClick={() => setIsFiltersOpen(false)}
              />

              <motion.div
                ref={panelRef}
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{
                  type: 'spring',
                  damping: 30,
                  stiffness: 300,
                }}
                role="dialog"
                aria-modal="true"
                className="z-drawer fixed top-0 right-0 isolate h-full w-[80vw] max-w-[320px] overflow-y-auto bg-white shadow-xl outline-none dark:bg-neutral-900"
                tabIndex={-1}
              >
                <div className="border-neutral-6 dark:border-neutral-dark-6 flex items-center justify-between border-b p-4">
                  <span className="text-neutral-12 dark:text-neutral-dark-12 font-semibold">
                    {t('timeline.filters')}
                  </span>
                  <button
                    className="hover:bg-neutral-3 dark:hover:bg-neutral-dark-3 text-neutral-12 dark:text-neutral-dark-12 rounded-md p-2 transition-colors"
                    onClick={() => setIsFiltersOpen(false)}
                    aria-label={t('timeline.closePanel')}
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                <div className="p-4">
                  <TimelineFilters
                    events={eventsWithEra}
                    filters={filters}
                    onFiltersChange={setFilters}
                    mode="full"
                    hideHeader={true}
                  />

                  <div className="border-border mt-6 border-t pt-6">
                    <p className="text-text-secondary text-sm">
                      {t('timeline.showing')
                        .replace('{count}', filteredEvents.length.toString())
                        .replace('{total}', events.length.toString())}
                    </p>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Inline mode: Compact filters + smaller timeline
  return (
    <div className="mb-8">
      {/* Header */}
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="text-accent-event h-5 w-5" />
            <h2 className="text-text-primary text-xl font-bold">{title || t('timeline.title')}</h2>
            <span className="text-text-secondary text-sm">({filteredEvents.length})</span>
          </div>
        </div>

        {/* Compact filters */}
        {(hasFilters || initialFilters.personSlugs || initialFilters.placeSlugs) && (
          <TimelineFilters
            events={eventsWithEra}
            filters={filters}
            onFiltersChange={setFilters}
            mode="compact"
          />
        )}
      </div>

      {/* Timeline */}
      <div className="border-border overflow-hidden rounded-lg border" style={{ height: '500px' }}>
        {filteredEvents.length > 0 ? (
          <EventTimeline
            events={filteredEvents}
            selectedEventId={selectedEventId}
            onEventSelect={handleEventSelect}
            width={1000}
            height={500}
          />
        ) : (
          <div className="text-text-secondary flex h-full items-center justify-center">
            {t('timeline.noEvents')}
          </div>
        )}
      </div>

      {/* Detail Panel */}
      <EventDetailPanel
        event={selectedEvent}
        isOpen={selectedEventId !== null}
        onClose={() => setSelectedEventId(null)}
        onEventSelect={handleEventSelect}
      />
    </div>
  );
}
