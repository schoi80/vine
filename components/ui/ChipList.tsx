'use client';

import React, { useState } from 'react';
import { Badge, type BadgeType } from './Badge';
import { Button } from './Button';

export interface ChipListItem {
  id: string;
  label: string;
  color?: BadgeType;
  frequency?: number;
  onClick?: () => void;
}

export interface ChipListProps {
  items: ChipListItem[];
  size?: 'sm' | 'md';
  interactive?: boolean;
  collapsible?: boolean;
  initialVisibleCount?: number;
  className?: string;
}

export function ChipList({
  items,
  size = 'sm',
  interactive = false,
  collapsible = false,
  initialVisibleCount = 10,
  className = '',
}: ChipListProps) {
  const [expanded, setExpanded] = useState(false);

  if (items.length === 0) return null;

  const shouldCollapse = collapsible && items.length > initialVisibleCount;
  const visibleItems = shouldCollapse && !expanded ? items.slice(0, initialVisibleCount) : items;
  const hiddenCount = items.length - initialVisibleCount;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex flex-wrap gap-2">
        {visibleItems.map(item => {
          const itemColor = item.color || 'neutral';
          const isEntityType =
            itemColor === 'person' ||
            itemColor === 'place' ||
            itemColor === 'event' ||
            itemColor === 'book';

          return (
            <Badge
              key={item.id}
              mode={isEntityType ? 'entity' : 'generic'}
              type={itemColor}
              variant="subtle"
              label={item.label}
              frequency={item.frequency}
              size={size}
              interactive={interactive}
              onClick={item.onClick}
            />
          );
        })}
      </div>

      {shouldCollapse && !expanded && (
        <Button variant="ghost" size="sm" onClick={() => setExpanded(true)} className="self-start">
          Show {hiddenCount} more
        </Button>
      )}

      {shouldCollapse && expanded && (
        <Button variant="ghost" size="sm" onClick={() => setExpanded(false)} className="self-start">
          Show less
        </Button>
      )}
    </div>
  );
}
