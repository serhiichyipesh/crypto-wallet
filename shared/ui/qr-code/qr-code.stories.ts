import { Meta, StoryObj } from '@storybook/react';
import { QrCode } from '@shared/ui';

const meta: Meta<typeof QrCode> = {
  title: 'QrCode',
  component: QrCode,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof QrCode>;

export const Default: Story = {
  args: {
    data: 'test',
  },
};
