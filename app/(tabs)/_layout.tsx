import Entypo from '@expo/vector-icons/Entypo';
import { Tabs } from 'expo-router';
import { COLORS_MAP } from '@shared/config';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  const mainBgColor = COLORS_MAP['color-basic-1000'];
  const mainBorderColor = COLORS_MAP['color-basic-700'];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS_MAP['color-primary-500'],
        headerShown: false,
        tabBarStyle: {
          backgroundColor: mainBgColor,
          borderColor: mainBorderColor,
          elevation: 5,
          shadowOpacity: 0.15,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Wallets',
          tabBarIcon: ({ color }) => (
            <Entypo name="wallet" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Setting',
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
