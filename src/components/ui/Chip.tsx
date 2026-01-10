/**
 * @deprecated Use Badge component instead with mode="generic"
 * This component is kept for backward compatibility but will be removed in a future version.
 *
 * Migration:
 * - Chip({ label, color, size, count, interactive, onClick })
 * → Badge({ mode: "generic", type: color, label, size, count, interactive, onClick })
 */

'use client';

import React from 'react';

export type ChipColor = 'person' | 'place' | 'event' | 'neutral';
export type ChipSize = 'sm' | 'md';

export interface ChipProps {
  label: string;
  color?: ChipColor;
  size?: ChipSize;
  count?: number;
  interactive?: boolean;
  onClick?: () => void;
  className?: string;
}

const colorStyles: Record<ChipColor, string> = {
  person:
    'bg-accent-person-bg dark:bg-accent-person-dark-bg text-accent-person-text dark:text-accent-person-dark-text border border-accent-person-border dark:border-accent-person-dark-border',
  place:
    'bg-accent-place-bg dark:bg-accent-place-dark-bg text-accent-place-text dark:text-accent-place-dark-text border border-accent-place-border dark:border-accent-place-dark-border',
  event:
    'bg-accent-event-bg dark:bg-accent-event-dark-bg text-accent-event-text dark:text-accent-event-dark-text border border-accent-event-border dark:border-accent-event-dark-border',
  neutral:
    'bg-neutral-3 dark:bg-neutral-dark-3 text-neutral-12 dark:text-neutral-dark-12 border border-neutral-6 dark:border-neutral-dark-6',
};

const sizeStyles: Record<ChipSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
};

export function Chip({
  label,
  color = 'neutral',
  size = 'sm',
  count,
  interactive = false,
  onClick,
  className = '',
}: ChipProps) {
  const baseStyles =
    'inline-flex items-center gap-1.5 rounded-md font-medium transition-all duration-200';
  const interactiveStyles = interactive
    ? 'cursor-pointer hover:scale-105 hover:shadow-sm active:scale-95'
    : '';

  const Component = interactive && onClick ? 'button' : 'span';

  const componentProps =
    interactive && onClick
      ? {
          type: 'button' as const,
          onClick,
        }
      : {};

  return (
    <Component
      className={`${baseStyles} ${sizeStyles[size]} ${colorStyles[color]} ${interactiveStyles} ${className}`}
      {...componentProps}
    >
      <span>{label}</span>
      {count !== undefined && (
        <span className="rounded bg-white/20 px-1.5 py-0.5 text-[10px] font-semibold dark:bg-black/20">
          {count}
        </span>
      )}
    </Component>
  );
}
