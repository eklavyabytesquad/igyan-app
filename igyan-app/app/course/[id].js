/**
 * iGyan App - Course Detail Screen
 */

import React from 'react';
import { ScrollView, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { IconSymbol } from '../../components/IconSymbol';
import { useThemeColor } from '../../hooks/useThemeColor';

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams();
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        {/* Course Header Image */}
        <View style={styles.headerImage} />
        
        <View style={styles.content}>
          <ThemedText style={styles.courseTitle}>React Native Masterclass</ThemedText>
          <ThemedText style={styles.instructor}>By John Doe</ThemedText>
          
          {/* Course Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <IconSymbol name="star.fill" size={20} color="#FFD700" />
              <ThemedText style={styles.statText}>4.9 (2.5k reviews)</ThemedText>
            </View>
            <View style={styles.statItem}>
              <IconSymbol name="person.fill" size={20} color={textColor} />
              <ThemedText style={styles.statText}>15,000+ students</ThemedText>
            </View>
          </View>

          {/* Description */}
          <ThemedText style={styles.sectionTitle}>About this course</ThemedText>
          <ThemedText style={styles.description}>
            Learn to build professional mobile applications with React Native. This comprehensive course 
            covers everything from basics to advanced topics including state management, navigation, 
            and native modules.
          </ThemedText>

          {/* Course Content */}
          <ThemedText style={styles.sectionTitle}>Course Content</ThemedText>
          {['Introduction to React Native', 'Setting up Environment', 'Components & Props', 'State Management', 'Navigation'].map((lesson, index) => (
            <TouchableOpacity key={index}>
              <View style={[styles.lessonItem, { backgroundColor: cardColor }]}>
                <View style={styles.lessonNumber}>
                  <ThemedText style={styles.lessonNumberText}>{index + 1}</ThemedText>
                </View>
                <ThemedText style={styles.lessonTitle}>{lesson}</ThemedText>
                <IconSymbol name="play.circle.fill" size={24} color="#1E88E5" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Enroll Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.enrollButton}>
          <ThemedText style={styles.enrollButtonText}>Enroll Now - Free</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#1E88E5',
  },
  content: {
    padding: 16,
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  instructor: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  statText: {
    marginLeft: 8,
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.8,
  },
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  lessonNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1E88E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  lessonNumberText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  lessonTitle: {
    flex: 1,
    fontSize: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  enrollButton: {
    backgroundColor: '#1E88E5',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  enrollButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
