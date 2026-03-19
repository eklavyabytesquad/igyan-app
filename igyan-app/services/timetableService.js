/**
 * Timetable Service
 * Fetches timetable data from Supabase for daily calendar views
 * 
 * Tables used:
 *   timetable_templates, timetable_days, timetable_slots, timetable_entries
 *   timetable_daily_records, timetable_daily_entries
 *   users, subjects, classes, academic_sessions, faculty_profiles
 */

import { supabase } from '../utils/supabase';

// ═══════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const getDayName = (date) => DAYS[date.getDay()];

/**
 * Fetch a single user's full_name by ID
 */
const fetchUserName = async (userId) => {
  if (!userId) return null;
  const { data } = await supabase
    .from('users')
    .select('id, full_name')
    .eq('id', userId)
    .maybeSingle();
  return data?.full_name || null;
};

/**
 * Fetch subject name by ID
 */
const fetchSubjectName = async (subjectId) => {
  if (!subjectId) return null;
  const { data } = await supabase
    .from('subjects')
    .select('id, subject_name')
    .eq('id', subjectId)
    .maybeSingle();
  return data?.subject_name || null;
};

/**
 * Bulk-fetch user names for a list of user IDs
 */
const fetchUserNames = async (userIds) => {
  const ids = [...new Set(userIds.filter(Boolean))];
  if (ids.length === 0) return {};
  const { data } = await supabase
    .from('users')
    .select('id, full_name')
    .in('id', ids);
  const map = {};
  (data || []).forEach((u) => { map[u.id] = u.full_name; });
  return map;
};

/**
 * Bulk-fetch subject names for a list of subject IDs
 */
const fetchSubjectNames = async (subjectIds) => {
  const ids = [...new Set(subjectIds.filter(Boolean))];
  if (ids.length === 0) return {};
  const { data } = await supabase
    .from('subjects')
    .select('id, subject_name')
    .in('id', ids);
  const map = {};
  (data || []).forEach((s) => { map[s.id] = s.subject_name; });
  return map;
};

// ═══════════════════════════════════════════
//  TEMPLATE QUERIES
// ═══════════════════════════════════════════

export const getActiveTemplate = async (schoolId, sessionId) => {
  const { data, error } = await supabase
    .from('timetable_templates')
    .select('*')
    .eq('school_id', schoolId)
    .eq('session_id', sessionId)
    .eq('is_active', true)
    .maybeSingle();
  if (error) console.error('getActiveTemplate:', error.message);
  return data;
};

export const getSchoolTemplates = async (schoolId) => {
  const { data, error } = await supabase
    .from('timetable_templates')
    .select('*, academic_sessions(session_name)')
    .eq('school_id', schoolId)
    .order('created_at', { ascending: false });
  if (error) console.error('getSchoolTemplates:', error.message);
  return data || [];
};

export const getTemplateSlots = async (templateId) => {
  const { data, error } = await supabase
    .from('timetable_slots')
    .select('*')
    .eq('template_id', templateId)
    .order('slot_order', { ascending: true });
  if (error) console.error('getTemplateSlots:', error.message);
  return data || [];
};

export const getTemplateDays = async (templateId) => {
  const { data, error } = await supabase
    .from('timetable_days')
    .select('*')
    .eq('template_id', templateId)
    .eq('is_active', true)
    .order('day_index', { ascending: true });
  if (error) console.error('getTemplateDays:', error.message);
  return data || [];
};

// ═══════════════════════════════════════════
//  MASTER ENTRY QUERIES (with resolved names)
// ═══════════════════════════════════════════

/**
 * Get entries for a day + class, with subject_name and faculty full_name resolved
 */
export const getDayEntries = async (templateId, dayId, classId) => {
  const { data, error } = await supabase
    .from('timetable_entries')
    .select('*, timetable_slots(id, slot_order, slot_type, label, start_time, end_time, duration_minutes)')
    .eq('template_id', templateId)
    .eq('day_id', dayId)
    .eq('class_id', classId);

  if (error) { console.error('getDayEntries:', error.message); return []; }
  if (!data || data.length === 0) return [];

  // Bulk resolve names
  const facultyIds = data.map((e) => e.faculty_id);
  const subjectIds = data.map((e) => e.subject_id);
  const [userMap, subjectMap] = await Promise.all([
    fetchUserNames(facultyIds),
    fetchSubjectNames(subjectIds),
  ]);

  return data.map((e) => ({
    ...e,
    faculty_name: userMap[e.faculty_id] || null,
    subject_name: subjectMap[e.subject_id] || null,
  }));
};

