'use client';

import { TimelineEventBox } from './TimelineEventBox';
import type { ClusterGroup } from '@/lib/utils/timeline/clusterByDensity';
import { formatYear } from '@/lib/utils/timeline/clusterByDensity';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { getLocalizedTitle } from '@/lib/utils/bilingual';

interface EventClusterProps {
  group: ClusterGroup;
  index: number;
}

export default function EventCluster({ group, index }: EventClusterProps) {
  const { language } = useLanguage();
  const side: 'left' | 'right' = index % 2 === 0 ? 'left' : 'right';

  return (
    <div className="relative">
      <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2">
        {group.items.map(ev => (
          <div key={ev.id} className={side === 'left' ? 'md:col-start-1' : 'md:col-start-2'}>
            <TimelineEventBox
              id={ev.id}
              title={getLocalizedTitle(ev, language)}
              year={ev.startDate != null ? formatYear(ev.startDate) : ''}
              era={ev.era}
              side={side}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
