import { getLocalizedTitle, getLocalizedValue } from '@/lib/utils/bilingual';
import { Translatable } from '@/lib/types/hierarchy';

type EntityNode = Translatable & {
  slug?: string;
  id?: string;
  name?: string;
  title?: string;
};

type VerseNode = {
  mentionsPeopleConnection?: {
    edges: Array<{ node: EntityNode }>;
  };
  mentionsPlacesConnection?: {
    edges: Array<{ node: EntityNode }>;
  };
  describesEventsConnection?: {
    edges: Array<{ node: EntityNode }>;
  };
};

type SubjectEntity = {
  type: 'person' | 'place' | 'event';
  slug?: string;
  id?: string;
};

export function topCoMentionsFromRelations(
  verses: VerseNode[],
  subject: SubjectEntity,
  limit = 20,
  language: 'en' | 'ko' = 'en'
) {
  const peopleCounts = new Map<string, { displayText: string; count: number }>();
  const placesCounts = new Map<string, { displayText: string; count: number }>();
  const eventsCounts = new Map<string, { displayText: string; count: number }>();

  for (const verse of verses) {
    if (verse.mentionsPeopleConnection?.edges) {
      for (const { node } of verse.mentionsPeopleConnection.edges) {
        const slug = node.slug;
        if (!slug) continue;
        if (subject.type === 'person' && subject.slug === slug) continue;

        const displayText = getLocalizedValue(node, 'name', node.name || '', language);
        const existing = peopleCounts.get(slug);
        if (existing) {
          existing.count += 1;
        } else {
          peopleCounts.set(slug, { displayText, count: 1 });
        }
      }
    }

    if (verse.mentionsPlacesConnection?.edges) {
      for (const { node } of verse.mentionsPlacesConnection.edges) {
        const slug = node.slug;
        if (!slug) continue;
        if (subject.type === 'place' && subject.slug === slug) continue;

        const displayText = getLocalizedValue(node, 'name', node.name || '', language);
        const existing = placesCounts.get(slug);
        if (existing) {
          existing.count += 1;
        } else {
          placesCounts.set(slug, { displayText, count: 1 });
        }
      }
    }

    if (verse.describesEventsConnection?.edges) {
      for (const { node } of verse.describesEventsConnection.edges) {
        const id = node.id;
        if (!id) continue;
        if (subject.type === 'event' && subject.id === id) continue;

        const displayText = getLocalizedTitle(node, language);
        const existing = eventsCounts.get(id);
        if (existing) {
          existing.count += 1;
        } else {
          eventsCounts.set(id, { displayText, count: 1 });
        }
      }
    }
  }

  const toList = (counts: Map<string, { displayText: string; count: number }>) =>
    Array.from(counts.entries())
      .sort((a, b) => {
        if (b[1].count !== a[1].count) {
          return b[1].count - a[1].count;
        }
        return a[1].displayText.localeCompare(b[1].displayText);
      })
      .slice(0, limit)
      .map(([key, { displayText, count }]) => ({
        slug: key,
        displayText,
        count,
      }));

  return {
    people: toList(peopleCounts),
    places: toList(placesCounts),
    events: toList(eventsCounts),
  };
}
