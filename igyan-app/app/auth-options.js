/**
 * iGyan App - Auth Options Screen
 * Screen showing login and register options
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { IconSymbol } from '../components/IconSymbol';

export default function AuthOptionsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoCircle}>
          <IconSymbol name="graduationcap.fill" size={40} color="#f8fafc" />
        </View>
        <Text style={styles.appName}>iGyan</Text>
        <Text style={styles.subtitle}>Choose how to continue</Text>
      </View>

      {/* Auth Options */}
      <View style={styles.optionsContainer}>
        {/* Login Button */}
        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={() => router.push('/login')}
        >
          <IconSymbol name="person.fill" size={24} color="#0a2434" />
          <Text style={styles.primaryButtonText}>Login to Account</Text>
        </TouchableOpacity>

        {/* Register Button */}
        <TouchableOpacity 
          style={styles.secondaryButton} 
          onPress={() => router.push('/signup')}
        >
          <IconSymbol name="star.fill" size={24} color="#00abf4" />
          <Text style={styles.secondaryButtonText}>Create New Account</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social Login */}
        <TouchableOpacity style={styles.socialButton}>
          <IconSymbol name="paperplane.fill" size={24} color="#f8fafc" />
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <IconSymbol name="play.circle.fill" size={24} color="#f8fafc" />
          <Text style={styles.socialButtonText}>Continue with Apple</Text>
        </TouchableOpacity>
      </View>

      {/* Guest Mode */}
      <TouchableOpacity 
        style={styles.guestButton}
        onPress={() => router.push('/(tabs)/home')}
      >
        <Text style={styles.guestButtonText}>Continue as Guest</Text>
      </TouchableOpacity>

      {/* Terms */}
      <Text style={styles.terms}>
        By continuing, you agree to our Terms of Service and Privacy Policy
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a2434',
    padding: 24,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#135167',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#f8fafc',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#00abf4',
    opacity: 0.9,
  },
  optionsContainer: {
    flex: 1,
  },
  primaryButton: {
    backgroundColor: '#00abf4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#00abf4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  primaryButtonText: {
    color: '#0a2434',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  secondaryButton: {
    backgroundColor: '#135167',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#00abf4',
  },
  secondaryButtonText: {
    color: '#00abf4',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#135167',
  },
  dividerText: {
    color: '#f8fafc',
    opacity: 0.5,
    marginHorizontal: 16,
    fontSize: 14,
  },
  socialButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#135167',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 12,
  },
  socialButtonText: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  guestButton: {
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  guestButtonText: {
    color: '#00abf4',
    fontSize: 16,
    fontWeight: '600',
  },
  terms: {
    textAlign: 'center',
    fontSize: 12,
    color: '#f8fafc',
    opacity: 0.5,
    lineHeight: 18,
  },
});
