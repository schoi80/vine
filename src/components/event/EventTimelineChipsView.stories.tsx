import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { EventTimelineChipsView } from './EventTimelineChipsView';

const meta: Meta<typeof EventTimelineChipsView> = {
  title: 'Event/EventTimelineChipsView',
  component: EventTimelineChipsView,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EventTimelineChipsView>;

const beforeEvents = [
  { type: 'event' as const, slug: 'creation', label: 'Creation' },
  { type: 'event' as const, slug: 'fall', label: 'The Fall' },
  { type: 'event' as const, slug: 'flood', label: 'The Great Flood' },
];

const afterEvents = [
  { type: 'event' as const, slug: 'covenant', label: 'Covenant with Abraham' },
  { type: 'event' as const, slug: 'exodus', label: 'The Exodus' },
];

export const Default: Story = {
  args: {
    beforeItems: beforeEvents,
    afterItems: afterEvents,
    title: 'Timeline',
    beforeLabel: 'Before',
    afterLabel: 'After',
    loadingLabel: 'Loading...',
    onItemClick: slug => alert(`Clicked event: ${slug}`),
  },
};

export const Korean: Story = {
  args: {
    beforeItems: [
      { type: 'event' as const, slug: 'creation', label: '창조' },
      { type: 'event' as const, slug: 'fall', label: '타락' },
    ],
    afterItems: [
      { type: 'event' as const, slug: 'covenant', label: '아브라함과의 언약' },
      { type: 'event' as const, slug: 'exodus', label: '출애굽' },
    ],
    title: '타임라인',
    beforeLabel: '이전',
    afterLabel: '이후',
    loadingLabel: '로딩 중...',
    onItemClick: slug => alert(`클릭: ${slug}`),
  },
};

export const OnlyBefore: Story = {
  args: {
    beforeItems: beforeEvents,
    afterItems: [],
    title: 'Timeline',
    beforeLabel: 'Before',
    afterLabel: 'After',
    loadingLabel: 'Loading...',
    onItemClick: slug => alert(`Clicked event: ${slug}`),
  },
};

export const OnlyAfter: Story = {
  args: {
    beforeItems: [],
    afterItems: afterEvents,
    title: 'Timeline',
    beforeLabel: 'Before',
    afterLabel: 'After',
    loadingLabel: 'Loading...',
    onItemClick: slug => alert(`Clicked event: ${slug}`),
  },
};

export const Loading: Story = {
  args: {
    beforeItems: [],
    afterItems: [],
    loading: true,
    title: 'Timeline',
    beforeLabel: 'Before',
    afterLabel: 'After',
    loadingLabel: 'Loading timeline...',
  },
};

export const LongList: Story = {
  args: {
    beforeItems: [
      { type: 'event' as const, slug: 'creation', label: 'Creation' },
      { type: 'event' as const, slug: 'fall', label: 'The Fall' },
      { type: 'event' as const, slug: 'flood', label: 'The Great Flood' },
      { type: 'event' as const, slug: 'babel', label: 'Tower of Babel' },
      { type: 'event' as const, slug: 'sodom', label: 'Destruction of Sodom' },
    ],
    afterItems: [
      { type: 'event' as const, slug: 'covenant', label: 'Covenant with Abraham' },
      { type: 'event' as const, slug: 'isaac-birth', label: 'Birth of Isaac' },
      { type: 'event' as const, slug: 'jacob-ladder', label: "Jacob's Ladder" },
      { type: 'event' as const, slug: 'joseph-egypt', label: 'Joseph Sold to Egypt' },
      { type: 'event' as const, slug: 'exodus', label: 'The Exodus' },
      { type: 'event' as const, slug: 'sinai', label: 'Covenant at Sinai' },
    ],
    title: 'Timeline',
    beforeLabel: 'Before',
    afterLabel: 'After',
    loadingLabel: 'Loading...',
    onItemClick: slug => alert(`Clicked event: ${slug}`),
  },
};

export const WithCounts: Story = {
  args: {
    beforeItems: [
      { type: 'event' as const, slug: 'creation', label: 'Creation', frequency: 12 },
      { type: 'event' as const, slug: 'fall', label: 'The Fall', frequency: 8 },
    ],
    afterItems: [
      { type: 'event' as const, slug: 'covenant', label: 'Covenant', frequency: 15 },
      { type: 'event' as const, slug: 'exodus', label: 'Exodus', frequency: 24 },
    ],
    title: 'Timeline',
    beforeLabel: 'Before',
    afterLabel: 'After',
    loadingLabel: 'Loading...',
    onItemClick: slug => alert(`Clicked event: ${slug}`),
  },
};
