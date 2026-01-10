/**
 * Entity Helpers
 * Utilities for formatting and displaying entity information
 */

import { EntityType } from './parseEntityMentions';
import { extractYearFromDateString, formatBiblicalDate, intToBiblicalDate } from './dateHelpers';

export interface EntityDisplayNameOptions {
  entityType: EntityType;
  entityName: string;
  entityNameKr?: string;
  startDate?: string | null;
  language?: 'en' | 'ko';
}

/**
 * Get the display name for an entity in the panel header
 * For events, includes the start year in parentheses
 *
 * @example
 * getEntityDisplayName({ entityType: 'event', entityName: 'Creation', startDate: '-004003-01-01' })
 * // Returns: "Creation (4003 BC)"
 *
 * getEntityDisplayName({ entityType: 'person', entityName: 'Abraham' })
 * // Returns: "Abraham"
 */
export function getEntityDisplayName(options: EntityDisplayNameOptions): string {
  const { entityType, entityName, startDate, language = 'en' } = options;

  if (entityType !== 'event' || !startDate) {
    return entityName;
  }

  const year = extractYearFromDateString(startDate);
  if (year === undefined) {
    return entityName;
  }

  const biblicalDate = intToBiblicalDate(year);
  if (!biblicalDate) {
    return entityName;
  }

  const formattedDate = formatBiblicalDate(biblicalDate, language);
  return `${entityName} (${formattedDate})`;
}
