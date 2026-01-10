'use client';

import { createPortal } from 'react-dom';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Calendar, MapPin, Users, ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { useEntityPanel } from '@/lib/contexts/EntityPanelContext';
import { TimelineEvent } from '@/lib/types/timeline';
import { getEraConfig } from '@/lib/constants/eventEras';
import {
  parseBiblicalDate,
  parseDuration,
  formatBiblicalDate,
  formatDuration,
} from '@/lib/utils/dateHelpers';
import {
  getLocalizedTitle,
  getLocalizedValue,
  getLocalizedShortName,
} from '@/lib/utils/bilingual';

interface EventDetailPanelProps {
  event: TimelineEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onEventSelect?: (eventId: string) => void;
}

/**
 * Event Detail Panel Component
 * Slide-in drawer showing full event information
 * Includes participants, location, timeline context, and scripture references
 */
export default function EventDetailPanel({
  event,
  isOpen,
  onClose,
  onEventSelect,
}: EventDetailPanelProps) {
  const { language, t } = useLanguage();
  const { open } = useEntityPanel();

  if (!isOpen) return null;

  const eraConfig = event ? getEraConfig(event.era) : null;
  const date = event ? parseBiblicalDate(event.startDate) : null;
  const duration = event ? parseDuration(event.duration) : null;

  const content = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20"
            style={{ zIndex: 'var(--z-overlay, 1900)' }}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-lg overflow-y-auto bg-white shadow-2xl dark:bg-gray-100"
            style={{ zIndex: 'var(--z-drawer, 2000)' }}
          >
            <div className="p-6">
              {/* Close button - always visible */}
              <div className="mb-4 flex justify-end">
                <button
                  onClick={onClose}
                  className="hover:bg-hover rounded-lg p-2 transition-colors"
                  aria-label={t('timeline.closePanel')}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {!event ? (
                <div className="flex min-h-[400px] flex-col items-center justify-center">
                  <div className="text-center">
                    <div className="border-accent-event/20 border-t-accent-event mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4"></div>
                    <p className="text-text-secondary text-sm">{t('event.loading')}</p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div className="mb-6 flex items-start justify-between">
                    <div className="flex-1">
                      {eraConfig && (
                        <div className="mb-2 flex items-center gap-2">
                          <div
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: eraConfig.color }}
                          />
                          <span className="text-text-secondary text-xs font-medium">
                            {getLocalizedTitle(eraConfig, language)}
                          </span>
                        </div>
                      )}
                      <h2 className="text-text-primary mb-2 text-2xl font-bold">
                        {getLocalizedTitle(event, language)}
                      </h2>
                      {date && (
                        <div className="text-text-secondary flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4" />
                          <span>{formatBiblicalDate(date)}</span>
                          {duration && duration > 0 && (
                            <>
                              <span>•</span>
                              <span>{formatDuration(duration, language)}</span>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Participants */}
                  {event.participants && event.participants.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-text-secondary mb-3 flex items-center gap-2 text-sm font-semibold">
                        <Users className="h-4 w-4" />
                        {t('timeline.participants')}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {event.participants.map(person => (
                          <button
                            key={person.id}
                            onClick={() => open('person', person.slug)}
                            className="text-accent-person rounded-full bg-blue-50 px-3 py-1.5 text-sm transition-colors hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30"
                          >
                            {getLocalizedValue(person, 'name', person.name, language)}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Location */}
                  {event.occurredIn && event.occurredIn.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-text-secondary mb-3 flex items-center gap-2 text-sm font-semibold">
                        <MapPin className="h-4 w-4" />
                        {t('timeline.location')}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {event.occurredIn.map(place => (
                          <button
                            key={place.id}
                            onClick={() => open('place', place.slug)}
                            className="text-accent-place rounded-full bg-green-50 px-3 py-1.5 text-sm transition-colors hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30"
                          >
                            {getLocalizedValue(place, 'name', place.name, language)}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Related Events */}
                  {((event.precedes && event.precedes.length > 0) ||
                    (event.follows && event.follows.length > 0)) && (
                      <div className="mb-6">
                        <h3 className="text-text-secondary mb-3 text-sm font-semibold">
                          {t('timeline.relatedEvents')}
                        </h3>

                        {/* Events this follows (before this event) */}
                        {event.follows && event.follows.length > 0 && (
                          <div className="mb-3">
                            <div className="text-text-secondary mb-2 flex items-center gap-1 text-xs">
                              <ArrowLeft className="h-3 w-3" />
                              {t('timeline.follows')}
                            </div>
                            <div className="space-y-2">
                              {event.follows.map(relatedEvent => (
                                <button
                                  key={relatedEvent.id}
                                  onClick={() => onEventSelect?.(relatedEvent.id)}
                                  className="border-border hover:bg-hover w-full rounded-lg border px-3 py-2 text-left text-sm transition-colors"
                                >
                                  {getLocalizedTitle(relatedEvent, language)}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Events this precedes (after this event) */}
                        {event.precedes && event.precedes.length > 0 && (
                          <div>
                            <div className="text-text-secondary mb-2 flex items-center gap-1 text-xs">
                              <ArrowRight className="h-3 w-3" />
                              {t('timeline.precedes')}
                            </div>
                            <div className="space-y-2">
                              {event.precedes.map(relatedEvent => (
                                <button
                                  key={relatedEvent.id}
                                  onClick={() => onEventSelect?.(relatedEvent.id)}
                                  className="border-border hover:bg-hover w-full rounded-lg border px-3 py-2 text-left text-sm transition-colors"
                                >
                                  {getLocalizedTitle(relatedEvent, language)}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                  {/* Scripture References */}
                  {event.verses && event.verses.length > 0 && (
                    <div>
                      <h3 className="text-text-secondary mb-3 flex items-center gap-2 text-sm font-semibold">
                        <BookOpen className="h-4 w-4" />
                        {t('timeline.references')}
                      </h3>
                      <div className="space-y-3">
                        {event.verses.map((verse, index) => (
                          <Link
                            key={index}
                            href={`/read/${verse.chapter.book.slug}/${verse.chapter.chapterNum}`}
                            className="border-border hover:bg-hover block rounded-lg border p-3 transition-colors"
                          >
                            <p className="text-accent-event mb-1 text-xs font-medium">
                              {getLocalizedShortName(verse.chapter.book, language)}{' '}
                              {verse.chapter.chapterNum}:{verse.verseNum}
                            </p>
                            <p className="text-text-primary line-clamp-2 text-sm">
                              {getLocalizedValue(
                                verse,
                                'mdText',
                                verse.mdText || verse.verseText,
                                language
                              )}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(content, document.body);
}
