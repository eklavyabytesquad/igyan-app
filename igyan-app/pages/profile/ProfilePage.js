/**
 * iGyan App - Profile Page
 * User profile, settings, and achievements
 */

import React, { useState, useEffect } from 'react';
import { ScrollView, View, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { IconSymbol } from '../../components/IconSymbol';
import { useThemeColor } from '../../hooks/useThemeColor';
import { profileStyles } from '../../styles/pages/profileStyles';
import { useAuth } from '../../utils/AuthContext';
import { supabase } from '../../utils/supabase';
import { router } from 'expo-router';

const menuItems = [
  { icon: 'book.fill', title: 'My Courses', badge: 12 },
  { icon: 'star.fill', title: 'Certificates', badge: 3 },
  { icon: 'bell.fill', title: 'Notifications', badge: 5 },
  { icon: 'gear', title: 'Settings', badge: null },
];

const INSTITUTIONAL_ROLES = ['super_admin', 'co_admin', 'student', 'faculty'];

export default function ProfilePage() {
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'border');
  const { user, logout } = useAuth();
  
  const [schoolData, setSchoolData] = useState(null);
  const [loadingSchool, setLoadingSchool] = useState(false);

  useEffect(() => {
    if (user && user.school_id && INSTITUTIONAL_ROLES.includes(user.role)) {
      fetchSchoolData();
    }
  }, [user]);

  const fetchSchoolData = async () => {
    setLoadingSchool(true);
    try {
      const { data, error } = await supabase
        .from('schools')
        .select('*')
        .eq('id', user.school_id)
        .single();
      
      if (!error && data) {
        setSchoolData(data);
      }
    } catch (error) {
      console.error('Error fetching school data:', error);
    } finally {
      setLoadingSchool(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'NA';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const isInstitutionalUser = user && INSTITUTIONAL_ROLES.includes(user.role);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/welcome');
          },
        },
      ]
    );
  };

  return (
    <ThemedView style={profileStyles.container}>
      <ScrollView>
        {/* Header Section */}
        <View style={profileStyles.header}>
          <View style={profileStyles.avatarContainer}>
            {user?.image_base64 ? (
              <Image
                source={{ uri: user.image_base64 }}
                style={{ width: 100, height: 100, borderRadius: 50 }}
                resizeMode="cover"
              />
            ) : (
              <ThemedText style={profileStyles.avatarText}>
                {getInitials(user?.full_name)}
              </ThemedText>
            )}
          </View>
          <ThemedText style={profileStyles.userName}>{user?.full_name || 'Guest User'}</ThemedText>
          <ThemedText style={profileStyles.userEmail}>{user?.email || 'Not available'}</ThemedText>
          {user?.phone && (
            <ThemedText style={profileStyles.userEmail}>
              📱 {user.phone} {user.phone_verified && '✓'}
            </ThemedText>
          )}
          <View style={{ backgroundColor: '#00abf4', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, marginTop: 8 }}>
            <ThemedText style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>
              {user?.role?.replace('_', ' ').toUpperCase() || 'USER'}
            </ThemedText>
          </View>
        </View>

        {/* School Details for Institutional Users */}
        {isInstitutionalUser && user.school_id && (
          <View style={[profileStyles.menuSection, { backgroundColor: cardColor, padding: 16, borderRadius: 12, marginHorizontal: 16, marginBottom: 16 }]}>
            <ThemedText style={[profileStyles.sectionTitle, { marginBottom: 12 }]}>🏫 School Details</ThemedText>
            {loadingSchool ? (
              <ActivityIndicator color="#00abf4" />
            ) : schoolData ? (
              <View>
                {schoolData.logo_url && (
                  <Image
                    source={{ uri: schoolData.logo_url }}
                    style={{ width: 60, height: 60, borderRadius: 8, marginBottom: 12 }}
                    resizeMode="contain"
                  />
                )}
                <ThemedText style={{ fontSize: 16, fontWeight: '600', marginBottom: 4 }}>
                  {schoolData.school_name}
                </ThemedText>
                <ThemedText style={{ fontSize: 13, opacity: 0.7, marginBottom: 2 }}>
                  {schoolData.school_type?.replace('_', ' ').toUpperCase()}
                </ThemedText>
                {schoolData.affiliation_board && (
                  <ThemedText style={{ fontSize: 13, opacity: 0.7, marginBottom: 2 }}>
                    Board: {schoolData.affiliation_board}
                  </ThemedText>
                )}
                <ThemedText style={{ fontSize: 13, opacity: 0.7, marginBottom: 2 }}>
                  📍 {schoolData.city}, {schoolData.state}
                </ThemedText>
                <ThemedText style={{ fontSize: 13, opacity: 0.7, marginBottom: 2 }}>
                  📧 {schoolData.contact_email}
                </ThemedText>
                <ThemedText style={{ fontSize: 13, opacity: 0.7 }}>
                  📞 {schoolData.contact_phone}
                </ThemedText>
                {schoolData.principal_name && (
                  <ThemedText style={{ fontSize: 13, opacity: 0.7, marginTop: 8 }}>
                    Principal: {schoolData.principal_name}
                  </ThemedText>
                )}
              </View>
            ) : (
              <ThemedText style={{ opacity: 0.6 }}>No school data available</ThemedText>
            )}
          </View>
        )}

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
        <TouchableOpacity style={profileStyles.logoutButton} onPress={handleLogout}>
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
