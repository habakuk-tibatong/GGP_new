// ═══════════════════════════════════════════════════════════════════
// APP.JS – Schüler-SPA Logik
// Freiheit & Determination – Ethik 12. Jahrgangsstufe Bayern
// ═══════════════════════════════════════════════════════════════════

// ─── STATE ──────────────────────────────────────────────────────────
let state = {
  student: null,
  progress: [],
  reflections: [],
  badges: [],
  essays: [],
  totalXp: 0,
  currentView: 'dashboard',
  currentChapter: null,
  quizState: null,
};

// ─── API ─────────────────────────────────────────────────────────────
async function api(method, path, body) {
  const opts = { method, headers: { 'Content-Type': 'application/json' } };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(path, opts);
  return res.json();
}

// ─── INIT ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setupLoginForm();
  const saved = sessionStorage.getItem('student_id');
  if (saved) loadStudent(parseInt(saved));
});

function setupLoginForm() {
  document.getElementById('login-form').addEventListener('submit', async e => {
    e.preventDefault();
    const name = document.getElementById('login-name').value.trim();
    const pin = document.getElementById('login-pin').value.trim();
    const errEl = document.getElementById('login-error');
    errEl.classList.add('hidden');
    const data = await api('POST', '/api/auth/login', { name, pin });
    if (data.error) {
      errEl.textContent = data.error;
      errEl.classList.remove('hidden');
    } else {
      sessionStorage.setItem('student_id', data.student.id);
      await loadStudent(data.student.id);
    }
  });
}

async function loadStudent(id) {
  const data = await api('GET', `/api/student/${id}`);
  if (data.error) { sessionStorage.removeItem('student_id'); return; }
  state.student = data.student;
  state.progress = data.progress;
  state.reflections = data.reflections;
  state.badges = data.badges;
  state.essays = data.essays;
  state.totalXp = data.totalXp;
  showApp();
}

function showApp() {
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('app-screen').classList.remove('hidden');
  updateTopbar();
  renderView('dashboard');
}

// ─── TOPBAR ──────────────────────────────────────────────────────────
function updateTopbar() {
  const lvl = getLevel(state.totalXp);
  const next = getNextLevel(state.totalXp);
  document.getElementById('topbar-name').textContent = state.student.name;
  document.getElementById('topbar-xp').textContent = `⭐ ${state.totalXp} XP`;
  document.getElementById('topbar-level').textContent = `${lvl.emoji} ${lvl.name}`;
  const pct = next ? Math.round(((state.totalXp - lvl.min) / (next.min - lvl.min)) * 100) : 100;
  document.getElementById('topbar-progress').style.width = pct + '%';
}

// ─── NAV ─────────────────────────────────────────────────────────────
function renderView(view) {
  state.currentView = view;
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.view === view));
  const main = document.getElementById('main-content');

  if (view === 'dashboard') renderDashboard(main);
  else if (view === 'kapitel') renderChapterList(main);
  else if (view === 'quiz') renderQuizStart(main);
  else if (view === 'essay') renderEssay(main);
  else if (view === 'glossar') renderGlossary(main);
  else if (view === 'tagebuch') renderDiary(main);
}

// ─── DASHBOARD ───────────────────────────────────────────────────────
function renderDashboard(el) {
  const lvl = getLevel(state.totalXp);
  const next = getNextLevel(state.totalXp);
  const pct = next ? Math.round(((state.totalXp - lvl.min) / (next.min - lvl.min)) * 100) : 100;
  const completedCount = state.progress.filter(p => p.completed && p.chapter_id !== 'quiz').length;

  el.innerHTML = `
    <div class="hero-section fade-in">
      <div>
        <div class="hero-heading">Willkommen, ${state.student.name}!</div>
        <p class="hero-sub">Erkunde die Debatte um die menschliche Willensfreiheit – von den Laborexperimenten bis zur philosophischen Kritik. Lerne eigenverantwortlich und sammle Erfahrungspunkte.</p>
        <div class="hero-stats">
          <div class="hero-stat">
            <span class="hero-stat-value">${state.totalXp}</span>
            <span class="hero-stat-label">Erfahrungspunkte</span>
          </div>
          <div class="hero-stat">
            <span class="hero-stat-value">${completedCount}/5</span>
            <span class="hero-stat-label">Kapitel abgeschlossen</span>
          </div>
          <div class="hero-stat">
            <span class="hero-stat-value">${state.badges.length}</span>
            <span class="hero-stat-label">Badges verdient</span>
          </div>
        </div>
        <div style="margin-top:1.25rem;">
          <div style="display:flex;justify-content:space-between;font-size:0.8rem;color:var(--text-muted);margin-bottom:0.4rem;">
            <span>${lvl.name}</span>
            <span>${next ? next.name + ' in ' + (next.min - state.totalXp) + ' XP' : '🏆 Höchstes Level erreicht!'}</span>
          </div>
          <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
        </div>
      </div>
      <div class="hero-level-badge">
        <span class="hero-level-emoji">${lvl.emoji}</span>
        <div class="hero-level-num">Lv. ${lvl.num}</div>
        <div class="hero-level-name">${lvl.name}</div>
      </div>
    </div>

    <div style="margin-bottom:2rem;">
      <div class="section-title">Deine Errungenschaften</div>
      <div class="section-sub">Schalte Badges frei, indem du Kapitel abschließt und Aufgaben erledigst.</div>
      <div style="display:flex;flex-wrap:wrap;gap:0.75rem;">
        ${BADGES_DEF.map(b => {
          const earned = state.badges.some(eb => eb.badge_id === b.id);
          return `<div class="achievement ${earned ? 'earned' : 'locked'}" title="${b.desc}">
            <span class="achievement-emoji">${b.emoji}</span>
            <span class="achievement-name">${b.name}</span>
          </div>`;
        }).join('')}
      </div>
    </div>

    <div class="section-title">Lernpfad</div>
    <div class="section-sub">Wähle ein Kapitel aus, um zu starten. Du kannst die Reihenfolge frei wählen.</div>
    <div class="chapter-grid">
      ${CHAPTERS.map(ch => {
        const prog = state.progress.find(p => p.chapter_id === ch.id);
        const done = prog?.completed;
        return `<div class="chapter-card ${done ? 'completed' : ''}" style="--chapter-color:${ch.color}" onclick="openChapter('${ch.id}')">
          <span class="chapter-emoji">${ch.emoji}</span>
          <div class="chapter-num">${ch.num}</div>
          <div class="chapter-title">${ch.title}</div>
          <div class="chapter-desc">${ch.desc}</div>
          <div class="chapter-xp">
            <span class="badge-pill badge-${done ? 'green' : 'violet'}">
              ${done ? '✓ ' + (prog.xp_earned) + ' XP verdient' : '+ ' + ch.xpReward + ' XP möglich'}
            </span>
          </div>
        </div>`;
      }).join('')}
    </div>
  `;
}

