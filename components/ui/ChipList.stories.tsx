import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ChipList, type ChipListItem } from './ChipList';

const meta = {
  title: 'UI/ChipList',
  component: ChipList,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'ChipList component for displaying collections of chips with automatic wrapping, collapsible behavior, and interactive support.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Size applied to all chips',
    },
    interactive: {
      control: 'boolean',
      description: 'Enable hover/click states for all chips',
    },
    collapsible: {
      control: 'boolean',
      description: 'Enable collapse/expand behavior',
    },
    initialVisibleCount: {
      control: 'number',
      description: 'Number of items visible before collapse',
    },
  },
} satisfies Meta<typeof ChipList>;

export default meta;
type Story =
  | StoryObj<typeof meta>
  | { render: () => React.ReactElement; parameters?: Record<string, any> };

const personItems: ChipListItem[] = [
  { id: 'moses', label: 'Moses', color: 'person', frequency: 156 },
  { id: 'aaron', label: 'Aaron', color: 'person', frequency: 78 },
  { id: 'miriam', label: 'Miriam', color: 'person', frequency: 12 },
  { id: 'pharaoh', label: 'Pharaoh', color: 'person', frequency: 34 },
];

const placeItems: ChipListItem[] = [
  { id: 'egypt', label: 'Egypt', color: 'place', frequency: 42 },
  { id: 'red-sea', label: 'Red Sea', color: 'place', frequency: 8 },
  { id: 'sinai', label: 'Mount Sinai', color: 'place', frequency: 15 },
];

const eventItems: ChipListItem[] = [
  { id: 'exodus', label: 'Exodus', color: 'event', frequency: 23 },
  { id: 'passover', label: 'Passover', color: 'event', frequency: 18 },
  { id: 'red-sea-crossing', label: 'Red Sea Crossing', color: 'event', frequency: 7 },
];

const mixedItems: ChipListItem[] = [
  { id: 'abraham', label: 'Abraham', color: 'person', frequency: 175 },
  { id: 'sarah', label: 'Sarah', color: 'person', frequency: 45 },
  { id: 'isaac', label: 'Isaac', color: 'person', frequency: 89 },
  { id: 'hebron', label: 'Hebron', color: 'place', frequency: 23 },
  { id: 'canaan', label: 'Canaan', color: 'place', frequency: 67 },
  { id: 'covenant', label: 'Covenant', color: 'event', frequency: 12 },
  { id: 'promise', label: 'Promise', color: 'event', frequency: 34 },
];

const largePersonList: ChipListItem[] = [
  { id: 'abraham', label: 'Abraham', color: 'person', frequency: 175 },
  { id: 'isaac', label: 'Isaac', color: 'person', frequency: 89 },
  { id: 'jacob', label: 'Jacob', color: 'person', frequency: 156 },
  { id: 'joseph', label: 'Joseph', color: 'person', frequency: 123 },
  { id: 'moses', label: 'Moses', color: 'person', frequency: 234 },
  { id: 'aaron', label: 'Aaron', color: 'person', frequency: 78 },
  { id: 'miriam', label: 'Miriam', color: 'person', frequency: 12 },
  { id: 'joshua', label: 'Joshua', color: 'person', frequency: 67 },
  { id: 'caleb', label: 'Caleb', color: 'person', frequency: 23 },
  { id: 'david', label: 'David', color: 'person', frequency: 289 },
  { id: 'solomon', label: 'Solomon', color: 'person', frequency: 145 },
  { id: 'saul', label: 'Saul', color: 'person', frequency: 98 },
  { id: 'samuel', label: 'Samuel', color: 'person', frequency: 87 },
  { id: 'elijah', label: 'Elijah', color: 'person', frequency: 56 },
  { id: 'elisha', label: 'Elisha', color: 'person', frequency: 45 },
];

export const Default: Story = {
  args: {
    items: personItems,
    size: 'sm',
    interactive: false,
  },
};

export const EntityGroups: Story = {
  parameters: {},
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h4 className="text-accent-person dark:text-accent-person-dark mb-3 text-sm font-semibold">
          People
        </h4>
        <ChipList items={personItems} />
      </div>

      <div>
        <h4 className="text-accent-place dark:text-accent-place-dark mb-3 text-sm font-semibold">
          Places
        </h4>
        <ChipList items={placeItems} />
      </div>

      <div>
        <h4 className="text-accent-event dark:text-accent-event-dark mb-3 text-sm font-semibold">
          Events
        </h4>
        <ChipList items={eventItems} />
      </div>
    </div>
  ),
};

