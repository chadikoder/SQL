const STORAGE_KEY = "sql_tracker_v1";
let state = loadState();
let currentTab = "cours";
let exFilter = "all";

const W3_URLS = {
  "w3-intro": "https://www.w3schools.com/sql/sql_intro.asp",
  "w3-syntax": "https://www.w3schools.com/sql/sql_syntax.asp",
  "w3-variables": "https://www.w3schools.com/sql/sql_variables.asp",
  "w3-echo": "https://www.w3schools.com/sql/sql_echo_print.asp",
  "w3-types": "https://www.w3schools.com/sql/sql_datatypes.asp",
  "w3-strings": "https://www.w3schools.com/sql/sql_string.asp",
  "w3-numbers": "https://www.w3schools.com/sql/sql_numbers.asp",
  "w3-constants": "https://www.w3schools.com/sql/sql_constants.asp",
  "w3-operators": "https://www.w3schools.com/sql/sql_operators.asp",
  "w3-if": "https://www.w3schools.com/sql/sql_if_else.asp",
  "w3-loops": "https://www.w3schools.com/sql/sql_looping.asp",
  "w3-functions-basic": "https://www.w3schools.com/sql/sql_functions.asp",
  "w3-arrays-basic": "https://www.w3schools.com/sql/sql_arrays.asp",
  "w3-superglobals": "https://www.w3schools.com/sql/sql_superglobals.asp",
  "w3-forms": "https://www.w3schools.com/sql/sql_forms.asp",
  "w3-validation": "https://www.w3schools.com/sql/sql_form_validation.asp",
  "w3-regex": "https://www.w3schools.com/sql/sql_regex.asp",
  "w3-date": "https://www.w3schools.com/sql/sql_date.asp",
  "w3-include": "https://www.w3schools.com/sql/sql_includes.asp",
  "w3-file": "https://www.w3schools.com/sql/sql_file_open.asp",
  "w3-upload": "https://www.w3schools.com/sql/sql_file_upload.asp",
  "w3-cookies": "https://www.w3schools.com/sql/sql_cookies.asp",
  "w3-sessions": "https://www.w3schools.com/sql/sql_sessions.asp",
  "w3-json": "https://www.w3schools.com/sql/sql_json.asp",
  "w3-oop": "https://www.w3schools.com/sql/sql_oop_what_is.asp",
  "w3-constructor": "https://www.w3schools.com/sql/sql_oop_classes_objects.asp",
  "w3-modifiers": "https://www.w3schools.com/sql/sql_oop_access_modifiers.asp",
  "w3-inheritance": "https://www.w3schools.com/sql/sql_oop_inheritance.asp",
  "w3-abstract": "https://www.w3schools.com/sql/sql_oop_classes_abstract.asp",
  "w3-interfaces": "https://www.w3schools.com/sql/sql_oop_interfaces.asp",
  "w3-static": "https://www.w3schools.com/sql/sql_oop_static_methods.asp",
  "w3-exceptions": "https://www.w3schools.com/sql/sql_exception.asp",
  "w3-mysql": "https://www.w3schools.com/sql/sql_mysql_intro.asp",
  "w3-traits": "https://www.w3schools.com/sql/sql_oop_traits.asp",
  "day-1": "https://www.w3schools.com/sql/sql_syntax.asp",
  "day-2": "https://www.w3schools.com/sql/sql_functions.asp",
  "day-3": "https://www.w3schools.com/sql/sql_form_validation.asp",
  "day-4": "https://www.w3schools.com/sql/sql_sessions.asp",
  "day-5": "https://www.w3schools.com/sql/sql_mysql_intro.asp",
  "day-6": "https://www.w3schools.com/sql/sql_file_upload.asp",
  "day-7": "https://www.w3schools.com/sql/sql_oop_what_is.asp",
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    return Object.assign(defaultState(), JSON.parse(raw));
  } catch { return defaultState(); }
}

