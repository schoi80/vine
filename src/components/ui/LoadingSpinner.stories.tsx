import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import LoadingSpinner from './LoadingSpinner';

const meta = {
  title: 'UI/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof LoadingSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <LoadingSpinner size="sm" ariaLabel="Small spinner" />
      <LoadingSpinner size="md" ariaLabel="Medium spinner" />
      <LoadingSpinner size="lg" ariaLabel="Large spinner" />
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <LoadingSpinner size="sm" />
        <span>Loading content...</span>
      </div>
      <button className="bg-neutral-3 hover:bg-neutral-4 dark:bg-neutral-dark-3 dark:hover:bg-neutral-dark-4 inline-flex items-center gap-2 rounded-md px-4 py-2">
        <LoadingSpinner size="sm" />
        Processing
      </button>
    </div>
  ),
};