// ─── CHAPTER LIST ─────────────────────────────────────────────────────
function renderChapterList(el) {
  el.innerHTML = `
    <div class="section-title fade-in">Alle Kapitel</div>
    <div class="section-sub">Wähle ein Kapitel zum Vertiefen.</div>
    <div class="chapter-grid">
      ${CHAPTERS.map(ch => {
        const prog = state.progress.find(p => p.chapter_id === ch.id);
        const done = prog?.completed;
        return `<div class="chapter-card ${done ? 'completed' : ''}" style="--chapter-color:${ch.color}" onclick="openChapter('${ch.id}')">
          <span class="chapter-emoji">${ch.emoji}</span>
          <div class="chapter-num">${ch.num}</div>
          <div class="chapter-title">${ch.title}</div>
          <div class="chapter-desc">${ch.desc}</div>
          <div class="chapter-xp">
            <span class="badge-pill badge-${done ? 'green' : 'violet'}">
              ${done ? '✓ Abgeschlossen' : '+ ' + ch.xpReward + ' XP'}
            </span>
          </div>
        </div>`;
      }).join('')}
    </div>
  `;
}

// ─── CHAPTER VIEWER ───────────────────────────────────────────────────
function openChapter(id) {
  state.currentChapter = CHAPTERS.find(c => c.id === id);
  const main = document.getElementById('main-content');
  const ch = state.currentChapter;
  const prog = state.progress.find(p => p.chapter_id === ch.id);

  main.innerHTML = `
    <div class="fade-in">
      <button class="chapter-back-btn" onclick="renderView(state.currentView)">← Zurück zur Übersicht</button>
      <div class="chapter-header">
        <div style="display:flex;align-items:center;gap:1rem;margin-bottom:0.75rem;">
          <span style="font-size:2.5rem;">${ch.emoji}</span>
          <div>
            <div style="font-size:0.8rem;font-weight:700;letter-spacing:0.08em;color:var(--text-muted);text-transform:uppercase;margin-bottom:0.25rem;">${ch.num}</div>
            <h2 style="font-family:'Playfair Display',serif;font-size:1.6rem;">${ch.title}</h2>
          </div>
        </div>
        <p>${ch.desc}</p>
      </div>

      <div class="lerntext-box">${ch.content}</div>

      <div class="activity-box">
        <div class="activity-title">✏️ Interaktive Aufgabe</div>
        <div id="activity-container"></div>
      </div>

      <div id="chapter-complete-section" class="hidden">
        <div class="card" style="text-align:center;border-color:var(--emerald);background:rgba(16,185,129,0.06);">
          <div style="font-size:3rem;margin-bottom:0.75rem;">🎉</div>
          <h3 style="color:var(--emerald);margin-bottom:0.5rem;">Kapitel abgeschlossen!</h3>
          <p style="margin-bottom:1.25rem;">Du hast +${ch.xpReward} XP verdient. Fülle jetzt die Reflexion aus, um weitere +25 XP zu bekommen.</p>
          <button class="btn btn-primary" onclick="openReflection('${ch.id}')">📝 Reflexion ausfüllen (+25 XP)</button>
        </div>
      </div>

      ${prog?.completed ? `<div class="warn-box">✓ Du hast dieses Kapitel bereits abgeschlossen.</div>` : ''}
    </div>
  `;

  renderActivity(ch);
}

// ─── ACTIVITIES ────────────────────────────────────────────────────────
function renderActivity(ch) {
  const container = document.getElementById('activity-container');
  if (!container) return;

  if (ch.activity.type === 'timeline') renderTimeline(container, ch);
  else if (ch.activity.type === 'matching') renderMatching(container, ch);
  else if (ch.activity.type === 'cases') renderCases(container, ch);
  else if (ch.activity.type === 'marys_room') renderMarysRoom(container, ch);
  else if (ch.activity.type === 'argument_map') renderArgumentMap(container, ch);
}

// TIMELINE
function renderTimeline(container, ch) {
  const act = ch.activity;
  const shuffled = [...act.items].sort(() => Math.random() - 0.5);
  container.innerHTML = `
    <div class="activity-desc">${act.desc}</div>
    <p style="font-size:0.8rem;color:var(--text-muted);margin-bottom:1rem;">💡 Tipp: ${act.hint}</p>
    <div class="drag-container" id="drag-pool">
      ${shuffled.map(item => `<div class="drag-item" draggable="true" data-id="${item.id}" data-label="${item.label}">${item.label}</div>`).join('')}
    </div>
    <div class="timeline-slots">
      ${act.items.map(item => `
        <div class="timeline-slot">
          <div class="timeline-slot-label">${item.time}</div>
          <div class="timeline-slot-drop" data-expected="${item.id}" ondragover="event.preventDefault();this.classList.add('drag-over')" ondragleave="this.classList.remove('drag-over')" ondrop="dropOnSlot(event,this,'${ch.id}')">
            Hier ablegen...
          </div>
        </div>
      `).join('')}
    </div>
    <div id="timeline-feedback" class="hidden"></div>
    <button class="btn btn-secondary btn-sm" onclick="checkTimeline('${ch.id}')">Überprüfen</button>
  `;
  setupDrag();
}

function setupDrag() {
  document.querySelectorAll('.drag-item').forEach(item => {
    item.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', JSON.stringify({ id: item.dataset.id, label: item.dataset.label }));
      item.classList.add('dragging');
    });
    item.addEventListener('dragend', () => item.classList.remove('dragging'));
  });
}