function defaultState() {
  return { completed: {}, exDone: {}, bookmarks: {}, lastActive: null, theme: "dark", sectionsCollapsed: {} };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function highlightPhp(code) {
  let s = esc(code);
  const stash = [];
  const hold = (cls, text) => {
    const i = stash.length;
    stash.push(`<span class="${cls}">${text}</span>`);
    return `__SAWAHOLD${i}HOLD__`;
  };
  s = s.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, m => hold("str", m));
  s = s.replace(/(\/\/[^\n]*|\/\*[\s\S]*?\*\/|#[^\n]*)/g, m => hold("com", m));
  s = s.replace(/\b(function|return|if|else|elseif|while|for|foreach|as|switch|case|default|break|continue|do|class|new|public|private|protected|static|const|use|namespace|require|require_once|include|include_once|echo|print|die|exit|true|false|null|self|parent|instanceof|extends|implements|interface|trait|try|catch|finally|throw|fn|match|declare|global|and|or|xor)\b/g, '<span class="kw">$1</span>');
  s = s.replace(/(\$\w+)/g, '<span class="var">$1</span>');
  s = s.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="num">$1</span>');
  s = s.replace(/\b([a-z_][a-z0-9_]*)\s*\(/gi, '<span class="fn">$1</span>(');
  s = s.replace(/(?:&lt;\?php|\?&gt;)/g, '<span class="kw">$&</span>');
  s = s.replace(/(-&gt;|=&gt;|::)/g, '<span class="op">$&</span>');
  return s.replace(/__SAWAHOLD(\d+)HOLD__/g, (_, i) => stash[+i] ?? "");
}

function celebrate() {
  const c = document.createElement('div');
  c.className = 'confetti-wrap';
  const colors = ['#6366f1','#818cf8','#22c55e','#f59e0b','#ef4444','#38bdf8'];
  for (let i = 0; i < 50; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-p';
    p.style.left = Math.random() * 100 + '%';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.animationDelay = Math.random() * 0.8 + 's';
    p.style.animationDuration = (1.5 + Math.random() * 1.5) + 's';
    p.style.width = (6 + Math.random() * 8) + 'px';
    p.style.height = (6 + Math.random() * 8) + 'px';
    p.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    c.appendChild(p);
  }
  document.body.appendChild(c);
  setTimeout(() => c.remove(), 3500);
}

/* ====================================================================
   SIDEBAR
   ==================================================================== */
function renderSidebar() {
  document.getElementById("nav-days").innerHTML = DAYS.map(navItem).join("");
  const basic = GIO.filter(l => (l.level || "basic") === "basic");
  const inter = GIO.filter(l => l.level === "intermediate");
  const adv = GIO.filter(l => l.level === "advanced");
  document.getElementById("nav-basic").innerHTML = basic.map(navItem).join("") || `<div class="empty-search">Aucune leçon</div>`;
  document.getElementById("nav-intermediate").innerHTML = inter.map(navItem).join("") || `<div class="empty-search">Aucune leçon</div>`;
  document.getElementById("nav-advanced").innerHTML = adv.map(navItem).join("") || `<div class="empty-search">Aucune leçon</div>`;
  bindNav();
  applyCollapseState();
  refreshProgress();
}

function updateSidebarActive() {
  document.querySelectorAll(".nav-item").forEach(el => {
    const id = el.dataset.id;
    const lesson = ALL_LESSONS.find(l => l.id === id);
    if (!lesson) return;
    el.classList.toggle("active", id === state.lastActive);
    el.classList.toggle("done", !!state.completed[id]);
    const exTotal = lesson.exercises ? lesson.exercises.length : 0;
    const exDone = lesson.exercises ? lesson.exercises.filter(e => state.exDone[lesson.id + "-" + e.num]).length : 0;
    el.classList.toggle("fully-done", exTotal > 0 && exDone === exTotal);
    const fill = el.querySelector(".nav-progress-fill");
    const count = el.querySelector(".nav-ex-count");
    if (fill) fill.style.width = exTotal ? Math.round(exDone / exTotal * 100) + "%" : "0%";
    if (count) count.textContent = exDone + "/" + exTotal;
  });
  refreshProgress();
}

function navItem(l) {
  const done = !!state.completed[l.id];
  const active = state.lastActive === l.id;
  const exTotal = l.exercises ? l.exercises.length : 0;
  const exDone = l.exercises ? l.exercises.filter(e => state.exDone[l.id + "-" + e.num]).length : 0;
  const fullyDone = exTotal > 0 && exDone === exTotal;
  const labelText = l.title.replace(/^Jour \d+ - /, "");
  return `<div class="nav-item ${done ? "done" : ""} ${active ? "active" : ""} ${fullyDone ? "fully-done" : ""}" data-id="${l.id}" title="${esc(l.title)}">
    <span class="nav-check">${done ? "✓" : ""}</span>
    <span class="nav-tag">${l.code}</span>
    <span class="nav-label">${esc(labelText)}</span>
    ${exTotal > 0 ? `
    <span class="nav-ex-wrap">
      <span class="nav-progress"><span class="nav-progress-fill" style="width:${exTotal ? Math.round(exDone / exTotal * 100) : 0}%"></span></span>
      <span class="nav-ex-count">${exDone}/${exTotal}</span>
    </span>` : ""}
  </div>`;
}

function bindNav() {
  document.querySelectorAll(".nav-item").forEach(el => {
    el.setAttribute("role", "button");
    el.setAttribute("tabindex", "0");
    el.addEventListener("click", () => {
      openLesson(el.dataset.id);
      document.body.classList.remove("drawer-open");
    });
    el.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLesson(el.dataset.id);
        document.body.classList.remove("drawer-open");
      }
    });

    const check = el.querySelector(".nav-check");
    if (check) {
      check.setAttribute("role", "checkbox");
      check.setAttribute("tabindex", "0");
      check.setAttribute("aria-label", "Marquer comme terminé");
      const toggle = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const id = el.dataset.id;
        if (state.completed[id]) {
          delete state.completed[id];
        } else {
          state.completed[id] = Date.now();
          celebrate();
        }
        saveState();
        updateSidebarActive();
        if (state.lastActive === id) {
          const btn = document.getElementById("toggle-done");
          if (btn) {
            const done = !!state.completed[id];
            btn.classList.toggle("done", done);
            btn.textContent = done ? "✓ Terminé" : "Marquer terminé";
          }
        }
      };
      check.addEventListener("click", toggle);
      check.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") toggle(e);
      });
    }
  });
}

