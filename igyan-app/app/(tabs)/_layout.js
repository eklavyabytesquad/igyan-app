/**
 * iGyan App - Tab Layout
 * Bottom tab navigation configuration
 */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';

import { HapticTab } from '../../components/HapticTab';
import { IconSymbol } from '../../components/IconSymbol';
import Header from '../../components/Header';
import { Colors } from '../../constants/theme';
import { useColorScheme } from '../../hooks/useColorScheme';
import { useAuth } from '../../utils/AuthContext';
import { useSideNav } from '../../utils/SideNavContext';
import { supabase } from '../../utils/supabase';

const INSTITUTIONAL_ROLES = ['super_admin', 'co_admin', 'student', 'faculty'];

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user } = useAuth();
  const { openSideNav } = useSideNav();
  const [schoolName, setSchoolName] = useState('iGyan');

  useEffect(() => {
    if (user && user.school_id && INSTITUTIONAL_ROLES.includes(user.role)) {
      fetchSchoolName();
    }
  }, [user]);

  const fetchSchoolName = async () => {
    try {
      const { data, error } = await supabase
        .from('schools')
        .select('school_name')
        .eq('id', user.school_id)
        .single();
      
      if (!error && data) {
        setSchoolName(data.school_name);
      }
    } catch (error) {
      console.error('Error fetching school name:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Header title={schoolName} onMenuPress={openSideNav} />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#00abf4',
          tabBarInactiveTintColor: '#7a8b9c',
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarStyle: {
            backgroundColor: '#0a2434',
            borderTopColor: '#135167',
            borderTopWidth: 1,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a2434',
  },
});
