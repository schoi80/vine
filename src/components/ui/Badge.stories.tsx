import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Badge, EntityTagList } from './Badge';

const meta = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['person', 'place', 'event', 'book', 'neutral'],
    },
    mode: {
      control: 'select',
      options: ['entity', 'generic'],
    },
    variant: {
      control: 'select',
      options: ['default', 'subtle'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    interactive: {
      control: 'boolean',
    },
    motion: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story =
  | StoryObj<typeof meta>
  | { render: () => React.ReactElement; parameters?: Record<string, any> };

export const Person: Story = {
  args: {
    type: 'person',
    label: 'Abraham',
  },
};

export const Place: Story = {
  args: {
    type: 'place',
    label: 'Jerusalem',
  },
};

export const Event: Story = {
  args: {
    type: 'event',
    label: 'Creation',
  },
};

export const Book: Story = {
  args: {
    type: 'book',
    label: 'Genesis',
  },
};

export const WithKorean: Story = {
  args: {
    type: 'person',
    label: 'Abraham',
    labelKr: '아브라함',
  },
};

export const WithFrequency: Story = {
  args: {
    type: 'person',
    label: 'Moses',
    frequency: 42,
  },
};

export const Interactive: Story = {
  args: {
    type: 'place',
    label: 'Egypt',
    interactive: true,
    onClick: () => alert('Clicked Egypt!'),
  },
};

export const Subtle: Story = {
  args: {
    type: 'event',
    label: 'Exodus',
    variant: 'subtle',
  },
};

export const Small: Story = {
  args: {
    type: 'person',
    label: 'David',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    type: 'person',
    label: 'David',
    size: 'md',
  },
};

export const GenericNeutral: Story = {
  args: {
    mode: 'generic',
    type: 'neutral',
    label: 'Filter',
  },
};

export const GenericNeutralSubtle: Story = {
  args: {
    mode: 'generic',
    type: 'neutral',
    label: 'Category',
    variant: 'subtle',
  },
};

export const GenericNeutralInteractive: Story = {
  args: {
    mode: 'generic',
    type: 'neutral',
    label: 'Before',
    interactive: true,
    onClick: () => alert('Clicked Before!'),
  },
};

export const GenericWithoutIcon: Story = {
  args: {
    mode: 'generic',
    type: 'neutral',
    label: 'No Icon',
    showGenericIcon: false,
  },
};

export const AllTypes: Story = {
  parameters: {},

  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Badge type="person" label="Abraham" />
        <Badge type="place" label="Jerusalem" />
        <Badge type="event" label="Creation" />
        <Badge type="book" label="Genesis" />
        <Badge mode="generic" type="neutral" label="Neutral" />
      </div>
      <div className="flex gap-2">
        <Badge type="person" label="Abraham" variant="subtle" />
        <Badge type="place" label="Jerusalem" variant="subtle" />
        <Badge type="event" label="Creation" variant="subtle" />
        <Badge type="book" label="Genesis" variant="subtle" />
        <Badge mode="generic" type="neutral" label="Neutral" variant="subtle" />
      </div>
      <div className="flex gap-2">
        <Badge type="person" label="Moses" frequency={42} />
        <Badge type="place" label="Egypt" frequency={15} />
        <Badge type="event" label="Exodus" frequency={8} />
        <Badge type="book" label="Leviticus" frequency={5} />
        <Badge mode="generic" type="neutral" label="Neutral" />
      </div>
    </div>
  ),
};

export const BilingualExamples: Story = {
  parameters: {},
  render: () => (
    <div className="flex flex-col gap-2">
      <Badge type="person" label="Abraham" labelKr="아브라함" />
      <Badge type="place" label="Jerusalem" labelKr="예루살렘" />
      <Badge type="event" label="Creation" labelKr="창조" />
    </div>
  ),
};

export const GenericExamples: Story = {
  parameters: {},
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <Badge mode="generic" type="neutral" label="Before" interactive />
        <Badge mode="generic" type="neutral" label="After" interactive />
        <Badge mode="generic" type="neutral" label="Timeline" interactive />
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge mode="generic" type="neutral" label="Filter" variant="subtle" />
        <Badge mode="generic" type="neutral" label="Category" variant="subtle" />
        <Badge mode="generic" type="neutral" label="Tag" variant="subtle" />
      </div>
    </div>
  ),
};

const _entityListMeta = {
  title: 'UI/EntityTagList',
  component: EntityTagList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EntityTagList>;

export const TagList: StoryObj<typeof _entityListMeta> = {
  args: {
    entities: [
      { type: 'person', slug: 'abraham', label: 'Abraham', frequency: 15 },
      { type: 'person', slug: 'sarah', label: 'Sarah', frequency: 8 },
      { type: 'place', slug: 'egypt', label: 'Egypt', frequency: 12 },
      { type: 'place', slug: 'canaan', label: 'Canaan', frequency: 6 },
      { type: 'event', slug: 'creation', label: 'Creation', frequency: 3 },
    ],
    onEntityClick: (slug: string, type: string) => alert(`Clicked ${type}: ${slug}`),
  },
};

export const ManyEntities: StoryObj<typeof _entityListMeta> = {
  args: {
    entities: [
      { type: 'person', slug: 'abraham', label: 'Abraham', frequency: 15 },
      { type: 'person', slug: 'sarah', label: 'Sarah', frequency: 8 },
      { type: 'person', slug: 'isaac', label: 'Isaac', frequency: 12 },
      { type: 'person', slug: 'jacob', label: 'Jacob', frequency: 18 },
      { type: 'person', slug: 'joseph', label: 'Joseph', frequency: 22 },
      { type: 'person', slug: 'moses', label: 'Moses', frequency: 42 },
      { type: 'place', slug: 'egypt', label: 'Egypt', frequency: 12 },
      { type: 'place', slug: 'canaan', label: 'Canaan', frequency: 6 },
    ],
    onEntityClick: (slug: string, type: string) => alert(`Clicked ${type}: ${slug}`),
  },
};

export const ManyEntitiesCollapsed: StoryObj<typeof _entityListMeta> = {
  args: {
    entities: [
      { type: 'person', slug: 'abraham', label: 'Abraham', frequency: 15 },
      { type: 'person', slug: 'sarah', label: 'Sarah', frequency: 8 },
      { type: 'person', slug: 'isaac', label: 'Isaac', frequency: 12 },
      { type: 'person', slug: 'jacob', label: 'Jacob', frequency: 18 },
      { type: 'person', slug: 'joseph', label: 'Joseph', frequency: 22 },
      { type: 'person', slug: 'moses', label: 'Moses', frequency: 42 },
      { type: 'place', slug: 'egypt', label: 'Egypt', frequency: 12 },
      { type: 'place', slug: 'canaan', label: 'Canaan', frequency: 6 },
    ],
    maxVisible: 5,
    onEntityClick: (slug: string, type: string) => alert(`Clicked ${type}: ${slug}`),
  },
};
