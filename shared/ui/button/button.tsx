import {
  Button as UIButton,
  type ButtonProps,
  Spinner,
} from '@ui-kitten/components';
import { memo } from 'react';
import { View } from 'react-native';

type TButtonProps = ButtonProps & { isLoading?: boolean };

export const Button = memo(({ children, isLoading, ...rest }: TButtonProps) => {
  return (
    <UIButton {...rest}>
      {isLoading ? (
        <View className="flex-row">
          <Spinner status="control" size="tiny" />
        </View>
      ) : (
        children
      )}
    </UIButton>
  );
});

Button.displayName = 'Button';