/* ====================================================================
   SIDEBAR COLLAPSE
   ==================================================================== */
function bindCollapseTitles() {
  document.querySelectorAll(".collapsible").forEach(el => {
    el.addEventListener("click", () => {
      const section = el.dataset.section;
      if (state.sectionsCollapsed[section]) {
        delete state.sectionsCollapsed[section];
      } else {
        state.sectionsCollapsed[section] = true;
      }
      saveState();
      applyCollapseState();
    });
  });
}

function applyCollapseState() {
  document.querySelectorAll(".collapsible").forEach(el => {
    const section = el.dataset.section;
    const target = document.getElementById("nav-" + section);
    const arrow = el.querySelector(".collapse-arrow");
    if (!target || !arrow) return;
    if (state.sectionsCollapsed[section]) {
      target.style.display = "none";
      arrow.style.transform = "rotate(-90deg)";
      el.classList.add("collapsed");
    } else {
      target.style.display = "";
      arrow.style.transform = "";
      el.classList.remove("collapsed");
    }
  });
}

/* ====================================================================
   OPEN LESSON
   ==================================================================== */
function openLesson(id) {
  const lesson = ALL_LESSONS.find(l => l.id === id);
  if (!lesson) return;
  state.lastActive = id;
  saveState();
  updateSidebarActive();

  const done = !!state.completed[id];
  const isDay = id.startsWith("day-");
  const hasEx = lesson.exercises && lesson.exercises.length > 0;
  const idx = ALL_LESSONS.findIndex(l => l.id === id);
  const prev = idx > 0 ? ALL_LESSONS[idx - 1] : null;
  const next = idx < ALL_LESSONS.length - 1 ? ALL_LESSONS[idx + 1] : null;

  currentTab = "cours";
  exFilter = "all";

  const main = document.getElementById("main");
  main.innerHTML = `
    <div class="lesson-header">
      <div>
        <div class="breadcrumb">${isDay ? "📘 Plan 7 jours SQL" : "🌐 W3Schools SQL"} · ${lesson.code}</div>
        <h1 class="lesson-title">${esc(lesson.title)}</h1>
        ${lesson.sub ? `<div class="lesson-sub">${esc(lesson.sub)}</div>` : ""}
        ${lesson.tags ? `<div class="tag-row">${lesson.tags.map(t => `<span class="tag">#${esc(t)}</span>`).join("")}</div>` : ""}
      </div>
      <div class="lesson-actions">
        ${id === "day-7" ? `<span class="tag" style="background:rgba(245,158,11,.12);color:var(--warn);font-weight:700">🏁 Examen blanc</span>` : ""}
        ${W3_URLS[id] ? `<a class="w3-link" href="${W3_URLS[id]}" target="_blank" rel="noopener noreferrer">📖 Source W3Schools ↗</a>` : ""}
        <button class="complete-btn ${done ? "done" : ""}" id="toggle-done">${done ? "✓ Terminé" : "Marquer terminé"}</button>
      </div>
    </div>
    ${lesson.why ? `<div class="why-card"><b>🎯 Pourquoi —</b> ${lesson.why}</div>` : ""}
    <div id="ex-area"></div>
    <div class="lesson-foot">
      ${prev ? `<button class="btn-nav prev" data-id="${prev.id}"><span class="dir">← Précédent</span><span class="ttl">${esc(prev.title.replace(/^Jour \d+ - /, ""))}</span></button>` : `<div class="btn-nav" style="opacity:.3;cursor:default"><span class="dir">Début</span><span class="ttl">Aucune leçon</span></div>`}
      ${next ? `<button class="btn-nav next" data-id="${next.id}"><span class="dir">Suivant →</span><span class="ttl">${esc(next.title.replace(/^Jour \d+ - /, ""))}</span></button>` : `<div class="btn-nav next" style="opacity:.3;cursor:default"><span class="dir">Fin</span><span class="ttl">Plus de leçons</span></div>`}
    </div>
  `;

  document.getElementById("toggle-done").addEventListener("click", () => toggleDone(id));
  main.querySelectorAll(".btn-nav[data-id]").forEach(btn => {
    btn.addEventListener("click", () => openLesson(btn.dataset.id));
  });

  main.classList.add("main-animate-in");
  renderExArea(lesson);
  bindCopyButtons();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleDone(id) {
  const wasDone = !!state.completed[id];
  if (wasDone) {
    delete state.completed[id];
  } else {
    state.completed[id] = Date.now();
    celebrate();
  }
  saveState();
  openLesson(id);
}

/* ====================================================================
   EX AREA
   ==================================================================== */
function renderExArea(lesson) {
  const area = document.getElementById("ex-area");
  if (!area) return;
  const hasEx = lesson.exercises && lesson.exercises.length > 0;
  const exs = lesson.exercises || [];
  const total = exs.length;
  const done = exs.filter(e => state.exDone[lesson.id + "-" + e.num]).length;

  const bmCount = exs.filter(e => state.bookmarks[lesson.id + "-" + e.num]).length;

  let filtered = exs;
  if (exFilter !== "all" && hasEx) {
    if (exFilter === "bookmark") {
      filtered = exs.filter(e => state.bookmarks[lesson.id + "-" + e.num]);
    } else {
      filtered = exs.filter(e => e.diff === exFilter);
    }
  }

  area.innerHTML = `
    <div class="tabs">
      <div class="tab ${currentTab === "cours" ? "active" : ""}" data-tab="cours">📖 Cours</div>
      ${hasEx ? `<div class="tab ${currentTab === "exos" ? "active" : ""}" data-tab="exos">✍️ Exercices <b style="font-variant-numeric:tabular-nums;margin-left:4px">${done}/${total}</b></div>` : ""}
    </div>
    <div class="tab-content ${currentTab === "cours" ? "active" : ""}" id="tab-cours">
      <div class="lesson-body">
        ${(lesson.sections || []).map(renderSection).join("")}
        ${lesson.quiz && lesson.quiz.length ? renderQuiz(lesson.quiz) : ""}
      </div>
    </div>
    ${hasEx ? `
    <div class="tab-content ${currentTab === "exos" ? "active" : ""}" id="tab-exos">
      <div class="ex-filter">
        <button class="ex-filter-btn ${exFilter === "all" ? "active" : ""}" data-filter="all">Tous (${total})</button>
        <button class="ex-filter-btn ${exFilter === "easy" ? "active" : ""}" data-filter="easy">🟢 Facile (${exs.filter(e => e.diff === "easy").length})</button>
        <button class="ex-filter-btn ${exFilter === "medium" ? "active" : ""}" data-filter="medium">🟡 Moyen (${exs.filter(e => e.diff === "medium").length})</button>
        <button class="ex-filter-btn ${exFilter === "hard" ? "active" : ""}" data-filter="hard">🟠 Difficile (${exs.filter(e => e.diff === "hard").length})</button>
        <button class="ex-filter-btn ${exFilter === "extreme" ? "active" : ""}" data-filter="extreme">🔴 Extrême (${exs.filter(e => e.diff === "extreme").length})</button>
        <button class="ex-filter-btn ${exFilter === "bookmark" ? "active" : ""}" data-filter="bookmark">📌 Signets (${bmCount})</button>
      </div>
      <div class="ex-counter">
        <b>${done}</b>/${total} terminés
        <span class="ex-counter-bar"><span class="ex-counter-fill" style="width:${total ? Math.round(done / total * 100) : 0}%"></span></span>
      </div>
      <div class="ex-cards">
        ${filtered.length ? filtered.map(e => renderExCard(lesson, e)).join("") : `<div class="empty-search">Aucun exercice dans cette catégorie</div>`}
      </div>
    </div>` : ""}
  `;

  // Tab switching
  area.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => {
      currentTab = tab.dataset.tab;
      renderExArea(lesson);
      bindCopyButtons();
    });
  });

  // Quiz (always in "cours" tab)
  area.querySelectorAll(".quiz-opt").forEach(opt => {
    opt.addEventListener("click", () => {
      const card = opt.closest(".quiz-card");
      if (card.dataset.answered) return;
      card.dataset.answered = "1";
      const correct = card.dataset.correct;
      card.querySelectorAll(".quiz-opt").forEach(o => {
        o.classList.add("disabled");
        if (o.dataset.letter === correct) {
          o.classList.add("correct");
          o.insertAdjacentHTML("beforeend", ' <span class="quiz-ico">&#10003;</span>');
        } else if (o === opt) {
          o.classList.add("wrong");
          o.insertAdjacentHTML("beforeend", ' <span class="quiz-ico">&#10007;</span>');
        }
      });
      const expl = card.querySelector(".quiz-expl");
      if (expl) expl.classList.add("shown");
    });
  });

  // Try buttons
  area.querySelectorAll(".try-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = document.getElementById(btn.dataset.target);
      if (!target) return;
      const open = target.classList.toggle("open");
      btn.textContent = open ? "🙈 Cacher" : "Voir la réponse";
    });
  });

  // Output toggle
  area.querySelectorAll(".output-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const wrap = btn.closest(".code-output");
      const open = wrap.classList.toggle("open");
      btn.textContent = open ? "▼ Cacher résultat" : "▶ Voir résultat";
    });
  });

  if (!hasEx) return;

  // Exercise filter
  area.querySelectorAll(".ex-filter-btn").forEach(btn => {
    if (btn.dataset.bound) return;
    btn.dataset.bound = "1";
    btn.addEventListener("click", () => {
      exFilter = btn.dataset.filter;
      renderExArea(lesson);
      bindCopyButtons();
    });
  });

  // Exercise check toggle
  area.querySelectorAll(".ex-check").forEach(chk => {
    chk.addEventListener("click", e => {
      e.stopPropagation();
      const key = chk.dataset.key;
      if (state.exDone[key]) delete state.exDone[key];
      else state.exDone[key] = Date.now();
      saveState();
      updateSidebarActive();
      renderExArea(lesson);
      bindCopyButtons();
    });
  });

  // Solution toggle
  area.querySelectorAll(".ex-sol-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.key;
      const block = document.getElementById("sol-" + key);
      if (!block) return;
      const open = block.classList.toggle("open");
      btn.textContent = open ? "🙈 Cacher" : "👁️ Voir solution";
    });
  });

  // Bookmark toggle
  area.querySelectorAll(".ex-bookmark").forEach(bm => {
    bm.addEventListener("click", e => {
      e.stopPropagation();
      const key = bm.dataset.key;
      if (state.bookmarks[key]) delete state.bookmarks[key];
      else state.bookmarks[key] = Date.now();
      saveState();
      renderExArea(lesson);
    });
  });
}

