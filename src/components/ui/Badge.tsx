import React from 'react';
import { motion } from 'framer-motion';
import { Tag } from 'lucide-react';
import { EntityIcon, EntityType } from './Icon';

export type BadgeType = EntityType | 'neutral';
export type BadgeMode = 'entity' | 'generic';

export interface BadgeProps {
  type: BadgeType;
  label: string;
  labelKr?: string;
  variant?: 'default' | 'subtle';
  size?: 'sm' | 'md';
  interactive?: boolean;
  frequency?: number;
  mode?: BadgeMode;
  showGenericIcon?: boolean;
  motion?: boolean;
  onClick?: () => void;
  className?: string;
}

const badgeVariants = {
  person: {
    default:
      'bg-accent-person-bg dark:bg-accent-person-dark-bg text-accent-person-text dark:text-accent-person-dark-text border border-accent-person-border dark:border-accent-person-dark-border',
    subtle:
      'text-accent-person dark:text-accent-person-dark hover:bg-accent-person-bg dark:hover:bg-accent-person-dark-bg',
  },
  place: {
    default:
      'bg-accent-place-bg dark:bg-accent-place-dark-bg text-accent-place-text dark:text-accent-place-dark-text border border-accent-place-border dark:border-accent-place-dark-border',
    subtle:
      'text-accent-place dark:text-accent-place-dark hover:bg-accent-place-bg dark:hover:bg-accent-place-dark-bg',
  },
  event: {
    default:
      'bg-accent-event-bg dark:bg-accent-event-dark-bg text-accent-event-text dark:text-accent-event-dark-text border border-accent-event-border dark:border-accent-event-dark-border',
    subtle:
      'text-accent-event dark:text-accent-event-dark hover:bg-accent-event-bg dark:hover:bg-accent-event-dark-bg',
  },
  book: {
    default:
      'bg-accent-book-bg dark:bg-accent-book-dark-bg text-accent-book-text dark:text-accent-book-dark-text border border-accent-book-border dark:border-accent-book-dark-border',
    subtle:
      'text-accent-book dark:text-accent-book-dark hover:bg-accent-book-bg dark:hover:bg-accent-book-dark-bg',
  },
  neutral: {
    default:
      'bg-neutral-3 dark:bg-neutral-dark-3 text-neutral-12 dark:text-neutral-dark-12 border border-neutral-6 dark:border-neutral-dark-6',
    subtle:
      'text-neutral-11 dark:text-neutral-dark-11 hover:bg-neutral-3 dark:hover:bg-neutral-dark-3',
  },
} as const;

const badgeSizes = {
  sm: 'h-6 px-1 text-xs gap-1',
  md: 'h-7 px-2 text-sm gap-1.5',
} as const;

export function Badge({
  type,
  label,
  labelKr,
  variant = 'default',
  size = 'sm',
  interactive = false,
  frequency,
  mode = 'entity',
  showGenericIcon = true,
  motion: useMotion = true,
  onClick,
  className = '',
}: BadgeProps) {
  const baseClasses = 'inline-flex items-center rounded-md font-medium transition-all duration-200';
  const variantClass = badgeVariants[type][variant];
  const sizeClass = badgeSizes[size];
  const interactiveClass = interactive
    ? `cursor-pointer hover:shadow-sm hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-ring-${type}`
    : '';

  let ariaLabel = `${mode === 'entity' ? type + ': ' : ''}${label}`;
  if (frequency && frequency > 1) {
    ariaLabel += `, appears ${frequency} times`;
  }

  const Component = useMotion
    ? interactive || onClick
      ? motion.button
      : motion.span
    : interactive || onClick
      ? 'button'
      : 'span';
  const motionProps =
    useMotion && interactive
      ? {
          whileHover: { scale: 1.05 },
          whileTap: { scale: 0.95 },
        }
      : {};

  return (
    <Component
      onClick={onClick}
      className={`${baseClasses} ${variantClass} ${sizeClass} ${interactiveClass} ${className}`}
      {...(interactive && {
        role: 'button',
        tabIndex: 0,
        'aria-label': ariaLabel,
      })}
      {...motionProps}
    >
      {mode === 'entity' && type !== 'neutral' && (
        <EntityIcon type={type as EntityType} size="xs" decorative />
      )}
      {mode === 'generic' && showGenericIcon && (
        <Tag size={14} strokeWidth={2} className="shrink-0" aria-hidden="true" />
      )}

      <span className="truncate">{label}</span>

      {labelKr && <span className="text-neutral-10 dark:text-neutral-dark-10 truncate">·</span>}
      {labelKr && <span className="truncate">{labelKr}</span>}

      {frequency && frequency > 1 && (
        <span className="font-feature-tnum ml-0.5 text-[10px] opacity-70">×{frequency}</span>
      )}
    </Component>
  );
}

export interface EntityTagListProps {
  entities: Array<{
    type: EntityType;
    slug: string;
    label: string;
    labelKr?: string;
    frequency?: number;
  }>;
  variant?: 'default' | 'subtle';
  maxVisible?: number;
  onEntityClick?: (slug: string, type: EntityType) => void;
  className?: string;
}

export function EntityTagList({
  entities,
  variant = 'subtle',
  maxVisible = 5,
  onEntityClick,
  className = '',
}: EntityTagListProps) {
  const [expanded, setExpanded] = React.useState(false);
  const visibleEntities = expanded ? entities : entities.slice(0, maxVisible);
  const hiddenCount = entities.length - maxVisible;

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {visibleEntities.map(entity => (
        <Badge
          key={`${entity.type}-${entity.slug}`}
          type={entity.type}
          label={entity.label}
          labelKr={entity.labelKr}
          variant={variant}
          interactive={!!onEntityClick}
          frequency={entity.frequency}
          onClick={() => onEntityClick?.(entity.slug, entity.type)}
        />
      ))}
      {!expanded && hiddenCount > 0 && (
        <button
          onClick={() => setExpanded(true)}
          className="text-neutral-10 dark:text-neutral-dark-10 hover:text-neutral-11 dark:hover:text-neutral-dark-11 h-6 px-2 text-xs transition-colors"
        >
          +{hiddenCount} more
        </button>
      )}
      {expanded && entities.length > maxVisible && (
        <button
          onClick={() => setExpanded(false)}
          className="text-neutral-10 dark:text-neutral-dark-10 hover:text-neutral-11 dark:hover:text-neutral-dark-11 h-6 px-2 text-xs transition-colors"
        >
          Show less
        </button>
      )}
    </div>
  );
}
