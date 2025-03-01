import { TextProps } from '@ui-kitten/components';
import { IconProps } from '@expo/vector-icons/build/createIconSet';
import { COLORS_MAP } from '@shared/config';

export const stepTitleProps: Partial<TextProps> = {
  category: 'h5',
  className: 'mb-8',
};

export const primaryIconColor: Partial<IconProps<string>> = {
  color: COLORS_MAP['color-primary-500'],
};

export const basicIconColor: Partial<IconProps<string>> = {
  color: COLORS_MAP['color-basic-100'],
};
