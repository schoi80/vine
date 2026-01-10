'use client';

import React from 'react';
import { useUIConfig } from '@/lib/config/uiConfig';
import { useEntityPanel } from '@/lib/contexts/EntityPanelContext';
import type { EntityType } from '@/lib/utils/parseEntityMentions';
import { ChipList, type ChipListItem } from '@/components/ui/ChipList';

type CoMentionItem = {
  type: Extract<EntityType, 'person' | 'place' | 'event'>;
  slug: string;
  label: string;
  frequency: number;
};

export function CoMentionTagList({ items }: { items: CoMentionItem[] }) {
  const { deepLinksEnabled } = useUIConfig();
  const { open } = useEntityPanel();

  if (!items || items.length === 0) return null;

  const chipItems: ChipListItem[] = items.map((item, index) => ({
    id: `${item.type}-${item.slug}-${index}`,
    label: item.label,
    color: item.type,
    frequency: item.frequency,
    onClick: deepLinksEnabled ? () => open(item.type, item.slug) : undefined,
  }));

  return <ChipList items={chipItems} interactive={deepLinksEnabled} />;
}
