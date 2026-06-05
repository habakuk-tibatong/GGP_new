const express = require('express');
const path = require('path');
const db = require('./database/db');

const app = express();
const PORT = process.env.PORT || 3000;
const DASHBOARD_PASSWORD = process.env.DASHBOARD_PASSWORD || 'ethik2025';

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ─── AUTH ────────────────────────────────────────────────────────────────────

app.post('/api/auth/login', (req, res) => {
  const { name, pin } = req.body;
  if (!name || !pin) return res.status(400).json({ error: 'Name und PIN erforderlich.' });
  const student = db.getStudentByNamePin(name.trim(), pin.trim());
  if (!student) return res.status(401).json({ error: 'Name oder PIN falsch.' });
  res.json({ student });
});

app.post('/api/auth/dashboard', (req, res) => {
  const { password } = req.body;
  if (password === DASHBOARD_PASSWORD) {
    res.json({ ok: true });
  } else {
    res.status(401).json({ error: 'Falsches Passwort.' });
  }
});

// ─── STUDENT ─────────────────────────────────────────────────────────────────

app.get('/api/student/:id', (req, res) => {
  const data = db.getStudentData(parseInt(req.params.id));
  if (!data) return res.status(404).json({ error: 'Schüler:in nicht gefunden.' });
  res.json(data);
});

// ─── PROGRESS ────────────────────────────────────────────────────────────────

app.post('/api/progress', (req, res) => {
  const { student_id, chapter_id, xp_earned, quiz_score } = req.body;
  if (!student_id || !chapter_id) return res.status(400).json({ error: 'Fehlende Felder.' });
  db.saveProgress(student_id, chapter_id, xp_earned || 0, quiz_score);
  res.json({ ok: true });
});

// ─── REFLECTION ──────────────────────────────────────────────────────────────

app.post('/api/reflection', (req, res) => {
  const { student_id, chapter_id, kognitiv, metakognitiv, motivational, sterne, position_slider } = req.body;
  if (!student_id || !chapter_id) return res.status(400).json({ error: 'Fehlende Felder.' });
  const xp_gained = db.saveReflection(student_id, chapter_id, { kognitiv, metakognitiv, motivational, sterne, position_slider });
  res.json({ ok: true, xp_gained });
});

// ─── BADGE ───────────────────────────────────────────────────────────────────

app.post('/api/badge', (req, res) => {
  const { student_id, badge_id } = req.body;
  if (!student_id || !badge_id) return res.status(400).json({ error: 'Fehlende Felder.' });
  db.awardBadge(student_id, badge_id);
  res.json({ ok: true });
});

// ─── ESSAY ───────────────────────────────────────────────────────────────────

app.post('/api/essay', (req, res) => {
  const { student_id, text, self_rating } = req.body;
  if (!student_id || !text) return res.status(400).json({ error: 'Fehlende Felder.' });
  const result = db.saveEssay(student_id, text, self_rating);
  res.json({ ok: true, ...result });
});

// ─── DASHBOARD ───────────────────────────────────────────────────────────────

app.get('/api/dashboard', (req, res) => {
  const students = db.getAllStudents();
  res.json(students);
});

app.get('/api/dashboard/:id', (req, res) => {
  const data = db.getStudentData(parseInt(req.params.id));
  if (!data) return res.status(404).json({ error: 'Nicht gefunden.' });
  res.json(data);
});

// ─── ADMIN ───────────────────────────────────────────────────────────────────

app.post('/api/admin/student', (req, res) => {
  const { name, class: cls, pin, password } = req.body;
  if (password !== DASHBOARD_PASSWORD) return res.status(401).json({ error: 'Nicht autorisiert.' });
  if (!name || !pin) return res.status(400).json({ error: 'Name und PIN erforderlich.' });
  try {
    const student = db.createStudent(name.trim(), cls || '', pin.trim());
    res.json({ ok: true, id: student.id });
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
});

app.delete('/api/admin/student/:id', (req, res) => {
  const { password } = req.body;
  if (password !== DASHBOARD_PASSWORD) return res.status(401).json({ error: 'Nicht autorisiert.' });
  db.deleteStudent(parseInt(req.params.id));
  res.json({ ok: true });
});

// ─── START ───────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`\n🧠 Freiheit & Determination – Lernplattform`);
  console.log(`📚 Schüler-Frontend: http://localhost:${PORT}`);
  console.log(`📊 Lehrkraft-Dashboard: http://localhost:${PORT}/dashboard.html`);
  console.log(`🔑 Dashboard-Passwort: ${DASHBOARD_PASSWORD}\n`);
});
