'use client';

import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { PenLine } from 'lucide-react';
import { PERSON_AUTHORSHIP_CHIPS } from '@/lib/apollo/queriesPanel';
import { useUIConfig } from '@/lib/config/uiConfig';
import { TagList, type TagItem } from '@/components/shared/TagList';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface PersonAuthorshipChipsProps {
  slug: string;
}

export function PersonAuthorshipChips({ slug }: PersonAuthorshipChipsProps) {
  const config = useUIConfig();
  const { language, t } = useLanguage();

  const { data, loading } = useQuery(PERSON_AUTHORSHIP_CHIPS, {
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
          <PenLine className="h-3.5 w-3.5" />
          {t('authorship.title')}
          <LoadingSpinner size="sm" ariaLabel={t('entityPanel.loading')} className="ml-1" />
        </h3>
      </div>
    );
  }

  const person = (data as any)?.people?.[0];
  if (!person) return null;

  const totalCount = person.chaptersWrittenConnection?.totalCount ?? 0;
  if (totalCount === 0) return null;

  const items: TagItem[] =
    person.chaptersWrittenConnection?.edges?.map(({ node }: any) => {
      const book = node.book;
      const bookLabel = language === 'en' ? book.title : book.bookNameKr;
      const chapterLabel = `${bookLabel} ${node.chapterNum}`;

      return {
        label: chapterLabel,
        color: 'neutral' as const,
        entity: { kind: 'book' as const, id: book.slug },
      };
    }) ?? [];

  return (
    <div className="space-y-2">
      <h3 className="text-neutral-11 flex items-center gap-1.5 text-sm font-semibold tracking-wider uppercase">
        <PenLine className="h-3.5 w-3.5" />
        {t('authorship.title')} ({totalCount})
      </h3>
      <TagList items={items} />
    </div>
  );
}
