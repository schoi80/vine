'use client';

import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { useRouter } from 'next/navigation';
import { BarChart3 } from 'lucide-react';
import { PLACE_VERSES_QUERY } from '@/lib/apollo/queries';
import { ChipList, type ChipListItem } from '@/components/ui/ChipList';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { useUIConfig } from '@/lib/config/uiConfig';
import { useEntityPanel } from '@/lib/contexts/EntityPanelContext';
import { groupByBook } from '@/lib/aggregations/distribution';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface PlaceDistributionProps {
  slug: string;
}

export function PlaceDistribution({ slug }: PlaceDistributionProps) {
  const { language, t } = useLanguage();
  const { deepLinksEnabled } = useUIConfig();
  const router = useRouter();
  const { close } = useEntityPanel();

  const { data, loading } = useQuery(PLACE_VERSES_QUERY, {
    variables: {
      slug,
      first: 500,
    },
    skip: !slug,
    fetchPolicy: 'cache-first',
  });

  if (loading) {
    return (
      <div className="space-y-2">
        <h3 className="text-neutral-11 flex items-center gap-1.5 text-sm font-semibold tracking-wider uppercase">
          <BarChart3 className="h-3.5 w-3.5" />
          {t('distribution.title')}
          <LoadingSpinner size="sm" ariaLabel={t('entityPanel.loading')} className="ml-1" />
        </h3>
      </div>
    );
  }

  const verses = (data as any)?.places?.[0]?.versesConnection?.edges?.map((e: any) => e.node) ?? [];
  if (verses.length === 0) return null;

  const distribution = groupByBook(verses, language);
  if (distribution.length === 0) return null;

  const items: ChipListItem[] = distribution.map(({ slug, label, count }) => ({
    id: slug,
    label,
    color: 'book',
    frequency: count,
    onClick: deepLinksEnabled
      ? () => {
          close();
          router.push(`/read/${slug}/1`);
        }
      : undefined,
  }));

  return (
    <div className="space-y-2">
      <h3 className="text-neutral-11 flex items-center gap-1.5 text-sm font-semibold tracking-wider uppercase">
        <BarChart3 className="h-3.5 w-3.5" />
        {t('distribution.title')}
      </h3>
      <ChipList items={items} interactive={deepLinksEnabled} />
    </div>
  );
}
