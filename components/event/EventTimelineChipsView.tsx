import { Clock } from 'lucide-react';
import { ChipList } from '@/components/ui/ChipList';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface EventItem {
  type: 'event';
  slug: string;
  label: string;
  frequency?: number;
}

export interface EventTimelineChipsViewProps {
  beforeItems: EventItem[];
  afterItems: EventItem[];
  loading?: boolean;
  title: string;
  beforeLabel: string;
  afterLabel: string;
  loadingLabel: string;
  onItemClick?: (slug: string) => void;
}

export function EventTimelineChipsView({
  beforeItems,
  afterItems,
  loading = false,
  title,
  beforeLabel,
  afterLabel,
  loadingLabel,
  onItemClick,
}: EventTimelineChipsViewProps) {
  if (loading) {
    return (
      <div className="space-y-2">
        <h3 className="text-neutral-11 flex items-center gap-1.5 text-sm font-semibold tracking-wider uppercase">
          <Clock className="h-3.5 w-3.5" />
          {title}
          <LoadingSpinner size="sm" ariaLabel={loadingLabel} className="ml-1" />
        </h3>
      </div>
    );
  }

  const hasItems = beforeItems.length > 0 || afterItems.length > 0;
  if (!hasItems) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-neutral-11 flex items-center gap-1.5 text-sm font-semibold tracking-wider uppercase">
        <Clock className="h-3.5 w-3.5" />
        {title}
      </h3>

      {beforeItems.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-neutral-10 text-sm font-medium">{beforeLabel}</h4>
          <ChipList
            items={beforeItems.map(item => ({
              id: item.slug,
              label: item.label,
              color: 'event' as const,
              frequency: item.frequency,
              onClick: () => onItemClick?.(item.slug),
            }))}
            interactive
          />
        </div>
      )}

      {afterItems.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-neutral-10 text-sm font-medium">{afterLabel}</h4>
          <ChipList
            items={afterItems.map(item => ({
              id: item.slug,
              label: item.label,
              color: 'event' as const,
              frequency: item.frequency,
              onClick: () => onItemClick?.(item.slug),
            }))}
            interactive
          />
        </div>
      )}
    </div>
  );
}
