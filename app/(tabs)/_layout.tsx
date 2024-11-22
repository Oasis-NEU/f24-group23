import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import React from 'react';

import AboutButton from '@/components/AboutButton';
import { useTheme } from '@react-navigation/native';

function TabBarIcon(props: { name: React.ComponentProps<typeof MaterialIcons>['name']; color: string }) {
  return <MaterialIcons style={{ fontSize: 28 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerRight: () => <AboutButton color={useTheme().colors.text} />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
        }}
      />
    </Tabs>
  );
}
