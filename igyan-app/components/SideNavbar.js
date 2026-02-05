/**
 * iGyan App - Side Navigation Bar Component
 * Professional side drawer navigation with smooth animations
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconSymbol } from './IconSymbol';
import { useAuth } from '../utils/AuthContext';
import { Colors, Spacing, FontSizes } from '../constants/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const DRAWER_WIDTH = Math.min(300, SCREEN_WIDTH * 0.8);

const navItems = [
  { id: 'home', label: 'Home', icon: 'house.fill', route: '/(tabs)/home' },
  { id: 'courses', label: 'My Courses', icon: 'book.fill', route: '/(tabs)/courses' },
  { id: 'explore', label: 'Explore', icon: 'magnifyingglass', route: '/(tabs)/explore' },
  { id: 'live', label: 'Live Classroom', icon: 'video.fill', route: '/live-classroom' },
  { id: 'tools', label: 'AI Tools', icon: 'wand.and.stars', route: '/tools' },
];

const bottomNavItems = [
  { id: 'settings', label: 'Settings', icon: 'gearshape.fill', route: '/settings' },
];

export default function SideNavbar({ isOpen, onClose }) {
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuth();
  
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 280,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 280,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -DRAWER_WIDTH,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isOpen]);

  const handleNavigation = (route) => {
    onClose();
    setTimeout(() => {
      router.push(route);
    }, 150);
  };

  const handleLogout = async () => {
    onClose();
    try {
      await logout();
      router.replace('/welcome');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getUserInitials = () => {
    if (!user?.full_name) return 'U';
    const names = user.full_name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return names[0][0].toUpperCase();
  };

  const getUserRole = () => {
    if (!user?.role) return 'Student';
    const roleMap = {
      'super_admin': 'Super Admin',
      'co_admin': 'Co-Admin',
      'student': 'Student',
      'faculty': 'Faculty',
      'b2c_student': 'Learner',
      'b2c_mentor': 'Mentor',
    };
    return roleMap[user.role] || 'User';
  };

  if (!isOpen) return null;

  return (
    <View style={[styles.container, { height: SCREEN_HEIGHT }]}>
      {/* Backdrop */}
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]} />
      </TouchableWithoutFeedback>

      {/* Drawer */}
      <Animated.View
        style={[
          styles.drawer,
          {
            transform: [{ translateX: slideAnim }],
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          },
        ]}
      >
        {/* Header / Profile Section */}
        <View style={styles.header}>
          <View style={styles.profileContainer}>
            <View style={styles.avatarContainer}>
              {user?.avatar_url ? (
                <Image source={{ uri: user.avatar_url }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarText}>{getUserInitials()}</Text>
                </View>
              )}
              <View style={styles.onlineIndicator} />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName} numberOfLines={1}>
                {user?.full_name || 'Guest User'}
              </Text>
              <Text style={styles.userRole}>{getUserRole()}</Text>
            </View>
          </View>
          
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <IconSymbol name="xmark" size={20} color="#f8fafc" />
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Navigation Items */}
        <View style={styles.navSection}>
          {navItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.navItem}
              onPress={() => handleNavigation(item.route)}
              activeOpacity={0.7}
            >
              <View style={styles.navIconContainer}>
                <IconSymbol name={item.icon} size={22} color="#00abf4" />
              </View>
              <Text style={styles.navLabel}>{item.label}</Text>
              <IconSymbol name="chevron.right" size={16} color="#7a8b9c" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Spacer */}
        <View style={styles.spacer} />

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          <View style={styles.divider} />
          
          {bottomNavItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.navItem}
              onPress={() => handleNavigation(item.route)}
              activeOpacity={0.7}
            >
              <View style={styles.navIconContainer}>
                <IconSymbol name={item.icon} size={22} color="#7a8b9c" />
              </View>
              <Text style={[styles.navLabel, { color: '#a0aab4' }]}>{item.label}</Text>
              <IconSymbol name="chevron.right" size={16} color="#7a8b9c" />
            </TouchableOpacity>
          ))}

          {/* Logout Button */}
          <TouchableOpacity
            style={[styles.navItem, styles.logoutItem]}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <View style={[styles.navIconContainer, styles.logoutIconContainer]}>
              <IconSymbol name="rectangle.portrait.and.arrow.right" size={22} color="#ef4444" />
            </View>
            <Text style={[styles.navLabel, styles.logoutLabel]}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>iGyan v1.0.0</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    elevation: 1000,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: DRAWER_WIDTH,
    height: '100%',
    backgroundColor: '#0a2434',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
      android: {
        elevation: 16,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#135167',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 24,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: '#00abf4',
  },
  avatarPlaceholder: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#00abf4',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#f8fafc',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#22c55e',
    borderWidth: 2,
    borderColor: '#135167',
  },
  userInfo: {
    marginLeft: 14,
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f8fafc',
    marginBottom: 2,
  },
  userRole: {
    fontSize: 13,
    color: '#00abf4',
    fontWeight: '500',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#135167',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  navSection: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginVertical: 2,
  },
  navIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 171, 244, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  navLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#f8fafc',
  },
  spacer: {
    flex: 1,
  },
  bottomSection: {
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  logoutItem: {
    marginTop: 8,
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
  },
  logoutIconContainer: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
  },
  logoutLabel: {
    color: '#ef4444',
    fontWeight: '600',
  },
  footer: {
    paddingVertical: 16,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#135167',
    marginHorizontal: 16,
  },
  footerText: {
    fontSize: 12,
    color: '#7a8b9c',
  },
});
