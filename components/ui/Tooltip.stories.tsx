import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Tooltip, TooltipProvider } from './Tooltip';
import { Button } from './Button';
import { Icon, EntityIcon } from './Icon';
import { Info, HelpCircle, AlertCircle, Users } from 'lucide-react';

const meta = {
  title: 'UI/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <TooltipProvider>
        <div className="flex min-h-[200px] items-center justify-center p-8">
          <Story />
        </div>
      </TooltipProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Tooltip component built on Radix UI. Provides contextual information on hover with configurable positioning and delay.',
      },
    },
  },
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Tooltip position relative to trigger',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Tooltip alignment',
    },
    delayDuration: {
      control: { type: 'number', min: 0, max: 1000, step: 100 },
      description: 'Delay before tooltip appears (ms)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable tooltip',
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story =
  | StoryObj<typeof meta>
  | { render: () => React.ReactElement; parameters?: Record<string, any> };

export const Default: Story = {
  parameters: {},
  render: () => (
    <Tooltip content="This is a helpful tooltip" side="top" align="center">
      <Button variant="subtle">Hover me</Button>
    </Tooltip>
  ),
};

export const AllPositions: Story = {
  parameters: {},
  render: () => (
    <div className="grid grid-cols-2 gap-8">
      <div className="flex flex-col items-center gap-2">
        <Tooltip content="Tooltip on top" side="top">
          <Button variant="subtle" size="sm">
            Top
          </Button>
        </Tooltip>
        <span className="text-neutral-11 dark:text-neutral-dark-11 text-xs">
          side=&quot;top&quot;
        </span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Tooltip content="Tooltip on right" side="right">
          <Button variant="subtle" size="sm">
            Right
          </Button>
        </Tooltip>
        <span className="text-neutral-11 dark:text-neutral-dark-11 text-xs">
          side=&quot;right&quot;
        </span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Tooltip content="Tooltip on bottom" side="bottom">
          <Button variant="subtle" size="sm">
            Bottom
          </Button>
        </Tooltip>
        <span className="text-neutral-11 dark:text-neutral-dark-11 text-xs">
          side=&quot;bottom&quot;
        </span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Tooltip content="Tooltip on left" side="left">
          <Button variant="subtle" size="sm">
            Left
          </Button>
        </Tooltip>
        <span className="text-neutral-11 dark:text-neutral-dark-11 text-xs">
          side=&quot;left&quot;
        </span>
      </div>
    </div>
  ),
};

export const Alignment: Story = {
  parameters: {},
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Tooltip content="Aligned to start" side="top" align="start">
          <Button variant="subtle" size="sm">
            Start
          </Button>
        </Tooltip>
        <Tooltip content="Aligned to center" side="top" align="center">
          <Button variant="subtle" size="sm">
            Center
          </Button>
        </Tooltip>
        <Tooltip content="Aligned to end" side="top" align="end">
          <Button variant="subtle" size="sm">
            End
          </Button>
        </Tooltip>
      </div>

      <p className="text-neutral-11 dark:text-neutral-dark-11 text-xs">
        Alignment controls how tooltip aligns relative to trigger (start, center, end)
      </p>
    </div>
  ),
};

export const WithIcons: Story = {
  parameters: {},
  render: () => (
    <div className="flex items-center gap-4">
      <Tooltip content="Additional information about this feature">
        <button
          type="button"
          className="hover:bg-neutral-3 dark:hover:bg-neutral-dark-3 rounded-md p-2"
          aria-label="Information"
        >
          <Icon icon={Info} size="sm" decorative />
        </button>
      </Tooltip>

      <Tooltip content="Get help with this section">
        <button
          type="button"
          className="hover:bg-neutral-3 dark:hover:bg-neutral-dark-3 rounded-md p-2"
          aria-label="Help"
        >
          <Icon icon={HelpCircle} size="sm" decorative />
        </button>
      </Tooltip>

      <Tooltip content="Warning: This action cannot be undone">
        <button
          type="button"
          className="hover:bg-neutral-3 dark:hover:bg-neutral-dark-3 rounded-md p-2"
          aria-label="Warning"
        >
          <Icon icon={AlertCircle} size="sm" decorative className="text-red-500" />
        </button>
      </Tooltip>
    </div>
  ),
};

