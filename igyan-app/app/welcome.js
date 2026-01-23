/**
 * iGyan App - Welcome Screen
 * First screen users see when opening the app
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { IconSymbol } from '../components/IconSymbol';

export default function WelcomeScreen() {
  const router = useRouter();
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleGetStarted = () => {
    router.push('/auth-options');
  };

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <Animated.View 
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.logoCircle}>
          <IconSymbol name="graduationcap.fill" size={60} color="#f8fafc" />
        </View>
        <Text style={styles.appName}>iGyan</Text>
        <Text style={styles.tagline}>Learn, Grow, Succeed</Text>
      </Animated.View>

      {/* Welcome Message */}
      <Animated.View style={[styles.textContainer, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Welcome to iGyan</Text>
        <Text style={styles.description}>
          Your journey to knowledge starts here. Access thousands of courses from expert instructors worldwide.
        </Text>
      </Animated.View>

      {/* Get Started Button */}
      <Animated.View style={[styles.buttonContainer, { opacity: fadeAnim }]}>
        <TouchableOpacity style={styles.startButton} onPress={handleGetStarted}>
          <Text style={styles.startButtonText}>Get Started</Text>
          <IconSymbol name="chevron.right" size={24} color="#0a2434" />
        </TouchableOpacity>
      </Animated.View>

      {/* Decorative Elements */}
      <View style={styles.decorCircle1} />
      <View style={styles.decorCircle2} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a2434',
    justifyContent: 'space-between',
    padding: 24,
    paddingTop: 80,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#135167',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#00abf4',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  appName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#f8fafc',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 18,
    color: '#00abf4',
    fontWeight: '500',
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#f8fafc',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#f8fafc',
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.8,
  },
  buttonContainer: {
    width: '100%',
  },
  startButton: {
    backgroundColor: '#00abf4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    shadowColor: '#00abf4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  startButtonText: {
    color: '#0a2434',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 8,
  },
  decorCircle1: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#135167',
    opacity: 0.3,
  },
  decorCircle2: {
    position: 'absolute',
    bottom: -80,
    left: -80,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#00abf4',
    opacity: 0.1,
  },
});