function dropOnSlot(e, slot, chId) {
  e.preventDefault();
  slot.classList.remove('drag-over');
  const { id, label } = JSON.parse(e.dataTransfer.getData('text/plain'));
  const prev = slot.dataset.placed;
  if (prev) {
    const pool = document.getElementById('drag-pool');
    const prevItem = document.createElement('div');
    prevItem.className = 'drag-item';
    prevItem.draggable = true;
    prevItem.dataset.id = prev;
    prevItem.dataset.label = slot.textContent.trim();
    prevItem.textContent = slot.textContent.trim();
    pool.appendChild(prevItem);
    setupDrag();
  }
  slot.innerHTML = label;
  slot.dataset.placed = id;
  slot.classList.add('filled');
  const draggedEl = document.querySelector(`.drag-item[data-id="${id}"]`);
  if (draggedEl) draggedEl.remove();
}

function checkTimeline(chId) {
  const slots = document.querySelectorAll('.timeline-slot-drop');
  let correct = 0;
  slots.forEach(slot => {
    if (slot.dataset.placed === slot.dataset.expected) {
      slot.style.borderColor = 'var(--emerald)';
      correct++;
    } else {
      slot.style.borderColor = 'var(--rose)';
    }
  });
  const fb = document.getElementById('timeline-feedback');
  fb.classList.remove('hidden');
  if (correct === slots.length) {
    fb.className = 'quiz-feedback correct';
    fb.innerHTML = '✅ Perfekt! Alle Zeitpunkte korrekt zugeordnet. Das Bereitschaftspotenzial geht dem bewussten Willensdrang zeitlich voraus.';
    completeActivity(chId);
  } else {
    fb.className = 'quiz-feedback wrong';
    fb.innerHTML = `❌ ${correct} von ${slots.length} korrekt. Prüfe die markierten Zeitslots und versuche es erneut.`;
  }
}

// MATCHING
function renderMatching(container, ch) {
  const act = ch.activity;
  const shuffled = [...act.items].sort(() => Math.random() - 0.5);
  container.innerHTML = `
    <div class="activity-desc">${act.desc}</div>
    <div id="matching-items" style="display:flex;flex-direction:column;gap:0.75rem;margin-bottom:1rem;">
      ${shuffled.map((item, i) => `
        <div style="display:flex;align-items:center;gap:1rem;background:var(--bg-card2);border:1px solid var(--border);border-radius:var(--radius-sm);padding:0.75rem 1rem;">
          <div style="flex:1;font-size:0.875rem;color:var(--text-secondary);">${item.text}</div>
          <select class="input-field" style="width:auto;min-width:100px;" data-answer="${item.answer}" id="match-${i}">
            <option value="">Wer?</option>
            ${act.options.map(o => `<option value="${o}">${o}</option>`).join('')}
          </select>
        </div>
      `).join('')}
    </div>
    <div id="matching-feedback" class="hidden"></div>
    <button class="btn btn-secondary btn-sm" onclick="checkMatching('${ch.id}')">Überprüfen</button>
  `;
}

function checkMatching(chId) {
  const selects = document.querySelectorAll('[data-answer]');
  let correct = 0;
  selects.forEach(sel => {
    const correct_ans = sel.dataset.answer;
    const given = sel.value;
    sel.style.borderColor = given === correct_ans ? 'var(--emerald)' : given ? 'var(--rose)' : 'var(--border)';
    if (given === correct_ans) correct++;
  });
  const fb = document.getElementById('matching-feedback');
  fb.classList.remove('hidden');
  if (correct === selects.length) {
    fb.className = 'quiz-feedback correct';
    fb.innerHTML = `✅ Alle ${correct} Zuordnungen korrekt! Du hast die Positionen von Roth, Singer und Prinz verinnerlicht.`;
    completeActivity(chId);
  } else {
    fb.className = 'quiz-feedback wrong';
    fb.innerHTML = `❌ ${correct} von ${selects.length} korrekt. Die falschen sind rot markiert.`;
  }
}

// CASES
function renderCases(container, ch) {
  const act = ch.activity;
  let currentCase = 0;
  window._caseState = { current: 0, correct: 0, total: act.cases.length };

  function renderCase() {
    const c = act.cases[window._caseState.current];
    container.innerHTML = `
      <div class="activity-desc">${act.desc}</div>
      <div style="font-size:0.8rem;color:var(--text-muted);margin-bottom:1rem;">Fallbeispiel ${window._caseState.current+1} von ${act.cases.length}</div>
      <div class="mary-card">
        <p style="font-size:1rem;color:var(--text-primary);font-weight:500;line-height:1.7;">${c.scenario}</p>
      </div>
      <div style="display:flex;gap:0.75rem;flex-wrap:wrap;margin-bottom:1rem;">
        ${c.options.map((opt, i) => `<button class="btn btn-secondary" onclick="answerCase(${i},'${ch.id}')">${opt}</button>`).join('')}
      </div>
      <div id="case-feedback" class="hidden"></div>
    `;
  }

  window.answerCase = (idx, chId) => {
    const c = act.cases[window._caseState.current];
    const fb = document.getElementById('case-feedback');
    fb.classList.remove('hidden');
    if (idx === c.correct) {
      fb.className = 'quiz-feedback correct';
      fb.innerHTML = `✅ Richtig! ${c.explanation}`;
      window._caseState.correct++;
    } else {
      fb.className = 'quiz-feedback wrong';
      fb.innerHTML = `❌ Nicht ganz. ${c.explanation}`;
    }
    document.querySelectorAll('.btn-secondary').forEach(b => b.disabled = true);
    setTimeout(() => {
      window._caseState.current++;
      if (window._caseState.current < act.cases.length) {
        renderCase();
      } else {
        container.innerHTML = `<div class="quiz-feedback correct">
          ✅ Alle Fallbeispiele bearbeitet! Du hast ${window._caseState.correct} von ${act.cases.length} korrekt beantwortet.
          ${window._caseState.correct === act.cases.length ? ' Perfekte Analyse!' : ''}
        </div>`;
        completeActivity(chId);
      }
    }, 2500);
  };
  renderCase();
}

