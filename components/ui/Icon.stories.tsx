import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Icon,
  EntityIcon,
  entityIconMap,
  iconSizeMap,
  type IconSize,
  type EntityType,
} from './Icon';
import {
  Users,
  MapPin,
  Calendar,
  ChevronRight,
  Search,
  BookOpen,
  Menu,
  X,
  Info,
} from 'lucide-react';

const meta = {
  title: 'UI/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Icon wrapper component with entity type support and consistent sizing. Provides accessible icon rendering with automatic entity color mapping.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: Object.keys(iconSizeMap),
      description: 'Size variant (xs: 14px, sm: 16px, md: 20px, lg: 24px)',
    },
    strokeWidth: {
      control: { type: 'range', min: 1, max: 3, step: 0.5 },
      description: 'Icon stroke width',
    },
    decorative: {
      control: 'boolean',
      description: 'If true, icon is hidden from screen readers',
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic icon rendering with different Lucide icons
 */
export const BasicIcons: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Icon icon={Users} aria-label="Users" />
      <Icon icon={MapPin} aria-label="Location" />
      <Icon icon={Calendar} aria-label="Calendar" />
      <Icon icon={Search} aria-label="Search" />
      <Icon icon={BookOpen} aria-label="Book" />
      <Icon icon={Menu} aria-label="Menu" />
    </div>
  ),
};

/**
 * Icon size variants (xs: 14px, sm: 16px, md: 20px, lg: 24px)
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      {(Object.keys(iconSizeMap) as IconSize[]).map(size => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Icon icon={BookOpen} size={size} aria-label={`Book icon ${size}`} />
          <span className="text-neutral-11 dark:text-neutral-dark-11 text-xs">
            {size} ({iconSizeMap[size]}px)
          </span>
        </div>
      ))}
    </div>
  ),
};

/**
 * Custom pixel size override
 */
export const CustomSize: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Calendar} customSize={32} aria-label="Large calendar" />
        <span className="text-neutral-11 dark:text-neutral-dark-11 text-xs">32px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Calendar} customSize={48} aria-label="Extra large calendar" />
        <span className="text-neutral-11 dark:text-neutral-dark-11 text-xs">48px</span>
      </div>
    </div>
  ),
};

/**
 * Stroke width variations for different visual weights
 */
export const StrokeWidths: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Search} size="lg" strokeWidth={1} aria-label="Thin search" />
        <span className="text-neutral-11 dark:text-neutral-dark-11 text-xs">thin (1)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Search} size="lg" strokeWidth={2} aria-label="Normal search" />
        <span className="text-neutral-11 dark:text-neutral-dark-11 text-xs">normal (2)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Search} size="lg" strokeWidth={2.5} aria-label="Medium search" />
        <span className="text-neutral-11 dark:text-neutral-dark-11 text-xs">medium (2.5)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Search} size="lg" strokeWidth={3} aria-label="Bold search" />
        <span className="text-neutral-11 dark:text-neutral-dark-11 text-xs">bold (3)</span>
      </div>
    </div>
  ),
};

/**
 * Entity-based icon selection with automatic color mapping
 */
export const EntityIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-6">
        {(Object.keys(entityIconMap) as EntityType[]).map(entityType => (
          <div key={entityType} className="flex flex-col items-center gap-2">
            <EntityIcon type={entityType} size="lg" aria-label={`${entityType} icon`} />
            <span className="text-neutral-11 dark:text-neutral-dark-11 text-xs">{entityType}</span>
          </div>
        ))}
      </div>

      <div className="text-neutral-11 dark:text-neutral-dark-11 border-neutral-6 dark:border-neutral-dark-6 bg-neutral-2 dark:bg-neutral-dark-2 rounded-lg border p-4 text-xs">
        <strong>EntityIcon component:</strong> Automatically applies entity colors from CSS
        variables:
        <ul className="mt-2 list-inside list-disc space-y-1">
          <li className="text-accent-person dark:text-accent-person-dark">
            Person: Blue (--color-accent-person)
          </li>
          <li className="text-accent-place dark:text-accent-place-dark">
            Place: Green (--color-accent-place)
          </li>
          <li className="text-accent-event dark:text-accent-event-dark">
            Event: Amber (--color-accent-event)
          </li>
        </ul>
      </div>
    </div>
  ),
};

