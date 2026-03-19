/**
 * Manage Classes — Add / View / Delete classes for active session
 * Clean UI with class cards, session banner, and modal form
 */
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import { router } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Header from '../../components/Header';
import { useSideNav } from '../../utils/SideNavContext';
import { useAuth } from '../../utils/AuthContext';
import { getActiveSession, getClasses, addClass, deleteClass } from '../../services/schoolManagementService';
import { C, ADMIN_ROLES, ms, PageBanner, SectionHeader, EmptyState, ListCard, FormModal, Input, SessionBanner } from './shared';

export default function ManageClassesPage() {
  const { openSideNav } = useSideNav();
  const { user } = useAuth();
  const isAdmin = ADMIN_ROLES.includes(user?.role);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [session, setSession] = useState(null);
  const [classes, setClasses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => { boot(); }, []);

  const boot = async () => {
    setLoading(true);
    try {
      if (!user?.school_id) return;
      const sess = await getActiveSession(user.school_id);
      setSession(sess);
      if (sess) setClasses(await getClasses(user.school_id, sess.id));
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const reload = async () => { if (session) setClasses(await getClasses(user.school_id, session.id)); };
  const onRefresh = useCallback(async () => { setRefreshing(true); await reload(); setRefreshing(false); }, [session]);

  const handleAdd = async () => {
    if (!form.className?.trim()) return Alert.alert('Required', 'Please enter a class name');
    if (!session) return Alert.alert('Error', 'No active academic session found');
    try {
      await addClass({ schoolId: user.school_id, sessionId: session.id, className: form.className.trim(), section: form.section?.trim() || 'A', roomNumber: form.roomNumber?.trim(), capacity: form.capacity?.trim() });
      setShowModal(false); setForm({});
      await reload();
    } catch (e) { Alert.alert('Error', e.message); }
  };

  const handleDelete = (id, name) => {
    Alert.alert('Delete Class', `Remove "${name}"?\nAll enrolled students and assignments will be removed.`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: async () => { try { await deleteClass(id); await reload(); } catch (e) { Alert.alert('Error', e.message); } } },
    ]);
  };

  if (!isAdmin) {
    return (
      <View style={ms.root}>
        <Header title="Manage Classes" onMenuPress={openSideNav} showBack onBackPress={() => router.back()} />
        <View style={ms.center}>
          <MaterialIcons name="lock" size={48} color={C.dim} />
          <Text style={{ fontSize: 16, fontWeight: '600', color: C.text, marginTop: 8 }}>Access Restricted</Text>
          <Text style={ms.mutedText}>Only admins can manage classes</Text>
        </View>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={ms.root}>
        <Header title="Manage Classes" onMenuPress={openSideNav} showBack onBackPress={() => router.back()} />
        <View style={ms.center}><ActivityIndicator size="large" color={C.accent} /><Text style={ms.mutedText}>Loading classes…</Text></View>
      </View>
    );
  }

  if (!session) {
    return (
      <View style={ms.root}>
        <Header title="Manage Classes" onMenuPress={openSideNav} showBack onBackPress={() => router.back()} />
        <View style={ms.center}>
          <MaterialIcons name="event-busy" size={48} color={C.dim} />
          <Text style={{ fontSize: 16, fontWeight: '600', color: C.text, marginTop: 8 }}>No Active Session</Text>
          <Text style={ms.mutedText}>Create an academic session first to manage classes</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={ms.root}>
      <Header title="Manage Classes" onMenuPress={openSideNav} showBack onBackPress={() => router.back()} />
      <SessionBanner session={session} />

      <PageBanner icon="layers" title="School Classes" subtitle={`Classes for ${session.session_name}`} count={classes.length} accentColor={C.green} />

      <ScrollView style={ms.scroll} contentContainerStyle={ms.scrollInner} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={C.accent} />}>
        <SectionHeader title="All Classes" count={classes.length} onAdd={() => { setForm({}); setShowModal(true); }} addLabel="Add Class" addIcon="add" />

        {classes.length === 0 ? (
          <EmptyState icon="layers" title="No classes created" text="Add classes like Class 10-A, Class 12-B etc." onAction={() => { setForm({}); setShowModal(true); }} actionLabel="Add Class" />
        ) : (
          classes.map(cls => (
            <ListCard
              key={cls.id}
              icon="layers"
              iconColor={C.green}
              title={`${cls.class_name} ${cls.section || ''}`}
              subtitle={cls.room_number ? `Room: ${cls.room_number}` : null}
              extra={cls.capacity ? `Capacity: ${cls.capacity} students` : null}
              onDelete={() => handleDelete(cls.id, `${cls.class_name} ${cls.section || ''}`)}
            />
          ))
        )}
      </ScrollView>

      <FormModal visible={showModal} title="Add Class" subtitle="Create a new class for this session" onClose={() => setShowModal(false)} onSubmit={handleAdd} submitLabel="Add Class">
        <Input label="Class Name" placeholder="e.g. 10, XII, Nursery" value={form.className} onChangeText={v => setForm(p => ({ ...p, className: v }))} icon="layers" />
        <Input label="Section" placeholder="Default: A" value={form.section} onChangeText={v => setForm(p => ({ ...p, section: v }))} icon="grid-view" />
        <Input label="Room Number (optional)" placeholder="e.g. 201, Lab-3" value={form.roomNumber} onChangeText={v => setForm(p => ({ ...p, roomNumber: v }))} icon="meeting-room" />
        <Input label="Capacity (optional)" placeholder="Max students" value={form.capacity} onChangeText={v => setForm(p => ({ ...p, capacity: v }))} keyboardType="numeric" icon="people" />
      </FormModal>
    </View>
  );
}