// MARY'S ROOM
function renderMarysRoom(container, ch) {
  container.innerHTML = `
    <div class="activity-desc">${ch.activity.desc}</div>
    <div class="mary-card">
      <div class="mary-scene">🔬📚 → 🌹❓</div>
      <div class="mary-story">
        <strong>Mary ist Neurowissenschaftlerin</strong> und kennt alle physikalischen Fakten über Farben – Wellenlängen, neuronale Verarbeitung, Gehirnaktivität. Ihr ganzes Leben hat sie in einem <em>schwarz-weißen Zimmer</em> verbracht.<br><br>
        Jetzt verlässt Mary das Zimmer und sieht zum ersten Mal eine <strong>rote Rose</strong> 🌹.<br><br>
        <strong>Lernt Mary etwas Neues?</strong>
      </div>
      <div class="mary-choice-btns">
        <button class="btn btn-secondary" onclick="maryAnswer(true, '${ch.id}')">Ja, sie lernt etwas Neues</button>
        <button class="btn btn-secondary" onclick="maryAnswer(false, '${ch.id}')">Nein, sie weiß bereits alles</button>
      </div>
    </div>
    <div id="mary-result" class="hidden"></div>
  `;

  window.maryAnswer = (yes, chId) => {
    const result = document.getElementById('mary-result');
    result.classList.remove('hidden');
    if (yes) {
      result.className = 'mary-result';
      result.innerHTML = `
        <strong>🎯 Sehr gute Intuition!</strong> Die meisten Philosophen vertreten diese Position.<br><br>
        Wenn Mary etwas Neues lernt, dann bedeutet das: Physikalisches Wissen (Wellenlängen, Neuronen) erfasst nicht das <strong>subjektive Erleben</strong> – die <em>Qualia</em>. Es besteht eine <strong>Erklärungslücke</strong> (explanatory gap) zwischen physikalischen Beschreibungen und dem Erleben.<br><br>
        <strong>Konsequenz für die Willensfreiheitsdebatte:</strong> Wenn das subjektive Erleben nicht vollständig durch Physik erfasst wird, ist die neurobiologische Reduktion des Bewusstseins unvollständig – und damit auch der neurobiologische Determinismus.
      `;
    } else {
      result.className = 'mary-result';
      result.innerHTML = `
        <strong>Interessante Position – aber philosophisch umstritten!</strong><br><br>
        Wenn Mary nichts Neues lernt, müsste physikalisches Wissen <em>vollständig</em> das subjektive Erleben erfassen. Das würde bedeuten: Es gibt keine Erklärungslücke.<br><br>
        Die meisten Philosophen (Frank Jackson selbst, Thomas Nagel, David Chalmers) argumentieren aber: Mary <em>lernt</em> etwas Neues – nämlich <strong>wie es sich anfühlt</strong>, Rot zu sehen (das Quale der Rötlichkeit). Diese Tatsache lässt sich nicht aus physikalischen Beschreibungen ableiten.<br><br>
        <strong>Zum Nachdenken:</strong> Kannst du einem Farbenblinden durch Worte erklären, wie Rot wirklich aussieht?
      `;
    }
    document.querySelectorAll('.mary-choice-btns .btn').forEach(b => b.disabled = true);
    completeActivity(chId);
  };
}

// ARGUMENT MAP
function renderArgumentMap(container, ch) {
  const proArgs = [
    'Die Veto-Funktion (Schultze-Kraft 2016) belegt eine reale Kontrollmöglichkeit des Bewusstseins.',
    'Der Kompatibilismus zeigt: Freiheit bedeutet nicht Unabhängigkeit von Kausalität, sondern rationale Selbstbestimmung.',
    'Frankfurts Wünsche 2. Ordnung ermöglichen einen psychologisch plausiblen Freiheitsbegriff.',
    'Der performative Selbstwiderspruch unterminiert den radikalen Determinismus.',
    'Qualia und die Erklärungslücke zeigen, dass neuronale Beschreibungen das Bewusstsein nicht vollständig erfassen.',
  ];
  const contraArgs = [
    'Das Bereitschaftspotenzial beginnt 550 ms vor dem bewussten Entschluss.',
    'Haynes konnte Entscheidungen 7–10 Sekunden vorher im fMRT vorhersagen.',
    'Das Gehirn ist ein kausal geschlossenes System – kein immaterielles Agens kann eingreifen.',
    'Roth: Das bewusste Ich ist nur ein Exekutivorgan, das Urheberschaft nachkonstruiert.',
    'Singer: Freiheitserlebnis existiert aus der Dritte-Person-Perspektive nicht.',
  ];

  const selectedPro = new Set();
  const selectedContra = new Set();

  container.innerHTML = `
    <div class="activity-desc">Klicke auf die Argumente, um sie zu aktivieren. Wähle mindestens 2 Pro- und 2 Contra-Argumente, dann kannst du deine Position bestimmen.</div>
    <div class="argument-columns">
      <div class="argument-col">
        <div class="argument-col-title pro">✅ PRO Willensfreiheit</div>
        ${proArgs.map((a, i) => `<div class="argument-item" id="pro-${i}" onclick="toggleArg('pro',${i})">${a}</div>`).join('')}
      </div>
      <div class="argument-col">
        <div class="argument-col-title contra">❌ CONTRA Willensfreiheit</div>
        ${contraArgs.map((a, i) => `<div class="argument-item" id="contra-${i}" onclick="toggleArg('contra',${i})">${a}</div>`).join('')}
      </div>
    </div>
    <div id="slider-section" class="hidden">
      <div class="position-slider-wrap" style="margin-top:1.25rem;">
        <p style="font-weight:600;color:var(--text-primary);margin-bottom:0.75rem;">📍 Meine Position zur Willensfreiheit:</p>
        <div class="slider-labels">
          <span>Unmöglich (radikaler Determinismus)</span>
          <span>Voll möglich (libertäre Freiheit)</span>
        </div>
        <input type="range" min="1" max="5" value="3" id="position-slider" oninput="document.getElementById('slider-val').textContent=sliderLabels[this.value-1]">
        <div class="slider-value" id="slider-val">Eingeschränkte Freiheit (Kompatibilismus)</div>
      </div>
      <button class="btn btn-gold" style="margin-top:1rem;" onclick="savePosition('${ch.id}')">Position speichern & Kapitel abschließen (+25 XP)</button>
    </div>
    <div id="argmap-feedback" class="hidden"></div>
  `;

  window.sliderLabels = [
    'Keine Willensfreiheit (radikaler Determinismus)',
    'Kaum Willensfreiheit (weicher Determinismus)',
    'Eingeschränkte Freiheit (Kompatibilismus)',
    'Weitgehende Willensfreiheit',
    'Volle Willensfreiheit (Libertarismus)'
  ];

  window.toggleArg = (type, idx) => {
    const el = document.getElementById(`${type}-${idx}`);
    const set = type === 'pro' ? selectedPro : selectedContra;
    if (set.has(idx)) {
      set.delete(idx);
      el.className = 'argument-item';
    } else {
      set.add(idx);
      el.className = `argument-item active-${type}`;
    }
    if (selectedPro.size >= 2 && selectedContra.size >= 2) {
      document.getElementById('slider-section').classList.remove('hidden');
    }
  };

  window.savePosition = async (chId) => {
    const val = document.getElementById('position-slider').value;
    completeActivity(chId, parseInt(val));
  };
}

