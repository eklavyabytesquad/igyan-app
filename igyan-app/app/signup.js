/**
 * iGyan App - Signup Modal Screen
 */

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { IconSymbol } from '../components/IconSymbol';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = () => {
    // Handle signup logic here
    router.replace('/(tabs)/home');
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <IconSymbol name="chevron.left.forwardslash.chevron.right" size={24} color="#00abf4" />
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logo}>
              <IconSymbol name="star.fill" size={32} color="#f8fafc" />
            </View>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Start your learning journey today!</Text>
          </View>

          {/* Signup Form */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <IconSymbol name="person.fill" size={20} color="#00abf4" />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#7a8b9c"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputContainer}>
              <IconSymbol name="paperplane.fill" size={20} color="#00abf4" />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#7a8b9c"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <IconSymbol name="gear" size={20} color="#00abf4" />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#7a8b9c"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <View style={styles.inputContainer}>
              <IconSymbol name="gear" size={20} color="#00abf4" />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#7a8b9c"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
              <Text style={styles.signupButtonText}>Create Account</Text>
              <IconSymbol name="chevron.right" size={20} color="#0a2434" />
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity style={styles.socialButton}>
              <IconSymbol name="paperplane.fill" size={20} color="#f8fafc" />
              <Text style={styles.socialButtonText}>Continue with Google</Text>
            </TouchableOpacity>

            <View style={styles.loginRow}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/login')}>
                <Text style={styles.loginLink}>Login</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.terms}>
              By signing up, you agree to our Terms of Service and Privacy Policy
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a2434',
  },
  flex: {
    flex: 1,
  },
  content: {
    padding: 24,
    paddingTop: 60,
  },
  backButton: {
    marginBottom: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#135167',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#f8fafc',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#00abf4',
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#135167',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: '#f8fafc',
    marginLeft: 12,
  },
  signupButton: {
    backgroundColor: '#00abf4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 12,
    marginTop: 8,
  },
  signupButtonText: {
    color: '#0a2434',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
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
    marginHorizontal: 16,
    color: '#f8fafc',
    opacity: 0.5,
  },
  socialButton: {
    borderWidth: 1,
    borderColor: '#135167',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f8fafc',
    marginLeft: 12,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginText: {
    color: '#f8fafc',
  },
  loginLink: {
    color: '#00abf4',
    fontWeight: 'bold',
  },
  terms: {
    textAlign: 'center',
    fontSize: 12,
    color: '#f8fafc',
    opacity: 0.5,
    marginTop: 24,
    marginBottom: 24,
    lineHeight: 18,
  },
});