function renderSection(s) {
  let out = `<section class="section-card">`;
  out += `<h3>${esc(s.h)}</h3>`;
  if (s.p) out += `<p>${s.p}</p>`;
  if (s.blocks && Array.isArray(s.blocks)) {
    s.blocks.forEach(b => { out += renderBlock(b); });
  }
  out += `</section>`;
  return out;
}

function renderBlock(b) {
  if (b.p) return `<p>${b.p}</p>`;
  if (b.text) return `<p>${b.text}</p>`;
  if (b.code) {
    const out = b.out
      ? `<div class="code-output"><button class="output-toggle">▶ Voir résultat</button><div class="output-content"><pre><code>${esc(b.out)}</code></pre></div></div>`
      : "";
    return `<div class="block-code"><pre><code>${highlightPhp(b.code)}</code></pre></div>${out}`;
  }
  if (b.note) return `<div class="block-note"><b>💡 Astuce</b> ${b.note}</div>`;
  if (b.tip) return `<div class="block-tip"><b>✓ Bonne pratique</b> ${b.tip}</div>`;
  if (b.warn) return `<div class="block-warn"><b>⚠️ Piège examen</b> ${b.warn}</div>`;
  if (b.bad) return `<div class="block-bad"><b>❌ Erreur fatale</b> ${b.bad}</div>`;
  if (b.try) {
    const id = "try-" + Math.random().toString(36).slice(2, 9);
    return `<div class="block-try"><b>🤔 Devine —</b> ${b.try}<button class="try-btn" data-target="${id}" style="display:block;margin-top:6px;font-size:12px;color:var(--text-3);background:none;border:none;cursor:pointer;font-family:inherit">Voir la réponse</button><div class="try-ans" id="${id}" style="display:none;margin-top:6px;padding:8px 12px;background:var(--bg-2);border-radius:var(--r-sm);font-size:13px">${b.ans || ""}</div></div>`;
  }
  if (b.table) {
    const rows = b.table.map((row, i) =>
      `<tr>${row.map(c => `<${i === 0 ? "th" : "td"}>${c}</${i === 0 ? "th" : "td"}>`).join("")}</tr>`
    ).join("");
    return `<div class="block-table"><table>${rows}</table></div>`;
  }
  if (b.list) {
    return `<ul class="block-list">${b.list.map(li => `<li>${li}</li>`).join("")}</ul>`;
  }
  return "";
}