// ─── COMPLETE ACTIVITY ─────────────────────────────────────────────────
async function completeActivity(chId, sliderVal) {
  const ch = CHAPTERS.find(c => c.id === chId);
  const prog = state.progress.find(p => p.chapter_id === chId);
  if (prog?.completed) return;

  const res = await api('POST', '/api/progress', { student_id: state.student.id, chapter_id: chId, xp_earned: ch.xpReward });
  state.totalXp += ch.xpReward;
  if (!state.progress.find(p => p.chapter_id === chId)) {
    state.progress.push({ chapter_id: chId, completed: 1, xp_earned: ch.xpReward });
  } else {
    const p = state.progress.find(p => p.chapter_id === chId);
    p.completed = 1;
  }

  showXpPopup(`+${ch.xpReward} XP`, `${ch.emoji} ${ch.title} abgeschlossen!`);
  updateTopbar();

  // Badge vergeben
  const badgeId = `${chId}_done`;
  const badge = BADGES_DEF.find(b => b.id === badgeId);
  if (badge && !state.badges.some(b => b.badge_id === badgeId)) {
    await api('POST', '/api/badge', { student_id: state.student.id, badge_id: badgeId });
    state.badges.push({ badge_id: badgeId });
    setTimeout(() => showBadgePopup(badge), 1500);
  }

  // Alle 5 Kapitel? → "Kritischer Kopf" Badge
  const doneChs = state.progress.filter(p => p.completed && CHAPTERS.find(c => c.id === p.chapter_id)).length;
  if (doneChs >= 5 && !state.badges.some(b => b.badge_id === 'all_done')) {
    await api('POST', '/api/badge', { student_id: state.student.id, badge_id: 'all_done' });
    state.badges.push({ badge_id: 'all_done' });
    setTimeout(() => showBadgePopup(BADGES_DEF.find(b => b.id === 'all_done')), 3000);
  }

  // Reflexionsbutton anzeigen
  const completeSection = document.getElementById('chapter-complete-section');
  if (completeSection) completeSection.classList.remove('hidden');
}

