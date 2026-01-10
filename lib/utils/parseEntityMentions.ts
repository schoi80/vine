export type EntityType = 'person' | 'place' | 'event';

export interface ParsedEntity {
  type: EntityType;
  slug: string;
  displayText: string;
}

export interface TextSegment {
  type: 'text' | 'entity';
  content: string;
  entity?: ParsedEntity;
}

export interface TextPart {
  text: string;
  italic: boolean;
}

/**
 * Parses text with italic markdown (_text_) into parts
 */
export function parseItalics(text: string): TextPart[] {
  const parts: TextPart[] = [];
  const italicRegex = /_((?:[^_]|(?<=\\)_)+)_/g;
  let lastIndex = 0;
  let match;

  while ((match = italicRegex.exec(text)) !== null) {
    // Add text before italic
    if (match.index > lastIndex) {
      parts.push({
        text: text.slice(lastIndex, match.index),
        italic: false,
      });
    }

    // Add italic text
    parts.push({
      text: match[1],
      italic: true,
    });

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push({
      text: text.slice(lastIndex),
      italic: false,
    });
  }

  return parts.length > 0 ? parts : [{ text, italic: false }];
}

/**
 * Parses markdown text with entity mentions in the format:
 * [Babylon,](/place/babylon_151) - standard markdown link format
 * [God]([/person/god_1324) - broken markdown link format from database
 * [[person:moses|Moses]] - wiki-style format
 *
 * Returns an array of text segments that can be rendered with highlighted entities.
 */
export function parseEntityMentions(text: string): TextSegment[] {
  if (!text) return [{ type: 'text', content: '' }];

  // Regex to match [Display Text]([/type/slug) - broken markdown format (parse first!)
  // Must come before standard format to avoid conflicts
  const brokenLinkRegex = /\[([^\]]+)\]\(\[\/(person|place|event)\/([^)]+)\)/g;

  // Regex to match [Display Text](/type/slug) - standard markdown format
  // Negative lookbehind (?<!\() ensures we don't match [ when preceded by (
  const standardLinkRegex = /(?<!\()\[([^\]]+)\]\(\/(person|place|event)\/([^)]+)\)/g;

  // Also support wiki-style [[type:slug|Display Text]]
  const wikiRegex = /\[\[(person|place|event):([^|]+)\|([^\]]+)\]\]/g;

  const segments: TextSegment[] = [];
  let lastIndex = 0;

  // Find all matches of all patterns
  const allMatches: Array<{
    index: number;
    length: number;
    type: EntityType;
    slug: string;
    displayText: string;
  }> = [];

  // Match broken link format FIRST (more specific)
  let match: RegExpExecArray | null;
  while ((match = brokenLinkRegex.exec(text)) !== null) {
    allMatches.push({
      index: match.index,
      length: match[0].length,
      displayText: match[1],
      type: match[2] as EntityType,
      slug: match[3],
    });
  }

  // Match standard markdown links SECOND
  // But skip any that overlap with broken format matches
  while ((match = standardLinkRegex.exec(text)) !== null) {
    // Check if this position overlaps with any broken format match
    const matchEnd = match.index + match[0].length;
    const overlaps = allMatches.some(m => {
      if (!match) return false;
      return match.index < m.index + m.length && matchEnd > m.index;
    });

    if (!overlaps) {
      allMatches.push({
        index: match.index,
        length: match[0].length,
        displayText: match[1],
        type: match[2] as EntityType,
        slug: match[3],
      });
    }
  }

  // Match wiki format
  while ((match = wikiRegex.exec(text)) !== null) {
    allMatches.push({
      index: match.index,
      length: match[0].length,
      type: match[1] as EntityType,
      slug: match[2],
      displayText: match[3],
    });
  }

  // Sort matches by index
  allMatches.sort((a, b) => a.index - b.index);

  // Build segments
  for (const match of allMatches) {
    // Add text before the entity
    if (match.index > lastIndex) {
      segments.push({
        type: 'text',
        content: text.slice(lastIndex, match.index),
      });
    }

    // Add the entity segment
    segments.push({
      type: 'entity',
      content: match.displayText,
      entity: {
        type: match.type,
        slug: match.slug,
        displayText: match.displayText,
      },
    });

    lastIndex = match.index + match.length;
  }

  // Add remaining text after the last entity
  if (lastIndex < text.length) {
    segments.push({
      type: 'text',
      content: text.slice(lastIndex),
    });
  }

  return segments;
}
