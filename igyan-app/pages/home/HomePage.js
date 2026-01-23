/**
 * iGyan App - Home Page
 * Main landing page for the educational app
 */

import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { IconSymbol } from '../../components/IconSymbol';
import { useThemeColor } from '../../hooks/useThemeColor';
import { homeStyles } from '../../styles/pages/homeStyles';

// Sample data for featured courses
const featuredCourses = [
  { id: 1, title: 'React Native Mastery', instructor: 'John Doe', progress: 45 },
  { id: 2, title: 'Python for Beginners', instructor: 'Jane Smith', progress: 0 },
  { id: 3, title: 'Web Development', instructor: 'Mike Wilson', progress: 78 },
];

export default function HomePage() {
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');

  return (
    <ThemedView style={homeStyles.container}>
      <ScrollView contentContainerStyle={homeStyles.scrollContent}>
        {/* Header Section */}
        <View style={homeStyles.headerSection}>
          <ThemedText style={homeStyles.welcomeText}>Welcome back,</ThemedText>
          <ThemedText style={homeStyles.titleText}>
            Learn with <Text style={homeStyles.brandText}>iGyan</Text>
          </ThemedText>
        </View>

        {/* Featured Banner */}
        <View style={homeStyles.featuredCard}>
          <Text style={homeStyles.featuredTitle}>Start Learning Today!</Text>
          <Text style={homeStyles.featuredDescription}>
            Access 1000+ courses from industry experts. Begin your journey to success.
          </Text>
          <TouchableOpacity style={homeStyles.featuredButton}>
            <Text style={homeStyles.featuredButtonText}>Explore Courses</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Section */}
        <View style={homeStyles.statsContainer}>
          <View style={[homeStyles.statItem, { backgroundColor: cardColor }]}>
            <ThemedText style={homeStyles.statNumber}>12</ThemedText>
            <ThemedText style={homeStyles.statLabel}>Courses</ThemedText>
          </View>
          <View style={[homeStyles.statItem, { backgroundColor: cardColor }]}>
            <ThemedText style={homeStyles.statNumber}>48</ThemedText>
            <ThemedText style={homeStyles.statLabel}>Hours</ThemedText>
          </View>
          <View style={[homeStyles.statItem, { backgroundColor: cardColor }]}>
            <ThemedText style={homeStyles.statNumber}>3</ThemedText>
            <ThemedText style={homeStyles.statLabel}>Certificates</ThemedText>
          </View>
        </View>

        {/* Continue Learning Section */}
        <ThemedText style={homeStyles.sectionTitle}>Continue Learning</ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {featuredCourses.map((course) => (
            <TouchableOpacity key={course.id}>
              <View style={[homeStyles.courseCard, { backgroundColor: cardColor }]}>
                <View style={homeStyles.courseImage} />
                <ThemedText style={homeStyles.courseTitle}>{course.title}</ThemedText>
                <ThemedText style={homeStyles.courseInstructor}>{course.instructor}</ThemedText>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Popular Categories */}
        <ThemedText style={homeStyles.sectionTitle}>Popular Categories</ThemedText>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {['Programming', 'Design', 'Business', 'Marketing'].map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[homeStyles.courseCard, { backgroundColor: cardColor, width: '48%', marginRight: 0 }]}
            >
              <IconSymbol name="graduationcap.fill" size={32} color="#1E88E5" />
              <ThemedText style={[homeStyles.courseTitle, { marginTop: 8 }]}>{category}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}