function renderQuiz(quiz) {
  const cards = quiz.map((q, i) => {
    const letters = q.opts.map((_, j) => String.fromCharCode(97 + j));
    const opts = q.opts.map((o, j) =>
      `<button class="quiz-opt" data-letter="${letters[j]}">${o}</button>`
    ).join("");
    return `<div class="quiz-card" data-correct="${q.correct}">
      <div class="quiz-q"><span class="num">Q${i + 1}.</span> ${q.q}</div>
      <div class="quiz-opts">${opts}</div>
      ${q.expl ? `<div class="quiz-expl">${q.expl}</div>` : ""}
    </div>`;
  }).join("");
  return `<div class="quiz-section">
    <h3 class="quiz-title">🎯 Mini-quiz — vérifie tes acquis</h3>
    <p class="quiz-sub">Clique sur la bonne réponse. Pas de score : c'est pour s'entraîner.</p>
    ${cards}
  </div>`;
}

function renderExCard(lesson, ex) {
  const key = lesson.id + "-" + ex.num;
  const exDone = !!state.exDone[key];
  const isBm = !!state.bookmarks[key];
  const diffLbl = { easy: "Facile", medium: "Moyen", hard: "Difficile", extreme: "Extrême" };
  return `<div class="ex-card ${exDone ? "done" : ""}">
    <span class="ex-check ${exDone ? "done" : ""}" data-key="${key}" title="Marquer comme terminé">${exDone ? "✓" : ""}</span>
    <div class="ex-info">
      <div class="ex-num">#${ex.num}</div>
      <div class="ex-title">${esc(ex.title)}</div>
      ${ex.desc ? `<div class="ex-desc">${esc(ex.desc)}</div>` : ""}
    </div>
    <span class="ex-diff ${ex.diff}">${diffLbl[ex.diff] || ex.diff}</span>
    <button class="ex-bookmark ${isBm ? "active" : ""}" data-key="${key}" title="${isBm ? "Retirer le signet" : "Ajouter un signet"}">${isBm ? "🔖" : "🏷️"}</button>
    <button class="ex-sol-btn" data-key="${key}">👁️ Voir solution</button>
    <div class="ex-sol" id="sol-${key}">
      <div class="block-code"><pre><code>${highlightPhp(ex.sol)}</code></pre></div>
    </div>
  </div>`;
}

