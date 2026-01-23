/**
 * iGyan App - Profile Page
 * User profile, settings, and achievements
 */

import React from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { IconSymbol } from '../../components/IconSymbol';
import { useThemeColor } from '../../hooks/useThemeColor';
import { profileStyles } from '../../styles/pages/profileStyles';

const menuItems = [
  { icon: 'book.fill', title: 'My Courses', badge: 12 },
  { icon: 'star.fill', title: 'Certificates', badge: 3 },
  { icon: 'bell.fill', title: 'Notifications', badge: 5 },
  { icon: 'gear', title: 'Settings', badge: null },
];

export default function ProfilePage() {
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'border');

  return (
    <ThemedView style={profileStyles.container}>
      <ScrollView>
        {/* Header Section */}
        <View style={profileStyles.header}>
          <View style={profileStyles.avatarContainer}>
            <ThemedText style={profileStyles.avatarText}>JD</ThemedText>
          </View>
          <ThemedText style={profileStyles.userName}>John Doe</ThemedText>
          <ThemedText style={profileStyles.userEmail}>john.doe@example.com</ThemedText>
        </View>

        {/* Stats Row */}
        <View style={[profileStyles.statsRow, { borderColor }]}>
          <View style={profileStyles.statItem}>
            <ThemedText style={profileStyles.statValue}>12</ThemedText>
            <ThemedText style={profileStyles.statLabel}>Courses</ThemedText>
          </View>
          <View style={profileStyles.statItem}>
            <ThemedText style={profileStyles.statValue}>156</ThemedText>
            <ThemedText style={profileStyles.statLabel}>Hours</ThemedText>
          </View>
          <View style={profileStyles.statItem}>
            <ThemedText style={profileStyles.statValue}>3</ThemedText>
            <ThemedText style={profileStyles.statLabel}>Certificates</ThemedText>
          </View>
        </View>

        {/* Achievements */}
        <View style={profileStyles.menuSection}>
          <ThemedText style={profileStyles.sectionTitle}>🏆 Achievements</ThemedText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={profileStyles.achievementsContainer}>
              {['🎯', '🌟', '🔥', '💪', '🎓'].map((emoji, index) => (
                <View key={index} style={profileStyles.achievementBadge}>
                  <ThemedText style={{ fontSize: 24 }}>{emoji}</ThemedText>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Menu Items */}
        <View style={profileStyles.menuSection}>
          <ThemedText style={profileStyles.sectionTitle}>Account</ThemedText>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index}>
              <View style={[profileStyles.menuItem, { backgroundColor: cardColor }]}>
                <IconSymbol name={item.icon} size={24} color="#1E88E5" style={profileStyles.menuIcon} />
                <ThemedText style={profileStyles.menuText}>{item.title}</ThemedText>
                {item.badge && (
                  <View style={{ 
                    backgroundColor: '#1E88E5', 
                    borderRadius: 12, 
                    paddingHorizontal: 8, 
                    paddingVertical: 2,
                    marginRight: 8,
                  }}>
                    <ThemedText style={{ color: '#FFF', fontSize: 12 }}>{item.badge}</ThemedText>
                  </View>
                )}
                <IconSymbol name="chevron.right" size={20} color={textColor} style={profileStyles.menuArrow} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={profileStyles.logoutButton}>
          <ThemedText style={profileStyles.logoutText}>Logout</ThemedText>
        </TouchableOpacity>

        {/* App Version */}
        <ThemedText style={{ textAlign: 'center', opacity: 0.5, marginBottom: 24 }}>
          iGyan v1.0.0
        </ThemedText>
      </ScrollView>
    </ThemedView>
  );
}
