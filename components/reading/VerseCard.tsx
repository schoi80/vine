'use client';

import { Language } from '@/lib/constants/translations';
import { EntityType } from '@/lib/utils/parseEntityMentions';
import { useState, memo } from 'react';
import { useEntityPanel } from '@/lib/contexts/EntityPanelContext';
import { VerseCardView } from './VerseCardView';

interface VerseCardProps {
  verse: {
    id: string;
    verseNum: number;
    verseText: string;
    mdText: string;
    mdTextKr: string;
    mentionsPeople: Array<{
      id: string;
      slug: string;
      name: string;
      title?: string;
      gender?: string;
    }>;
    mentionsPlaces: Array<{
      id: string;
      slug: string;
      name: string;
      latitude?: number;
      longitude?: number;
      featureType?: string;
    }>;
    describesEvents: Array<{
      id: string;
      title: string;
      startDate?: number;
    }>;
  };
  language: Language;
  showDualLanguage?: boolean;
  compact?: boolean;
  className?: string;
  isSelected?: boolean;
}

/**
 * VerseCard - Container component for displaying a verse with interactive entity mentions
 *
 * This is the Container in the Container/View pattern.
 * Handles state management (hover), context (entity panel), and data transformation.
 * Delegates pure presentation to VerseCardView.
 */
const VerseCard = memo(function VerseCard({
  verse,
  language,
  showDualLanguage = false,
  compact = false,
  className = '',
  isSelected = false,
}: VerseCardProps) {
  const [hoveredEntity, setHoveredEntity] = useState<string | null>(null);
  const { open } = useEntityPanel();

  const text =
    language === 'en' ? verse.mdText || verse.verseText : verse.mdTextKr || verse.verseText;

  const secondaryText = showDualLanguage
    ? language === 'en'
      ? verse.mdTextKr || verse.verseText
      : verse.mdText || verse.verseText
    : undefined;

  const entities = [
    ...verse.mentionsPeople.map(p => ({
      type: 'person' as EntityType,
      slug: p.slug,
      label: p.name,
    })),
    ...verse.mentionsPlaces.map(p => ({
      type: 'place' as EntityType,
      slug: p.slug,
      label: p.name,
    })),
    ...verse.describesEvents.map(e => ({
      type: 'event' as EntityType,
      slug: e.id,
      label: e.title,
    })),
  ];

  const handleEntityClick = (type: EntityType, slug: string) => {
    open(type, slug);
  };

  return (
    <VerseCardView
      verseNum={verse.verseNum}
      text={text}
      secondaryText={secondaryText}
      entities={entities}
      language={language}
      showDualLanguage={showDualLanguage}
      compact={compact}
      isSelected={isSelected}
      onEntityClick={handleEntityClick}
      onEntityHover={setHoveredEntity}
      hoveredEntity={hoveredEntity}
      className={className}
    />
  );
});

export default VerseCard;
