/**
 * iGyan App - Settings Screen
 */

import React from 'react';
import { View, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';
import { IconSymbol } from '../components/IconSymbol';
import { useThemeColor } from '../hooks/useThemeColor';

export default function SettingsScreen() {
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');

  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Preferences</ThemedText>
        
        <View style={[styles.settingItem, { backgroundColor: cardColor }]}>
          <IconSymbol name="bell.fill" size={24} color="#1E88E5" />
          <ThemedText style={styles.settingText}>Push Notifications</ThemedText>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#767577', true: '#1E88E5' }}
          />
        </View>

        <View style={[styles.settingItem, { backgroundColor: cardColor }]}>
          <IconSymbol name="star.fill" size={24} color="#1E88E5" />
          <ThemedText style={styles.settingText}>Dark Mode</ThemedText>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#767577', true: '#1E88E5' }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Account</ThemedText>
        
        <TouchableOpacity style={[styles.settingItem, { backgroundColor: cardColor }]}>
          <IconSymbol name="person.fill" size={24} color="#1E88E5" />
          <ThemedText style={styles.settingText}>Edit Profile</ThemedText>
          <IconSymbol name="chevron.right" size={20} color={textColor} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.settingItem, { backgroundColor: cardColor }]}>
          <IconSymbol name="gear" size={24} color="#1E88E5" />
          <ThemedText style={styles.settingText}>Privacy Settings</ThemedText>
          <IconSymbol name="chevron.right" size={20} color={textColor} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Support</ThemedText>
        
        <TouchableOpacity style={[styles.settingItem, { backgroundColor: cardColor }]}>
          <IconSymbol name="book.fill" size={24} color="#1E88E5" />
          <ThemedText style={styles.settingText}>Help Center</ThemedText>
          <IconSymbol name="chevron.right" size={20} color={textColor} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.settingItem, { backgroundColor: cardColor }]}>
          <IconSymbol name="paperplane.fill" size={24} color="#1E88E5" />
          <ThemedText style={styles.settingText}>Contact Us</ThemedText>
          <IconSymbol name="chevron.right" size={20} color={textColor} />
        </TouchableOpacity>
      </View>

      <ThemedText style={styles.version}>iGyan v1.0.0</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    marginLeft: 4,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
  version: {
    textAlign: 'center',
    opacity: 0.5,
    marginTop: 'auto',
  },
});
