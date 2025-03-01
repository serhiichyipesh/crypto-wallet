import { memo, PropsWithChildren } from 'react';
import { View } from 'react-native';

export const Avatar = memo((props: Required<PropsWithChildren>) => {
  return (
    <View
      {...props}
      className="size-9 items-center justify-center rounded-full bg-primary-500"
    />
  );
});
