/**
 * Manage Students — Enroll students to classes, add new student users
 * Clean tabbed UI with class roster and student directory
 */
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import { router } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Header from '../../components/Header';
import { useSideNav } from '../../utils/SideNavContext';
import { useAuth } from '../../utils/AuthContext';
import { hashPassword } from '../../utils/crypto';
import {
  getActiveSession, getClasses, getSchoolStudents, getClassStudents,
  enrollStudent, removeStudentFromClass, addUser,
} from '../../services/schoolManagementService';
import { C, ADMIN_ROLES, ms, PageBanner, SectionHeader, EmptyState, UserCard, ClassChips, FormModal, Input, PickerModal, SessionBanner, TabBar, StatRow } from './shared';

export default function ManageStudentsPage() {
  const { openSideNav } = useSideNav();
  const { user } = useAuth();
  const isAdmin = ADMIN_ROLES.includes(user?.role);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [session, setSession] = useState(null);
  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [students, setStudents] = useState([]);
  const [classStudents, setClassStudents] = useState([]);
  const [tab, setTab] = useState('roster');
  const [showEnrollPicker, setShowEnrollPicker] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => { boot(); }, []);
  useEffect(() => { if (selectedClassId) loadClassStudents(); }, [selectedClassId]);

  const boot = async () => {
    setLoading(true);
    try {
      if (!user?.school_id) return;
      const sess = await getActiveSession(user.school_id);
      setSession(sess);
      if (!sess) return;
      const [cls, studs] = await Promise.all([getClasses(user.school_id, sess.id), getSchoolStudents(user.school_id)]);
      setClasses(cls);
      setStudents(studs);
      if (cls.length > 0) setSelectedClassId(cls[0].id);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const loadClassStudents = async () => { if (selectedClassId) setClassStudents(await getClassStudents(selectedClassId)); };
  const reloadStudents = async () => { setStudents(await getSchoolStudents(user.school_id)); await loadClassStudents(); };
  const onRefresh = useCallback(async () => { setRefreshing(true); await reloadStudents(); setRefreshing(false); }, [selectedClassId]);

  const handleEnroll = async (student) => {
    if (!selectedClassId || !session) return;
    try {
      await enrollStudent({ schoolId: user.school_id, classId: selectedClassId, studentId: student.id, sessionId: session.id });
      setShowEnrollPicker(false);
      await loadClassStudents();
    } catch (e) { Alert.alert('Error', e.message); }
  };

  const handleRemove = (id, name) => {
    Alert.alert('Remove Student', `Remove "${name}" from this class?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: async () => { try { await removeStudentFromClass(id); await loadClassStudents(); } catch (e) { Alert.alert('Error', e.message); } } },
    ]);
  };

  const handleAddUser = async () => {
    const { fullName, email, password, phone } = form;
    if (!fullName?.trim() || !email?.trim() || !password?.trim()) return Alert.alert('Required', 'Please fill in name, email and password');
    try {
      const passwordHash = await hashPassword(password.trim());
      await addUser({ schoolId: user.school_id, fullName: fullName.trim(), email: email.trim().toLowerCase(), passwordHash, role: 'student', phone: phone?.trim() });
      setShowAddUser(false); setForm({});
      Alert.alert('Success', 'Student account created successfully');
      await reloadStudents();
    } catch (e) { Alert.alert('Error', e.message); }
  };

  const enrolledIds = classStudents.map(cs => cs.student_id);
  const unenrolled = students.filter(s => !enrolledIds.includes(s.id));
  const selectedClass = classes.find(c => c.id === selectedClassId);
  const className = selectedClass ? `${selectedClass.class_name} ${selectedClass.section || ''}`.trim() : '';

  if (!isAdmin) {
    return (
      <View style={ms.root}>
        <Header title="Manage Students" onMenuPress={openSideNav} showBack onBackPress={() => router.back()} />
        <View style={ms.center}>
          <MaterialIcons name="lock" size={48} color={C.dim} />
          <Text style={{ fontSize: 16, fontWeight: '600', color: C.text, marginTop: 8 }}>Access Restricted</Text>
          <Text style={ms.mutedText}>Only admins can manage students</Text>
        </View>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={ms.root}>
        <Header title="Manage Students" onMenuPress={openSideNav} showBack onBackPress={() => router.back()} />
        <View style={ms.center}><ActivityIndicator size="large" color={C.accent} /><Text style={ms.mutedText}>Loading students…</Text></View>
      </View>
    );
  }

  if (!session) {
    return (
      <View style={ms.root}>
        <Header title="Manage Students" onMenuPress={openSideNav} showBack onBackPress={() => router.back()} />
        <View style={ms.center}>
          <MaterialIcons name="event-busy" size={48} color={C.dim} />
          <Text style={{ fontSize: 16, fontWeight: '600', color: C.text, marginTop: 8 }}>No Active Session</Text>
          <Text style={ms.mutedText}>Create an academic session first</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={ms.root}>
      <Header title="Manage Students" onMenuPress={openSideNav} showBack onBackPress={() => router.back()} />
      <SessionBanner session={session} />

      <TabBar
        tabs={[
          { key: 'roster', label: 'Class Roster', icon: 'groups' },
          { key: 'all', label: 'All Students', icon: 'school' },
        ]}
        active={tab}
        onChange={setTab}
      />

      <ScrollView style={ms.scroll} contentContainerStyle={ms.scrollInner} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={C.accent} />}>
        {tab === 'roster' && (
          <>
            <ClassChips classes={classes} selected={selectedClassId} onSelect={setSelectedClassId} />

            <StatRow stats={[
              { label: 'Enrolled', value: classStudents.length, color: C.accent },
              { label: 'Available', value: unenrolled.length, color: C.green },
            ]} />

            <SectionHeader title={`Students in ${className}`} count={classStudents.length} onAdd={() => setShowEnrollPicker(true)} addLabel="Enroll" addIcon="person-add" />

            {classStudents.length === 0 ? (
              <EmptyState icon="groups" title="No students enrolled" text={`Enroll students from your school directory into ${className}`} onAction={() => setShowEnrollPicker(true)} actionLabel="Enroll Student" />
            ) : (
              classStudents.map(cs => (
                <UserCard
                  key={cs.id}
                  name={cs.users?.full_name || 'Unknown'}
                  email={cs.users?.email}
                  role="student"
                  onDelete={() => handleRemove(cs.id, cs.users?.full_name)}
                />
              ))
            )}
          </>
        )}

        {tab === 'all' && (
          <>
            <PageBanner icon="school" title="Student Directory" subtitle="All registered students at your school" count={students.length} accentColor={C.accent} />

            <SectionHeader title="All Students" count={students.length} onAdd={() => { setForm({}); setShowAddUser(true); }} addLabel="Add Student" addIcon="person-add" />

            {students.length === 0 ? (
              <EmptyState icon="school" title="No students yet" text="Add student accounts to get started" onAction={() => { setForm({}); setShowAddUser(true); }} actionLabel="Add Student" />
            ) : (
              students.map(s => (
                <UserCard key={s.id} name={s.full_name} email={s.email} phone={s.phone} role="student" />
              ))
            )}
          </>
        )}
      </ScrollView>

      {/* Enroll picker */}
      <PickerModal
        visible={showEnrollPicker}
        title={`Enroll in ${className}`}
        data={unenrolled}
        renderLabel={item => item.full_name}
        renderSub={item => item.email}
        onSelect={handleEnroll}
        onClose={() => setShowEnrollPicker(false)}
      />

      {/* Add new student user */}
      <FormModal visible={showAddUser} title="Add New Student" subtitle="Create a student account" onClose={() => setShowAddUser(false)} onSubmit={handleAddUser} submitLabel="Create Student">
        <Input label="Full Name" placeholder="Student's full name" value={form.fullName} onChangeText={v => setForm(p => ({ ...p, fullName: v }))} icon="person" />
        <Input label="Email Address" placeholder="student@example.com" value={form.email} onChangeText={v => setForm(p => ({ ...p, email: v }))} keyboardType="email-address" icon="email" />
        <Input label="Password" placeholder="Create a password" value={form.password} onChangeText={v => setForm(p => ({ ...p, password: v }))} secureTextEntry icon="lock" />
        <Input label="Phone (optional)" placeholder="Phone number" value={form.phone} onChangeText={v => setForm(p => ({ ...p, phone: v }))} keyboardType="phone-pad" icon="phone" />
      </FormModal>
    </View>
  );
}