// ─── REFLECTION ────────────────────────────────────────────────────────
function openReflection(chapterId) {
  const ch = CHAPTERS.find(c => c.id === chapterId);
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'reflection-modal';
  overlay.innerHTML = `
    <div class="modal-box">
      <div class="modal-header">
        <span class="modal-icon">🧘</span>
        <div>
          <div class="modal-title">Reflexion</div>
          <div class="modal-subtitle">${ch.emoji} ${ch.title}</div>
        </div>
      </div>
      
      <div class="modal-section">
        <span class="modal-section-label">🧠 Kognitiv – Was habe ich gelernt?</span>
        <textarea class="input-field" id="ref-kognitiv" placeholder="Was habe ich gut verstanden? Was ist noch unklar?" rows="3"></textarea>
      </div>
      <div class="modal-section">
        <span class="modal-section-label">🔍 Metakognitiv – Wie habe ich gelernt?</span>
        <textarea class="input-field" id="ref-metakognitiv" placeholder="Welche Strategie hat mir beim Lesen geholfen?" rows="3"></textarea>
      </div>
      <div class="modal-section">
        <span class="modal-section-label">💪 Motivational – Was hat mich bewegt?</span>
        <textarea class="input-field" id="ref-motivational" placeholder="Wie interessiert war ich? Was motiviert mich weiter?" rows="3"></textarea>
      </div>
      <div class="modal-section">
        <span class="modal-section-label">⭐ Überzeugungskraft der Argumente</span>
        <div class="stars-input" id="stars-input">
          ${[1,2,3,4,5].map(n => `<span class="star-btn" data-val="${n}" onclick="setStars(${n})">★</span>`).join('')}
        </div>
        <div style="font-size:0.8rem;color:var(--text-muted);" id="stars-label">Noch keine Bewertung</div>
      </div>
      <div class="modal-section">
        <span class="modal-section-label">📍 Meine Position: Willensfreiheit ist...</span>
        <div class="position-slider-wrap">
          <div class="slider-labels">
            <span>Unmöglich</span>
            <span>Eingeschränkt</span>
            <span>Voll möglich</span>
          </div>
          <input type="range" min="1" max="5" value="3" id="ref-slider" oninput="document.getElementById('ref-slider-val').textContent=sliderLabels[this.value-1]">
          <div class="slider-value" id="ref-slider-val">Eingeschränkte Freiheit (Kompatibilismus)</div>
        </div>
      </div>
      
      <div style="display:flex;gap:0.75rem;justify-content:flex-end;">
        <button class="btn btn-secondary" onclick="document.getElementById('reflection-modal').remove()">Abbrechen</button>
        <button class="btn btn-primary" onclick="submitReflection('${chapterId}')">Reflexion speichern (+25 XP) ✓</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  window._reflectionStars = 0;
  window.sliderLabels = window.sliderLabels || [
    'Keine Willensfreiheit (radikaler Determinismus)',
    'Kaum Willensfreiheit',
    'Eingeschränkte Freiheit (Kompatibilismus)',
    'Weitgehende Willensfreiheit',
    'Volle Willensfreiheit'
  ];
}

function setStars(n) {
  window._reflectionStars = n;
  document.querySelectorAll('.star-btn').forEach((s, i) => {
    s.classList.toggle('active', i < n);
  });
  const labels = ['', 'Wenig überzeugend', 'Eher nicht überzeugend', 'Teilweise überzeugend', 'Überzeugend', 'Sehr überzeugend'];
  document.getElementById('stars-label').textContent = labels[n];
}

async function submitReflection(chapterId) {
  const kognitiv = document.getElementById('ref-kognitiv').value;
  const metakognitiv = document.getElementById('ref-metakognitiv').value;
  const motivational = document.getElementById('ref-motivational').value;
  const sterne = window._reflectionStars;
  const positionSlider = document.getElementById('ref-slider').value;

  const res = await api('POST', '/api/reflection', {
    student_id: state.student.id, chapter_id: chapterId,
    kognitiv, metakognitiv, motivational, sterne: parseInt(sterne), position_slider: parseInt(positionSlider)
  });

  state.reflections.push({ chapter_id: chapterId, kognitiv, metakognitiv, motivational, sterne, position_slider: positionSlider, created_at: new Date().toISOString() });
  state.totalXp += res.xp_gained || 25;
  updateTopbar();
  showXpPopup(`+25 XP`, '📝 Reflexion gespeichert!');
  document.getElementById('reflection-modal').remove();
}

// ─── QUIZ ──────────────────────────────────────────────────────────────
function renderQuizStart(el) {
  el.innerHTML = `
    <div class="fade-in">
      <div class="section-title">Abschlussquiz</div>
      <p class="section-sub">15 Fragen aus allen Kapiteln. Bei ≥ 80% korrekt: +75 XP und Chance auf den „Freigeist"-Badge!</p>
      <div class="card" style="max-width:600px;">
        <div style="font-size:3rem;text-align:center;margin-bottom:1rem;">🎯</div>
        <h3 style="text-align:center;margin-bottom:0.5rem;">Bereit für den Test?</h3>
        <p style="text-align:center;margin-bottom:1.5rem;">Das Quiz umfasst 15 Fragen zu allen Kapiteln. Lies die Fragen sorgfältig – manche sind knifflig!</p>
        <button class="btn btn-primary btn-block" onclick="startQuiz()">Quiz starten 🚀</button>
      </div>
    </div>
  `;
}

function startQuiz() {
  const shuffled = [...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5);
  state.quizAttempts = (state.quizAttempts || 0) + 1;
  state.quizState = { questions: shuffled, current: 0, correct: 0, answered: [] };
  renderQuizQuestion(document.getElementById('main-content'));
}

function renderQuizQuestion(el) {
  const qs = state.quizState;
  if (qs.current >= qs.questions.length) { renderQuizResult(el); return; }
  const q = qs.questions[qs.current];
  const pct = Math.round((qs.current / qs.questions.length) * 100);

  el.innerHTML = `
    <div class="fade-in">
      <button class="chapter-back-btn" onclick="renderView('quiz')">← Zum Quiz-Start</button>
      <div class="quiz-progress-bar">
        <div class="quiz-progress-label">Frage ${qs.current + 1} von ${qs.questions.length}</div>
        <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
      </div>
      <div class="card">
        <div class="quiz-question">${q.q}</div>
        <div class="quiz-options">
          ${q.options.map((opt, i) => `<button class="quiz-option" id="qopt-${i}" onclick="answerQuiz(${i})">${opt}</button>`).join('')}
        </div>
        <div id="quiz-feedback" class="quiz-feedback hidden"></div>
        <button id="quiz-next-btn" class="btn btn-primary hidden" onclick="nextQuestion()">Nächste Frage →</button>
      </div>
    </div>
  `;
}

function answerQuiz(idx) {
  const qs = state.quizState;
  const q = qs.questions[qs.current];
  document.querySelectorAll('.quiz-option').forEach(b => b.disabled = true);

  const fb = document.getElementById('quiz-feedback');
  fb.classList.remove('hidden');

  if (idx === q.correct) {
    qs.correct++;
    document.getElementById(`qopt-${idx}`).classList.add('correct');
    fb.className = 'quiz-feedback correct';
    fb.innerHTML = `✅ Richtig! ${q.explanation}`;
  } else {
    document.getElementById(`qopt-${idx}`).classList.add('wrong');
    document.getElementById(`qopt-${q.correct}`).classList.add('correct');
    fb.className = 'quiz-feedback wrong';
    fb.innerHTML = `❌ Leider falsch. ${q.explanation}`;
  }
  document.getElementById('quiz-next-btn').classList.remove('hidden');
}

function nextQuestion() {
  state.quizState.current++;
  renderQuizQuestion(document.getElementById('main-content'));
}

async function renderQuizResult(el) {
  const qs = state.quizState;
  const score = Math.round((qs.correct / qs.questions.length) * 100);
  
  // Base XP
  let baseXp = score >= 80 ? 75 : score >= 60 ? 40 : 0;
  
  // Penalty for multiple attempts
  if (baseXp > 0 && state.quizAttempts > 1) {
    baseXp = Math.max(0, baseXp - ((state.quizAttempts - 1) * 5));
  }
  
  const passed = score >= 80;

  // Prevent double XP client drift
  const existingProg = state.progress.find(p => p.chapter_id === 'quiz');
  const prevXp = existingProg ? (existingProg.xp_earned || 0) : 0;
  
  let actualXpGained = 0;
  if (baseXp > prevXp) {
    actualXpGained = baseXp - prevXp;
  }

  // XP speichern
  if (actualXpGained > 0 || !existingProg) {
    const finalXp = Math.max(baseXp, prevXp);
    await api('POST', '/api/progress', { student_id: state.student.id, chapter_id: 'quiz', xp_earned: finalXp, quiz_score: score });
    state.totalXp += actualXpGained;
    
    if (existingProg) {
      existingProg.xp_earned = finalXp;
      existingProg.quiz_score = score;
    } else {
      state.progress.push({ chapter_id: 'quiz', completed: 1, xp_earned: finalXp, quiz_score: score });
    }
    updateTopbar();
  }

  // Freigeist-Badge bei ≥ 80% + Essay eingereicht?
  if (passed && state.essays.length > 0 && !state.badges.some(b => b.badge_id === 'freigeist')) {
    await api('POST', '/api/badge', { student_id: state.student.id, badge_id: 'freigeist' });
    state.badges.push({ badge_id: 'freigeist' });
    setTimeout(() => showBadgePopup(BADGES_DEF.find(b => b.id === 'freigeist')), 2000);
  }

  el.innerHTML = `
    <div class="fade-in" style="text-align:center;max-width:600px;margin:0 auto;">
      <div style="font-size:4rem;margin-bottom:1rem;">${passed ? '🏆' : score >= 60 ? '👍' : '📚'}</div>
      <h2 style="margin-bottom:0.5rem;">${passed ? 'Ausgezeichnet!' : score >= 60 ? 'Gut gemacht!' : 'Weiter üben!'}</h2>
      <div style="font-size:3rem;font-weight:800;color:${passed ? 'var(--emerald)' : score >= 60 ? 'var(--gold)' : 'var(--rose)'};margin:1rem 0;">${score}%</div>
      <p style="margin-bottom:0.25rem;">${qs.correct} von ${qs.questions.length} Fragen korrekt</p>
      <p style="margin-bottom:0.75rem; color:var(--text-muted); font-size: 0.8rem;">Versuch: ${state.quizAttempts} ${state.quizAttempts > 1 && baseXp > 0 ? '(-' + ((state.quizAttempts-1)*5) + ' XP Abzug)' : ''}</p>
      
      ${actualXpGained > 0 ? `<div class="badge-pill badge-gold" style="margin:0.75rem auto;display:inline-flex;">+${actualXpGained} XP verdient! (Gesamt: ${Math.max(baseXp, prevXp)} XP)</div>` : ''}
      ${actualXpGained === 0 && prevXp > 0 ? `<div class="badge-pill badge-violet" style="margin:0.75rem auto;display:inline-flex;">Deine Bestleistung bleibt: ${prevXp} XP</div>` : ''}
      
      <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-top:1.5rem;">
        <button class="btn btn-secondary" onclick="startQuiz()">Quiz wiederholen</button>
        <button class="btn btn-primary" onclick="renderView('essay')">Zur Abschlussaufgabe →</button>
      </div>
    </div>
  `;
  if (actualXpGained > 0) showXpPopup(`+${actualXpGained} XP`, `Quiz: ${score}% korrekt!`);
}

// ─── ESSAY ─────────────────────────────────────────────────────────────
function renderEssay(el) {
  const existing = state.essays[0];
  el.innerHTML = `
    <div class="fade-in">
      <div class="section-title">✍️ Abschlussaufgabe</div>
      <div class="section-sub">Argumentationsaufgabe – Bayerischer LehrplanPLUS Ethik 12</div>
      
      <div class="card" style="border-color:var(--violet);margin-bottom:1.5rem;">
        <div style="font-size:1rem;font-weight:700;color:var(--violet-light);margin-bottom:0.75rem;">📋 Aufgabenstellung</div>
        <p style="color:var(--text-primary);line-height:1.8;font-size:1rem;">
          „Bewerte die <strong>Relevanz</strong> und die <strong>Überzeugungskraft</strong> der Beiträge aus der Neurobiologie (Roth, Singer, Prinz) für die Frage nach der menschlichen Willensfreiheit. Berücksichtige dabei insbesondere die <strong>einschlägige philosophische Kritik</strong>."
        </p>
        <div class="info-box" style="margin-top:1rem;">Mindestlänge: 200 Wörter | Empfehlung: 300–400 Wörter</div>
      </div>

      <div class="card" style="margin-bottom:1.5rem;">
        <div style="font-weight:700;color:var(--text-primary);margin-bottom:0.75rem;">🗺️ Bewertungskriterien (Selbsteinschätzung)</div>
        <div class="rubric-grid">
          <div class="rubric-item"><div class="rubric-item-title">Sachkenntnis</div><div class="rubric-item-desc">Korrekte Darstellung von Libet, Roth, Singer, Prinz</div></div>
          <div class="rubric-item"><div class="rubric-item-title">Philosophische Kritik</div><div class="rubric-item-desc">Kategorienfehler, Qualia, Kompatibilismus werden berücksichtigt</div></div>
          <div class="rubric-item"><div class="rubric-item-title">Urteilsvermögen</div><div class="rubric-item-desc">Begründete, differenzierte eigene Position</div></div>
          <div class="rubric-item"><div class="rubric-item-title">Sprachliche Qualität</div><div class="rubric-item-desc">Klar, präzise, fachsprachlich korrekt</div></div>
        </div>
      </div>

      ${existing ? `<div class="warn-box">Du hast bereits eine Abschlussaufgabe eingereicht. Du kannst eine weitere einreichen.</div>` : ''}

      <div class="card">
        <div class="form-group">
          <label class="form-label">Dein Argumentationstext</label>
          <textarea class="input-field" id="essay-text" rows="12" placeholder="Schreibe hier deinen Argumentationstext...">${existing ? existing.text : ''}</textarea>
          <div class="word-count" id="word-count">0 Wörter</div>
        </div>
        <div class="form-group">
          <label class="form-label">Selbsteinschätzung (1 = schwach, 5 = sehr gut)</label>
          <div class="stars-input" id="essay-stars">
            ${[1,2,3,4,5].map(n => `<span class="star-btn" data-val="${n}" onclick="setEssayStars(${n})">★</span>`).join('')}
          </div>
        </div>
        <button class="btn btn-gold" id="essay-submit-btn" disabled onclick="submitEssay()">Abschlussaufgabe einreichen (+100 XP) 🏆</button>
      </div>
    </div>
  `;

  window._essayStars = 0;
  window.setEssayStars = n => {
    window._essayStars = n;
    document.querySelectorAll('#essay-stars .star-btn').forEach((s, i) => s.classList.toggle('active', i < n));
  };

  const ta = document.getElementById('essay-text');
  const wc = document.getElementById('word-count');
  const btn = document.getElementById('essay-submit-btn');
  ta.addEventListener('input', () => {
    const words = ta.value.trim() ? ta.value.trim().split(/\s+/).length : 0;
    wc.textContent = `${words} Wörter`;
    wc.className = 'word-count' + (words >= 200 ? ' ok' : '');
    btn.disabled = words < 200;
  });
  // Trigger für vorhandenen Text
  ta.dispatchEvent(new Event('input'));
}

async function submitEssay() {
  const text = document.getElementById('essay-text').value;
  const self_rating = window._essayStars;
  const res = await api('POST', '/api/essay', { student_id: state.student.id, text, self_rating });

  state.essays.push({ text, word_count: res.word_count, self_rating, submitted_at: new Date().toISOString() });
  state.totalXp += res.xp_gained || 100;
  updateTopbar();
  showXpPopup('+100 XP', '✍️ Abschlussaufgabe eingereicht!');

  // Freigeist-Badge
  const quizProg = state.progress.find(p => p.chapter_id === 'quiz');
  if (quizProg && (quizProg.quiz_score >= 80) && !state.badges.some(b => b.badge_id === 'freigeist')) {
    await api('POST', '/api/badge', { student_id: state.student.id, badge_id: 'freigeist' });
    state.badges.push({ badge_id: 'freigeist' });
    setTimeout(() => showBadgePopup(BADGES_DEF.find(b => b.id === 'freigeist')), 2000);
  }

  document.getElementById('essay-submit-btn').textContent = '✅ Eingereicht!';
  document.getElementById('essay-submit-btn').disabled = true;
}

// ─── GLOSSARY ──────────────────────────────────────────────────────────
function renderGlossary(el) {
  el.innerHTML = `
    <div class="fade-in">
      <div class="section-title">Glossar</div>
      <p class="section-sub">Alle zentralen Fachbegriffe auf einen Blick.</p>
      <div style="margin-bottom:1rem;">
        <input class="input-field" id="glossary-search" placeholder="Begriff suchen..." oninput="filterGlossary(this.value)">
      </div>
      <div class="glossary-grid" id="glossary-grid">
        ${GLOSSARY.map(g => `
          <div class="glossary-item" data-term="${g.term.toLowerCase()}">
            <div class="glossary-term">${g.term}</div>
            <div class="glossary-def">${g.def}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  window.filterGlossary = q => {
    document.querySelectorAll('.glossary-item').forEach(item => {
      item.style.display = item.dataset.term.includes(q.toLowerCase()) ? '' : 'none';
    });
  };
}

// ─── DIARY ─────────────────────────────────────────────────────────────
function renderDiary(el) {
  const chNames = Object.fromEntries(CHAPTERS.map(c => [c.id, `${c.emoji} ${c.title}`]));
  const posLabels = ['', 'Keine Freiheit', 'Kaum Freiheit', 'Eingeschränkt', 'Weitgehend frei', 'Voll frei'];

  el.innerHTML = `
    <div class="fade-in">
      <div class="section-title">📖 Mein Lerntagebuch</div>
      <p class="section-sub">Alle deine Reflexionen im Überblick.</p>
      ${state.reflections.length === 0 ? `
        <div class="card" style="text-align:center;">
          <div style="font-size:3rem;margin-bottom:0.75rem;">📝</div>
          <p>Noch keine Reflexionen vorhanden. Schließe ein Kapitel ab und fülle die Reflexion aus!</p>
        </div>
      ` : state.reflections.map(r => `
        <div class="diary-entry">
          <div class="diary-entry-header">
            <div class="diary-entry-chapter">${chNames[r.chapter_id] || r.chapter_id}</div>
            <div class="diary-entry-date">${new Date(r.created_at).toLocaleDateString('de-DE', {day:'2-digit',month:'long',year:'numeric'})}</div>
          </div>
          ${r.kognitiv ? `<div class="diary-field"><div class="diary-field-label">🧠 Kognitiv</div><div class="diary-field-value">${r.kognitiv}</div></div>` : ''}
          ${r.metakognitiv ? `<div class="diary-field"><div class="diary-field-label">🔍 Metakognitiv</div><div class="diary-field-value">${r.metakognitiv}</div></div>` : ''}
          ${r.motivational ? `<div class="diary-field"><div class="diary-field-label">💪 Motivational</div><div class="diary-field-value">${r.motivational}</div></div>` : ''}
          <div style="display:flex;gap:1.5rem;flex-wrap:wrap;margin-top:0.5rem;">
            ${r.sterne ? `<div><div class="diary-field-label">Überzeugungskraft</div><div class="stars-display">${'★'.repeat(r.sterne)}${'☆'.repeat(5-r.sterne)}</div></div>` : ''}
            ${r.position_slider ? `<div><div class="diary-field-label">Meine Position</div><div class="diary-field-value" style="color:var(--violet-light);">${posLabels[r.position_slider] || ''}</div></div>` : ''}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// ─── POPUPS ─────────────────────────────────────────────────────────────
function showXpPopup(xp, msg) {
  const el = document.createElement('div');
  el.className = 'xp-popup';
  el.innerHTML = `<span class="xp-popup-emoji">⭐</span><div><div style="font-size:1.2rem;">${xp}</div><div style="font-size:0.8rem;font-weight:400;">${msg}</div></div>`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3100);
}

function showBadgePopup(badge) {
  if (!badge) return;
  const el = document.createElement('div');
  el.className = 'badge-popup';
  el.innerHTML = `<span class="badge-popup-emoji">${badge.emoji}</span><div class="badge-popup-label">Neues Badge!</div><div class="badge-popup-name">${badge.name}</div>`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 4100);
}

function logout() {
  sessionStorage.removeItem('student_id');
  location.reload();
}
