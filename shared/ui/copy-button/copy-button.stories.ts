import { Meta, StoryObj } from '@storybook/react';
import { CopyButton } from '@shared/ui';

const meta: Meta<typeof CopyButton> = {
  title: 'CopyButton',
  component: CopyButton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CopyButton>;

export const Default: Story = {
  args: {
    stringToCopy: 'test',
  },
};
