import { Meta, StoryObj } from '@storybook/react';
import { Typography } from '@shared/ui';
import { COMPONENT_STATUSES, TYPOGRAPHY_SIZES } from '@shared/config';

const meta: Meta<typeof Typography> = {
  title: 'Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    status: { options: COMPONENT_STATUSES, control: { type: 'select' } },
    category: { options: TYPOGRAPHY_SIZES, control: { type: 'select' } },
  },
};

export default meta;

type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {
    children: 'Typography',
    style: { backgroundColor: 'black' },
    category: 'h1',
  },
};
