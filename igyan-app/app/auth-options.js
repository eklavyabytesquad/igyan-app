/**
 * iGyan App - Portal Selection Screen
 * Choose between Institutional Suite and Professional Suite
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedView } from '../components/ThemedView';
import { IconSymbol } from '../components/IconSymbol';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const OPTIONS = [
  {
    href: '/login?variant=institutionalSuite',
    label: 'Institutional Suite',
    badge: 'Institutional Suite • Institutions',
    description: 'School and network leaders sign in to manage iGyan Ai copilots, automate operations, and orchestrate campus-wide innovation.',
    icon: 'graduationcap.fill',
    gradient: ['rgba(0, 171, 244, 0.2)', 'rgba(19, 81, 103, 0.1)'],
  },
  {
    href: '/login?variant=professionalSuite',
    label: 'Professional Suite',
    badge: 'Professional Suite • Personal',
    description: 'Students and families sign in to personalize copilots, access learning journeys, and track progress across devices.',
    icon: 'person.fill',
    gradient: ['rgba(0, 171, 244, 0.15)', 'rgba(10, 36, 52, 0.1)'],
  },
];

export default function AuthOptionsScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={['#0a2434', '#135167']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Image 
              source={require('../assets/logos/igx.png')} 
              style={styles.logoImage}
              resizeMode="contain"
            />
            <Text style={styles.title}>Choose Your Portal</Text>
            <Text style={styles.subtitle}>
              Select the portal that matches your role in the iGyan ecosystem
            </Text>
          </View>

          {/* Portal Options */}
          <View style={styles.optionsContainer}>
            {OPTIONS.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionCard}
                onPress={() => router.push(option.href)}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={['rgba(248, 250, 252, 0.98)', 'rgba(248, 250, 252, 0.95)']}
                  style={styles.cardGradient}
                >
                  {/* Icon and Content Row */}
                  <View style={styles.cardRow}>
                    <LinearGradient
                      colors={['#00abf4', '#135167']}
                      style={styles.iconContainer}
                    >
                      <IconSymbol name={option.icon} size={28} color="#f8fafc" />
                    </LinearGradient>
                    <View style={styles.cardContent}>
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{option.badge}</Text>
                      </View>
                      <Text style={styles.optionTitle}>{option.label}</Text>
                      <Text style={styles.optionDescription} numberOfLines={2}>{option.description}</Text>
                    </View>
                    <View style={styles.arrow}>
                      <IconSymbol name="chevron.right" size={18} color="#00abf4" />
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>

          {/* Help Text */}
          <Text style={styles.helpText}>
            Not sure which portal to use? Contact our support team for guidance.
          </Text>
        </View>
      </LinearGradient>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f8fafc',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: '#f8fafc',
    opacity: 0.85,
    textAlign: 'center',
    lineHeight: 19,
    paddingHorizontal: 20,
  },
  optionsContainer: {
    gap: 16,
    marginVertical: 20,
  },
  optionCard: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  cardGradient: {
    padding: 20,
    minHeight: 130,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 18,
  },
  cardContent: {
    flex: 1,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#00abf4',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#f8fafc',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  optionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0a2434',
    marginBottom: 6,
  },
  optionDescription: {
    fontSize: 13,
    color: '#135167',
    lineHeight: 18,
  },
  arrow: {
    backgroundColor: 'rgba(0, 171, 244, 0.1)',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  helpText: {
    textAlign: 'center',
    color: '#f8fafc',
    opacity: 0.6,
    fontSize: 12,
    lineHeight: 18,
    paddingHorizontal: 32,
    paddingBottom: 20,
  },
});
