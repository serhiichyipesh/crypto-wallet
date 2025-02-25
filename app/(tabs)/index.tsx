import { ScreenContainer } from '@/shared/ui';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Layout, Text, useTheme } from '@ui-kitten/components';
import { Link } from 'expo-router';

export default function Tab() {
  const theme = useTheme();

  return (
    <ScreenContainer className="items-center pt-16">
      <Layout className="my-2 flex w-full flex-row">
        <Text>Home s</Text>

        <Link href="/settings">
          <Ionicons
            name="settings"
            size={24}
            color={theme['color-primary-500']}
          />
        </Link>

        <Link href="/wallet/create">Add wallet</Link>
      </Layout>
    </ScreenContainer>
  );
}
