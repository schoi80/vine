'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Badge } from '@/components/ui/Badge';
import { EntityType } from '@/lib/utils/parseEntityMentions';

interface EntityMention {
  type: EntityType;
  slug: string;
  label: string;
  labelKr?: string;
  verseRefs: Array<{ verseNum: number; verseId: string }>;
}

export interface MentionsBrowserProps {
  open: boolean;
  onClose: () => void;
  mentions: EntityMention[];
  onVerseClick?: (verseId: string) => void;
  onEntityClick?: (slug: string, type: EntityType) => void;
}

export function MentionsBrowser({
  open,
  onClose,
  mentions,
  onVerseClick,
  onEntityClick,
}: MentionsBrowserProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<EntityType | 'all'>('all');

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  const groupedMentions = useMemo(() => {
    const filtered = mentions.filter(m => {
      const matchesType = selectedType === 'all' || m.type === selectedType;
      const matchesSearch =
        !searchQuery ||
        m.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.labelKr?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });

    const groups = {
      person: [] as EntityMention[],
      place: [] as EntityMention[],
      event: [] as EntityMention[],
    };

    filtered.forEach(m => {
      groups[m.type].push(m);
    });

    Object.keys(groups).forEach(key => {
      groups[key as EntityType].sort((a, b) => b.verseRefs.length - a.verseRefs.length);
    });

    return groups;
  }, [mentions, searchQuery, selectedType]);

  const typeCounts = useMemo(() => {
    return {
      person: mentions.filter(m => m.type === 'person').length,
      place: mentions.filter(m => m.type === 'place').length,
      event: mentions.filter(m => m.type === 'event').length,
    };
  }, [mentions]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="z-overlay fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            role="presentation"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 300,
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mentions-browser-title"
            className="z-modal bg-neutral-1 dark:bg-neutral-dark-1 fixed inset-4 mx-auto flex max-w-4xl flex-col overflow-hidden rounded-lg shadow-lg md:inset-8"
          >
            <div className="border-neutral-6 dark:border-neutral-dark-6 flex flex-shrink-0 items-center justify-between border-b px-6 py-4">
              <h2
                id="mentions-browser-title"
                className="text-neutral-12 dark:text-neutral-dark-12 text-lg font-semibold"
              >
                All Mentions ({mentions.length})
              </h2>
              <Button variant="ghost" iconOnly size="sm" onClick={onClose} aria-label="Close">
                <Icon icon={X} size="sm" decorative />
              </Button>
            </div>

            <div className="border-neutral-4 dark:border-neutral-dark-4 flex-shrink-0 space-y-3 border-b px-6 py-4">
              <div className="relative">
                <Icon
                  icon={Search}
                  size="sm"
                  className="text-neutral-10 dark:text-neutral-dark-10 absolute top-1/2 left-3 -translate-y-1/2"
                  decorative
                />
                <input
                  type="text"
                  placeholder="Search entities..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="border-neutral-6 dark:border-neutral-dark-6 bg-neutral-1 dark:bg-neutral-dark-1 text-neutral-12 dark:text-neutral-dark-12 focus:ring-neutral-8 dark:focus:ring-neutral-dark-8 w-full rounded-md border py-2 pr-4 pl-10 text-sm focus:ring-2 focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedType === 'all' ? 'primary' : 'subtle'}
                  size="sm"
                  onClick={() => setSelectedType('all')}
                >
                  All ({mentions.length})
                </Button>
                <Badge
                  type="person"
                  label="People"
                  variant={selectedType === 'person' ? 'default' : 'subtle'}
                  interactive
                  frequency={typeCounts.person}
                  onClick={() => setSelectedType(selectedType === 'person' ? 'all' : 'person')}
                />
                <Badge
                  type="place"
                  label="Places"
                  variant={selectedType === 'place' ? 'default' : 'subtle'}
                  interactive
                  frequency={typeCounts.place}
                  onClick={() => setSelectedType(selectedType === 'place' ? 'all' : 'place')}
                />
                <Badge
                  type="event"
                  label="Events"
                  variant={selectedType === 'event' ? 'default' : 'subtle'}
                  interactive
                  frequency={typeCounts.event}
                  onClick={() => setSelectedType(selectedType === 'event' ? 'all' : 'event')}
                />
              </div>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto px-6 py-4">
              {(selectedType === 'all' || selectedType === 'person') &&
                groupedMentions.person.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-neutral-11 dark:text-neutral-dark-11 text-sm font-semibold tracking-wide uppercase">
                      People ({groupedMentions.person.length})
                    </h3>
                    <div className="space-y-2">
                      {groupedMentions.person.map(entity => (
                        <EntityRow
                          key={`${entity.type}-${entity.slug}`}
                          entity={entity}
                          onEntityClick={onEntityClick}
                          onVerseClick={onVerseClick}
                        />
                      ))}
                    </div>
                  </div>
                )}

              {(selectedType === 'all' || selectedType === 'place') &&
                groupedMentions.place.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-neutral-11 dark:text-neutral-dark-11 text-sm font-semibold tracking-wide uppercase">
                      Places ({groupedMentions.place.length})
                    </h3>
                    <div className="space-y-2">
                      {groupedMentions.place.map(entity => (
                        <EntityRow
                          key={`${entity.type}-${entity.slug}`}
                          entity={entity}
                          onEntityClick={onEntityClick}
                          onVerseClick={onVerseClick}
                        />
                      ))}
                    </div>
                  </div>
                )}

              {(selectedType === 'all' || selectedType === 'event') &&
                groupedMentions.event.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-neutral-11 dark:text-neutral-dark-11 text-sm font-semibold tracking-wide uppercase">
                      Events ({groupedMentions.event.length})
                    </h3>
                    <div className="space-y-2">
                      {groupedMentions.event.map(entity => (
                        <EntityRow
                          key={`${entity.type}-${entity.slug}`}
                          entity={entity}
                          onEntityClick={onEntityClick}
                          onVerseClick={onVerseClick}
                        />
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function EntityRow({
  entity,
  onEntityClick,
  onVerseClick,
}: {
  entity: EntityMention;
  onEntityClick?: (slug: string, type: EntityType) => void;
  onVerseClick?: (verseId: string) => void;
}) {
  return (
    <div className="bg-neutral-2 dark:bg-neutral-dark-2 hover:bg-neutral-3 dark:hover:bg-neutral-dark-3 rounded-md p-3 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <button
          onClick={() => onEntityClick?.(entity.slug, entity.type)}
          className="flex-1 text-left"
        >
          <div className="flex items-center gap-2">
            <Badge type={entity.type} label={entity.label} labelKr={entity.labelKr} size="sm" />
            <span className="text-neutral-10 dark:text-neutral-dark-10 text-xs">
              {entity.verseRefs.length} verse{entity.verseRefs.length !== 1 ? 's' : ''}
            </span>
          </div>
        </button>
        <div className="flex flex-wrap gap-1">
          {entity.verseRefs.slice(0, 10).map(ref => (
            <button
              key={ref.verseId}
              onClick={() => onVerseClick?.(ref.verseId)}
              className="bg-neutral-4 dark:bg-neutral-dark-4 text-neutral-11 dark:text-neutral-dark-11 hover:bg-neutral-5 dark:hover:bg-neutral-dark-5 font-feature-tnum rounded px-2 py-0.5 text-xs transition-colors"
            >
              {ref.verseNum}
            </button>
          ))}
          {entity.verseRefs.length > 10 && (
            <span className="text-neutral-10 dark:text-neutral-dark-10 px-2 py-0.5 text-xs">
              +{entity.verseRefs.length - 10}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
