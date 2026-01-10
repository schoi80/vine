/**
 * Type definitions for Bible hierarchy (Testament → Division → Book)
 *
 * These types represent the structural organization of Scripture with bilingual support.
 */

export interface Translation {
  language: string;
  field: string;
  text: string;
}

export interface Translatable {
  translations?: Translation[];
}

/**
 * Testament represents the two major divisions of the Bible
 * - Old Testament (구약): 39 books from Genesis to Malachi
 * - New Testament (신약): 27 books from Matthew to Revelation
 */
export interface Testament extends Translatable {
  title: string; // "Old Testament" | "New Testament"
}

/**
 * Division represents thematic/literary groupings within each Testament
 */
export interface Division extends Translatable {
  title: string; // e.g., "Pentateuch", "Gospels", "Historical"
}

/**
 * Book represents a single book of the Bible with full metadata
 */
export interface Book extends Translatable {
  id: string;
  slug: string; // Short code: "gen", "exod", "matt", etc.
  title: string; // English name: "Genesis", "Exodus", "Matthew"
  shortName: string; // Short English: "Gen", "Exod", "Matt"
  bookOrder: number; // 1-66 canonical order

  // Hierarchical relationships (computed cypher fields in GraphQL)
  testament?: Testament;
  division?: Division;
}

/**
 * Bilingual text interface - used throughout the app for any user-facing text
 */
export interface BilingualText extends Translatable {
  text: string; // English text
}

/**
 * Breadcrumb item for navigation paths
 */
export interface BreadcrumbItem extends Translatable {
  label: string; // Display text (language-aware)
  href?: string; // Optional link (null for current page)
  type: 'testament' | 'division' | 'book' | 'chapter';
}

/**
 * Full reading context with all hierarchical data
 */
export interface ReadingContext {
  testament: Testament;
  division: Division;
  book: Book;
  chapterNum: number;
  totalChapters: number;
}
