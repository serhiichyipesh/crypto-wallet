import { Meta, StoryObj } from '@storybook/react';
import { ScreenContainer } from '@shared/ui';

const meta: Meta<typeof ScreenContainer> = {
  title: 'ScreenContainer',
  component: ScreenContainer,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ScreenContainer>;

export const Default: Story = {};
