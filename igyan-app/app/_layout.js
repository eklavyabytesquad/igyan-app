/**
 * iGyan App - Root Layout
 * Main layout configuration for the educational app
 */

import React from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '../hooks/useColorScheme';
import { AuthProvider } from '../utils/AuthContext';

// Custom theme for iGyan
const iGyanLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#00abf4',
    background: '#f8fafc',
    card: '#FFFFFF',
    text: '#0a2434',
    border: '#135167',
  },
};

const iGyanDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#00abf4',
    background: '#0a2434',
    card: '#135167',
    text: '#f8fafc',
    border: '#135167',
  },
};

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? iGyanDarkTheme : iGyanLightTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="welcome" options={{ headerShown: false }} />
          <Stack.Screen name="auth-options" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ presentation: 'modal', headerShown: false }} />
          <Stack.Screen name="signup" options={{ presentation: 'modal', headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="course/[id]" options={{ title: 'Course Details', headerShown: true }} />
          <Stack.Screen name="lesson/[id]" options={{ title: 'Lesson', headerShown: true }} />
          <Stack.Screen name="settings" options={{ title: 'Settings', headerShown: true }} />
        </Stack>
        <StatusBar style="light" />
      </ThemeProvider>
    </AuthProvider>
  );
}
