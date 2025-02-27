import { Meta, StoryObj } from '@storybook/react';
import { CloseModalButton } from '@shared/ui';

const meta: Meta<typeof CloseModalButton> = {
  title: 'CloseModalButton',
  component: CloseModalButton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CloseModalButton>;

export const Default: Story = {};