export const WithEntityIcons: Story = {
  parameters: {},
  render: () => (
    <div className="flex items-center gap-4">
      <Tooltip content="People mentioned in this verse">
        <div className="border-neutral-6 flex items-center gap-2 rounded-md border px-3 py-2">
          <EntityIcon type="person" size="sm" decorative />
          <span className="text-sm">23</span>
        </div>
      </Tooltip>

      <Tooltip content="Places referenced in this chapter">
        <div className="border-neutral-6 flex items-center gap-2 rounded-md border px-3 py-2">
          <EntityIcon type="place" size="sm" decorative />
          <span className="text-sm">8</span>
        </div>
      </Tooltip>

      <Tooltip content="Events described in this passage">
        <div className="border-neutral-6 flex items-center gap-2 rounded-md border px-3 py-2">
          <EntityIcon type="event" size="sm" decorative />
          <span className="text-sm">5</span>
        </div>
      </Tooltip>
    </div>
  ),
};

export const LongContent: Story = {
  parameters: {},
  render: () => (
    <Tooltip
      content="This is a longer tooltip with multiple lines of text. It demonstrates how the tooltip handles longer content and wraps appropriately within the max-width constraint."
      side="top"
    >
      <Button variant="subtle">Hover for long tooltip</Button>
    </Tooltip>
  ),
};

export const BilingualContent: Story = {
  parameters: {},
  render: () => (
    <div className="flex items-center gap-4">
      <Tooltip content="Search Scripture passages" side="top">
        <Button variant="subtle" size="sm">
          <Icon icon={Users} size="sm" decorative />
          English
        </Button>
      </Tooltip>

      <Tooltip content="성경 구절 검색" side="top">
        <Button variant="subtle" size="sm">
          <Icon icon={Users} size="sm" decorative />
          한국어
        </Button>
      </Tooltip>
    </div>
  ),
};

export const DisabledTooltip: Story = {
  parameters: {},
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Tooltip content="This tooltip is enabled" disabled={false}>
          <Button variant="subtle" size="sm">
            Enabled
          </Button>
        </Tooltip>

        <Tooltip content="This tooltip is disabled" disabled={true}>
          <Button variant="subtle" size="sm">
            Disabled
          </Button>
        </Tooltip>
      </div>

      <p className="text-neutral-11 dark:text-neutral-dark-11 text-xs">
        Use <code>disabled=true</code> to conditionally hide tooltips
      </p>
    </div>
  ),
};

export const CustomDelay: Story = {
  parameters: {},
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Tooltip content="Appears immediately" delayDuration={0}>
          <Button variant="subtle" size="sm">
            No delay
          </Button>
        </Tooltip>

        <Tooltip content="Default delay (300ms)">
          <Button variant="subtle" size="sm">
            Default
          </Button>
        </Tooltip>

        <Tooltip content="Longer delay (800ms)" delayDuration={800}>
          <Button variant="subtle" size="sm">
            Slow
          </Button>
        </Tooltip>
      </div>

      <p className="text-neutral-11 dark:text-neutral-dark-11 text-xs">
        Adjust <code>delayDuration</code> for immediate or delayed appearance
      </p>
    </div>
  ),
};

export const InButtonGroup: Story = {
  parameters: {},
  render: () => (
    <div className="flex items-center gap-2">
      <Tooltip content="Previous chapter">
        <Button variant="ghost" size="sm" aria-label="Previous">
          ←
        </Button>
      </Tooltip>

      <span className="text-neutral-11 dark:text-neutral-dark-11 px-4 text-sm">Genesis 1</span>

      <Tooltip content="Next chapter">
        <Button variant="ghost" size="sm" aria-label="Next">
          →
        </Button>
      </Tooltip>
    </div>
  ),
};

export const Playground: Story = {
  parameters: {},
  render: () => (
    <Tooltip
      content="Tooltip content"
      side="top"
      align="center"
      delayDuration={300}
      disabled={false}
    >
      <Button variant="subtle">Hover me</Button>
    </Tooltip>
  ),
};
