const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, 'data.json');

// Initiale leere Datenbank-Struktur
let db = {
  students: [],
  progress: [],
  reflections: [],
  badges: [],
  essays: []
};

// Laden der Daten beim Start
function loadData() {
  if (fs.existsSync(dataFile)) {
    try {
      const content = fs.readFileSync(dataFile, 'utf8');
      db = JSON.parse(content);
    } catch (e) {
      console.error("Fehler beim Laden der Datenbank:", e);
    }
  } else {
    saveData();
  }
}

// Speichern der Daten (synchron für dieses einfache Setup ausreichend)
function saveData() {
  fs.writeFileSync(dataFile, JSON.stringify(db, null, 2), 'utf8');
}

loadData();

function getStudent(id) {
  return db.students.find(s => s.id === id);
}

function getStudentByNamePin(name, pin) {
  return db.students.find(s => s.name.toLowerCase() === name.toLowerCase() && s.pin === pin);
}

function createStudent(name, cls, pin) {
  const existing = db.students.find(s => s.name.toLowerCase() === name.toLowerCase());
  if (existing) throw new Error('Schülername existiert bereits');
  
  const id = db.students.length > 0 ? Math.max(...db.students.map(s => s.id)) + 1 : 1;
  const newStudent = { id, name, class: cls, pin, total_xp: 0, last_activity: new Date().toISOString() };
  db.students.push(newStudent);
  saveData();
  return newStudent;
}

function deleteStudent(id) {
  db.students = db.students.filter(s => s.id !== id);
  db.progress = db.progress.filter(p => p.student_id !== id);
  db.reflections = db.reflections.filter(r => r.student_id !== id);
  db.badges = db.badges.filter(b => b.student_id !== id);
  db.essays = db.essays.filter(e => e.student_id !== id);
  saveData();
}

function getAllStudents() {
  return db.students.map(s => {
    const s_prog = db.progress.filter(p => p.student_id === s.id);
    const s_badges = db.badges.filter(b => b.student_id === s.id);
    return {
      id: s.id,
      name: s.name,
      class: s.class,
      totalXp: s.total_xp,
      completedChapters: s_prog.filter(p => p.completed && p.chapter_id !== 'quiz').length,
      badgeCount: s_badges.length,
      lastActivity: s.last_activity
    };
  });
}

function getStudentData(studentId) {
  const student = getStudent(studentId);
  if (!student) return null;
  return {
    student,
    progress: db.progress.filter(p => p.student_id === studentId),
    reflections: db.reflections.filter(r => r.student_id === studentId),
    badges: db.badges.filter(b => b.student_id === studentId),
    essays: db.essays.filter(e => e.student_id === studentId),
    totalXp: student.total_xp
  };
}

function updateActivity(studentId) {
  const student = getStudent(studentId);
  if (student) {
    student.last_activity = new Date().toISOString();
    saveData();
  }
}

function saveProgress(studentId, chapterId, xpEarned, quizScore = null) {
  const student = getStudent(studentId);
  if (!student) return;
  
  const existing = db.progress.find(p => p.student_id === studentId && p.chapter_id === chapterId);
  if (!existing) {
    db.progress.push({
      student_id: studentId,
      chapter_id: chapterId,
      completed: 1,
      xp_earned: xpEarned,
      quiz_score: quizScore
    });
    student.total_xp += xpEarned;
  } else {
    // Falls nur geupdated wird (z.B. besseres Quiz)
    if (quizScore !== null) existing.quiz_score = quizScore;
    if (!existing.completed) {
      existing.completed = 1;
      existing.xp_earned = xpEarned;
      student.total_xp += xpEarned;
    }
  }
  updateActivity(studentId);
}

function saveReflection(studentId, chapterId, data) {
  const student = getStudent(studentId);
  if (!student) return;

  const xpGained = 25;
  db.reflections.push({
    student_id: studentId,
    chapter_id: chapterId,
    kognitiv: data.kognitiv || null,
    metakognitiv: data.metakognitiv || null,
    motivational: data.motivational || null,
    sterne: data.sterne || null,
    position_slider: data.position_slider || null,
    created_at: new Date().toISOString()
  });
  
  student.total_xp += xpGained;
  updateActivity(studentId);
  return xpGained;
}

function awardBadge(studentId, badgeId) {
  const student = getStudent(studentId);
  if (!student) return;

  const hasBadge = db.badges.find(b => b.student_id === studentId && b.badge_id === badgeId);
  if (!hasBadge) {
    db.badges.push({ student_id: studentId, badge_id: badgeId, earned_at: new Date().toISOString() });
    updateActivity(studentId);
  }
}

function saveEssay(studentId, text, selfRating) {
  const student = getStudent(studentId);
  if (!student) return;

  const wordCount = text.trim().split(/\s+/).length;
  const xpGained = 100;
  
  db.essays.push({
    student_id: studentId,
    text,
    word_count: wordCount,
    self_rating: selfRating,
    submitted_at: new Date().toISOString()
  });
  
  student.total_xp += xpGained;
  updateActivity(studentId);
  
  return { word_count: wordCount, xp_gained: xpGained };
}

module.exports = {
  getStudentByNamePin,
  getStudent,
  createStudent,
  getAllStudents,
  getStudentData,
  saveProgress,
  saveReflection,
  awardBadge,
  saveEssay,
  deleteStudent
};
