import { Meta } from '@storybook/react';
import { ScreenContainer, ScreenTitle } from '@shared/ui';

const meta: Meta<typeof ScreenTitle> = {
  title: 'ScreenTitle',
  component: ScreenTitle,
  tags: ['autodocs'],
};

export default meta;

export const Default = () => {
  return (
    <ScreenContainer>
      <ScreenTitle title="Title" />
    </ScreenContainer>
  );
};

export const WithBackButton = () => {
  return (
    <ScreenContainer>
      <ScreenTitle withBackButton title="Title" />
    </ScreenContainer>
  );
};
