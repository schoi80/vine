'use client';

import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { Users } from 'lucide-react';
import { PLACE_PEOPLE_BORN_CHIPS, PLACE_PEOPLE_DIED_CHIPS } from '@/lib/apollo/queriesPanel';
import { useUIConfig } from '@/lib/config/uiConfig';
import { TagList, type TagItem } from '@/components/shared/TagList';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface PlacePeopleChipsProps {
  slug: string;
  type: 'born' | 'died';
}

export function PlacePeopleChips({ slug, type }: PlacePeopleChipsProps) {
  const config = useUIConfig();
  const { t } = useLanguage();

  const query = type === 'born' ? PLACE_PEOPLE_BORN_CHIPS : PLACE_PEOPLE_DIED_CHIPS;

  const { data, loading } = useQuery(query, {
    variables: {
      slug,
      first: config.pageSizes.relations,
    },
    skip: !slug,
    fetchPolicy: 'cache-first',
  });

  const title = type === 'born' ? t('peopleBorn.title') : t('peopleDied.title');

  if (loading) {
    return (
      <div className="space-y-2">
        <h3 className="text-neutral-11 flex items-center gap-1.5 text-sm font-semibold tracking-wider uppercase">
          <Users className="h-3.5 w-3.5" />
          {title}
          <LoadingSpinner size="sm" ariaLabel={t('entityPanel.loading')} className="ml-1" />
        </h3>
      </div>
    );
  }

  const place = (data as any)?.places?.[0];
  if (!place) return null;

  const connection = type === 'born' ? place.peopleBornConnection : place.peopleDiedConnection;
  const totalCount = connection?.totalCount ?? 0;
  if (totalCount === 0) return null;

  const items: TagItem[] =
    connection?.edges?.map(({ node }: any) => ({
      label: node.name,
      color: 'person' as const,
      entity: { kind: 'person' as const, id: node.slug },
    })) ?? [];

  return (
    <div className="space-y-2">
      <h3 className="text-neutral-11 flex items-center gap-1.5 text-sm font-semibold tracking-wider uppercase">
        <Users className="h-3.5 w-3.5" />
        {title} ({totalCount})
      </h3>
      <TagList items={items} />
    </div>
  );
}
