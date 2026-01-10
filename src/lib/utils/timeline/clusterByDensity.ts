import type { TimelineEvent } from '@/lib/types/timeline';

export interface ClusterGroup {
  id: string;
  type: 'cluster';
  items: TimelineEvent[];
  startDate: number;
  endDate: number;
}

export interface ClusterOptions {
  thresholdYears?: number;
}

/**
 * Clusters events by date density for the vertical timeline view
 * Groups events that occur within a threshold number of years of each other
 *
 * @param events - Array of timeline events (must be sorted by startDate)
 * @param options - Clustering options
 * @returns Array of cluster groups
 */
export function clusterByDensity(
  events: TimelineEvent[],
  options: ClusterOptions = {}
): ClusterGroup[] {
  const { thresholdYears = 3 } = options;

  if (events.length === 0) {
    return [];
  }

  // Sort events by startDate (ascending) to ensure chronological order
  const sortedEvents = [...events].sort((a, b) => {
    const aDate = a.startDate ?? Number.MAX_SAFE_INTEGER;
    const bDate = b.startDate ?? Number.MAX_SAFE_INTEGER;
    return aDate - bDate;
  });

  const clusters: ClusterGroup[] = [];
  let currentCluster: TimelineEvent[] = [sortedEvents[0]];

  for (let i = 1; i < sortedEvents.length; i++) {
    const prevEvent = sortedEvents[i - 1];
    const currEvent = sortedEvents[i];

    const prevDate = prevEvent.startDate ?? Number.MAX_SAFE_INTEGER;
    const currDate = currEvent.startDate ?? Number.MAX_SAFE_INTEGER;

    // Check if current event is within threshold of previous event
    if (Math.abs(currDate - prevDate) <= thresholdYears) {
      currentCluster.push(currEvent);
    } else {
      // Finalize current cluster and start a new one
      clusters.push(createClusterGroup(currentCluster));
      currentCluster = [currEvent];
    }
  }

  // Add the last cluster
  if (currentCluster.length > 0) {
    clusters.push(createClusterGroup(currentCluster));
  }

  return clusters;
}

/**
 * Creates a cluster group from an array of events
 */
function createClusterGroup(events: TimelineEvent[]): ClusterGroup {
  const dates = events.map(e => e.startDate ?? Number.MAX_SAFE_INTEGER);
  const startDate = Math.min(...dates);
  const endDate = Math.max(...dates);

  return {
    id: `cluster-${events.map(e => e.id).join('-')}`,
    type: 'cluster',
    items: events,
    startDate,
    endDate,
  };
}

/**
 * Helper to format year for display (BC/AD)
 */
export function formatYear(year: number): string {
  if (year < 0) {
    return `${Math.abs(year)} BC`;
  }
  return `${year} AD`;
}
