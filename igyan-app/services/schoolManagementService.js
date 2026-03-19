/**
 * iGyan — School Management Service
 * CRUD for subjects, classes, students, class-subjects, faculty assignments
 */

import { supabase } from '../utils/supabase';

// ─── HELPERS ────────────────────────────────────────────────
const throwOnError = (res, label) => {
  if (res.error) throw new Error(`${label}: ${res.error.message}`);
  return res.data;
};

// ─── ACADEMIC SESSIONS ──────────────────────────────────────
export async function getActiveSession(schoolId) {
  const { data } = await supabase
    .from('academic_sessions')
    .select('*')
    .eq('school_id', schoolId)
    .eq('is_active', true)
    .maybeSingle();
  return data;
}

export async function getSessions(schoolId) {
  return throwOnError(
    await supabase
      .from('academic_sessions')
      .select('*')
      .eq('school_id', schoolId)
      .order('start_date', { ascending: false }),
    'getSessions',
  );
}

// ─── SUBJECTS ───────────────────────────────────────────────
export async function getSubjects(schoolId) {
  return throwOnError(
    await supabase
      .from('subjects')
      .select('*')
      .eq('school_id', schoolId)
      .order('subject_name'),
    'getSubjects',
  );
}

export async function addSubject({ schoolId, subjectName, subjectCode, description }) {
  return throwOnError(
    await supabase
      .from('subjects')
      .insert({
        school_id: schoolId,
        subject_name: subjectName,
        subject_code: subjectCode || null,
        description: description || null,
      })
      .select()
      .single(),
    'addSubject',
  );
}

export async function deleteSubject(id) {
  return throwOnError(
    await supabase.from('subjects').delete().eq('id', id),
    'deleteSubject',
  );
}

// ─── CLASSES ────────────────────────────────────────────────
export async function getClasses(schoolId, sessionId) {
  let q = supabase
    .from('classes')
    .select('*')
    .eq('school_id', schoolId)
    .order('class_name');
  if (sessionId) q = q.eq('session_id', sessionId);
  return throwOnError(await q, 'getClasses');
}

export async function addClass({ schoolId, sessionId, className, section, roomNumber, capacity }) {
  return throwOnError(
    await supabase
      .from('classes')
      .insert({
        school_id: schoolId,
        session_id: sessionId,
        class_name: className,
        section: section || 'A',
        room_number: roomNumber || null,
        capacity: capacity ? parseInt(capacity, 10) : null,
      })
      .select()
      .single(),
    'addClass',
  );
}

export async function deleteClass(id) {
  return throwOnError(
    await supabase.from('classes').delete().eq('id', id),
    'deleteClass',
  );
}

// ─── STUDENTS (users with role=student in school) ───────────
export async function getSchoolStudents(schoolId) {
  return throwOnError(
    await supabase
      .from('users')
      .select('id, full_name, email, role')
      .eq('school_id', schoolId)
      .eq('role', 'student')
      .order('full_name'),
    'getSchoolStudents',
  );
}

// ─── CLASS STUDENTS ─────────────────────────────────────────
export async function getClassStudents(classId) {
  return throwOnError(
    await supabase
      .from('class_students')
      .select('*, users:student_id(id, full_name, email)')
      .eq('class_id', classId)
      .eq('status', 'active')
      .order('roll_number'),
    'getClassStudents',
  );
}

export async function enrollStudent({ schoolId, classId, studentId, sessionId, rollNumber }) {
  return throwOnError(
    await supabase
      .from('class_students')
      .insert({
        school_id: schoolId,
        class_id: classId,
        student_id: studentId,
        session_id: sessionId,
        roll_number: rollNumber || null,
        status: 'active',
      })
      .select()
      .single(),
    'enrollStudent',
  );
}

export async function removeStudentFromClass(id) {
  return throwOnError(
    await supabase.from('class_students').update({ status: 'dropped', left_at: new Date().toISOString() }).eq('id', id).select().single(),
    'removeStudent',
  );
}

// ─── CLASS SUBJECTS ─────────────────────────────────────────
export async function getClassSubjects(classId) {
  return throwOnError(
    await supabase
      .from('class_subjects')
      .select('*, subjects:subject_id(id, subject_name, subject_code)')
      .eq('class_id', classId),
    'getClassSubjects',
  );
}

export async function assignSubjectToClass({ schoolId, classId, subjectId }) {
  return throwOnError(
    await supabase
      .from('class_subjects')
      .insert({ school_id: schoolId, class_id: classId, subject_id: subjectId })
      .select()
      .single(),
    'assignSubjectToClass',
  );
}

export async function removeSubjectFromClass(id) {
  return throwOnError(
    await supabase.from('class_subjects').delete().eq('id', id),
    'removeSubjectFromClass',
  );
}

// ─── FACULTY (users with role=faculty) ──────────────────────
export async function getSchoolFaculty(schoolId) {
  return throwOnError(
    await supabase
      .from('users')
      .select('id, full_name, email, role')
      .eq('school_id', schoolId)
      .eq('role', 'faculty')
      .order('full_name'),
    'getSchoolFaculty',
  );
}

// ─── FACULTY ASSIGNMENTS ────────────────────────────────────
export async function getFacultyAssignments(schoolId, sessionId) {
  return throwOnError(
    await supabase
      .from('faculty_assignments')
      .select('*, users:faculty_id(id, full_name, email), classes:class_id(id, class_name, section), subjects:subject_id(id, subject_name)')
      .eq('school_id', schoolId)
      .eq('session_id', sessionId)
      .eq('is_active', true)
      .order('created_at', { ascending: false }),
    'getFacultyAssignments',
  );
}

export async function assignFaculty({ schoolId, facultyId, classId, subjectId, sessionId, assignmentType }) {
  return throwOnError(
    await supabase
      .from('faculty_assignments')
      .insert({
        school_id: schoolId,
        faculty_id: facultyId,
        class_id: classId,
        subject_id: subjectId || null,
        session_id: sessionId,
        assignment_type: assignmentType || 'subject_teacher',
        is_active: true,
      })
      .select()
      .single(),
    'assignFaculty',
  );
}

export async function removeFacultyAssignment(id) {
  return throwOnError(
    await supabase.from('faculty_assignments').update({ is_active: false }).eq('id', id).select().single(),
    'removeFacultyAssignment',
  );
}

// ─── USER MANAGEMENT (add students / faculty) ───────────────
export async function getSchoolUsers(schoolId) {
  return throwOnError(
    await supabase
      .from('users')
      .select('id, full_name, email, role, phone, created_at')
      .eq('school_id', schoolId)
      .order('full_name'),
    'getSchoolUsers',
  );
}

export async function addUser({ schoolId, fullName, email, passwordHash, role, phone }) {
  return throwOnError(
    await supabase
      .from('users')
      .insert({
        school_id: schoolId,
        full_name: fullName,
        email,
        password_hash: passwordHash,
        role,
        phone: phone || null,
      })
      .select()
      .single(),
    'addUser',
  );
}

export async function deleteUser(id) {
  return throwOnError(
    await supabase.from('users').delete().eq('id', id),
    'deleteUser',
  );
}

export async function updateUserRole(id, role) {
  return throwOnError(
    await supabase.from('users').update({ role }).eq('id', id).select().single(),
    'updateUserRole',
  );
}
