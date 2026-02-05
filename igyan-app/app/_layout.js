/**
 * iGyan App - Root Layout
 * Main layout configuration for the educational app
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-reanimated';

import { useColorScheme } from '../hooks/useColorScheme';
import { AuthProvider } from '../utils/AuthContext';
import { SideNavProvider, useSideNav } from '../utils/SideNavContext';
import SideNavbar from '../components/SideNavbar';

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

// Inner layout component that can access SideNav context
function RootLayoutContent() {
  const colorScheme = useColorScheme();
  const { isOpen, closeSideNav } = useSideNav();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? iGyanDarkTheme : iGyanLightTheme}>
      <View style={styles.container}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="welcome" options={{ headerShown: false }} />
          <Stack.Screen name="auth-options" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ presentation: 'modal', headerShown: false }} />
          <Stack.Screen name="signup" options={{ presentation: 'modal', headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="course/[id]" options={{ title: 'Course Details', headerShown: false }} />
          <Stack.Screen name="lesson/[id]" options={{ title: 'Lesson', headerShown: false }} />
          <Stack.Screen name="settings" options={{ title: 'Settings', headerShown: false }} />
          <Stack.Screen name="live-classroom" options={{ title: 'Live Classroom', headerShown: false }} />
          <Stack.Screen name="viva-ai" options={{ title: 'Viva AI', headerShown: false }} />
          <Stack.Screen name="tools" options={{ headerShown: false }} />
        </Stack>
        <SideNavbar isOpen={isOpen} onClose={closeSideNav} />
        <StatusBar style="light" />
      </View>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <SideNavProvider>
          <RootLayoutContent />
        </SideNavProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
