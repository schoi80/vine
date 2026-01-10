'use client';

import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { Users } from 'lucide-react';
import { PERSON_PARTICIPATION_CHIPS } from '@/lib/apollo/queriesPanel';
import { useUIConfig } from '@/lib/config/uiConfig';
import { TagList, type TagItem } from '@/components/shared/TagList';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface PersonParticipationChipsProps {
  slug: string;
}

export function PersonParticipationChips({ slug }: PersonParticipationChipsProps) {
  const config = useUIConfig();
  const { t } = useLanguage();

  const { data, loading } = useQuery(PERSON_PARTICIPATION_CHIPS, {
    variables: {
      slug,
      first: config.pageSizes.events,
    },
    skip: !slug,
    fetchPolicy: 'cache-first',
  });

  if (loading) {
    return (
      <div className="space-y-2">
        <h3 className="text-neutral-11 flex items-center gap-1.5 text-sm font-semibold tracking-wider uppercase">
          <Users className="h-3.5 w-3.5" />
          {t('participants.title')}
          <LoadingSpinner size="sm" ariaLabel={t('entityPanel.loading')} className="ml-1" />
        </h3>
      </div>
    );
  }

  const person = (data as any)?.people?.[0];
  if (!person) return null;

  const totalCount = person.participatedInConnection?.totalCount ?? 0;
  if (totalCount === 0) return null;

  const items: TagItem[] =
    person.participatedInConnection?.edges?.map(({ node }: any) => ({
      label: node.title,
      color: 'event' as const,
      entity: { kind: 'event' as const, id: node.id },
    })) ?? [];

  return (
    <div className="space-y-2">
      <h3 className="text-neutral-11 flex items-center gap-1.5 text-sm font-semibold tracking-wider uppercase">
        <Users className="h-3.5 w-3.5" />
        {t('participants.title')} ({totalCount})
      </h3>
      <TagList items={items} />
    </div>
  );
}
