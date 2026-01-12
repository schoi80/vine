'use client';

import { Language } from '@/lib/constants/translations';
import { EntityType } from '@/lib/utils/parseEntityMentions';
import { useState, memo } from 'react';
import { useEntityPanel } from '@/lib/contexts/EntityPanelContext';
import { VerseCardView } from './VerseCardView';
import { getLocalizedValue, getLocalizedTitle } from '@/lib/utils/bilingual';

interface VerseCardProps {
  verse: any;
  language: Language;
  showDualLanguage?: boolean;
  compact?: boolean;
  className?: string;
  isSelected?: boolean;
}

/**
 * VerseCard - Container component for displaying a verse with interactive entity mentions
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

  const text = getLocalizedValue(verse, 'text', verse.text, language);

  const secondaryText = showDualLanguage
    ? getLocalizedValue(
      verse,
      'text',
      verse.text,
      language === 'en' ? 'ko' : 'en'
    )
    : undefined;

  const entities = [
    ...(verse.mentionsPeople || []).map((p: any) => ({
      type: 'person' as EntityType,
      slug: p.slug,
      label: p.name,
    })),
    ...(verse.mentionsPlaces || []).map((p: any) => ({
      type: 'place' as EntityType,
      slug: p.slug,
      label: p.name,
    })),
    ...(verse.describesEvents || []).map((e: any) => ({
      type: 'event' as EntityType,
      slug: e.id,
      label: getLocalizedTitle(e, language),
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
