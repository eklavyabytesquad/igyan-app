/**
 * iGyan App - Home Page
 * Main landing page for the educational app
 */

import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { IconSymbol } from '../../components/IconSymbol';
import { useThemeColor } from '../../hooks/useThemeColor';
import { homeStyles } from '../../styles/pages/homeStyles';
import { useAuth } from '../../utils/AuthContext';
import { supabase } from '../../utils/supabase';

const INSTITUTIONAL_ROLES = ['super_admin', 'co_admin', 'student', 'faculty'];

export default function HomePage() {
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const { user } = useAuth();
  
  const [schoolData, setSchoolData] = useState(null);

  useEffect(() => {
    if (user && user.school_id && INSTITUTIONAL_ROLES.includes(user.role)) {
      fetchSchoolData();
    }
  }, [user]);

  const fetchSchoolData = async () => {
    try {
      const { data, error } = await supabase
        .from('schools')
        .select('school_name, logo_url')
        .eq('id', user.school_id)
        .single();
      
      if (!error && data) {
        setSchoolData(data);
      }
    } catch (error) {
      console.error('Error fetching school data:', error);
    }
  };

  return (
    <ThemedView style={homeStyles.container}>
      <ScrollView contentContainerStyle={homeStyles.scrollContent}>
        {/* Header Section */}
        <View style={homeStyles.headerSection}>
          {schoolData?.logo_url && (
            <Image
              source={{ uri: schoolData.logo_url }}
              style={{ width: 50, height: 50, borderRadius: 8, marginBottom: 12 }}
              resizeMode="contain"
            />
          )}
          <ThemedText style={homeStyles.titleText}>
            {schoolData?.school_name || 'iGyan'}
          </ThemedText>
          <ThemedText style={homeStyles.welcomeText}>
            Welcome back, {user?.full_name?.split(' ')[0] || 'there'}!
          </ThemedText>
        </View>

        {/* Featured Banner */}
        <View style={homeStyles.featuredCard}>
          <Text style={homeStyles.featuredTitle}>Start Learning Today!</Text>
          <Text style={homeStyles.featuredDescription}>
            Access 1000+ courses from industry experts. Begin your journey to success.
          </Text>
          <TouchableOpacity 
            style={homeStyles.featuredButton}
            onPress={() => router.push('/(tabs)/courses')}
          >
            <Text style={homeStyles.featuredButtonText}>Explore Courses</Text>
          </TouchableOpacity>
        </View>

        {/* Live Classroom Banner */}
        <TouchableOpacity 
          style={[homeStyles.featuredCard, { backgroundColor: '#7c3aed', marginTop: 16 }]}
          onPress={() => router.push('/live-classroom')}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Text style={{ fontSize: 32, marginRight: 12 }}>🎥</Text>
            <Text style={[homeStyles.featuredTitle, { flex: 1 }]}>Join Live Classes</Text>
          </View>
          <Text style={homeStyles.featuredDescription}>
            Connect with teachers and classmates in real-time video sessions
          </Text>
          <View style={[homeStyles.featuredButton, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
            <Text style={homeStyles.featuredButtonText}>Start i-Meet →</Text>
          </View>
        </TouchableOpacity>

        {/* Viva AI Banner */}
        <TouchableOpacity 
          style={[homeStyles.featuredCard, { backgroundColor: '#0891b2', marginTop: 16 }]}
          onPress={() => router.push('/viva-ai')}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Text style={{ fontSize: 32, marginRight: 12 }}>🦈</Text>
            <Text style={[homeStyles.featuredTitle, { flex: 1 }]}>Viva AI</Text>
          </View>
          <Text style={homeStyles.featuredDescription}>
            Create pitch decks and practice your pitch with AI-powered feedback
          </Text>
          <View style={[homeStyles.featuredButton, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
            <Text style={homeStyles.featuredButtonText}>Start Pitching →</Text>
          </View>
        </TouchableOpacity>

        {/* AI Tools Banner */}
        <TouchableOpacity 
          style={[homeStyles.featuredCard, { backgroundColor: '#059669', marginTop: 16 }]}
          onPress={() => router.push('/tools')}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Text style={{ fontSize: 32, marginRight: 12 }}>🤖</Text>
            <Text style={[homeStyles.featuredTitle, { flex: 1 }]}>AI Learning Tools</Text>
          </View>
          <Text style={homeStyles.featuredDescription}>
            Code tutor, text summarizer, and more AI-powered tools
          </Text>
          <View style={[homeStyles.featuredButton, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
            <Text style={homeStyles.featuredButtonText}>Explore Tools →</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}
