import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { X, Plus, Download } from 'lucide-react';
import { Button } from './Button';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'subtle', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    iconOnly: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Subtle: Story = {
  args: {
    variant: 'subtle',
    children: 'Subtle Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Delete',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Medium Button',
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Plus className="h-4 w-4" />
        Add Item
      </>
    ),
  },
};

export const IconOnly: Story = {
  args: {
    iconOnly: true,
    'aria-label': 'Close',
    children: <X className="h-4 w-4" />,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

export const FullWidth: Story = {
  parameters: {
    layout: 'padded',
  },
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
};

export const AllVariants: Story = {
  parameters: {
    layout: 'padded',
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button variant="primary">Primary</Button>
        <Button variant="subtle">Subtle</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </div>
      <div className="flex gap-2">
        <Button variant="primary" size="sm">
          Small
        </Button>
        <Button variant="subtle" size="sm">
          Small
        </Button>
        <Button variant="ghost" size="sm">
          Small
        </Button>
      </div>
      <div className="flex gap-2">
        <Button iconOnly aria-label="Download">
          <Download className="h-4 w-4" />
        </Button>
        <Button iconOnly aria-label="Add">
          <Plus className="h-4 w-4" />
        </Button>
        <Button iconOnly aria-label="Close">
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  ),
};
