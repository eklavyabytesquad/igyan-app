/**
 * iGyan App - Login Screen with Portal Support
 */

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedView } from '../components/ThemedView';
import { IconSymbol } from '../components/IconSymbol';
import { useAuth } from '../utils/AuthContext';

// Variant configurations
const VARIANT_CONFIG = {
  institutionalSuite: {
    badge: 'Institutional Suite • Institutions',
    title: 'Welcome back, visionary school leaders',
    subtitle: 'Access the unified control center for iGyan Ai copilots, compliance, and innovation programs tailored to your campus.',
    highlight: 'Institutional Suite',
    helperTitle: 'Need help accessing your institution?',
    helperText: 'Our strategy team can tailor governance, provisioning, and integrations for your network.',
    signupText: 'Need to invite your leadership team?',
    signupLink: 'Request workspace access',
  },
  professionalSuite: {
    badge: 'Professional Suite • Learners & Families',
    title: 'Log in to your iGyan learner copilots',
    subtitle: 'Stay on top of daily learning plans, passion projects, and venture studio challenges curated for curious minds and ambitious families.',
    highlight: 'Professional Suite',
    helperTitle: 'New to Professional Suite?',
    helperText: 'Request access in minutes and unlock guided roadmaps for the skills you want to master.',
    signupText: 'First time discovering Professional Suite?',
    signupLink: 'Create your personal account',
  },
};

export default function LoginScreen() {
  const params = useLocalSearchParams();
  const variant = params.variant || 'institutionalSuite';
  const config = VARIANT_CONFIG[variant];
  
  const { login, loading: authLoading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await login(email, password, variant);
      
      if (result.success) {
        // Navigate to main app
        router.replace('/(tabs)/home');
      } else {
        setError(result.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={['#0a2434', '#135167']}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Back Button */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <IconSymbol name="chevron.left.forwardslash.chevron.right" size={20} color="#f8fafc" />
            </TouchableOpacity>

            {/* Login Card */}
            <View style={styles.card}>
              {/* Badge */}
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{config.badge}</Text>
              </View>

              {/* Header */}
              <View style={styles.header}>
                <View style={styles.logoSmall}>
                  <Text style={styles.logoText}>iGyan</Text>
                </View>
                <Text style={styles.title}>{config.title}</Text>
                <Text style={styles.subtitle}>{config.subtitle}</Text>
              </View>

              {/* Error Message */}
              {error ? (
                <View style={styles.errorContainer}>
                  <IconSymbol name="bell.fill" size={16} color="#ff5252" />
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              ) : null}

              {/* Login Form */}
              <View style={styles.form}>
                {/* Email Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="you@school.com"
                      placeholderTextColor="#999"
                      value={email}
                      onChangeText={(text) => {
                        setEmail(text);
                        setError('');
                      }}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      editable={!loading}
                    />
                  </View>
                </View>

                {/* Password Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Password</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={[styles.input, styles.passwordInput]}
                      placeholder="••••••••"
                      placeholderTextColor="#999"
                      value={password}
                      onChangeText={(text) => {
                        setPassword(text);
                        setError('');
                      }}
                      secureTextEntry={!showPassword}
                      editable={!loading}
                    />
                    <TouchableOpacity
                      style={styles.eyeButton}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <IconSymbol
                        name={showPassword ? 'star.fill' : 'star.fill'}
                        size={20}
                        color="#666"
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Login Button */}
                <TouchableOpacity
                  style={[styles.loginButton, loading && styles.loginButtonDisabled]}
                  onPress={handleLogin}
                  disabled={loading}
                >
                  <LinearGradient
                    colors={['#00abf4', '#135167']}
                    style={styles.buttonGradient}
                  >
                    {loading ? (
                      <ActivityIndicator color="#ffffff" />
                    ) : (
                      <Text style={styles.loginButtonText}>Sign in to {config.highlight}</Text>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              {/* Helper Box */}
              <View style={styles.helperBox}>
                <LinearGradient
                  colors={['rgba(0, 171, 244, 0.1)', 'rgba(19, 81, 103, 0.05)']}
                  style={styles.helperGradient}
                >
                  <Text style={styles.helperTitle}>{config.helperTitle}</Text>
                  <Text style={styles.helperText}>{config.helperText}</Text>
                </LinearGradient>
              </View>

              {/* Sign Up Link */}
              <View style={styles.signupRow}>
                <Text style={styles.signupPrompt}>{config.signupText}</Text>
                <TouchableOpacity onPress={() => router.push('/signup')}>
                  <Text style={styles.signupLink}>{config.signupLink}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 60,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(248, 250, 252, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f8fafc',
    borderRadius: 24,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#00abf4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 24,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#f8fafc',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  logoSmall: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#0a2434',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f8fafc',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0a2434',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 30,
  },
  subtitle: {
    fontSize: 13,
    color: '#135167',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 8,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffebee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    gap: 8,
  },
  errorText: {
    flex: 1,
    color: '#c62828',
    fontSize: 13,
    lineHeight: 18,
  },
  form: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0a2434',
    marginBottom: 8,
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d4d4d8',
    borderRadius: 8,
    padding: 14,
    fontSize: 15,
    color: '#0a2434',
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    top: 12,
    padding: 4,
  },
  loginButton: {
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 8,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  buttonGradient: {
    padding: 16,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  helperBox: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  helperGradient: {
    padding: 16,
  },
  helperTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0a2434',
    marginBottom: 6,
  },
  helperText: {
    fontSize: 12,
    color: '#135167',
    lineHeight: 18,
  },
  signupRow: {
    alignItems: 'center',
  },
  signupPrompt: {
    fontSize: 13,
    color: '#135167',
    marginBottom: 8,
  },
  signupLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00abf4',
  },
});