/**
 * Get ALL entries for a template + class (full week)
 */
export const getWeekEntries = async (templateId, classId) => {
  const { data, error } = await supabase
    .from('timetable_entries')
    .select('*, timetable_slots(id, slot_order, slot_type, label, start_time, end_time, duration_minutes), timetable_days(day_name, day_index)')
    .eq('template_id', templateId)
    .eq('class_id', classId);

  if (error) { console.error('getWeekEntries:', error.message); return []; }
  if (!data || data.length === 0) return [];

  const facultyIds = data.map((e) => e.faculty_id);
  const subjectIds = data.map((e) => e.subject_id);
  const [userMap, subjectMap] = await Promise.all([
    fetchUserNames(facultyIds),
    fetchSubjectNames(subjectIds),
  ]);

  return data.map((e) => ({
    ...e,
    faculty_name: userMap[e.faculty_id] || null,
    subject_name: subjectMap[e.subject_id] || null,
  }));
};

/**
 * Get faculty timetable entries (what a teacher teaches)
 */
export const getFacultyEntries = async (templateId, facultyId) => {
  const { data, error } = await supabase
    .from('timetable_entries')
    .select('*, timetable_slots(id, slot_order, slot_type, label, start_time, end_time, duration_minutes), timetable_days(day_name, day_index), classes(class_name, section)')
    .eq('template_id', templateId)
    .eq('faculty_id', facultyId);

  if (error) { console.error('getFacultyEntries:', error.message); return []; }
  if (!data || data.length === 0) return [];

  const subjectIds = data.map((e) => e.subject_id);
  const subjectMap = await fetchSubjectNames(subjectIds);

  return data.map((e) => ({
    ...e,
    subject_name: subjectMap[e.subject_id] || null,
    faculty_name: null, // it's the same faculty
  }));
};

// ═══════════════════════════════════════════
//  DAILY RECORD / SNAPSHOT
// ═══════════════════════════════════════════

export const getDailyRecord = async (schoolId, date) => {
  const { data, error } = await supabase
    .from('timetable_daily_records')
    .select('*')
    .eq('school_id', schoolId)
    .eq('record_date', date)
    .maybeSingle();
  if (error) console.error('getDailyRecord:', error.message);
  return data || null;
};

/**
 * Get daily entries for a record + class, with names resolved
 */
export const getDailyEntries = async (dailyRecordId, classId) => {
  const { data, error } = await supabase
    .from('timetable_daily_entries')
    .select('*, timetable_slots(id, slot_order, slot_type, label, start_time, end_time, duration_minutes)')
    .eq('daily_record_id', dailyRecordId)
    .eq('class_id', classId);

  if (error) { console.error('getDailyEntries:', error.message); return []; }
  if (!data || data.length === 0) return [];

  const allFacultyIds = data.flatMap((e) => [e.original_faculty_id, e.actual_faculty_id]);
  const allSubjectIds = data.flatMap((e) => [e.original_subject_id, e.actual_subject_id]);
  const [userMap, subjectMap] = await Promise.all([
    fetchUserNames(allFacultyIds),
    fetchSubjectNames(allSubjectIds),
  ]);

  return data.map((e) => ({
    ...e,
    original_faculty_name: userMap[e.original_faculty_id] || null,
    actual_faculty_name: userMap[e.actual_faculty_id] || null,
    original_subject_name: subjectMap[e.original_subject_id] || null,
    actual_subject_name: subjectMap[e.actual_subject_id] || null,
  }));
};

/**
 * Get ALL daily entries for a record (all classes) - for admin preview
 */
export const getAllDailyEntries = async (dailyRecordId) => {
  const { data, error } = await supabase
    .from('timetable_daily_entries')
    .select('*, timetable_slots(id, slot_order, slot_type, label, start_time, end_time, duration_minutes), classes(class_name, section)')
    .eq('daily_record_id', dailyRecordId);

  if (error) { console.error('getAllDailyEntries:', error.message); return []; }
  if (!data || data.length === 0) return [];

  const allFacultyIds = data.flatMap((e) => [e.original_faculty_id, e.actual_faculty_id]);
  const allSubjectIds = data.flatMap((e) => [e.original_subject_id, e.actual_subject_id]);
  const [userMap, subjectMap] = await Promise.all([
    fetchUserNames(allFacultyIds),
    fetchSubjectNames(allSubjectIds),
  ]);

  return data.map((e) => ({
    ...e,
    original_faculty_name: userMap[e.original_faculty_id] || null,
    actual_faculty_name: userMap[e.actual_faculty_id] || null,
    original_subject_name: subjectMap[e.original_subject_id] || null,
    actual_subject_name: subjectMap[e.actual_subject_id] || null,
  }));
};

