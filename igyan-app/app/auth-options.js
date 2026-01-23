/**
 * iGyan App - Portal Selection Screen
 * Choose between Institutional Suite and Professional Suite
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedView } from '../components/ThemedView';
import { IconSymbol } from '../components/IconSymbol';

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
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>iGyan</Text>
            </View>
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
                  {/* Badge */}
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{option.badge}</Text>
                  </View>

                  {/* Icon */}
                  <View style={styles.iconWrapper}>
                    <LinearGradient
                      colors={['#00abf4', '#135167']}
                      style={styles.iconContainer}
                    >
                      <IconSymbol name={option.icon} size={32} color="#f8fafc" />
                    </LinearGradient>
                  </View>

                  {/* Content */}
                  <Text style={styles.optionTitle}>{option.label}</Text>
                  <Text style={styles.optionDescription}>{option.description}</Text>

                  {/* Arrow */}
                  <View style={styles.arrow}>
                    <IconSymbol name="chevron.right" size={20} color="#00abf4" />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>

          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <IconSymbol name="chevron.left.forwardslash.chevron.right" size={18} color="#f8fafc" />
            <Text style={styles.backText}>Back to Welcome</Text>
          </TouchableOpacity>

          {/* Help Text */}
          <Text style={styles.helpText}>
            Not sure which portal to use? Contact our support team for guidance.
          </Text>
        </ScrollView>
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
  scrollContent: {
    padding: 24,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0a2434',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f8fafc',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#f8fafc',
    opacity: 0.8,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  optionsContainer: {
    gap: 20,
    marginBottom: 32,
  },
  optionCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  cardGradient: {
    padding: 24,
    minHeight: 200,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#00abf4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 20,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#f8fafc',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  iconWrapper: {
    marginBottom: 16,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0a2434',
    marginBottom: 10,
  },
  optionDescription: {
    fontSize: 14,
    color: '#135167',
    lineHeight: 21,
    marginBottom: 16,
  },
  arrow: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(0, 171, 244, 0.1)',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    marginBottom: 16,
  },
  backText: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '500',
  },
  helpText: {
    textAlign: 'center',
    color: '#f8fafc',
    opacity: 0.6,
    fontSize: 13,
    lineHeight: 20,
    paddingHorizontal: 32,
  },
});
