'use client';

import React, { useEffect, useRef, useState } from 'react';
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
 * Handles state (summary expansion), effects (body scroll lock, keyboard), and content orchestration.
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
  const summaryContainerRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();
  const [summaryExpanded, setSummaryExpanded] = useState(false);
  const [isSummaryOverflowing, setIsSummaryOverflowing] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSummaryExpanded(false);
  }, [entitySlug, entityType]);

  useEffect(() => {
    if (!summary || !summaryContainerRef.current) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsSummaryOverflowing(false);
      return;
    }

    const checkOverflow = () => {
      if (summaryContainerRef.current) {
        const isOverflowing =
          summaryContainerRef.current.scrollHeight > summaryContainerRef.current.clientHeight;
        setIsSummaryOverflowing(isOverflowing);
      }
    };

    checkOverflow();
    const timer = setTimeout(checkOverflow, 100);

    return () => clearTimeout(timer);
  }, [summary, language, summaryExpanded]);

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
          <div>
            <div className="relative">
              <div
                ref={summaryContainerRef}
                className={`relative overflow-hidden transition-all duration-200 ${
                  summaryExpanded ? 'max-h-none' : 'max-h-[180px]'
                }`}
              >
                <p className="text-neutral-11 dark:text-neutral-dark-11 text-xs leading-relaxed">
                  {summary}
                </p>
              </div>
              {!summaryExpanded && isSummaryOverflowing && (
                <div
                  className="summary-fade-gradient pointer-events-none absolute right-0 bottom-0 left-0 h-16"
                  aria-hidden="true"
                />
              )}
            </div>
            {!summaryExpanded && isSummaryOverflowing && (
              <div className="mt-2 flex justify-center">
                <button
                  type="button"
                  onClick={() => setSummaryExpanded(true)}
                  aria-expanded={summaryExpanded}
                  aria-controls="entity-summary"
                  className="bg-neutral-3 hover:bg-neutral-4 dark:bg-neutral-dark-3 dark:hover:bg-neutral-dark-4 rounded-md px-3 py-1.5 text-xs font-medium transition-all hover:shadow-sm"
                >
                  {t('entityPanel.showMore')}
                </button>
              </div>
            )}
          </div>
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