// ═══════════════════════════════════════════
//  CLASSES / SESSION / STUDENT
// ═══════════════════════════════════════════

export const getSchoolClasses = async (schoolId) => {
  const { data, error } = await supabase
    .from('classes')
    .select('*')
    .eq('school_id', schoolId)
    .order('class_name', { ascending: true });
  if (error) console.error('getSchoolClasses:', error.message);
  return data || [];
};

export const getActiveSession = async (schoolId) => {
  const { data, error } = await supabase
    .from('academic_sessions')
    .select('*')
    .eq('school_id', schoolId)
    .eq('is_active', true)
    .maybeSingle();
  if (error) console.error('getActiveSession:', error.message);
  return data;
};

export const getStudentClass = async (userId) => {
  const { data, error } = await supabase
    .from('student_profiles')
    .select('class_id, classes(id, class_name, section)')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) console.error('getStudentClass:', error.message);
  return data;
};

/**
 * Get all faculty for a school (for substitution picker)
 */
export const getSchoolFaculty = async (schoolId) => {
  const { data, error } = await supabase
    .from('users')
    .select('id, full_name, email')
    .eq('school_id', schoolId)
    .eq('role', 'faculty');
  if (error) console.error('getSchoolFaculty:', error.message);
  return data || [];
};

/**
 * Get all subjects for a school
 */
export const getSchoolSubjects = async (schoolId) => {
  const { data, error } = await supabase
    .from('subjects')
    .select('id, subject_name, subject_code')
    .eq('school_id', schoolId)
    .eq('is_active', true)
    .order('subject_name', { ascending: true });
  if (error) console.error('getSchoolSubjects:', error.message);
  return data || [];
};

// ═══════════════════════════════════════════
//  WRITE OPERATIONS
// ═══════════════════════════════════════════

/**
 * Create daily record as DRAFT
 */
export const createDailyRecordDraft = async ({ schoolId, sessionId, templateId, date, dayId, createdBy }) => {
  const { data, error } = await supabase
    .from('timetable_daily_records')
    .insert({
      school_id: schoolId,
      session_id: sessionId,
      template_id: templateId,
      record_date: date,
      day_id: dayId,
      status: 'draft',
      created_by: createdBy,
    })
    .select()
    .single();
  if (error) { console.error('createDailyRecordDraft:', error.message); return null; }
  return data;
};

/**
 * Snapshot all classes' entries from master → daily
 */
export const snapshotAllClassesToDaily = async (dailyRecordId, templateId, dayId, classIds) => {
  let allRows = [];
  for (const classId of classIds) {
    // Get raw master entries (no name resolution needed for snapshot)
    const { data } = await supabase
      .from('timetable_entries')
      .select('*')
      .eq('template_id', templateId)
      .eq('day_id', dayId)
      .eq('class_id', classId);

    if (data && data.length > 0) {
      const rows = data.map((e) => ({
        daily_record_id: dailyRecordId,
        slot_id: e.slot_id,
        class_id: e.class_id,
        original_subject_id: e.subject_id,
        original_faculty_id: e.faculty_id,
        actual_subject_id: e.subject_id,
        actual_faculty_id: e.faculty_id,
        status: 'as_planned',
      }));
      allRows = [...allRows, ...rows];
    }
  }

  if (allRows.length === 0) return [];

  const { data, error } = await supabase
    .from('timetable_daily_entries')
    .insert(allRows)
    .select();
  if (error) { console.error('snapshotAllClassesToDaily:', error.message); return []; }
  return data || [];
};

/**
 * Publish a daily record (draft → published)
 */
export const publishDailyRecord = async (recordId) => {
  const { data, error } = await supabase
    .from('timetable_daily_records')
    .update({ status: 'published', updated_at: new Date().toISOString() })
    .eq('id', recordId)
    .select()
    .single();
  if (error) { console.error('publishDailyRecord:', error.message); return null; }
  return data;
};

/**
 * Update a daily entry (substitute / cancel)
 */
export const updateDailyEntry = async (entryId, updates) => {
  const { data, error } = await supabase
    .from('timetable_daily_entries')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', entryId)
    .select()
    .single();
  if (error) { console.error('updateDailyEntry:', error.message); return null; }
  return data;
};