/* ====================================================================
   COPY BUTTON
   ==================================================================== */
function bindCopyButtons() {
  document.querySelectorAll(".block-code pre code").forEach(codeBlock => {
    const pre = codeBlock.parentElement;
    if (pre.querySelector(".copy-btn")) return;
    const btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.textContent = "Copier";
    pre.appendChild(btn);
    btn.addEventListener("click", async e => {
      e.stopPropagation();
      try {
        await navigator.clipboard.writeText(codeBlock.innerText);
        const originalText = btn.textContent;
        btn.textContent = "Copié ! ✓";
        btn.style.background = "var(--good)";
        btn.style.color = "#fff";
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = "";
          btn.style.color = "";
        }, 1800);
      } catch {}
    });
  });
}

/* ====================================================================
   PROGRESS
   ==================================================================== */
function refreshProgress() {
  const doneLessons = Object.keys(state.completed).length;
  const doneEx = Object.keys(state.exDone).length;
  const pct = Math.round((doneLessons / TOTAL) * 100);

  document.getElementById("pct").textContent = pct;
  document.getElementById("stat-lessons").textContent = doneLessons;
  document.getElementById("stat-exercises").textContent = doneEx;

  const bar = document.getElementById("bar-fill");
  if (bar) bar.style.width = pct + "%";
  const barWrap = bar && bar.parentElement;
  if (barWrap) barWrap.setAttribute("aria-valuenow", pct);

  const lTotal = document.getElementById("pct-lessons-total");
  if (lTotal) lTotal.textContent = TOTAL;
  const eTotal = document.getElementById("pct-exos-total");
  if (eTotal) eTotal.textContent = TOTAL_EXERCISES;
  const lDone = document.getElementById("pct-lessons");
  if (lDone) lDone.textContent = doneLessons;
  const eDone = document.getElementById("pct-exos");
  if (eDone) eDone.textContent = doneEx;

  const days = new Set();
  Object.values(state.completed).forEach(ts => days.add(new Date(ts).toDateString()));
  Object.values(state.exDone).forEach(ts => days.add(new Date(ts).toDateString()));
  document.getElementById("stat-streak").textContent = days.size;

  refreshAchievements();
}

