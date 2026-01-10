'use client';

import { useState, useMemo, useDeferredValue } from 'react';
import TimelineAxis from './TimelineAxis';
import FiltersBar from './FiltersBar';
import EraHeader from './EraHeader';
import EventCluster from './EventCluster';
import { clusterByDensity } from '@/lib/utils/timeline/clusterByDensity';
import type { TimelineEvent, EventEra } from '@/lib/types/timeline';
import { groupEventsByEra } from '@/lib/utils/eraClassifier';
import { EVENT_ERAS } from '@/lib/constants/eventEras';

interface TimelineViewProps {
  initialEvents: TimelineEvent[];
}

export default function TimelineView({ initialEvents }: TimelineViewProps) {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  const filtered = useMemo(() => {
    if (!deferredQuery) return initialEvents;
    const q = deferredQuery.toLowerCase();
    return initialEvents.filter(
      e =>
        e.title?.toLowerCase().includes(q) ||
        e.participants?.some(p => p.name?.toLowerCase().includes(q)) ||
        e.occurredIn?.some(pl => pl.name?.toLowerCase().includes(q))
    );
  }, [initialEvents, deferredQuery]);

  const groupedByEra = useMemo(() => {
    const grouped = groupEventsByEra(filtered);
    return Object.entries(grouped)
      .map(([era, items]) => ({
        era: era as EventEra,
        items: (items as TimelineEvent[]).sort((a, b) => {
          const aDate = a.startDate ?? Number.MAX_SAFE_INTEGER;
          const bDate = b.startDate ?? Number.MAX_SAFE_INTEGER;
          return aDate - bDate;
        }),
      }))
      .sort((a, b) => {
        const aOrder = EVENT_ERAS[a.era]?.sortOrder ?? 99;
        const bOrder = EVENT_ERAS[b.era]?.sortOrder ?? 99;
        return aOrder - bOrder;
      });
  }, [filtered]);

  return (
    <div className="relative mx-auto">
      <FiltersBar value={query} onChange={setQuery} />

      <div className="relative">
        <TimelineAxis />

        <div className="relative">
          {groupedByEra.map(({ era, items }, _eraIndex) => {
            const clusters = clusterByDensity(items, { thresholdYears: 3 });
            // const eraColor = EVENT_ERAS[era]?.color || '#9ca3af';
            // const rgbColor = hexToRgb(eraColor);
            // const nextEra = groupedByEra[eraIndex + 1]?.era;
            // const nextColor = nextEra ? EVENT_ERAS[nextEra]?.color : null;
            // const nextRgbColor = nextColor ? hexToRgb(nextColor) : null;

            return (
              <section
                key={era}
                id={`era-${era}`}
                className="relative"
                // style={{
                //   backgroundColor: `rgb(${rgbColor} / 0.3)`,
                //   backgroundImage: nextRgbColor
                //     ? `linear-gradient(to bottom, rgb(${rgbColor} / 0.3) 0%, rgb(${rgbColor} / 0.3) 70%, rgb(${nextRgbColor} / 0.3) 100%)`
                //     : undefined,
                // }}
              >
                <EraHeader era={era} />
                <div className="relative z-10 space-y-10">
                  {clusters.map((c, idx) => (
                    <EventCluster key={c.id} group={c} index={idx} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
