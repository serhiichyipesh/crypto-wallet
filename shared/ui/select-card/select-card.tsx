import { memo } from 'react';
import { Card, CardProps } from '@ui-kitten/components';
import { TColor } from '@shared/models';
import { COLORS_MAP } from '@shared/config';

type SelectCardProps = CardProps & {
  isSelected?: boolean;
  selectedBorder?: TColor;
  border?: TColor;
  bgColor?: TColor;
};

export const SelectCard = memo(
  ({
    isSelected,
    selectedBorder,
    border,
    bgColor,
    ...rest
  }: SelectCardProps) => {
    return (
      <Card
        style={[
          bgColor && { backgroundColor: COLORS_MAP[bgColor] },
          border && { borderColor: COLORS_MAP[border] },
          isSelected && {
            borderColor: COLORS_MAP[selectedBorder || 'color-primary-500'],
          },
        ]}
        {...rest}
      />
    );
  }
);
