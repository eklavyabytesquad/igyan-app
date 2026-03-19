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

const INSTITUTIONAL_ROLES = ['super_admin', 'co_admin', 'student', 'faculty', 'parent'];

export default function HomePage() {
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const { user } = useAuth();
  
  const [schoolData, setSchoolData] = useState(null);
  const [children, setChildren] = useState([]);

  useEffect(() => {
    if (user && user.school_id && INSTITUTIONAL_ROLES.includes(user.role)) {
      fetchSchoolData();
    }
    if (user && user.role === 'parent') {
      fetchChildren();
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

  const fetchChildren = async () => {
    try {
      const { data, error } = await supabase
        .from('parent_student_assignments')
        .select('id, relationship, is_primary, student:users!psa_student_fkey(id, full_name, email)')
        .eq('parent_id', user.id);
      if (!error && data) setChildren(data);
    } catch (e) { console.error('Error fetching children:', e); }
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

        {/* Parent — My Children */}
        {user?.role === 'parent' && children.length > 0 && (
          <View style={{ backgroundColor: '#1e293b', borderRadius: 14, padding: 16, marginBottom: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 8 }}>
              <IconSymbol name="person.2.fill" size={18} color="#3b82f6" />
              <Text style={{ fontSize: 15, fontWeight: '700', color: '#e2e8f0' }}>My Children</Text>
              <View style={{ backgroundColor: '#3b82f620', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8, marginLeft: 'auto' }}>
                <Text style={{ fontSize: 11, fontWeight: '700', color: '#3b82f6' }}>{children.length}</Text>
              </View>
            </View>
            {children.map(c => (
              <View key={c.id} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#334155', gap: 10 }}>
                <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#3b82f6', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 14, fontWeight: '700', color: '#fff' }}>{(c.student?.full_name || '?')[0].toUpperCase()}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#e2e8f0' }}>{c.student?.full_name || 'Unknown'}</Text>
                  <Text style={{ fontSize: 12, color: '#64748b', marginTop: 1 }}>{c.relationship || 'Parent'}{c.is_primary ? ' · Primary' : ''}</Text>
                </View>
                <TouchableOpacity onPress={() => router.push('/chat')} style={{ paddingHorizontal: 10, paddingVertical: 5, backgroundColor: '#3b82f615', borderRadius: 6 }}>
                  <Text style={{ fontSize: 12, fontWeight: '600', color: '#3b82f6' }}>Message</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

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
