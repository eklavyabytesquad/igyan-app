/**
 * Viva AI - Animated Avatar Component
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { IconSymbol } from '../IconSymbol';

export default function VivaAvatar({ isListening, isSpeaking, isPitchMode, onStopSpeaking }) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isListening || isSpeaking) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.15,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isListening, isSpeaking]);

  useEffect(() => {
    if (isPitchMode) {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 8000,
          useNativeDriver: true,
        })
      ).start();
    } else {
      rotateAnim.setValue(0);
    }
  }, [isPitchMode]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.avatarWrapper,
          {
            transform: [
              { scale: pulseAnim },
            ],
          },
        ]}
      >
        <View style={[
          styles.avatar,
          isListening && styles.avatarListening,
          isSpeaking && styles.avatarSpeaking,
          isPitchMode && styles.avatarPitchMode,
        ]}>
          <Text style={styles.avatarEmoji}>🦈</Text>
        </View>
        
        {/* Animated Ring */}
        {(isListening || isSpeaking || isPitchMode) && (
          <Animated.View
            style={[
              styles.animatedRing,
              isListening && styles.ringListening,
              isSpeaking && styles.ringSpeaking,
              isPitchMode && styles.ringPitchMode,
              { transform: [{ rotate: spin }] },
            ]}
          />
        )}
      </Animated.View>

      {/* Status */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          {isPitchMode
            ? '🎤 Pitch Mode Active'
            : isListening
            ? '👂 Listening...'
            : isSpeaking
            ? '🔊 Speaking...'
            : '🦈 Viva AI'}
        </Text>
        {isSpeaking && (
          <TouchableOpacity style={styles.stopButton} onPress={onStopSpeaking}>
            <IconSymbol name="stop.fill" size={14} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  avatarWrapper: {
    position: 'relative',
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#135167',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#00abf4',
  },
  avatarListening: {
    borderColor: '#22c55e',
    backgroundColor: '#064e3b',
  },
  avatarSpeaking: {
    borderColor: '#f59e0b',
    backgroundColor: '#78350f',
  },
  avatarPitchMode: {
    borderColor: '#ef4444',
    backgroundColor: '#7f1d1d',
  },
  avatarEmoji: {
    fontSize: 36,
  },
  animatedRing: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: 'transparent',
    borderTopColor: '#00abf4',
    borderRightColor: '#00abf4',
  },
  ringListening: {
    borderTopColor: '#22c55e',
    borderRightColor: '#22c55e',
  },
  ringSpeaking: {
    borderTopColor: '#f59e0b',
    borderRightColor: '#f59e0b',
  },
  ringPitchMode: {
    borderTopColor: '#ef4444',
    borderRightColor: '#ef4444',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },
  statusText: {
    color: '#f8fafc',
    fontSize: 13,
    fontWeight: '500',
  },
  stopButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ef4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