/* ====================================================================
   ACHIEVEMENTS
   ==================================================================== */
function refreshAchievements() {
  const row = document.getElementById("achieve-row");
  if (!row) return;
  const doneLessons = Object.keys(state.completed).length;
  const doneEx = Object.keys(state.exDone).length;
  const days = new Set();
  Object.values(state.completed).forEach(ts => days.add(new Date(ts).toDateString()));
  Object.values(state.exDone).forEach(ts => days.add(new Date(ts).toDateString()));

  const badges = [];
  if (doneLessons >= 1) badges.push({ emoji: "🎓", label: "1ère leçon", unlocked: true });
  if (doneLessons >= Math.ceil(TOTAL / 2)) badges.push({ emoji: "🔥", label: "Mi-parcours", unlocked: true });
  if (doneLessons >= TOTAL) badges.push({ emoji: "🏆", label: "SQL prêt", unlocked: true });
  if (days.size >= 7) badges.push({ emoji: "⭐", label: "7 jours", unlocked: true });
  if (doneEx >= TOTAL_EXERCISES) badges.push({ emoji: "💪", label: `${TOTAL_EXERCISES} exos`, unlocked: true });

  if (badges.length === 0) {
    badges.push({ emoji: "🔒", label: "Fais ta 1ère leçon", unlocked: false });
  }

  row.innerHTML = badges.map(b =>
    `<span class="achieve-badge ${b.unlocked ? 'unlocked' : 'locked'}" title="${b.label}">${b.emoji}</span>`
  ).join("");
}

/* ====================================================================
   SEARCH
   ==================================================================== */
const searchInput = document.getElementById("search");
if (searchInput) {
  searchInput.addEventListener("input", e => {
    const q = e.target.value.trim().toLowerCase();
    if (!q) { renderSidebar(); return; }
    const filter = arr => arr.filter(l => {
      const hay = (
        l.title + " " + (l.sub || "") + " " +
        (l.tags || []).join(" ") + " " +
        (l.sections || []).map(s => s.h + " " + (s.p || "")).join(" ") + " " +
        (l.exercises || []).map(x => x.title + " " + x.desc).join(" ")
      ).toLowerCase();
      return hay.includes(q);
    });
    const days = filter(DAYS);
    const basic = filter(GIO.filter(l => (l.level || "basic") === "basic"));
    const inter = filter(GIO.filter(l => l.level === "intermediate"));
    const adv = filter(GIO.filter(l => l.level === "advanced"));
    const fill = (id, list) =>
      document.getElementById(id).innerHTML = list.length
        ? list.map(navItem).join("")
        : `<div class="empty-search">Aucune leçon</div>`;
    fill("nav-days", days);
    fill("nav-basic", basic);
    fill("nav-intermediate", inter);
    fill("nav-advanced", adv);
    bindNav();
  });
}

