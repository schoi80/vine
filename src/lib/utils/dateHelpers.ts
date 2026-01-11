/**
 * Date Helpers for Biblical Timeline
 * Handles parsing and formatting of biblical dates (BC/AD)
 */

export interface BiblicalDate {
  year: number; // Negative for BC, positive for AD
  isApproximate: boolean;
  isRange: boolean;
  endYear?: number; // For date ranges
  original: string; // Original string representation
}

/**
 * Extracts the year as an integer from a Neo4j Date string
 * Neo4j Date format from GraphQL: 6-digit padded years (e.g., "-004003-01-01" for 4003 BC)
 *
 * @param dateString - ISO date string from GraphQL (e.g., "-004003-01-01", "000030-01-01")
 * @returns Year as integer (negative for BC, positive for AD), or undefined if invalid
 *
 * @example
 * extractYearFromDateString("-004003-01-01") // -4003 (4003 BC)
 * extractYearFromDateString("000030-01-01")  // 30 (30 AD)
 * extractYearFromDateString(null)            // undefined
 */
export function extractYearFromDateString(
  dateString: string | null | undefined
): number | undefined {
  if (!dateString) return undefined;

  const match = dateString.match(/^(-?\d+)-/);
  if (!match) return undefined;

  const year = parseInt(match[1], 10);
  return isNaN(year) ? undefined : year;
}

/**
 * Convert an integer year to a BiblicalDate object
 * Negative integers = BC, positive = AD
 *
 * @param year - Integer year (e.g., -1500 for 1500 BC, 30 for 30 AD)
 */
export function intToBiblicalDate(year?: number | null): BiblicalDate | null {
  if (year === undefined || year === null) return null;

  return {
    year,
    isApproximate: false,
    isRange: false,
    original: String(year),
  };
}

/**
 * Convert a Neo4j Date string (ISO format) to a BiblicalDate object
 *
 * @param dateString - ISO date string from GraphQL (e.g., "-004003-01-01", "000030-01-01")
 * @returns BiblicalDate object or null if invalid
 */
export function dateStringToBiblicalDate(
  dateString: string | null | undefined
): BiblicalDate | null {
  const year = extractYearFromDateString(dateString);
  if (year === undefined) return null;

  return {
    year,
    isApproximate: false,
    isRange: false,
    original: dateString || '',
  };
}

/**
 * Parse a biblical date from various input formats into a structured object
 * Supports formats like:
 * - Neo4j Date string: "-4003-01-01" (ISO format from GraphQL)
 * - Integer: -1500 (1500 BC), 30 (30 AD)
 * - String: "1500 BC", "30 AD"
 * - String: "c. 1500 BC" (circa/approximate)
 * - String: "1450-1410 BC" (ranges)
 * - String: "1500-1400 BCE" (alternative notation)
 */
export function parseBiblicalDate(dateInput?: string | number | null): BiblicalDate | null {
  if (typeof dateInput === 'number') {
    return intToBiblicalDate(dateInput);
  }

  const dateStr = dateInput;
  if (!dateStr) return null;

  const normalized = dateStr.trim();

  if (/^-?\d{4}-\d{2}-\d{2}$/.test(normalized)) {
    return dateStringToBiblicalDate(normalized);
  }

  const isApproximate = /^(c\.|ca\.|circa)/i.test(normalized);
  const withoutApprox = normalized.replace(/^(c\.|ca\.|circa)\s*/i, '');

  const rangeMatch = withoutApprox.match(/(\d+)\s*-\s*(\d+)\s*(BC|BCE|AD|CE)/i);
  if (rangeMatch) {
    const [, start, end, era] = rangeMatch;
    const isBC = era.toUpperCase().startsWith('B');
    return {
      year: isBC ? -parseInt(start, 10) : parseInt(start, 10),
      endYear: isBC ? -parseInt(end, 10) : parseInt(end, 10),
      isApproximate,
      isRange: true,
      original: dateStr,
    };
  }

  const singleMatch = withoutApprox.match(/(\d+)\s*(BC|BCE|AD|CE)/i);
  if (singleMatch) {
    const [, year, era] = singleMatch;
    const isBC = era.toUpperCase().startsWith('B');
    return {
      year: isBC ? -parseInt(year, 10) : parseInt(year, 10),
      isApproximate,
      isRange: false,
      original: dateStr,
    };
  }

  return null;
}

