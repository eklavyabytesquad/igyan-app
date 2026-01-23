/**
 * iGyan App - Tab Layout
 * Bottom tab navigation configuration
 */

import React from 'react';
import { Tabs } from 'expo-router';

import { HapticTab } from '../../components/HapticTab';
import { IconSymbol } from '../../components/IconSymbol';
import { Colors } from '../../constants/theme';
import { useColorScheme } from '../../hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#00abf4',
        tabBarInactiveTintColor: '#7a8b9c',
        headerShown: true,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: '#0a2434',
          borderTopColor: '#135167',
          borderTopWidth: 1,
        },
        headerStyle: {
          backgroundColor: '#0a2434',
        },
        headerTintColor: '#f8fafc',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerTitle: 'iGyan',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: 'Courses',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="book.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="magnifyingglass" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
