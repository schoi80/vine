'use client';

import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { Calendar, Clock } from 'lucide-react';
import { EVENT_PLACES_CHIPS } from '@/lib/apollo/queriesPanel';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import {
  extractYearFromDateString,
  formatBiblicalDate,
  intToBiblicalDate,
} from '@/lib/utils/dateHelpers';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface EventKeyInfoProps {
  id: string;
}

export function EventKeyInfo({ id }: EventKeyInfoProps) {
  const { t } = useLanguage();

  const { data, loading } = useQuery(EVENT_PLACES_CHIPS, {
    variables: {
      id,
      first: 1,
    },
    skip: !id,
    fetchPolicy: 'cache-first',
  });

  if (loading) {
    return (
      <div className="space-y-2">
        <h3 className="text-neutral-11 dark:text-neutral-dark-11 flex items-center gap-1.5 text-sm font-semibold tracking-wider uppercase">
          <Calendar className="h-3.5 w-3.5" />
          {t('event.details')}
          <LoadingSpinner size="sm" ariaLabel={t('entityPanel.loading')} className="ml-1" />
        </h3>
      </div>
    );
  }

  const event = (data as any)?.events?.[0];
  if (!event) return null;

  const year = extractYearFromDateString(event.startDate);
  const biblicalDate = year !== undefined ? intToBiblicalDate(year) : null;
  const hasData = biblicalDate || event.duration;

  if (!hasData) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-neutral-11 dark:text-neutral-dark-11 flex items-center gap-1.5 text-sm font-semibold tracking-wider uppercase">
        <Calendar className="h-3.5 w-3.5" />
        {t('event.details')}
      </h3>
      <div className="bg-neutral-2 dark:bg-neutral-dark-2 rounded-lg px-4 py-3">
        <dl className="space-y-2 text-sm">
          {biblicalDate && (
            <div className="flex items-start justify-between gap-4">
              <dt className="text-neutral-11 dark:text-neutral-dark-11 flex items-center gap-1.5 font-medium">
                <Calendar className="h-3.5 w-3.5" />
                {t('event.date')}
              </dt>
              <dd className="text-neutral-12 dark:text-neutral-dark-12 text-right font-semibold">
                {formatBiblicalDate(biblicalDate)}
              </dd>
            </div>
          )}
          {event.duration && (
            <div className="flex items-start justify-between gap-4">
              <dt className="text-neutral-11 dark:text-neutral-dark-11 flex items-center gap-1.5 font-medium">
                <Clock className="h-3.5 w-3.5" />
                {t('event.duration')}
              </dt>
              <dd className="text-neutral-12 dark:text-neutral-dark-12 text-right">
                {event.duration}
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}
