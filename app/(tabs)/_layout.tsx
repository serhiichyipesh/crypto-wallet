import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '@ui-kitten/components';
import { Tabs } from 'expo-router';
import { View } from 'react-native';

export default function TabLayout() {
  const theme = useTheme();

  const mainBgColor = theme['color-basic-1000'];
  const mainBorderColor = theme['color-basic-700'];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme['color-primary-500'],
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
          title: 'Home',

          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="swap"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                backgroundColor: focused
                  ? theme['color-primary-500']
                  : mainBgColor,
                borderColor: focused
                  ? theme['color-primary-500']
                  : mainBorderColor,
                top: -14,
                height: 52,
                width: 52,
                borderRadius: 1000,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 0.5,
                elevation: 5,
                shadowOpacity: 0.2,
              }}
            >
              <Ionicons
                name="swap-vertical"
                size={28}
                color={focused ? 'white' : color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Wallets',
          tabBarIcon: ({ color }) => (
            <Entypo name="wallet" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