/**
 * Icons in different UI contexts (buttons, inputs, navigation)
 */
export const InContext: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {/* Icon in button */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="bg-neutral-12 hover:bg-neutral-11 flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white"
        >
          <Icon icon={Search} size="sm" decorative />
          Search Scripture
        </button>

        <button
          type="button"
          className="border-neutral-7 hover:bg-neutral-3 flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium"
        >
          <Icon icon={BookOpen} size="sm" decorative />
          Browse Books
        </button>
      </div>

      {/* Icon-only button */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="hover:bg-neutral-3 dark:hover:bg-neutral-dark-3 rounded-md p-2"
          aria-label="Close"
        >
          <Icon icon={X} size="sm" decorative />
        </button>
        <button
          type="button"
          className="hover:bg-neutral-3 dark:hover:bg-neutral-dark-3 rounded-md p-2"
          aria-label="Menu"
        >
          <Icon icon={Menu} size="sm" decorative />
        </button>
        <button
          type="button"
          className="hover:bg-neutral-3 dark:hover:bg-neutral-dark-3 rounded-md p-2"
          aria-label="Information"
        >
          <Icon icon={Info} size="sm" decorative />
        </button>
      </div>

      {/* Navigation with chevron */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="text-neutral-11 hover:text-neutral-12 dark:text-neutral-dark-11 dark:hover:text-neutral-dark-12 flex items-center gap-1 text-sm"
        >
          Previous Chapter
          <Icon icon={ChevronRight} size="xs" decorative className="rotate-180" />
        </button>
        <button
          type="button"
          className="text-neutral-11 hover:text-neutral-12 dark:text-neutral-dark-11 dark:hover:text-neutral-dark-12 flex items-center gap-1 text-sm"
        >
          Next Chapter
          <Icon icon={ChevronRight} size="xs" decorative />
        </button>
      </div>

      {/* With text labels */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <EntityIcon type="person" size="sm" decorative />
          <span className="text-sm">23 People</span>
        </div>
        <div className="flex items-center gap-2">
          <EntityIcon type="place" size="sm" decorative />
          <span className="text-sm">8 Places</span>
        </div>
        <div className="flex items-center gap-2">
          <EntityIcon type="event" size="sm" decorative />
          <span className="text-sm">5 Events</span>
        </div>
      </div>
    </div>
  ),
};

/**
 * Decorative vs semantic icons (accessibility)
 */
export const Accessibility: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="border-neutral-6 dark:border-neutral-dark-6 bg-neutral-2 dark:bg-neutral-dark-2 rounded-lg border p-4">
        <h3 className="mb-3 text-sm font-semibold">Semantic Icon (has aria-label)</h3>
        <button type="button" className="hover:bg-neutral-3 rounded-md p-2">
          <Icon icon={Search} size="md" aria-label="Search" />
        </button>
        <p className="text-neutral-11 dark:text-neutral-dark-11 mt-2 text-xs">
          Screen readers announce: &quot;Search, button&quot;
        </p>
      </div>

      <div className="border-neutral-6 dark:border-neutral-dark-6 bg-neutral-2 dark:bg-neutral-dark-2 rounded-lg border p-4">
        <h3 className="mb-3 text-sm font-semibold">Decorative Icon (aria-hidden)</h3>
        <button type="button" className="hover:bg-neutral-3 rounded-md p-2">
          <Icon icon={Search} size="md" decorative />
          <span className="sr-only">Search</span>
        </button>
        <p className="text-neutral-11 dark:text-neutral-dark-11 mt-2 text-xs">
          Icon hidden from screen readers. Button text provides context.
        </p>
      </div>

      <div className="text-neutral-11 dark:text-neutral-dark-11 border-amber-6 bg-amber-2 rounded-lg border p-4 text-xs">
        <strong>Best Practice:</strong> Use <code>decorative=true</code> when icon is alongside
        text. Use <code>aria-label</code> for icon-only buttons.
      </div>
    </div>
  ),
};

/**
 * Interactive playground with controls
 */
export const Playground: Story = {
  args: {
    icon: Search,
    size: 'md',
    strokeWidth: 2,
    decorative: false,
    'aria-label': 'Search icon',
  },
  argTypes: {
    icon: {
      control: false,
    },
  },
};
