'use client';

import React, { useState } from 'react';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { EntityType } from '@/lib/utils/parseEntityMentions';
import { PERSON_VERSES_QUERY, PLACE_VERSES_QUERY, EVENT_VERSES_QUERY } from '@/lib/apollo/queries';
import { RelatedVersesView } from './RelatedVersesView';

interface RelatedVersesProps {
  entityType: EntityType;
  identifier: {
    slug?: string;
    id?: string;
  };
  pageSize?: number;
  className?: string;
}

/**
 * RelatedVerses - Container component for fetching and displaying related verses
 *
 * This is the Container in the Container/View pattern.
 * Handles data fetching, Apollo queries, state management, and language logic.
 * Delegates pure presentation to RelatedVersesView.
 */
export function RelatedVerses({
  entityType,
  identifier,
  pageSize = 10,
  className = '',
}: RelatedVersesProps) {
  const { language, t } = useLanguage();
  const [displayCount, setDisplayCount] = useState(pageSize);

  const queryMap = {
    person: PERSON_VERSES_QUERY,
    place: PLACE_VERSES_QUERY,
    event: EVENT_VERSES_QUERY,
  };

  const variablesMap = {
    person: { slug: identifier.slug, first: 500, after: null },
    place: { slug: identifier.slug, first: 500, after: null },
    event: { id: identifier.id, first: 500, after: null },
  };

  const { data, loading, error } = useQuery(queryMap[entityType], {
    variables: variablesMap[entityType],
    skip: !identifier.slug && !identifier.id,
    fetchPolicy: 'cache-first',
  });

  const handleShowMore = () => {
    setDisplayCount(prev => prev + pageSize);
  };

  if (loading && !data) {
    return (
      <RelatedVersesView
        verses={[]}
        totalCount={0}
        hasMore={false}
        onShowMore={handleShowMore}
        loading={true}
        title={t('entityPanel.relatedVerses')}
        showMoreLabel={t('entityPanel.showMore')}
        loadingLabel={t('entityPanel.loading')}
        useKoreanFonts={language === 'ko'}
        className={className}
      />
    );
  }

  if (error) {
    return (
      <RelatedVersesView
        verses={[]}
        totalCount={0}
        hasMore={false}
        onShowMore={handleShowMore}
        error={`Error loading verses: ${error.message}`}
        title={t('entityPanel.relatedVerses')}
        showMoreLabel={t('entityPanel.showMore')}
        loadingLabel={t('entityPanel.loading')}
        useKoreanFonts={language === 'ko'}
        className={className}
      />
    );
  }

  const entityKey =
    entityType === 'person' ? 'people' : entityType === 'place' ? 'places' : 'events';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const connectionData = (data as any)?.[entityKey]?.[0]?.versesConnection;

  if (!connectionData || connectionData.edges.length === 0) {
    return null;
  }

  const allVerses = connectionData.edges
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((edge: any) => {
      const verse = edge.node;
      return {
        book:
          language === 'ko'
            ? verse.chapter?.book?.bookNameKr || verse.chapter?.book?.title || 'Unknown'
            : verse.chapter?.book?.title || 'Unknown',
        bookOrder: verse.chapter?.book?.bookOrder ?? 999,
        chapter: verse.chapter?.chapterNum || 0,
        verse: verse.verseNum,
        text:
          language === 'ko'
            ? verse.mdTextKr || verse.mdText || verse.verseText || ''
            : verse.mdText || verse.verseText || '',
      };
    })
    .sort(
      (
        a: { bookOrder: number; chapter: number; verse: number },
        b: { bookOrder: number; chapter: number; verse: number }
      ) => {
        if (a.bookOrder !== b.bookOrder) return a.bookOrder - b.bookOrder;
        if (a.chapter !== b.chapter) return a.chapter - b.chapter;
        return a.verse - b.verse;
      }
    );

  const verses = allVerses.slice(0, displayCount);
  const hasMore = displayCount < allVerses.length;

  return (
    <RelatedVersesView
      verses={verses}
      totalCount={connectionData.totalCount}
      hasMore={hasMore}
      onShowMore={handleShowMore}
      title={t('entityPanel.relatedVerses')}
      showMoreLabel={t('entityPanel.showMore')}
      loadingLabel={t('entityPanel.loading')}
      useKoreanFonts={language === 'ko'}
      className={className}
    />
  );
}
