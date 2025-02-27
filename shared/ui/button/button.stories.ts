import { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';
import {
  COMPONENT_APPEARANCES,
  COMPONENT_SIZES,
  COMPONENT_STATUSES,
} from '@shared/config';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: { type: 'select' },
      options: COMPONENT_STATUSES,
    },
    size: {
      control: { type: 'select' },
      options: COMPONENT_SIZES,
    },
    appearance: {
      control: { type: 'select' },
      options: COMPONENT_APPEARANCES,
    },
    disabled: {
      control: { type: 'boolean' },
      options: ['disabled'],
    },
    isLoading: {
      control: { type: 'boolean' },
      options: ['loading'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
    status: 'primary',
    size: 'medium',
    appearance: 'filled',
  },
};
