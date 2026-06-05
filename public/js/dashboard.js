let dashboardPw = '';
let studentsData = [];
let sortCol = 'totalXp';
let sortDesc = true;

document.getElementById('dash-login-form').addEventListener('submit', async e => {
  e.preventDefault();
  dashboardPw = document.getElementById('dash-pw').value;
  const res = await fetch('/api/auth/dashboard', {
    method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ password: dashboardPw })
  });
  const data = await res.json();
  if (data.ok) {
    document.getElementById('login-view').classList.add('hidden');
    document.getElementById('dashboard-view').classList.remove('hidden');
    loadData();
  } else {
    const err = document.getElementById('login-err');
    err.textContent = data.error;
    err.classList.remove('hidden');
  }
});

async function loadData() {
  const res = await fetch('/api/dashboard');
  studentsData = await res.json();
  document.getElementById('stat-total').textContent = studentsData.length;
  renderTable();
}

function setSort(col) {
  if (sortCol === col) sortDesc = !sortDesc;
  else { sortCol = col; sortDesc = true; }
  renderTable();
}

function renderTable() {
  const q = document.getElementById('search-input').value.toLowerCase();
  let filtered = studentsData.filter(s => s.name.toLowerCase().includes(q) || (s.class||'').toLowerCase().includes(q));
  
  filtered.sort((a,b) => {
    let valA = a[sortCol], valB = b[sortCol];
    if (typeof valA === 'string') valA = valA.toLowerCase();
    if (typeof valB === 'string') valB = valB.toLowerCase();
    if (!valA && valB) return sortDesc ? 1 : -1;
    if (valA && !valB) return sortDesc ? -1 : 1;
    if (valA < valB) return sortDesc ? 1 : -1;
    if (valA > valB) return sortDesc ? -1 : 1;
    return 0;
  });

  const tbody = document.getElementById('student-tbody');
  tbody.innerHTML = filtered.map(s => `
    <tr>
      <td style="font-weight:600;">${s.name}</td>
      <td style="color:var(--text-muted);">${s.class}</td>
      <td>${s.completedChapters}/5</td>
      <td style="color:var(--gold-light);font-weight:700;">${s.totalXp}</td>
      <td>${s.badgeCount}</td>
      <td style="font-size:0.8rem;color:var(--text-muted);">${s.lastActivity ? new Date(s.lastActivity).toLocaleDateString() : 'N/A'}</td>
      <td>
        <button class="action-btn" onclick="openDetail(${s.id})">Details</button>
        <button class="action-btn danger" onclick="deleteStudent(${s.id}, '${s.name}')">Löschen</button>
      </td>
    </tr>
  `).join('');
}

function showAddStudent() {
  document.getElementById('add-modal').classList.remove('hidden');
  document.getElementById('add-err').classList.add('hidden');
}

async function addStudent() {
  const name = document.getElementById('add-name').value;
  const cls = document.getElementById('add-class').value;
  const pin = document.getElementById('add-pin').value;
  const res = await fetch('/api/admin/student', {
    method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ password: dashboardPw, name, class: cls, pin })
  });
  const data = await res.json();
  if (data.ok) {
    document.getElementById('add-modal').classList.add('hidden');
    loadData();
  } else {
    document.getElementById('add-err').textContent = data.error;
    document.getElementById('add-err').classList.remove('hidden');
  }
}

async function deleteStudent(id, name) {
  if (!confirm(`Schüler:in "${name}" wirklich löschen? Alle Daten gehen verloren.`)) return;
  await fetch(`/api/admin/student/${id}`, {
    method: 'DELETE', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ password: dashboardPw })
  });
  loadData();
}

async function openDetail(id) {
  document.getElementById('view-list').classList.add('hidden');
  document.getElementById('view-detail').classList.remove('hidden');
  
  const res = await fetch(`/api/dashboard/${id}`);
  const data = await res.json();
  
  let html = `
    <h2 style="margin-bottom:0.5rem;">${data.student.name} <span style="font-size:1rem;font-weight:400;color:var(--text-muted);">(${data.student.class})</span></h2>
    <div style="display:flex;gap:1.5rem;margin-bottom:2rem;font-size:0.9rem;">
      <div>⭐ ${data.totalXp} XP</div>
      <div>🏆 ${data.badges.length} Badges</div>
    </div>
    
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;">
      <div>
        <h3 style="margin-bottom:1rem;color:var(--violet-light);">Kapitel-Fortschritt</h3>
        ${data.progress.map(p => `
          <div style="background:var(--bg-card2);padding:0.75rem;border-radius:var(--radius-sm);margin-bottom:0.5rem;border:1px solid var(--border);">
            <div style="font-weight:600;">${p.chapter_id}</div>
            <div style="font-size:0.8rem;color:var(--text-muted);display:flex;justify-content:space-between;">
              <span>${p.completed ? '✅ Abgeschlossen' : 'In Bearbeitung'}</span>
              <span>+${p.xp_earned} XP</span>
              ${p.quiz_score !== null ? `<span>Quiz: ${p.quiz_score}%</span>` : ''}
            </div>
          </div>
        `).join('')}
        ${data.progress.length === 0 ? '<p style="color:var(--text-muted);font-size:0.8rem;">Noch keine Fortschritte.</p>' : ''}
      </div>
      
      <div>
        <h3 style="margin-bottom:1rem;color:var(--gold-light);">Reflexionen</h3>
        ${data.reflections.map(r => `
          <div style="background:var(--bg-card2);padding:1rem;border-radius:var(--radius-sm);margin-bottom:0.75rem;border:1px solid var(--border);">
            <div style="font-size:0.8rem;font-weight:700;color:var(--violet-light);margin-bottom:0.5rem;text-transform:uppercase;">${r.chapter_id}</div>
            ${r.kognitiv ? `<div style="font-size:0.8rem;margin-bottom:0.4rem;"><strong>Kognitiv:</strong> ${r.kognitiv}</div>` : ''}
            ${r.sterne ? `<div style="font-size:0.8rem;margin-bottom:0.4rem;"><strong>Wertung:</strong> ${r.sterne} Sterne</div>` : ''}
            ${r.position_slider ? `<div style="font-size:0.8rem;"><strong>Position:</strong> Slider-Wert ${r.position_slider}/5</div>` : ''}
          </div>
        `).join('')}
        ${data.reflections.length === 0 ? '<p style="color:var(--text-muted);font-size:0.8rem;">Noch keine Reflexionen.</p>' : ''}
      </div>
    </div>
    
    <div style="margin-top:2rem;">
      <h3 style="margin-bottom:1rem;color:var(--emerald);">Argumentationsaufgabe</h3>
      ${data.essays.map(e => `
        <div style="background:var(--bg-card2);padding:1.5rem;border-radius:var(--radius-sm);border:1px solid var(--emerald);">
          <div style="font-size:0.8rem;color:var(--text-muted);margin-bottom:1rem;">Eingereicht: ${new Date(e.submitted_at).toLocaleString()} | ${e.word_count} Wörter | Selbsteinschätzung: ${e.self_rating}/5 Sterne</div>
          <div style="font-family:serif;font-size:1.05rem;line-height:1.7;white-space:pre-wrap;">${e.text}</div>
        </div>
      `).join('')}
      ${data.essays.length === 0 ? '<p style="color:var(--text-muted);font-size:0.8rem;">Noch keine Aufgabe eingereicht.</p>' : ''}
    </div>
  `;
  document.getElementById('detail-content').innerHTML = html;
}

function closeDetail() {
  document.getElementById('view-detail').classList.add('hidden');
  document.getElementById('view-list').classList.remove('hidden');
}