/**
 * Format a biblical date for display
 */
export function formatBiblicalDate(
  date: BiblicalDate | null,
  language: 'en' | 'ko' = 'en'
): string {
  if (!date) return '';

  const bcLabel = language === 'en' ? 'BC' : '기원전';
  const adLabel = language === 'en' ? 'AD' : '서기';
  const approxLabel = language === 'en' ? 'c. ' : '약 ';

  const prefix = date.isApproximate ? approxLabel : '';

  if (date.isRange && date.endYear !== undefined) {
    const startYear = Math.abs(date.year);
    const endYear = Math.abs(date.endYear);
    const era = date.year < 0 ? bcLabel : adLabel;

    if (language === 'ko') {
      return `${prefix}${era} ${startYear}-${endYear}년`;
    }
    return `${prefix}${startYear}-${endYear} ${era}`;
  }

  const year = Math.abs(date.year);
  const era = date.year < 0 ? bcLabel : adLabel;

  if (language === 'ko') {
    return `${prefix}${era} ${year}년`;
  }
  return `${prefix}${year} ${era}`;
}

/**
 * Compare two biblical dates
 * Returns negative if a < b, positive if a > b, 0 if equal
 */
export function compareBiblicalDates(a: BiblicalDate | null, b: BiblicalDate | null): number {
  if (!a && !b) return 0;
  if (!a) return 1;
  if (!b) return -1;

  return a.year - b.year;
}

/**
 * Calculate the duration between two dates in years
 */
export function calculateDuration(
  start: BiblicalDate | null,
  end: BiblicalDate | null
): number | null {
  if (!start || !end) return null;
  return end.year - start.year;
}

/**
 * Format a duration string
 * e.g., "40 years", "120 years"
 */
export function formatDuration(years: number, language: 'en' | 'ko' = 'en'): string {
  if (years === 0) return language === 'en' ? 'same time' : '동시';
  if (years === 1) return language === 'en' ? '1 year' : '1년';

  const yearsLabel = language === 'en' ? 'years' : '년';
  return `${Math.abs(years)} ${yearsLabel}`;
}

/**
 * Parse a duration string (e.g., "40 years", "3 months")
 * Returns approximate years
 */
export function parseDuration(durationStr?: string): number | null {
  if (!durationStr) return null;

  const normalized = durationStr.toLowerCase();

  // Years
  const yearsMatch = normalized.match(/(\d+)\s*years?/);
  if (yearsMatch) {
    return parseInt(yearsMatch[1], 10);
  }

  // Months (approximate to years)
  const monthsMatch = normalized.match(/(\d+)\s*months?/);
  if (monthsMatch) {
    return Math.round(parseInt(monthsMatch[1], 10) / 12);
  }

  // Days (approximate to years)
  const daysMatch = normalized.match(/(\d+)\s*days?/);
  if (daysMatch) {
    return Math.round(parseInt(daysMatch[1], 10) / 365);
  }

  return null;
}

/**
 * Get the midpoint year of a date (useful for ranges)
 */
export function getMidpointYear(date: BiblicalDate | null): number | null {
  if (!date) return null;

  if (date.isRange && date.endYear !== undefined) {
    return Math.round((date.year + date.endYear) / 2);
  }

  return date.year;
}

/**
 * Convert a year to a relative position on a timeline (0-1)
 * Useful for visualization
 */
export function yearToTimelinePosition(year: number, minYear: number, maxYear: number): number {
  if (maxYear === minYear) return 0.5;
  return (year - minYear) / (maxYear - minYear);
}

/**
 * Get a human-readable relative time description
 */
export function getRelativeTimeDescription(
  fromDate: BiblicalDate | null,
  toDate: BiblicalDate | null,
  language: 'en' | 'ko' = 'en'
): string {
  const duration = calculateDuration(fromDate, toDate);
  if (duration === null) return '';

  if (duration === 0) {
    return language === 'en' ? 'Same time' : '동시';
  }

  const absDuration = Math.abs(duration);
  const direction =
    duration > 0 ? (language === 'en' ? 'later' : '후') : language === 'en' ? 'earlier' : '전';

  return `${formatDuration(absDuration, language)} ${direction}`;
}
