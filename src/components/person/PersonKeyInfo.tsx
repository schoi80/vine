'use client';

import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { Info } from 'lucide-react';
import { PERSON_KEY_INFO } from '@/lib/apollo/queriesPanel';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { useEntityPanel } from '@/lib/contexts/EntityPanelContext';
import { useUIConfig } from '@/lib/config/uiConfig';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface PersonKeyInfoProps {
  slug: string;
}

export function PersonKeyInfo({ slug }: PersonKeyInfoProps) {
  const { t } = useLanguage();
  const { open } = useEntityPanel();
  const config = useUIConfig();

  const { data, loading } = useQuery(PERSON_KEY_INFO, {
    variables: { slug },
    skip: !slug,
    fetchPolicy: 'cache-first',
  });

  if (loading) {
    return (
      <div className="space-y-2">
        <h3 className="text-neutral-11 flex items-center gap-1.5 text-sm font-semibold tracking-wider uppercase">
          <Info className="h-3.5 w-3.5" />
          {t('keyInfo.title')}
          <LoadingSpinner size="sm" ariaLabel={t('entityPanel.loading')} className="ml-1" />
        </h3>
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const person = (data as any)?.people?.[0];
  if (!person) return null;

  const hasBirthPlace = person.bornInConnection?.edges?.length > 0;
  const hasDeathPlace = person.diedInConnection?.edges?.length > 0;
  const hasPeopleGroup = person.memberOfConnection?.edges?.length > 0;

  if (!hasBirthPlace && !hasDeathPlace && !hasPeopleGroup) return null;

  const birthPlace = hasBirthPlace ? person.bornInConnection.edges[0].node : null;
  const deathPlace = hasDeathPlace ? person.diedInConnection.edges[0].node : null;
  const peopleGroup = hasPeopleGroup ? person.memberOfConnection.edges[0].node : null;

  const handlePlaceClick = (placeSlug: string) => {
    if (config.deepLinksEnabled) {
      open('place', placeSlug);
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="text-neutral-11 flex items-center gap-1.5 text-sm font-semibold tracking-wider uppercase">
        <Info className="h-3.5 w-3.5" />
        {t('keyInfo.title')}
      </h3>
      <div className="space-y-1 text-sm">
        {birthPlace && (
          <div className="flex gap-2">
            <span className="text-neutral-11">{t('keyInfo.born')}:</span>
            <button
              onClick={() => handlePlaceClick(birthPlace.slug)}
              className="text-accent-place hover:underline"
              disabled={!config.deepLinksEnabled}
            >
              {birthPlace.name}
            </button>
          </div>
        )}
        {deathPlace && (
          <div className="flex gap-2">
            <span className="text-neutral-11">{t('keyInfo.died')}:</span>
            <button
              onClick={() => handlePlaceClick(deathPlace.slug)}
              className="text-accent-place hover:underline"
              disabled={!config.deepLinksEnabled}
            >
              {deathPlace.name}
            </button>
          </div>
        )}
        {peopleGroup && (
          <div className="flex gap-2">
            <span className="text-neutral-11">{t('keyInfo.memberOf')}:</span>
            <span className="text-neutral-12">{peopleGroup.name}</span>
          </div>
        )}
      </div>
    </div>
  );
}
