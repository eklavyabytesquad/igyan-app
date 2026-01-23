/**
 * iGyan App - Crypto Utilities
 * Password hashing and token generation
 */

import * as Crypto from 'expo-crypto';

/**
 * Hash password using SHA-256
 */
export async function hashPassword(password) {
  try {
    // Use expo-crypto for SHA-256 hashing
    const hash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );
    return hash;
  } catch (error) {
    console.error("Hash error:", error);
    throw error;
  }
}

/**
 * Generate unique session token
 */
export function generateToken() {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  const random2 = Math.random().toString(36).substring(2, 15);
  return `${random}-${timestamp}-${random2}`;
}

/**
 * Get device information
 */
export function getDeviceInfo() {
  // Basic device info for React Native
  // You can enhance this with react-native-device-info package
  return {
    deviceType: "mobile",
    osName: "Unknown",
    browserName: "iGyan Mobile App",
    userAgent: "iGyan Mobile/1.0"
  };
}

/**
 * Get user's IP address
 */
export async function getUserIP() {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("IP fetch error:", error);
    return "0.0.0.0";
  }
}
