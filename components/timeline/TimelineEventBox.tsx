'use client';

import React, { useMemo } from 'react';
import type { EventEra } from '@/lib/types/timeline';
import { getEraConfig } from '@/lib/constants/eventEras';
import { getContrastTextColor } from '@/lib/utils/colorHelpers';
import { useEntityPanel } from '@/lib/contexts/EntityPanelContext';

export interface TimelineEventBoxProps {
  id: string;
  title: string;
  year: string;
  era: EventEra;
  side: 'left' | 'right';
  compact?: boolean;
  hoverable?: boolean;
  className?: string;
}

export function TimelineEventBox({
  id,
  title,
  year,
  era,
  side,
  compact = true,
  hoverable = true,
  className = '',
}: TimelineEventBoxProps) {
  const { open } = useEntityPanel();
  const eraConfig = getEraConfig(era);
  const bgColor = eraConfig.color;
  const textColor = getContrastTextColor(bgColor);

  const yearPosition = side === 'left' ? 'right' : 'left';

  const gradientClass = useMemo(() => `gradient-${id.replace(/[^a-zA-Z0-9]/g, '')}`, [id]);

  const handleClick = () => {
    open('event', id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      open('event', id);
    }
  };

  return (
    <>
      <style>
        {`
          .${gradientClass} {
            background-image: linear-gradient(
              to right,
              ${bgColor} 0%,
              ${bgColor} 60%,
              transparent 100%
            );
          }
          @media (min-width: 640px) {
            .${gradientClass}.gradient-right {
              background-image: linear-gradient(
                to left,
                ${bgColor} 0%,
                ${bgColor} 60%,
                transparent 100%
              );
            }
          }
        `}
      </style>
      <button
        type="button"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-label={`Open details for ${title}`}
        className={`relative w-full px-3 transition-all motion-safe:duration-150 ${
          compact ? 'min-h-12 py-2' : 'min-h-16 py-3'
        } ${
          hoverable
            ? 'hover:shadow-2xl focus-visible:shadow-md focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:outline-none'
            : ''
        } ${gradientClass} ${yearPosition === 'right' ? 'gradient-right' : ''} ${className}`}
        style={{
          color: textColor,
        }}
      >
        <span
          className={`absolute top-2 left-3 text-[10px] font-semibold tracking-wide uppercase ${
            yearPosition === 'left' ? 'sm:right-auto sm:left-3' : 'sm:right-3 sm:left-auto'
          }`}
          style={{ color: textColor, opacity: 0.8 }}
        >
          {year}
        </span>

        <span
          className={`block pt-4 font-medium ${compact ? 'text-sm' : 'text-base'} text-left ${
            yearPosition === 'left' ? 'sm:text-left' : 'sm:text-right'
          }`}
          style={{ color: textColor }}
        >
          {title}
        </span>
      </button>
    </>
  );
}
