'use client';

import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GitBranch } from 'lucide-react';
import { PERSON_FAMILY_CHIPS } from '@/lib/apollo/queriesPanel';
import { useUIConfig } from '@/lib/config/uiConfig';
import { TagList, type TagItem } from '@/components/shared/TagList';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface PersonRelationsChipsProps {
  slug: string;
}

export function PersonRelationsChips({ slug }: PersonRelationsChipsProps) {
  const config = useUIConfig();
  const { t } = useLanguage();

  const { data, loading } = useQuery(PERSON_FAMILY_CHIPS, {
    variables: {
      slug,
      first: config.pageSizes.relations,
    },
    skip: !slug,
    fetchPolicy: 'cache-first',
  });

  if (loading) {
    return (
      <div className="space-y-2">
        <h3 className="text-neutral-11 flex items-center gap-1.5 text-sm font-semibold tracking-wider uppercase">
          <GitBranch className="h-3.5 w-3.5" />
          {t('family.title')}
          <LoadingSpinner size="sm" ariaLabel={t('entityPanel.loading')} className="ml-1" />
        </h3>
      </div>
    );
  }

  const person = (data as any)?.people?.[0];
  if (!person) return null;

  const parents = person.parentsConnection?.edges?.map(({ node }: any) => node) ?? [];
  const children = person.childrenConnection?.edges?.map(({ node }: any) => node) ?? [];
  const partners = person.partnersConnection?.edges?.map(({ node }: any) => node) ?? [];

  if (parents.length === 0 && children.length === 0 && partners.length === 0) {
    return null;
  }

  const createPersonItem = (node: any): TagItem => ({
    label: node.name,
    color: 'person' as const,
    entity: { kind: 'person' as const, id: node.slug },
  });

  return (
    <div className="space-y-4">
      <h3 className="text-neutral-11 flex items-center gap-1.5 text-sm font-semibold tracking-wider uppercase">
        <GitBranch className="h-3.5 w-3.5" />
        {t('family.title')}
      </h3>

      {parents.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-neutral-10 text-sm font-medium">
            {t('family.parents')} ({person.parentsConnection.totalCount})
          </h4>
          <TagList items={parents.map(createPersonItem)} />
        </div>
      )}

      {partners.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-neutral-10 text-sm font-medium">
            {t('family.partners')} ({person.partnersConnection.totalCount})
          </h4>
          <TagList items={partners.map(createPersonItem)} />
        </div>
      )}

      {children.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-neutral-10 text-sm font-medium">
            {t('family.children')} ({person.childrenConnection.totalCount})
          </h4>
          <TagList items={children.map(createPersonItem)} />
        </div>
      )}
    </div>
  );
}
