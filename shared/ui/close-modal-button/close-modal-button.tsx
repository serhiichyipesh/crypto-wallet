import { Button } from '@shared/ui';
import { memo } from 'react';
import { router } from 'expo-router';
import { Fontisto } from '@expo/vector-icons';

export const CloseModalButton = memo(() => {
  return (
    <Button
      style={{
        position: 'absolute',
        right: 12,
        top: 12,
        paddingHorizontal: 0,
        borderRadius: 1000,
      }}
      status="basic"
      size="small"
      onPress={() => router.back()}
    >
      <Fontisto name="close-a" size={24} />
    </Button>
  );
});
