import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';
import { useAppTheme } from '../../contexts/ThemeContext';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { theme } = useAppTheme();

  // Vérification de sécurité pour le thème
  const safeTheme = theme || {
    colors: {
      primary: '#007AFF',
      textSecondary: '#6C757D',
      card: '#FFFFFF',
      border: '#E9ECEF',
      background: '#F8F9FA',
      text: '#000000',
    }
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: safeTheme.colors.primary,
        tabBarInactiveTintColor: safeTheme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: safeTheme.colors.card,
          borderTopColor: safeTheme.colors.border,
        },
        headerStyle: {
          backgroundColor: safeTheme.colors.background,
        },
        headerTintColor: safeTheme.colors.text,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color }) => <TabBarIcon name="bell" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Compte',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="accessibility"
        options={{
          title: 'Accessibilité',
          tabBarIcon: ({ color }) => <TabBarIcon name="universal-access" color={color} />,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
