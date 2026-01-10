import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ExpandableTextArea } from './ExpandableTextArea';

const meta = {
  title: 'UI/ExpandableTextArea',
  component: ExpandableTextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    maxHeight: { control: 'number' },
  },
  decorators: [
    Story => (
      <div className="w-[400px] rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ExpandableTextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const shortText = 'This is a short summary that will not overflow the container.';

const longText = `This is a much longer summary that is intended to demonstrate the overflow functionality of the ExpandableTextArea component.

It contains multiple paragraphs to ensure we take up enough vertical space to trigger the overflow detection logic. The component should automatically detect that this content exceeds the maximum height and show a "Show More" button.

When clicked, the container should expand to show the full content, and the button should disappear. This pattern is commonly used in entity panels and other detail views where screen real estate is at a premium but full context is available on demand.`;

export const Short: Story = {
  args: {
    text: shortText,
    maxHeight: 100,
  },
};

export const LongOverflowing: Story = {
  args: {
    text: longText,
    maxHeight: 100,
  },
};

export const CustomMaxHeight: Story = {
  args: {
    text: longText,
    maxHeight: 200,
  },
};