/* ====================================================================
   THEME
   ==================================================================== */
const themeBtn = document.getElementById("theme-btn");
function applyTheme() {
  if (state.theme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    if (themeBtn) themeBtn.setAttribute("title", "Passer en mode sombre");
  } else {
    document.documentElement.removeAttribute("data-theme");
    if (themeBtn) themeBtn.setAttribute("title", "Passer en mode clair");
  }
}
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    state.theme = state.theme === "light" ? "dark" : "light";
    saveState();
    applyTheme();
  });
}
applyTheme();

/* ====================================================================
   RESET
   ==================================================================== */
const resetBtn = document.getElementById("reset-btn");
if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    if (confirm("Réinitialiser TOUTE la progression ? (irréversible)")) {
      state = Object.assign(defaultState(), { theme: state.theme });
      saveState();
      renderSidebar();
      document.getElementById("main").innerHTML = `
        <div class="welcome">
          <h1>Progression effacée</h1>
          <p>On repart à zéro ! Choisis une leçon dans la barre latérale pour commencer.</p>
        </div>
      `;
    }
  });
}

/* ====================================================================
   QUICK CARDS
   ==================================================================== */
document.querySelectorAll(".quick-card").forEach(c => {
  c.setAttribute("role", "button");
  c.setAttribute("tabindex", "0");
  c.addEventListener("click", () => openLesson(c.dataset.jump));
  c.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openLesson(c.dataset.jump);
    }
  });
});

/* ====================================================================
   KEYBOARD SHORTCUTS
   ==================================================================== */
document.addEventListener("keydown", e => {
  if (e.target.tagName === "INPUT") return;
  if (e.key === "/") {
    e.preventDefault();
    document.body.classList.add("drawer-open");
    setTimeout(() => document.getElementById("search").focus(), 50);
    return;
  }
  if (!state.lastActive) return;
  const idx = ALL_LESSONS.findIndex(l => l.id === state.lastActive);
  if (e.key === "ArrowRight" && idx < ALL_LESSONS.length - 1) {
    openLesson(ALL_LESSONS[idx + 1].id);
  }
  if (e.key === "ArrowLeft" && idx > 0) {
    openLesson(ALL_LESSONS[idx - 1].id);
  }
  if (e.key === "t" || e.key === "T") {
    const lesson = ALL_LESSONS[idx];
    if (lesson && lesson.exercises && lesson.exercises.length) {
      currentTab = currentTab === "cours" ? "exos" : "cours";
      renderExArea(lesson);
      bindCopyButtons();
    }
  }
  if (e.key === "b" || e.key === "B") {
    const lesson = ALL_LESSONS[idx];
    if (!lesson) return;
    const bmCount = (lesson.exercises || []).filter(e => state.bookmarks[lesson.id + "-" + e.num]).length;
    if (bmCount > 0 && lesson.exercises && lesson.exercises.length) {
      currentTab = "exos";
      renderExArea(lesson);
      bindCopyButtons();
    }
  }
  if (e.key === "Escape") {
    document.body.classList.remove("drawer-open");
  }
});

/* ====================================================================
   MOBILE DRAWER
   ==================================================================== */
const menuBtn = document.getElementById("menu-btn");
const backdrop = document.getElementById("drawer-backdrop");

if (menuBtn) {
  menuBtn.addEventListener("click", () => document.body.classList.toggle("drawer-open"));
}
if (backdrop) {
  backdrop.addEventListener("click", () => document.body.classList.remove("drawer-open"));
}

/* ====================================================================
   INIT
   ==================================================================== */
renderSidebar();
bindCollapseTitles();
if (state.lastActive && ALL_LESSONS.find(l => l.id === state.lastActive)) {
  openLesson(state.lastActive);
}
