/**
 * iGyan App - Explore Page
 * Discover new courses, categories, and instructors
 */

import React from 'react';
import { ScrollView, View, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { IconSymbol } from '../../components/IconSymbol';
import { useThemeColor } from '../../hooks/useThemeColor';
import { exploreStyles } from '../../styles/pages/exploreStyles';

const trendingCourses = [
  { id: 1, title: 'AI & Machine Learning', students: '15,000+', rating: 4.9 },
  { id: 2, title: 'Full Stack Development', students: '12,500+', rating: 4.8 },
  { id: 3, title: 'Digital Marketing', students: '8,000+', rating: 4.7 },
];

const categories = [
  { name: 'Programming', icon: 'chevron.left.forwardslash.chevron.right', count: 250 },
  { name: 'Design', icon: 'star.fill', count: 120 },
  { name: 'Business', icon: 'graduationcap.fill', count: 180 },
  { name: 'Data Science', icon: 'play.circle.fill', count: 95 },
];

const instructors = [
  { id: 1, name: 'Dr. Amit Kumar', specialty: 'Machine Learning Expert' },
  { id: 2, name: 'Priya Sharma', specialty: 'Full Stack Developer' },
  { id: 3, name: 'Rahul Verma', specialty: 'Business Strategy' },
];

const learningTools = [
  {
    id: 'code-tutor',
    title: 'Code Tutor',
    description: 'AI-powered coding teacher',
    icon: 'chevron.left.forwardslash.chevron.right',
    color: '#3B82F6',
  },
  {
    id: 'quiz-maker',
    title: 'Quiz Maker',
    description: 'Create custom quizzes',
    icon: 'questionmark.circle.fill',
    color: '#10B981',
  },
  {
    id: 'step-by-step',
    title: 'Step-by-Step Guide',
    description: 'AI learning architect',
    icon: 'list.number',
    color: '#F59E0B',
  },
  {
    id: 'flashcards',
    title: 'Flashcards',
    description: 'Review with flashcards',
    icon: 'rectangle.stack.fill',
    color: '#8B5CF6',
  },
];

export default function ExplorePage() {
  const router = useRouter();
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'border');

  return (
    <ThemedView style={exploreStyles.container}>
      <ScrollView>
        {/* Header with Search */}
        <View style={exploreStyles.header}>
          <ThemedText style={exploreStyles.headerTitle}>Explore</ThemedText>
          <View style={[exploreStyles.searchBar, { backgroundColor: cardColor }]}>
            <IconSymbol name="magnifyingglass" size={20} color={textColor} style={exploreStyles.searchIcon} />
            <TextInput
              style={[exploreStyles.searchInput, { color: textColor }]}
              placeholder="Search courses, instructors..."
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Trending Courses */}
        <ThemedText style={exploreStyles.sectionTitle}>🔥 Trending Now</ThemedText>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={exploreStyles.trendingContainer}
        >
          {trendingCourses.map((course) => (
            <TouchableOpacity key={course.id}>
              <View style={[exploreStyles.trendingCard, { backgroundColor: cardColor }]}>
                <View style={exploreStyles.trendingImage} />
                <View style={exploreStyles.trendingContent}>
                  <ThemedText style={exploreStyles.trendingTitle}>{course.title}</ThemedText>
                  <View style={exploreStyles.trendingMeta}>
                    <ThemedText style={exploreStyles.trendingStudents}>{course.students} students</ThemedText>
                    <View style={exploreStyles.trendingRating}>
                      <IconSymbol name="star.fill" size={16} color="#FFD700" />
                      <ThemedText style={exploreStyles.ratingText}>{course.rating}</ThemedText>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Learning Tools Section */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginTop: 8 }}>
          <ThemedText style={exploreStyles.sectionTitle}>🛠️ Learning Tools</ThemedText>
          <TouchableOpacity onPress={() => router.push('/tools')}>
            <ThemedText style={{ fontSize: 14, color: '#3B82F6', fontWeight: '600' }}>View All</ThemedText>
          </TouchableOpacity>
        </View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 8 }}
        >
          {learningTools.map((tool) => (
            <TouchableOpacity 
              key={tool.id}
              onPress={() => router.push('/tools')}
              activeOpacity={0.7}
            >
              <View style={[{
                backgroundColor: cardColor,
                borderRadius: 16,
                padding: 16,
                marginRight: 12,
                width: 160,
                borderWidth: 1,
                borderColor: borderColor,
              }]}>
                <View style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  backgroundColor: tool.color + '20',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 12,
                }}>
                  <IconSymbol name={tool.icon} size={24} color={tool.color} />
                </View>
                <ThemedText style={{ fontSize: 16, fontWeight: '600', marginBottom: 4 }}>
                  {tool.title}
                </ThemedText>
                <ThemedText style={{ fontSize: 12, color: '#999', lineHeight: 16 }}>
                  {tool.description}
                </ThemedText>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Categories */}
        <ThemedText style={exploreStyles.sectionTitle}>📚 Browse Categories</ThemedText>
        <View style={exploreStyles.categoriesGrid}>
          {categories.map((category, index) => (
            <TouchableOpacity key={index}>
              <View style={[exploreStyles.categoryCard, { backgroundColor: cardColor }]}>
                <IconSymbol 
                  name={category.icon} 
                  size={32} 
                  color="#1E88E5" 
                  style={exploreStyles.categoryIcon} 
                />
                <ThemedText style={exploreStyles.categoryTitle}>{category.name}</ThemedText>
                <ThemedText style={exploreStyles.categoryCount}>{category.count} courses</ThemedText>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Top Instructors */}
        <ThemedText style={exploreStyles.sectionTitle}>👨‍🏫 Top Instructors</ThemedText>
        <View style={exploreStyles.instructorsSection}>
          {instructors.map((instructor) => (
            <TouchableOpacity key={instructor.id}>
              <View style={[exploreStyles.instructorCard, { backgroundColor: cardColor }]}>
                <View style={exploreStyles.instructorAvatar} />
                <View style={exploreStyles.instructorInfo}>
                  <ThemedText style={exploreStyles.instructorName}>{instructor.name}</ThemedText>
                  <ThemedText style={exploreStyles.instructorSpecialty}>{instructor.specialty}</ThemedText>
                </View>
                <IconSymbol name="chevron.right" size={20} color={textColor} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}