export const MixedEntities: Story = {
  parameters: {},
  render: () => (
    <div className="flex flex-col gap-3">
      <ChipList items={mixedItems} />
      <p className="text-neutral-11 dark:text-neutral-dark-11 text-xs">
        Mixed entity types with automatic color coding
      </p>
    </div>
  ),
};

export const Interactive: Story = {
  parameters: {},
  render: () => (
    <div className="flex flex-col gap-3">
      <ChipList
        items={mixedItems.map(item => ({
          ...item,
          onClick: () => console.log('Chip clicked'),
        }))}
        interactive
      />
      <p className="text-neutral-11 dark:text-neutral-dark-11 text-xs">
        All chips have hover/click states when interactive=true
      </p>
    </div>
  ),
};

export const Collapsible: Story = {
  parameters: {},
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h4 className="mb-3 text-sm font-semibold">Default (5 visible)</h4>
        <ChipList items={largePersonList} collapsible initialVisibleCount={5} />
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold">Show 10 initially</h4>
        <ChipList items={largePersonList} collapsible initialVisibleCount={10} />
      </div>

      <p className="text-neutral-11 dark:text-neutral-dark-11 text-xs">
        Collapsible lists show &quot;Show N more&quot; / &quot;Show less&quot; buttons
      </p>
    </div>
  ),
};

export const InteractiveAndCollapsible: Story = {
  parameters: {},
  render: () => (
    <div className="flex flex-col gap-3">
      <ChipList
        items={largePersonList.map(item => ({
          ...item,
          onClick: () => console.log('Chip clicked'),
        }))}
        interactive
        collapsible
        initialVisibleCount={8}
      />
      <p className="text-neutral-11 dark:text-neutral-dark-11 text-xs">
        Combined: Interactive chips with collapse/expand
      </p>
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {},
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h4 className="mb-3 text-sm font-semibold">Small (default)</h4>
        <ChipList items={mixedItems} size="sm" />
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold">Medium</h4>
        <ChipList items={mixedItems} size="md" />
      </div>
    </div>
  ),
};

export const BilingualLists: Story = {
  parameters: {},
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h4 className="mb-3 text-sm font-semibold">English</h4>
        <ChipList
          items={[
            { id: '1', label: 'Abraham', color: 'person', frequency: 175 },
            { id: '2', label: 'Jerusalem', color: 'place', frequency: 89 },
            { id: '3', label: 'Passover', color: 'event', frequency: 23 },
          ]}
        />
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold">Korean</h4>
        <ChipList
          items={[
            { id: '1', label: '아브라함', color: 'person', frequency: 175 },
            { id: '2', label: '예루살렘', color: 'place', frequency: 89 },
            { id: '3', label: '유월절', color: 'event', frequency: 23 },
          ]}
        />
      </div>
    </div>
  ),
};

export const EmptyList: Story = {
  parameters: {},
  render: () => (
    <div className="flex flex-col gap-3">
      <ChipList items={[]} />
      <p className="text-neutral-11 dark:text-neutral-dark-11 text-xs">
        Empty lists render nothing (no container div)
      </p>
    </div>
  ),
};

export const RealWorldExample: Story = {
  parameters: {},
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="border-neutral-6 dark:border-neutral-dark-6 bg-neutral-1 dark:bg-neutral-dark-1 rounded-lg border p-4">
        <h3 className="mb-2 text-base font-semibold">Genesis 1:1</h3>
        <p className="text-verse text-neutral-12 dark:text-neutral-dark-12 mb-4">
          In the beginning God created the heaven and the earth.
        </p>

        <div className="space-y-4">
          <div>
            <h4 className="text-neutral-11 dark:text-neutral-dark-11 mb-2 text-xs font-semibold tracking-wide uppercase">
              Often Mentioned Together
            </h4>
            <ChipList
              items={[
                {
                  id: 'god',
                  label: 'God',
                  color: 'person',
                  frequency: 34,
                  onClick: () => console.log('Chip clicked'),
                },
                {
                  id: 'heaven',
                  label: 'Heaven',
                  color: 'place',
                  frequency: 12,
                  onClick: () => console.log('Chip clicked'),
                },
                {
                  id: 'earth',
                  label: 'Earth',
                  color: 'place',
                  frequency: 18,
                  onClick: () => console.log('Chip clicked'),
                },
                {
                  id: 'creation',
                  label: 'Creation',
                  color: 'event',
                  frequency: 7,
                  onClick: () => console.log('Chip clicked'),
                },
              ]}
              interactive
            />
          </div>
        </div>
      </div>

      <p className="text-neutral-11 dark:text-neutral-dark-11 text-xs">
        Example: Entity panel showing co-mentioned entities
      </p>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    items: mixedItems,
    size: 'sm',
    interactive: false,
    collapsible: false,
    initialVisibleCount: 10,
  },
};
