import type { EraConfig, EventEra } from '../types/timeline';

/**
 * Configuration for biblical eras/periods
 * Each era gets distinct color for visual clustering
 */
export const EVENT_ERAS: Record<EventEra, EraConfig> = {
  creation: {
    id: 'creation',
    title: 'Creation',
    titleKr: '창조',
    color: '#fbbf24',
    sortOrder: 1,
    minYear: -5000,
    maxYear: -2350,
    keywords: ['creation', 'adam', 'eve', 'garden', 'eden', 'cain', 'abel', 'seth'],
  },
  patriarchs: {
    id: 'patriarchs',
    title: 'Patriarchs',
    titleKr: '족장 시대',
    color: '#fb923c',
    sortOrder: 2,
    minYear: -2350,
    maxYear: -1500,
    keywords: [
      'abraham',
      'isaac',
      'jacob',
      'joseph',
      'patriarch',
      'enoch',
      'methuselah',
      'noah',
      'shem',
      'ham',
      'japheth',
    ],
  },
  exodus: {
    id: 'exodus',
    title: 'Exodus',
    titleKr: '출애굽',
    color: '#f87171',
    sortOrder: 3,
    minYear: -1500,
    maxYear: -1400,
    keywords: ['moses', 'egypt', 'pharaoh', 'exodus', 'passover', 'sinai'],
  },
  conquest: {
    id: 'conquest',
    title: 'Conquest',
    titleKr: '정복 시대',
    color: '#ec4899',
    sortOrder: 4,
    minYear: -1400,
    maxYear: -1350,
    keywords: ['joshua', 'jericho', 'conquest', 'canaan'],
  },
  judges: {
    id: 'judges',
    title: 'Judges',
    titleKr: '사사 시대',
    color: '#a78bfa',
    sortOrder: 5,
    minYear: -1350,
    maxYear: -1050,
    keywords: ['judge', 'gideon', 'samson', 'deborah', 'samuel'],
  },
  'united-kingdom': {
    id: 'united-kingdom',
    title: 'United Kingdom',
    titleKr: '통일 왕국',
    color: '#818cf8',
    sortOrder: 6,
    minYear: -1050,
    maxYear: -930,
    keywords: ['saul', 'david', 'solomon', 'united kingdom'],
  },
  'divided-kingdom': {
    id: 'divided-kingdom',
    title: 'Divided Kingdom',
    titleKr: '분열 왕국',
    color: '#60a5fa',
    sortOrder: 7,
    minYear: -930,
    maxYear: -586,
    keywords: ['israel', 'judah', 'rehoboam', 'jeroboam', 'divided'],
  },
  exile: {
    id: 'exile',
    title: 'Exile',
    titleKr: '포로 시대',
    color: '#38bdf8',
    sortOrder: 8,
    minYear: -586,
    maxYear: -539,
    keywords: ['babylon', 'nebuchadnezzar', 'exile', 'captivity', 'daniel', 'ezekiel'],
  },
  return: {
    id: 'return',
    title: 'Return',
    titleKr: '귀환',
    color: '#22d3ee',
    sortOrder: 9,
    minYear: -539,
    maxYear: -400,
    keywords: ['ezra', 'nehemiah', 'return', 'rebuild', 'temple'],
  },
  intertestamental: {
    id: 'intertestamental',
    title: 'Intertestamental',
    titleKr: '중간 시대',
    color: '#34d399',
    sortOrder: 10,
    minYear: -400,
    maxYear: -4,
    keywords: ['maccabees', 'intertestamental'],
  },
  jesus: {
    id: 'jesus',
    title: 'Life of Jesus',
    titleKr: '예수의 생애',
    color: '#4ade80',
    sortOrder: 11,
    minYear: -4,
    maxYear: 34,
    keywords: ['jesus', 'christ', 'gospel', 'bethlehem', 'crucifixion', 'resurrection'],
  },
  'early-church': {
    id: 'early-church',
    title: 'Early Church',
    titleKr: '초대 교회',
    color: '#84cc16',
    sortOrder: 12,
    minYear: 34,
    maxYear: 330,
    keywords: ['pentecost', 'paul', 'peter', 'apostle', 'church', 'acts'],
  },
  'middle-ages': {
    id: 'middle-ages',
    title: 'Middle Ages',
    titleKr: '중세 시대',
    color: '#9ca3af',
    sortOrder: 33,
    minYear: 330,
    maxYear: 1517,
  },
  reformation: {
    id: 'reformation',
    title: 'Reformation',
    titleKr: '종교 개혁',
    color: '#9ca3af',
    sortOrder: 34,
    minYear: 1517,
    maxYear: 1840,
  },
  'revelation-prophecies': {
    id: 'revelation-prophecies',
    title: 'Revelation & Prophecies',
    titleKr: '요한계시록과 예언',
    color: '#9ca3af',
    sortOrder: 35,
    minYear: 1840,
    maxYear: Infinity,
  },
};

/**
 * Get era configuration by ID
 */
export function getEraConfig(era: EventEra): EraConfig {
  return EVENT_ERAS[era] || EVENT_ERAS['revelation-prophecies'];
}

/**
 * Get all eras sorted by chronological order
 */
export function getAllEras(): EraConfig[] {
  return Object.values(EVENT_ERAS)
    .filter(era => era.id !== 'revelation-prophecies')
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

/**
 * Get era radius for radial layout (concentric circles)
 * Returns radius in pixels for each era zone
 */
export function getEraRadius(era: EventEra, baseRadius: number = 100): number {
  const config = getEraConfig(era);
  return baseRadius + config.sortOrder * 60;
}

export function classifyEventEra(event: { startDate?: number; title?: string }): EventEra {
  if (event.startDate != null) {
    const year = event.startDate;
    const eras = Object.values(EVENT_ERAS).filter(e => e.id !== 'revelation-prophecies');

    for (const era of eras) {
      if (year >= era.minYear && year <= era.maxYear) {
        return era.id;
      }
    }
  }

  if (event.title) {
    const titleLower = event.title.toLowerCase();

    for (const era of Object.values(EVENT_ERAS)) {
      if (era.keywords) {
        for (const keyword of era.keywords) {
          if (titleLower.includes(keyword.toLowerCase())) {
            return era.id;
          }
        }
      }
    }
  }

  return 'revelation-prophecies';
}
