/**
 * iGyan App - Courses Page
 * Browse and manage enrolled courses
 */

import React, { useState } from 'react';
import { ScrollView, View, TextInput, TouchableOpacity } from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { IconSymbol } from '../../components/IconSymbol';
import { useThemeColor } from '../../hooks/useThemeColor';
import { coursesStyles } from '../../styles/pages/coursesStyles';

const categories = ['All', 'Programming', 'Design', 'Business', 'Marketing', 'Data Science'];

const courses = [
  {
    id: 1,
    title: 'Complete React Native Developer',
    description: 'Build mobile apps for iOS and Android with React Native',
    duration: '24 hours',
    price: 'Free',
    progress: 45,
  },
  {
    id: 2,
    title: 'Python Masterclass',
    description: 'From beginner to advanced Python programming',
    duration: '32 hours',
    price: '₹999',
    progress: 0,
  },
  {
    id: 3,
    title: 'UI/UX Design Fundamentals',
    description: 'Learn design principles and create stunning interfaces',
    duration: '18 hours',
    price: '₹799',
    progress: 78,
  },
  {
    id: 4,
    title: 'Data Science with Python',
    description: 'Master data analysis, visualization, and machine learning',
    duration: '40 hours',
    price: '₹1,499',
    progress: 0,
  },
];

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const cardColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');
  const textColor = useThemeColor({}, 'text');

  return (
    <ThemedView style={coursesStyles.container}>
      {/* Header */}
      <View style={coursesStyles.header}>
        <ThemedText style={coursesStyles.headerTitle}>Courses</ThemedText>
        
        {/* Search Bar */}
        <View style={[coursesStyles.searchContainer, { backgroundColor: cardColor }]}>
          <IconSymbol name="magnifyingglass" size={20} color={textColor} />
          <TextInput
            style={[coursesStyles.searchInput, { color: textColor }]}
            placeholder="Search courses..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={coursesStyles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              coursesStyles.categoryChip,
              activeCategory === category 
                ? coursesStyles.categoryChipActive 
                : coursesStyles.categoryChipInactive,
            ]}
            onPress={() => setActiveCategory(category)}
          >
            <ThemedText
              style={[
                coursesStyles.categoryText,
                activeCategory === category
                  ? coursesStyles.categoryTextActive
                  : coursesStyles.categoryTextInactive,
              ]}
            >
              {category}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Courses List */}
      <ScrollView contentContainerStyle={coursesStyles.coursesList}>
        {courses.map((course) => (
          <TouchableOpacity key={course.id}>
            <View style={[coursesStyles.courseCard, { backgroundColor: cardColor }]}>
              <View style={coursesStyles.courseImage} />
              <View style={coursesStyles.courseContent}>
                <ThemedText style={coursesStyles.courseTitle}>{course.title}</ThemedText>
                <ThemedText style={coursesStyles.courseDescription}>{course.description}</ThemedText>
                <View style={coursesStyles.courseMetaRow}>
                  <ThemedText style={coursesStyles.courseDuration}>{course.duration}</ThemedText>
                  <ThemedText 
                    style={[
                      coursesStyles.coursePrice,
                      course.price === 'Free' && coursesStyles.courseFree,
                    ]}
                  >
                    {course.price}
                  </ThemedText>
                </View>
                {course.progress > 0 && (
                  <View style={coursesStyles.progressBar}>
                    <View style={[coursesStyles.progressFill, { width: `${course.progress}%` }]} />
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ThemedView>
  );
}
