'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { FileText, GitBranch } from 'lucide-react';
import { EntityType } from '@/lib/utils/parseEntityMentions';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { getEntityDisplayName } from '@/lib/utils/entityHelpers';
import { EntityPanelView } from './EntityPanelView';
import { RelatedVerses } from './RelatedVerses';
import { PlaceEventsChips } from '@/components/place/PlaceEventsChips';
import { PlacePeopleChips } from '@/components/place/PlacePeopleChips';
import { PlaceDistribution } from '@/components/place/PlaceDistribution';
import { PlaceCoMentions } from '@/components/place/PlaceCoMentions';
import { PersonKeyInfo } from '@/components/person/PersonKeyInfo';
import { PersonRelationsChips } from '@/components/person/PersonRelationsChips';
import { PersonParticipationChips } from '@/components/person/PersonParticipationChips';
import { PersonAuthorshipChips } from '@/components/person/PersonAuthorshipChips';
import { PersonDistribution } from '@/components/person/PersonDistribution';
import { PersonCoMentions } from '@/components/person/PersonCoMentions';
import { EventTimelineChips } from '@/components/event/EventTimelineChips';
import { EventDistribution } from '@/components/event/EventDistribution';
import { EventCoMentions } from '@/components/event/EventCoMentions';
import { ExpandableTextArea } from '@/components/ui/ExpandableTextArea';

const PlaceMap = dynamic(
  () => import('@/components/place/PlaceMap').then(mod => ({ default: mod.PlaceMap })),
  { ssr: false }
);

const PedigreeChartView = dynamic(() => import('@/components/visualizations/PedigreeChartView'), {
  ssr: false,
});

export interface EntityPanelProps {
  open: boolean;
  onClose: () => void;
  onExitComplete?: () => void;
  entityType: EntityType;
  entitySlug: string;
  entityName: string;
  entityNameKr?: string;
  summary?: string;
  latitude?: number;
  longitude?: number;
  startDate?: string;
  animationDuration?: number;
  animationStiffness?: number;
  animationDamping?: number;
  backdropClosable?: boolean;
}

/**
 * EntityPanel - Container component for entity detail drawer
 *
 * This is the Container in the Container/View pattern.
 * Handles state, effects (body scroll lock, keyboard), and content orchestration.
 * Delegates shell rendering to EntityPanelView.
 */
export function EntityPanel({
  open,
  onClose,
  onExitComplete,
  entityType,
  entitySlug,
  entityName,
  entityNameKr,
  summary,
  latitude,
  longitude,
  startDate,
  animationDuration,
  animationStiffness,
  animationDamping,
  backdropClosable,
}: EntityPanelProps) {
  const { t, language } = useLanguage();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  const displayName = getEntityDisplayName({ entityType, entityName, startDate, language });
  const fullName = entityNameKr ? `${displayName} (${entityNameKr})` : displayName;

  return (
    <EntityPanelView
      open={open}
      onClose={onClose}
      onExitComplete={onExitComplete}
      entityType={entityType}
      entityName={fullName}
      closeLabel={t('timeline.closePanel')}
      animationDuration={animationDuration}
      animationStiffness={animationStiffness}
      animationDamping={animationDamping}
      backdropClosable={backdropClosable}
    >
      {summary && (
        <div className="space-y-2">
          <h3 className="text-neutral-11 dark:text-neutral-dark-11 flex items-center gap-1.5 text-sm font-semibold tracking-wider uppercase">
            <FileText className="h-3.5 w-3.5" />
            {t('entityPanel.summary')}
          </h3>
          <ExpandableTextArea text={summary} maxHeight={180} />
        </div>
      )}

      {entityType === 'place' && (
        <>
          <PlaceMap name={entityName} latitude={latitude} longitude={longitude} />
          <PlaceEventsChips slug={entitySlug} />
          <PlacePeopleChips slug={entitySlug} type="born" />
          <PlacePeopleChips slug={entitySlug} type="died" />
          <PlaceDistribution slug={entitySlug} />
          <PlaceCoMentions slug={entitySlug} />
        </>
      )}

      {entityType === 'person' && (
        <>
          <PersonKeyInfo slug={entitySlug} />
          <div className="space-y-2">
            <h3 className="text-neutral-11 dark:text-neutral-dark-11 flex items-center gap-1.5 text-sm font-semibold tracking-wider uppercase">
              <GitBranch className="h-3.5 w-3.5" />
              {t('family.title')}
            </h3>
            <PedigreeChartView slug={entitySlug} />
          </div>
          <PersonRelationsChips slug={entitySlug} />
          <PersonParticipationChips slug={entitySlug} />
          <PersonAuthorshipChips slug={entitySlug} />
          <PersonDistribution slug={entitySlug} />
          <PersonCoMentions slug={entitySlug} />
        </>
      )}

      {entityType === 'event' && (
        <>
          <EventTimelineChips id={entitySlug} />
          <EventCoMentions id={entitySlug} />
          <EventDistribution id={entitySlug} />
        </>
      )}

      <RelatedVerses
        entityType={entityType}
        identifier={entityType === 'event' ? { id: entitySlug } : { slug: entitySlug }}
      />
    </EntityPanelView>
  );
}
