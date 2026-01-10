import { parseEntityMentions, parseItalics, EntityType } from '@/lib/utils/parseEntityMentions';
import { Badge } from '@/components/ui/Badge';

interface Entity {
  type: EntityType;
  slug: string;
  label: string;
}

export interface VerseCardViewProps {
  verseNum: number;
  text: string;
  secondaryText?: string;
  entities: Entity[];
  language: 'en' | 'ko';
  showDualLanguage?: boolean;
  compact?: boolean;
  isSelected?: boolean;
  onEntityClick?: (type: EntityType, slug: string) => void;
  onEntityHover?: (entityKey: string | null) => void;
  hoveredEntity?: string | null;
  className?: string;
}

export function VerseCardView({
  verseNum,
  text,
  secondaryText,
  entities,
  language,
  showDualLanguage = false,
  compact = false,
  isSelected = false,
  onEntityClick,
  onEntityHover,
  hoveredEntity = null,
  className = '',
}: VerseCardViewProps) {
  const renderTextSegments = (textContent: string) => {
    const segments = parseEntityMentions(textContent);
    return segments.map((segment, index) => {
      if (segment.type === 'text') {
        const parts = parseItalics(segment.content);
        return (
          <span key={index}>
            {parts.map((part, partIndex) =>
              part.italic ? (
                <em key={partIndex}>{part.text}</em>
              ) : (
                <span key={partIndex}>{part.text}</span>
              )
            )}
          </span>
        );
      }

      const entity = segment.entity!;
      const entityKey = `${entity.type}-${entity.slug}`;
      const isHovered = hoveredEntity === entityKey;

      const colorClasses = {
        person: `text-accent-person dark:text-accent-person-dark border-1 ${
          isHovered
            ? 'border-accent-person dark:border-accent-person-dark bg-accent-person-bg dark:bg-accent-person-dark-bg'
            : 'border-accent-person/30 dark:border-accent-person-dark/30'
        }`,
        place: `text-accent-place dark:text-accent-place-dark border-1 ${
          isHovered
            ? 'border-accent-place dark:border-accent-place-dark bg-accent-place-bg dark:bg-accent-place-dark-bg'
            : 'border-accent-place/30 dark:border-accent-place-dark/30'
        }`,
        event: `text-accent-event dark:text-accent-event-dark border-1 ${
          isHovered
            ? 'border-accent-event dark:border-accent-event-dark bg-accent-event-bg dark:bg-accent-event-dark-bg'
            : 'border-accent-event/30 dark:border-accent-event-dark/30'
        }`,
      };

      const entityParts = parseItalics(entity.displayText);

      return (
        <button
          key={index}
          type="button"
          onClick={() => onEntityClick?.(entity.type, entity.slug)}
          className={`${colorClasses[entity.type]} duration-motion-quick cursor-pointer rounded-sm px-0.5 font-medium transition-all`}
          onMouseEnter={() => onEntityHover?.(entityKey)}
          onMouseLeave={() => onEntityHover?.(null)}
          aria-label={`Open details for ${entity.displayText}`}
        >
          {entityParts.map((part, partIndex) =>
            part.italic ? (
              <em key={partIndex}>{part.text}</em>
            ) : (
              <span key={partIndex}>{part.text}</span>
            )
          )}
        </button>
      );
    });
  };

  const hasEntities = entities.length > 0;

  return (
    <div
      className={`group ${compact ? 'py-2' : 'py-3'} ${isSelected ? 'bg-neutral-3 dark:bg-neutral-dark-3 -mx-2 rounded-md px-2' : ''} transition-colors`}
      role="article"
      aria-label={`Verse ${verseNum}`}
    >
      <div className="space-y-1">
        <div>
          <p
            className={` ${language === 'ko' ? 'text-verse-kr font-noto-serif-kr' : 'text-verse font-source-serif'} text-neutral-12 dark:text-neutral-dark-12 leading-relaxed ${className} `}
          >
            <sup className="text-neutral-9 dark:text-neutral-dark-9 mr-1 font-semibold select-none">
              {verseNum}
            </sup>
            {renderTextSegments(text)}
          </p>

          {showDualLanguage && secondaryText && (
            <p
              className={`${language === 'ko' ? 'font-source-serif' : 'text-verse-kr font-noto-serif-kr'} text-neutral-11 dark:text-neutral-dark-11 border-neutral-4 dark:border-neutral-dark-4 border-l-2 pl-4 leading-relaxed`}
              style={{ fontSize: '0.9375rem' }}
            >
              {renderTextSegments(secondaryText)}
            </p>
          )}
        </div>

        {hasEntities && !compact && (
          <div className="flex flex-wrap gap-2">
            {entities.slice(0, 5).map(entity => (
              <Badge
                key={`${entity.type}-${entity.slug}`}
                type={entity.type}
                label={entity.label}
                variant="subtle"
                size="sm"
                interactive
                onClick={() => onEntityClick?.(entity.type, entity.slug)}
              />
            ))}
            {entities.length > 5 && (
              <span className="text-neutral-10 dark:text-neutral-dark-10 px-2 py-1 text-xs">
                +{entities.length - 5} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
