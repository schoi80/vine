import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Skeleton, VerseSkeleton, ChapterSkeleton } from './Skeleton';

const meta = {
  title: 'UI/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular'],
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    variant: 'text',
    width: 200,
    height: 20,
  },
};

export const Circular: Story = {
  args: {
    variant: 'circular',
    width: 48,
    height: 48,
  },
};

export const Rectangular: Story = {
  args: {
    variant: 'rectangular',
    width: 300,
    height: 100,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Skeleton variant="text" width={200} height={16} />
      <Skeleton variant="text" width={300} height={20} />
      <Skeleton variant="circular" width={60} height={60} />
      <Skeleton variant="rectangular" width={400} height={120} />
    </div>
  ),
};

export const Verse: StoryObj<typeof VerseSkeleton> = {
  render: () => <VerseSkeleton />,
};

export const Chapter: StoryObj<typeof ChapterSkeleton> = {
  render: () => <ChapterSkeleton verseCount={5} />,
};

export const CardSkeleton: Story = {
  render: () => (
    <div className="bg-neutral-2 dark:bg-neutral-dark-2 w-[400px] rounded-lg p-4">
      <div className="flex items-center gap-3">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="60%" height={16} />
          <Skeleton variant="text" width="40%" height={14} />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <Skeleton variant="text" width="100%" height={14} />
        <Skeleton variant="text" width="95%" height={14} />
        <Skeleton variant="text" width="80%" height={14} />
      </div>
      <div className="mt-4 flex gap-2">
        <Skeleton variant="rectangular" width={80} height={32} />
        <Skeleton variant="rectangular" width={80} height={32} />
      </div>
    </div>
  ),
};
