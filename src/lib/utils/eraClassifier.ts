import type { EventEra } from '../types/timeline';
import { classifyEventEra as classifyEra } from '../constants/eventEras';

interface ClassifiableEvent {
  sortKey?: string;
  startDate?: number;
  title?: string;
}

export function classifyEventEra(event: ClassifiableEvent): EventEra {
  return classifyEra(event);
}

export function classifyEventsByEra(events: ClassifiableEvent[]): Record<EventEra, number> {
  const counts: Record<string, number> = {};

  for (const event of events) {
    const era = classifyEventEra(event);
    counts[era] = (counts[era] || 0) + 1;
  }

  return counts as Record<EventEra, number>;
}

export function filterEventsByEra(
  events: ClassifiableEvent[],
  allowedEras: Set<EventEra>
): ClassifiableEvent[] {
  return events.filter(event => {
    const era = classifyEventEra(event);
    return allowedEras.has(era);
  });
}

export function groupEventsByEra(
  events: ClassifiableEvent[]
): Record<EventEra, ClassifiableEvent[]> {
  const groups: Record<string, ClassifiableEvent[]> = {};

  for (const event of events) {
    const era = classifyEventEra(event);
    if (!groups[era]) {
      groups[era] = [];
    }
    groups[era].push(event);
  }

  return groups as Record<EventEra, ClassifiableEvent[]>;
}
