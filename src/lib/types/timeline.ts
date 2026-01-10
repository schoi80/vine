import { Translation, Translatable } from './hierarchy';

/**
 * Type definitions for Event Timeline visualization
 */

export type EventEra =
  | 'creation'
  | 'patriarchs'
  | 'exodus'
  | 'conquest'
  | 'judges'
  | 'united-kingdom'
  | 'divided-kingdom'
  | 'exile'
  | 'return'
  | 'intertestamental'
  | 'jesus'
  | 'early-church'
  | 'middle-ages'
  | 'reformation'
  | 'revelation-prophecies';

export interface EraConfig {
  id: EventEra;
  title: string;
  translations?: Translation[];
  color: string;
  sortOrder: number;
  minYear: number;
  maxYear: number;
  keywords?: string[];
}

export interface TimelineEvent extends Translatable {
  id: string;
  title: string;

  startDate?: number;
  duration?: string;
  sortKey: string;
  era: EventEra;

  // Relationships
  participants: Array<Translatable & {
    id: string;
    name: string;
    slug: string;
    gender?: 'Male' | 'Female' | null;
  }>;
  occurredIn: Array<Translatable & {
    id: string;
    name: string;
    slug: string;
  }>;
  verses: Array<Translatable & {
    verseText: string;
    mdText?: string;
    verseNum: number;
    chapter: {
      chapterNum: number;
      book: Translatable & {
        shortName: string;
        slug: string;
      };
    };
  }>;
  precedes: Array<Translatable & {
    id: string;
    title: string;
  }>;
  follows: Array<Translatable & {
    id: string;
    title: string;
  }>;
}

export interface TimelineNode {
  id: string;
  event: TimelineEvent;
  era: EventEra;
  x: number;
  y: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface TimelineEdge {
  source: string | TimelineNode;
  target: string | TimelineNode;
}

export interface TimelineGraphData {
  nodes: TimelineNode[];
  edges: TimelineEdge[];
}

export interface TimelineFilters {
  personSlugs: Set<string>;
  placeSlugs: Set<string>;
  eras: Set<EventEra>;
  searchQuery: string;
}

export interface ZoomState {
  x: number;
  y: number;
  scale: number;
}
