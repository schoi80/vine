import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TimelineEventBox } from './TimelineEventBox';
import { EntityPanelProvider } from '@/lib/contexts/EntityPanelContext';

const meta = {
  title: 'Timeline/TimelineEventBox',
  component: TimelineEventBox,
  decorators: [
    Story => (
      <EntityPanelProvider>
        <div className="max-w-md">
          <Story />
        </div>
      </EntityPanelProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TimelineEventBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CreationEra: Story = {
  args: {
    id: 'event-1',
    title: 'God Creates the Heavens and the Earth adsasdsadasd',
    year: '5000 BC',
    era: 'creation',
    side: 'left',
  },
};

export const PatriarchsEra: Story = {
  args: {
    id: 'event-2',
    title: 'Abraham Called by God',
    year: '2000 BC',
    era: 'patriarchs',
    side: 'right',
  },
};

export const ExodusEra: Story = {
  args: {
    id: 'event-3',
    title: 'Israelites Freed from Egypt',
    year: '1446 BC',
    era: 'exodus',
    side: 'left',
  },
};

export const JesusEra: Story = {
  args: {
    id: 'event-4',
    title: 'Jesus Born in Bethlehem',
    year: '4 BC',
    era: 'jesus',
    side: 'right',
  },
};

export const EarlyChurchEra: Story = {
  args: {
    id: 'event-5',
    title: 'Day of Pentecost',
    year: '30 AD',
    era: 'early-church',
    side: 'left',
  },
};

export const LeftSideYearOnRight: Story = {
  args: {
    id: 'event-6',
    title: 'Tower of Babel',
    year: '2200 BC',
    era: 'patriarchs',
    side: 'left',
  },
  name: 'Left Side (Year on Right)',
};

export const RightSideYearOnLeft: Story = {
  args: {
    id: 'event-7',
    title: 'David Defeats Goliath',
    year: '1025 BC',
    era: 'united-kingdom',
    side: 'right',
  },
  name: 'Right Side (Year on Left)',
};

export const LongTitleWrapping: Story = {
  args: {
    id: 'event-8',
    title: 'The Israelites Wander in the Desert for Forty Years After Leaving Egypt',
    year: '1446 BC',
    era: 'exodus',
    side: 'left',
  },
  name: 'Long Title Wrapping (Left)',
};

export const LongTitleWrappingRight: Story = {
  args: {
    id: 'event-8b',
    title: 'God Commands Abraham to Sacrifice His Son Isaac on Mount Moriah',
    year: '2000 BC',
    era: 'patriarchs',
    side: 'right',
  },
  name: 'Long Title Wrapping (Right)',
};

export const NotCompact: Story = {
  args: {
    id: 'event-9',
    title: 'Solomon Builds the Temple',
    year: '966 BC',
    era: 'united-kingdom',
    side: 'right',
    compact: false,
  },
};

export const NotHoverable: Story = {
  args: {
    id: 'event-10',
    title: 'Fall of Jerusalem',
    year: '586 BC',
    era: 'exile',
    side: 'left',
    hoverable: false,
  },
};

export const AllEras: Story = {
  args: {
    id: 'all-eras',
    title: 'All Eras Demo',
    year: '2000 BC',
    era: 'patriarchs',
    side: 'left',
  },
  render: () => (
    <div className="space-y-4">
      <TimelineEventBox id="e1" title="Creation Event" year="5000 BC" era="creation" side="left" />
      <TimelineEventBox
        id="e2"
        title="Patriarchs Event"
        year="2000 BC"
        era="patriarchs"
        side="right"
      />
      <TimelineEventBox id="e3" title="Exodus Event" year="1446 BC" era="exodus" side="left" />
      <TimelineEventBox id="e4" title="Conquest Event" year="1400 BC" era="conquest" side="right" />
      <TimelineEventBox id="e5" title="Judges Event" year="1200 BC" era="judges" side="left" />
      <TimelineEventBox
        id="e6"
        title="United Kingdom Event"
        year="1000 BC"
        era="united-kingdom"
        side="right"
      />
      <TimelineEventBox
        id="e7"
        title="Divided Kingdom Event"
        year="900 BC"
        era="divided-kingdom"
        side="left"
      />
      <TimelineEventBox id="e8" title="Exile Event" year="586 BC" era="exile" side="right" />
      <TimelineEventBox id="e9" title="Return Event" year="538 BC" era="return" side="left" />
      <TimelineEventBox
        id="e10"
        title="Intertestamental Event"
        year="200 BC"
        era="intertestamental"
        side="right"
      />
      <TimelineEventBox id="e11" title="Jesus Event" year="4 BC" era="jesus" side="left" />
      <TimelineEventBox
        id="e12"
        title="Early Church Event"
        year="30 AD"
        era="early-church"
        side="right"
      />
    </div>
  ),
};
