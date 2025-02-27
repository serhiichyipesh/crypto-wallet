import { Meta } from '@storybook/react';
import { Separator } from '@shared/ui';
import { COLORS } from '@shared/config';

const meta: Meta<typeof Separator> = {
  title: 'Separator',
  component: Separator,
  tags: ['autodocs'],
  argTypes: {
    bg: { options: COLORS, control: { type: 'select' } },
  },
};

export default meta;

export const Default = {};
