import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { VerseCardView } from './VerseCardView';
import { EntityType } from '@/lib/utils/parseEntityMentions';

const meta: Meta<typeof VerseCardView> = {
  title: 'Reading/VerseCardView',
  component: VerseCardView,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof VerseCardView>;

const sampleEntities = [
  { type: 'person' as EntityType, slug: 'god', label: 'God' },
  { type: 'person' as EntityType, slug: 'adam', label: 'Adam' },
  { type: 'place' as EntityType, slug: 'eden', label: 'Eden' },
];

const manyEntities = [
  { type: 'person' as EntityType, slug: 'abraham', label: 'Abraham' },
  { type: 'person' as EntityType, slug: 'isaac', label: 'Isaac' },
  { type: 'person' as EntityType, slug: 'jacob', label: 'Jacob' },
  { type: 'place' as EntityType, slug: 'canaan', label: 'Canaan' },
  { type: 'place' as EntityType, slug: 'egypt', label: 'Egypt' },
  { type: 'event' as EntityType, slug: 'covenant', label: 'Covenant with Abraham' },
  { type: 'event' as EntityType, slug: 'exodus', label: 'The Exodus' },
];

export const Default: Story = {
  args: {
    verseNum: 1,
    text: 'In the beginning [God] created the heavens and the earth.',
    entities: sampleEntities,
    language: 'en',
    onEntityClick: (type, slug) => alert(`Clicked ${type}: ${slug}`),
  },
};

export const Korean: Story = {
  args: {
    verseNum: 1,
    text: '태초에 [하나님]이 천지를 창조하시니라',
    entities: [{ type: 'person' as EntityType, slug: 'god', label: '하나님' }],
    language: 'ko',
    onEntityClick: (type, slug) => alert(`클릭: ${type} - ${slug}`),
  },
};

export const DualLanguage: Story = {
  args: {
    verseNum: 3,
    text: 'And [God] said, "Let there be light," and there was light.',
    secondaryText: '[하나님]이 이르시되 빛이 있으라 하시니 빛이 있었고',
    entities: [{ type: 'person' as EntityType, slug: 'god', label: 'God' }],
    language: 'en',
    showDualLanguage: true,
    onEntityClick: (type, slug) => alert(`Clicked ${type}: ${slug}`),
  },
};

export const DualLanguageKorean: Story = {
  args: {
    verseNum: 3,
    text: '[하나님]이 이르시되 빛이 있으라 하시니 빛이 있었고',
    secondaryText: 'And [God] said, "Let there be light," and there was light.',
    entities: [{ type: 'person' as EntityType, slug: 'god', label: '하나님' }],
    language: 'ko',
    showDualLanguage: true,
    onEntityClick: (type, slug) => alert(`클릭: ${type} - ${slug}`),
  },
};

export const WithItalics: Story = {
  args: {
    verseNum: 1,
    text: 'The *word* of the Lord came to me, saying, "Son of man..."',
    entities: [],
    language: 'en',
  },
};

export const ManyEntities: Story = {
  args: {
    verseNum: 12,
    text: 'And [God] spoke to [Abraham], [Isaac], and [Jacob] in the land of [Canaan] before the journey to [Egypt], establishing a [covenant].',
    entities: manyEntities,
    language: 'en',
    onEntityClick: (type, slug) => alert(`Clicked ${type}: ${slug}`),
  },
};

export const NoEntities: Story = {
  args: {
    verseNum: 5,
    text: 'And there was evening, and there was morning—the first day.',
    entities: [],
    language: 'en',
  },
};

export const Compact: Story = {
  args: {
    verseNum: 7,
    text: '[God] made the vault and separated the water under the vault from the water above it.',
    entities: [{ type: 'person' as EntityType, slug: 'god', label: 'God' }],
    language: 'en',
    compact: true,
    onEntityClick: (type, slug) => alert(`Clicked ${type}: ${slug}`),
  },
};

export const Selected: Story = {
  args: {
    verseNum: 2,
    text: 'Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of [God] was hovering over the waters.',
    entities: [{ type: 'person' as EntityType, slug: 'god', label: 'God' }],
    language: 'en',
    isSelected: true,
    onEntityClick: (type, slug) => alert(`Clicked ${type}: ${slug}`),
  },
};

export const WithHover: Story = {
  args: {
    verseNum: 1,
    text: 'In the beginning [God] created the heavens and the earth.',
    entities: sampleEntities,
    language: 'en',
    hoveredEntity: 'person-god',
    onEntityClick: (type, slug) => alert(`Clicked ${type}: ${slug}`),
    onEntityHover: entityKey => console.log('Hovered:', entityKey),
  },
};

export const LongVerse: Story = {
  args: {
    verseNum: 24,
    text: 'Then [God] said, "Let the land produce living creatures according to their kinds: the livestock, the creatures that move along the ground, and the wild animals, each according to its kind." And it was so. [God] made the wild animals according to their kinds, the livestock according to their kinds, and all the creatures that move along the ground according to their kinds. And [God] saw that it was good.',
    entities: [{ type: 'person' as EntityType, slug: 'god', label: 'God' }],
    language: 'en',
    onEntityClick: (type, slug) => alert(`Clicked ${type}: ${slug}`),
  },
};
