'use client';

import React from 'react';
import { useUIConfig } from '@/lib/config/uiConfig';
import { useEntityPanel } from '@/lib/contexts/EntityPanelContext';
import { EntityType } from '@/lib/utils/parseEntityMentions';
import { Badge } from '@/components/ui/Badge';

export type TagItem = {
  label: string;
  color?: 'person' | 'place' | 'event' | 'book';
  entity?: {
    kind: EntityType;
    id: string;
  };
};

export type TagListProps = {
  items: TagItem[];
  className?: string;
};

export function TagList({ items, className = '' }: TagListProps) {
  const config = useUIConfig();
  const panel = useEntityPanel();

  if (items.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((item, index) => {
        const color = item.color ?? 'event';
        const isClickable = config.deepLinksEnabled && item.entity;

        const handleClick = isClickable
          ? () => {
              if (item.entity) {
                panel.open(item.entity.kind, item.entity.id);
              }
            }
          : undefined;

        return (
          <Badge
            key={`${item.entity?.kind}-${item.entity?.id}-${index}`}
            mode="entity"
            type={color}
            label={item.label}
            interactive={!!isClickable}
            onClick={handleClick}
          />
        );
      })}
    </div>
  );
}
