/**
 * Type definitions for Bible hierarchy (Testament → Division → Book)
 *
 * These types represent the structural organization of Scripture with bilingual support.
 */

/**
 * Testament represents the two major divisions of the Bible
 * - Old Testament (구약): 39 books from Genesis to Malachi
 * - New Testament (신약): 27 books from Matthew to Revelation
 */
export interface Testament {
  title: string; // "Old Testament" | "New Testament"
  titleKr: string; // "구약" | "신약"
}

/**
 * Division represents thematic/literary groupings within each Testament
 *
 * Old Testament Divisions:
 * - Pentateuch (모세오경): Genesis - Deuteronomy
 * - Historical (역사서): Joshua - Esther
 * - Poetry-Wisdom (시가서): Job - Song of Songs
 * - Major Prophets (대선지서): Isaiah - Daniel
 * - Minor Prophets (소선지서): Hosea - Malachi
 *
 * New Testament Divisions:
 * - Gospels (복음서): Matthew - John
 * - Acts (사도행전): Acts
 * - Pauline Epistles (바울서신): Romans - Philemon
 * - General Epistles (일반서신): Hebrews - Jude
 * - Revelation (요한계시록): Revelation
 */
export interface Division {
  title: string; // e.g., "Pentateuch", "Gospels", "Historical"
  titleKr: string; // e.g., "모세오경", "복음서", "역사서"
}

/**
 * Book represents a single book of the Bible with full metadata
 */
export interface Book {
  id: string;
  slug: string; // Short code: "gen", "exod", "matt", etc.
  title: string; // English name: "Genesis", "Exodus", "Matthew"
  bookNameKr: string; // Korean name: "창세기", "출애굽기", "마태복음"
  shortName: string; // Short English: "Gen", "Exod", "Matt"
  shortNameKr: string; // Short Korean: "창", "출", "마"
  bookOrder: number; // 1-66 canonical order

  // Hierarchical relationships (computed cypher fields in GraphQL)
  testament?: Testament;
  division?: Division;
}

/**
 * Bilingual text interface - used throughout the app for any user-facing text
 */
export interface BilingualText {
  text: string; // English text
  textKr: string; // Korean text
}

/**
 * Breadcrumb item for navigation paths
 * Example: "Old Testament / Pentateuch / Genesis / 1"
 *          "구약 / 모세오경 / 창세기 / 1"
 */
export interface BreadcrumbItem {
  label: string; // Display text (language-aware)
  labelKr: string; // Korean display text
  href?: string; // Optional link (null for current page)
  type: 'testament' | 'division' | 'book' | 'chapter';
}

/**
 * Full reading context with all hierarchical data
 * Used by reading pages to display location within Scripture
 */
export interface ReadingContext {
  testament: Testament;
  division: Division;
  book: Book;
  chapterNum: number;
  totalChapters: number;
}
