const STORAGE_KEY = "sql_tracker_v1";

/* ====================================================================
   I18N — t() returns a string in the current language with FR fallback.
   Curriculum strings can be plain strings (untranslated, shows in both
   modes) or { fr, en } objects.  UI chrome lives in T below.
   ==================================================================== */
function t(v) {
  if (v == null) return "";
  if (typeof v === "string") return v;
  if (typeof v !== "object") return String(v);
  if (Array.isArray(v)) return v.map(t).join("");
  const lang = (state && state.lang) || "fr";
  return v[lang] || v.fr || v.en || "";
}

const T_DICT = {
  // Header / chrome
  menu:          { fr: "Ouvrir le menu",       en: "Open menu" },
  toggleTheme:   { fr: "Basculer thème",       en: "Toggle theme" },
  toLight:       { fr: "Passer en mode clair", en: "Switch to light mode" },
  toDark:        { fr: "Passer en mode sombre",en: "Switch to dark mode" },
  toggleLang:    { fr: "Switch to English",    en: "Passer en français" },
  search:        { fr: "Rechercher (raccourci : \"/\")", en: "Search (shortcut: \"/\")" },
  statLessons:   { fr: "Leçons terminées",     en: "Lessons completed" },
  statExercises: { fr: "Exercices complétés",  en: "Exercises completed" },
  statStreak:    { fr: "Jours actifs (streak)",en: "Streak (days in a row)" },
  lessonsShort:  { fr: "leçons",               en: "lessons" },
  exosShort:     { fr: "exos",                 en: "exos" },
  dShort:        { fr: "j",                    en: "d" },
  examIn:        { fr: "Examen dans",          en: "Exam in" },
  examPassed:    { fr: "Examen passé",         en: "Exam done" },
  examToday:     { fr: "Examen aujourd'hui",   en: "Exam today" },
  daysShort:     { fr: "j",                    en: "d" },
  // Sidebar sections
  progress:      { fr: "Progression",          en: "Progress" },
  lessons:       { fr: "leçons",               en: "lessons" },
  exos:          { fr: "exos",                 en: "exos" },
  achievements:  { fr: "🏆 Succès",            en: "🏆 Achievements" },
  plan7:         { fr: "📘 Plan 7 jours",      en: "📘 7-day Plan" },
  basic:         { fr: "🟢 PHP Basic",         en: "🟢 PHP Basic" },
  intermediate:  { fr: "🟡 PHP Intermediate",  en: "🟡 PHP Intermediate" },
  advanced:      { fr: "🔴 PHP Advanced",      en: "🔴 PHP Advanced" },
  resetBtn:      { fr: "🗑️ Réinitialiser la progression", en: "🗑️ Reset progress" },
  exportBtn:     { fr: "⬇️ Exporter",          en: "⬇️ Export" },
  importBtn:     { fr: "⬆️ Importer",          en: "⬆️ Import" },
  // Welcome
  welcomeTitle:  { fr: "Plan d'attaque", en: "Attack plan" },
  welcomeSub:    {
    fr: "7 jours pour l'examen · 140 exercices PHP · 34 leçons W3Schools · suivi automatique. Examen le 09/07/2026 — projet Sawa en parallèle.",
    en: "7 days to the exam · 140 PHP exercises · 34 W3Schools lessons · auto-tracked. Exam on 09/07/2026 — Sawa project in parallel."
  },
  day:           { fr: "Jour",                 en: "Day" },
  dayShort:      { fr: "J",                    en: "D" },
  exoCount:      { fr: "exos",                 en: "exos" },
  lessonCount:   { fr: "leçons",               en: "lessons" },
  // Lesson
  why:           { fr: "🎯 Pourquoi —",        en: "🎯 Why —" },
  mockExam:      { fr: "🏁 Examen blanc",      en: "🏁 Mock exam" },
  startMock:     { fr: "▶ Lancer l'examen blanc (120 min)", en: "▶ Start mock exam (120 min)" },
  mockRunning:   { fr: "Examen en cours — ne ferme pas la page", en: "Mock exam running — do not close the page" },
  mockFinished:  { fr: "Examen terminé !",     en: "Mock exam finished!" },
  mockStop:      { fr: "⏹ Arrêter",            en: "⏹ Stop" },
  w3Source:      { fr: "📖 Source W3Schools ↗",en: "📖 W3Schools source ↗" },
  markDone:      { fr: "Marquer terminé",      en: "Mark done" },
  marked:        { fr: "✓ Terminé",            en: "✓ Done" },
  markedAriaLabel: { fr: "Marquer comme terminé", en: "Mark as done" },
  prev:          { fr: "← Précédent",          en: "← Previous" },
  nextDir:       { fr: "Suivant →",            en: "Next →" },
  start:         { fr: "Début",                en: "Start" },
  end:           { fr: "Fin",                  en: "End" },
  noLesson:      { fr: "Aucune leçon",         en: "No lesson" },
  noMoreLessons: { fr: "Plus de leçons",       en: "No more lessons" },
  // Tabs
  tabCourse:     { fr: "📖 Cours",             en: "📖 Course" },
  tabExos:       { fr: "✍️ Exercices",          en: "✍️ Exercises" },
  // Exercise filters
  filterAll:     { fr: "Tous",                 en: "All" },
  filterEasy:    { fr: "🟢 Facile",            en: "🟢 Easy" },
  filterMedium:  { fr: "🟡 Moyen",             en: "🟡 Medium" },
  filterHard:    { fr: "🟠 Difficile",         en: "🟠 Hard" },
  filterExtreme: { fr: "🔴 Extrême",           en: "🔴 Extreme" },
  filterBookmark:{ fr: "📌 Signets",            en: "📌 Bookmarks" },
  done:          { fr: "terminés",             en: "done" },
  noExos:        { fr: "Aucun exercice dans cette catégorie", en: "No exercises in this category" },
  diffEasy:      { fr: "Facile",               en: "Easy" },
  diffMedium:    { fr: "Moyen",                en: "Medium" },
  diffHard:      { fr: "Difficile",            en: "Hard" },
  diffExtreme:   { fr: "Extrême",              en: "Extreme" },
  addBookmark:   { fr: "Ajouter un signet",    en: "Add bookmark" },
  removeBookmark:{ fr: "Retirer le signet",    en: "Remove bookmark" },
  viewSol:       { fr: "👁️ Voir solution",      en: "👁️ View solution" },
  hideSol:       { fr: "🙈 Cacher",             en: "🙈 Hide" },
  // Quiz
  quizTitle:     { fr: "🎯 Mini-quiz — vérifie tes acquis", en: "🎯 Mini quiz — check what stuck" },
  quizSub:       { fr: "Clique sur la bonne réponse. Pas de score : c'est pour s'entraîner.", en: "Click the right answer. No score — it's for practice." },
  // Code blocks
  copy:          { fr: "Copier",               en: "Copy" },
  copied:        { fr: "Copié ! ✓",             en: "Copied! ✓" },
  showOutput:    { fr: "▶ Voir résultat",       en: "▶ Show output" },
  hideOutput:    { fr: "▼ Cacher résultat",     en: "▼ Hide output" },
  // Callouts
  tip:           { fr: "✓ Bonne pratique",     en: "✓ Best practice" },
  note:          { fr: "💡 Astuce",             en: "💡 Tip" },
  warn:          { fr: "⚠️ Piège examen",       en: "⚠️ Exam trap" },
  bad:           { fr: "❌ Erreur fatale",      en: "❌ Fatal error" },
  guess:         { fr: "Devine",               en: "Guess" },
  seeAnswer:     { fr: "Voir la réponse",      en: "Show the answer" },
  hideAnswer:    { fr: "🙈 Cacher",             en: "🙈 Hide" },
  // Footer hint
  hintSearch:    { fr: "chercher",             en: "search" },
  hintNav:       { fr: "naviguer",             en: "navigate" },
  hintCourseEx:  { fr: "cours/exos",           en: "course/exos" },
  hintDone:      { fr: "fait",                 en: "done" },
  hintRandom:    { fr: "aléatoire",            en: "random" },
  hintClose:     { fr: "fermer",               en: "close" },
  // Reset modal
  resetTitle:    { fr: "Réinitialiser la progression ?", en: "Reset all progress?" },
  resetBody:     { fr: "Ceci efface TOUTE ta progression (leçons, exercices, signets, succès). Cette action est irréversible.", en: "This wipes ALL your progress (lessons, exercises, bookmarks, achievements). This cannot be undone." },
  resetConfirm:  { fr: "Oui, tout effacer",    en: "Yes, wipe everything" },
  resetCancel:   { fr: "Annuler",              en: "Cancel" },
  resetDone:     { fr: "Progression effacée",  en: "Progress wiped" },
  resetDoneSub:  { fr: "On repart à zéro ! Choisis une leçon dans la barre latérale pour commencer.", en: "Starting fresh! Pick a lesson in the sidebar to begin." },
  // Import / export
  exportTitle:   { fr: "Exporter ma progression", en: "Export my progress" },
  exportDone:    { fr: "Progression copiée dans le presse-papier ✓", en: "Progress copied to clipboard ✓" },
  importPrompt:  { fr: "Colle ici ta progression JSON :", en: "Paste your JSON progress here:" },
  importBad:     { fr: "JSON invalide — rien n'a changé.", en: "Invalid JSON — nothing changed." },
  importOk:      { fr: "Progression restaurée ✓", en: "Progress restored ✓" },
  // Achievements (full set, all visible)
  ach1:          { fr: "1ère leçon",           en: "First lesson" },
  ach2:          { fr: "Mi-parcours (leçons)", en: "Halfway (lessons)" },
  ach3:          { fr: "NFA042 prêt",          en: "NFA042 ready" },
  ach4:          { fr: "7 jours d'affilée",    en: "7 day streak" },
  ach5:          { fr: "Tous les exos",        en: "All exercises" },
  achEx1:        { fr: "1er exercice",         en: "First exercise" },
  achEx10:       { fr: "10 exercices",         en: "10 exercises" },
  achEx50:       { fr: "50 exercices",         en: "50 exercises" },
  achBm:         { fr: "1er signet",           en: "First bookmark" },
  achDay7:       { fr: "Jour 7 atteint",       en: "Reached Day 7" },
  achUnlocked:   { fr: "Succès débloqué :",    en: "Achievement unlocked:" },
  achLocked:     { fr: "🔒 À débloquer",       en: "🔒 Locked" },
  // Random practice
  randomBtn:     { fr: "🎲 Aléatoire",         en: "🎲 Random" },
  randomTitle:   { fr: "Exercice aléatoire (touche R)", en: "Random exercise (press R)" },
  allExosDone:   { fr: "Tous les exercices sont faits ! 🎉", en: "All exercises done! 🎉" },
  // Daily goal
  dailyGoal:     { fr: "Objectif du jour",     en: "Daily goal" },
  dailyDone:     { fr: "aujourd'hui",          en: "today" },
  goalReached:   { fr: "Objectif du jour atteint ! 🎉", en: "Daily goal reached! 🎉" },
  setGoalTitle:  { fr: "Objectif quotidien",   en: "Daily goal" },
  setGoalBody:   { fr: "Combien d'exercices veux-tu faire par jour ?", en: "How many exercises per day do you want to do?" },
  save:          { fr: "Enregistrer",          en: "Save" },
  editGoal:      { fr: "Modifier l'objectif",  en: "Edit goal" },
  // Lesson mastery
  lessonMastered:{ fr: "Leçon maîtrisée ! 🌟", en: "Lesson mastered! 🌟" },
  // Confidence
  confGot:       { fr: "Je gère",              en: "Got it" },
  confShaky:     { fr: "Hésitant",             en: "Shaky" },
  confNo:        { fr: "Aucune idée",          en: "No idea" },
  confLabel:     { fr: "Niveau de confiance",  en: "Confidence" },
  filterWeak:    { fr: "🚦 À revoir",          en: "🚦 To review" },
  noWeak:        { fr: "Rien à revoir ici — bien joué !", en: "Nothing to review here — nice!" },
};
const T = new Proxy(T_DICT, { get(o, k) { return t(o[k]); } });

const EXAM_DATE = new Date(2026, 6, 9); // Month is 0-indexed: 6 = July
const MOCK_EXAM_MINUTES = 120;
const MOCK_EXAM_KEY = "sql_mock_exam_end";

let state = loadState();
let currentTab = "cours";
let exFilter = "all";

const W3_URLS = {
  "w3-intro": "https://www.w3schools.com/sql/sql_intro.asp",
  "w3-syntax": "https://www.w3schools.com/sql/sql_syntax.asp",
  "w3-select": "https://www.w3schools.com/sql/sql_select.asp",
  "w3-where": "https://www.w3schools.com/sql/sql_where.asp",
  "w3-and-or": "https://www.w3schools.com/sql/sql_and_or.asp",
  "w3-order-by": "https://www.w3schools.com/sql/sql_orderby.asp",
  "w3-joins": "https://www.w3schools.com/sql/sql_join.asp",
  "w3-group-by": "https://www.w3schools.com/sql/sql_groupby.asp",
  "w3-aliases": "https://www.w3schools.com/sql/sql_alias.asp",
  "w3-insert": "https://www.w3schools.com/sql/sql_insert.asp",
  "w3-update": "https://www.w3schools.com/sql/sql_update.asp",
  "w3-delete": "https://www.w3schools.com/sql/sql_delete.asp",
  "w3-indexes": "https://www.w3schools.com/sql/sql_create_index.asp",
  "w3-transactions": "https://www.w3schools.com/sql/sql_transactions.asp",
  "w3-views": "https://www.w3schools.com/sql/sql_view.asp",
  "w3-constraints": "https://www.w3schools.com/sql/sql_constraints.asp",
  "day-1": "https://www.w3schools.com/sql/sql_where.asp",
  "day-2": "https://www.w3schools.com/sql/sql_orderby.asp",
  "day-3": "https://www.w3schools.com/sql/sql_join.asp",
  "day-4": "https://www.w3schools.com/sql/sql_groupby.asp",
  "day-5": "https://www.w3schools.com/sql/sql_with.asp",
  "day-6": "https://www.w3schools.com/sql/sql_update.asp",
  "day-7": "https://www.w3schools.com/sql/sql_create_index.asp"
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    return Object.assign(defaultState(), JSON.parse(raw));
  } catch { return defaultState(); }
}

function defaultState() {
  return { completed: {}, exDone: {}, bookmarks: {}, lastActive: null, theme: "dark", lang: "fr", sectionsCollapsed: {}, achSeen: null, dailyGoal: 10, confidence: {}, masteredSeen: {}, goalReachedDate: null };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Strip diacritics so search matches "heritage" against "héritage" and vice versa.
function normalize(s) {
  return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

// Real consecutive-days streak: counts back from today (or yesterday if no activity today)
// while there is at least one completed lesson / exercise per day.
function computeStreak() {
  const activeDays = new Set();
  Object.values(state.completed).forEach(ts => activeDays.add(new Date(ts).toDateString()));
  Object.values(state.exDone).forEach(ts => activeDays.add(new Date(ts).toDateString()));
  if (activeDays.size === 0) return 0;
  let streak = 0;
  let cursor = new Date();
  // If nothing today, start from yesterday so an off-day in the morning doesn't break the streak.
  if (!activeDays.has(cursor.toDateString())) cursor.setDate(cursor.getDate() - 1);
  while (activeDays.has(cursor.toDateString())) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
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
  document.getElementById("nav-basic").innerHTML = basic.map(navItem).join("") || `<div class="empty-search">${T.noLesson}</div>`;
  document.getElementById("nav-intermediate").innerHTML = inter.map(navItem).join("") || `<div class="empty-search">${T.noLesson}</div>`;
  document.getElementById("nav-advanced").innerHTML = adv.map(navItem).join("") || `<div class="empty-search">${T.noLesson}</div>`;
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
  const fullTitle = t(l.title);
  // Strip "Day N - " / "Jour N - " prefix for sidebar label (the .nav-tag already shows J1/D1)
  const labelText = fullTitle.replace(/^(Jour|Day) \d+ - /, "");
  return `<div class="nav-item ${done ? "done" : ""} ${active ? "active" : ""} ${fullyDone ? "fully-done" : ""}" data-id="${l.id}" title="${esc(fullTitle)}">
    <span class="nav-check">${done ? "✓" : ""}</span>
    <span class="nav-tag">${l.code}</span>
    <span class="nav-label">${esc(labelText)}</span>
    ${exTotal > 0 ? `
    <span class="nav-ex-wrap">
      <span class="nav-star" aria-hidden="true">⭐</span>
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
      check.setAttribute("aria-label", T.markedAriaLabel);
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
            btn.textContent = done ? T.marked : T.markDone;
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
  const lessonTitle = t(lesson.title);
  const prevTitle = prev ? t(prev.title).replace(/^(Jour|Day) \d+ - /, "") : "";
  const nextTitle = next ? t(next.title).replace(/^(Jour|Day) \d+ - /, "") : "";
  const breadcrumb = isDay
    ? (state.lang === "en" ? "📘 NFA042 7-day plan" : "📘 Plan 7 jours NFA042")
    : "🌐 W3Schools SQL";
  main.innerHTML = `
    <div class="lesson-header">
      <div>
        <div class="breadcrumb">${breadcrumb} · ${lesson.code}</div>
        <h1 class="lesson-title">${esc(lessonTitle)}</h1>
        ${lesson.sub ? `<div class="lesson-sub">${esc(t(lesson.sub))}</div>` : ""}
        ${lesson.tags ? `<div class="tag-row">${lesson.tags.map(tag => `<span class="tag">#${esc(t(tag))}</span>`).join("")}</div>` : ""}
      </div>
      <div class="lesson-actions">
        ${id === "day-7" ? `<span class="tag" style="background:rgba(245,158,11,.12);color:var(--warn);font-weight:700">${T.mockExam}</span>` : ""}
        ${W3_URLS[id] ? `<a class="w3-link" href="${W3_URLS[id]}" target="_blank" rel="noopener noreferrer">${T.w3Source}</a>` : ""}
        <button class="complete-btn ${done ? "done" : ""}" id="toggle-done">${done ? T.marked : T.markDone}</button>
      </div>
    </div>
    ${lesson.why ? `<div class="why-card"><b>${T.why}</b> ${t(lesson.why)}</div>` : ""}
    ${id === "day-7" ? renderMockExamCard() : ""}
    <div id="ex-area"></div>
    <div class="lesson-foot">
      ${prev ? `<button class="btn-nav prev" data-id="${prev.id}"><span class="dir">${T.prev}</span><span class="ttl">${esc(prevTitle)}</span></button>` : `<div class="btn-nav" style="opacity:.3;cursor:default"><span class="dir">${T.start}</span><span class="ttl">${T.noLesson}</span></div>`}
      ${next ? `<button class="btn-nav next" data-id="${next.id}"><span class="dir">${T.nextDir}</span><span class="ttl">${esc(nextTitle)}</span></button>` : `<div class="btn-nav next" style="opacity:.3;cursor:default"><span class="dir">${T.end}</span><span class="ttl">${T.noMoreLessons}</span></div>`}
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
  const isWeak = e => { const c = state.confidence[lesson.id + "-" + e.num]; return c === "shaky" || c === "no"; };
  const weakCount = exs.filter(isWeak).length;

  let filtered = exs;
  if (exFilter !== "all" && hasEx) {
    if (exFilter === "bookmark") {
      filtered = exs.filter(e => state.bookmarks[lesson.id + "-" + e.num]);
    } else if (exFilter === "weak") {
      filtered = exs.filter(isWeak);
    } else {
      filtered = exs.filter(e => e.diff === exFilter);
    }
  }
  const emptyMsg = exFilter === "weak" ? T.noWeak : T.noExos;

  area.innerHTML = `
    <div class="tabs">
      <div class="tab ${currentTab === "cours" ? "active" : ""}" data-tab="cours">${T.tabCourse}</div>
      ${hasEx ? `<div class="tab ${currentTab === "exos" ? "active" : ""}" data-tab="exos">${T.tabExos} <b style="font-variant-numeric:tabular-nums;margin-left:4px">${done}/${total}</b></div>` : ""}
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
        <button class="ex-filter-btn ${exFilter === "all" ? "active" : ""}" data-filter="all">${T.filterAll} (${total})</button>
        <button class="ex-filter-btn ${exFilter === "easy" ? "active" : ""}" data-filter="easy">${T.filterEasy} (${exs.filter(e => e.diff === "easy").length})</button>
        <button class="ex-filter-btn ${exFilter === "medium" ? "active" : ""}" data-filter="medium">${T.filterMedium} (${exs.filter(e => e.diff === "medium").length})</button>
        <button class="ex-filter-btn ${exFilter === "hard" ? "active" : ""}" data-filter="hard">${T.filterHard} (${exs.filter(e => e.diff === "hard").length})</button>
        <button class="ex-filter-btn ${exFilter === "extreme" ? "active" : ""}" data-filter="extreme">${T.filterExtreme} (${exs.filter(e => e.diff === "extreme").length})</button>
        <button class="ex-filter-btn ${exFilter === "bookmark" ? "active" : ""}" data-filter="bookmark">${T.filterBookmark} (${bmCount})</button>
        <button class="ex-filter-btn ${exFilter === "weak" ? "active" : ""}" data-filter="weak">${T.filterWeak} (${weakCount})</button>
        <button class="ex-filter-btn random-btn" id="random-ex-btn" title="${T.randomTitle}">${T.randomBtn}</button>
      </div>
      <div class="ex-counter">
        <b>${done}</b>/${total} ${T.done}
        <span class="ex-counter-bar"><span class="ex-counter-fill" style="width:${total ? Math.round(done / total * 100) : 0}%"></span></span>
      </div>
      <div class="ex-cards">
        ${filtered.length ? filtered.map(e => renderExCard(lesson, e)).join("") : `<div class="empty-search">${emptyMsg}</div>`}
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
      btn.textContent = open ? T.hideAnswer : T.seeAnswer;
    });
  });

  // Output toggle
  area.querySelectorAll(".output-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const wrap = btn.closest(".code-output");
      const open = wrap.classList.toggle("open");
      btn.textContent = open ? T.hideOutput : T.showOutput;
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
      checkLessonMastery(lesson);
      checkDailyGoal();
      updateSidebarActive();
      renderExArea(lesson);
      bindCopyButtons();
    });
  });

  // Random practice button
  const randomBtn = area.querySelector("#random-ex-btn");
  if (randomBtn) randomBtn.addEventListener("click", jumpToRandomExercise);

  // Confidence rating
  area.querySelectorAll(".ex-conf .conf-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      const key = btn.parentElement.dataset.key;
      const val = btn.dataset.conf;
      if (state.confidence[key] === val) delete state.confidence[key];
      else state.confidence[key] = val;
      saveState();
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
      btn.textContent = open ? T.hideSol : T.viewSol;
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
  out += `<h3>${t(s.h)}</h3>`;
  if (s.p) out += `<p>${t(s.p)}</p>`;
  if (s.blocks && Array.isArray(s.blocks)) {
    s.blocks.forEach(b => { out += renderBlock(b); });
  }
  out += `</section>`;
  return out;
}

function renderBlock(b) {
  if (b.p) return `<p>${t(b.p)}</p>`;
  if (b.text) return `<p>${t(b.text)}</p>`;
  if (b.code) {
    const out = b.out
      ? `<div class="code-output"><button class="output-toggle">${T.showOutput}</button><div class="output-content"><pre><code>${esc(t(b.out))}</code></pre></div></div>`
      : "";
    // Code body stays as-is (translating code would break it). Comments translation: future work.
    return `<div class="block-code"><pre><code>${highlightPhp(t(b.code))}</code></pre></div>${out}`;
  }
  if (b.note) return `<div class="block-note"><b>${T.note}</b> ${t(b.note)}</div>`;
  if (b.tip) return `<div class="block-tip"><b>${T.tip}</b> ${t(b.tip)}</div>`;
  if (b.warn) return `<div class="block-warn"><b>${T.warn}</b> ${t(b.warn)}</div>`;
  if (b.bad) return `<div class="block-bad"><b>${T.bad}</b> ${t(b.bad)}</div>`;
  if (b.try) {
    const id = "try-" + Math.random().toString(36).slice(2, 9);
    return `<div class="block-try"><b>🤔 ${T.guess} —</b> ${t(b.try)}<button class="try-btn" data-target="${id}">${T.seeAnswer}</button><div class="try-ans" id="${id}">${t(b.ans || "")}</div></div>`;
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
      `<button class="quiz-opt" data-letter="${letters[j]}">${t(o)}</button>`
    ).join("");
    return `<div class="quiz-card" data-correct="${q.correct}">
      <div class="quiz-q"><span class="num">Q${i + 1}.</span> ${t(q.q)}</div>
      <div class="quiz-opts">${opts}</div>
      ${q.expl ? `<div class="quiz-expl">${t(q.expl)}</div>` : ""}
    </div>`;
  }).join("");
  return `<div class="quiz-section">
    <h3 class="quiz-title">${T.quizTitle}</h3>
    <p class="quiz-sub">${T.quizSub}</p>
    ${cards}
  </div>`;
}

function renderExCard(lesson, ex) {
  const key = lesson.id + "-" + ex.num;
  const exDone = !!state.exDone[key];
  const isBm = !!state.bookmarks[key];
  const conf = state.confidence[key] || "";
  const diffLbl = { easy: T.diffEasy, medium: T.diffMedium, hard: T.diffHard, extreme: T.diffExtreme };
  return `<div class="ex-card ${exDone ? "done" : ""}" id="ex-${key}">
    <span class="ex-check ${exDone ? "done" : ""}" data-key="${key}" title="${T.markedAriaLabel}">${exDone ? "✓" : ""}</span>
    <div class="ex-info">
      <div class="ex-num">#${ex.num}</div>
      <div class="ex-title">${esc(t(ex.title))}</div>
      ${ex.desc ? `<div class="ex-desc">${esc(t(ex.desc))}</div>` : ""}
    </div>
    <span class="ex-diff ${ex.diff}">${diffLbl[ex.diff] || ex.diff}</span>
    <div class="ex-conf" data-key="${key}" title="${T.confLabel}">
      <button class="conf-btn got ${conf === "got" ? "active" : ""}" data-conf="got" title="${T.confGot}">😎</button>
      <button class="conf-btn shaky ${conf === "shaky" ? "active" : ""}" data-conf="shaky" title="${T.confShaky}">😐</button>
      <button class="conf-btn no ${conf === "no" ? "active" : ""}" data-conf="no" title="${T.confNo}">😵</button>
    </div>
    <button class="ex-bookmark ${isBm ? "active" : ""}" data-key="${key}" title="${isBm ? T.removeBookmark : T.addBookmark}">${isBm ? "🔖" : "🏷️"}</button>
    <button class="ex-sol-btn" data-key="${key}">${T.viewSol}</button>
    <div class="ex-sol" id="sol-${key}">
      <div class="block-code"><pre><code>${highlightPhp(t(ex.sol))}</code></pre></div>
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
    btn.textContent = T.copy;
    pre.appendChild(btn);
    btn.addEventListener("click", async e => {
      e.stopPropagation();
      try {
        await navigator.clipboard.writeText(codeBlock.innerText);
        btn.textContent = T.copied;
        btn.style.background = "var(--good)";
        btn.style.color = "#fff";
        setTimeout(() => {
          btn.textContent = T.copy;
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

  document.getElementById("stat-streak").textContent = computeStreak();

  refreshAchievements();
  updateDayIndicator();
  updateDailyGoal();
}

/* ====================================================================
   ACHIEVEMENTS
   ==================================================================== */
function computeBadges() {
  const doneLessons = Object.keys(state.completed).length;
  const doneEx = Object.keys(state.exDone).length;
  const doneBm = Object.keys(state.bookmarks).length;
  const day7Done = !!state.completed["day-7"];
  const streak = computeStreak();
  return [
    { id: "first-lesson", emoji: "🎓", label: T.ach1,    unlocked: doneLessons >= 1 },
    { id: "first-exo",    emoji: "⚡", label: T.achEx1,   unlocked: doneEx >= 1 },
    { id: "exo-10",       emoji: "🔟", label: T.achEx10,  unlocked: doneEx >= 10 },
    { id: "bookmark",     emoji: "📌", label: T.achBm,    unlocked: doneBm >= 1 },
    { id: "halfway",      emoji: "🌗", label: T.ach2,     unlocked: doneLessons >= Math.ceil(TOTAL / 2) },
    { id: "streak-7",     emoji: "⭐", label: T.ach4,     unlocked: streak >= 7 },
    { id: "exo-50",       emoji: "🥇", label: T.achEx50,  unlocked: doneEx >= 50 },
    { id: "day-7",        emoji: "🏁", label: T.achDay7,  unlocked: day7Done },
    { id: "all-lessons",  emoji: "🏆", label: T.ach3,     unlocked: doneLessons >= TOTAL },
    { id: "all-exos",     emoji: "💪", label: T.ach5,     unlocked: doneEx >= TOTAL_EXERCISES },
  ];
}

function refreshAchievements() {
  const row = document.getElementById("achieve-row");
  const countEl = document.getElementById("achieve-count");
  const badges = computeBadges();
  const unlockedCount = badges.filter(b => b.unlocked).length;

  // First run / migration: sync the "seen" set silently so pre-earned badges
  // don't all fire a celebration at once. Afterwards, new unlocks celebrate.
  if (!state.achSeen) {
    state.achSeen = {};
    badges.forEach(b => { if (b.unlocked) state.achSeen[b.id] = true; });
    saveState();
  } else {
    const newly = badges.filter(b => b.unlocked && !state.achSeen[b.id]);
    if (newly.length) {
      newly.forEach(b => { state.achSeen[b.id] = true; });
      saveState();
      const last = newly[newly.length - 1];
      toast(`${last.emoji} ${T.achUnlocked} ${last.label}`);
      celebrate();
    }
  }

  if (countEl) countEl.textContent = `${unlockedCount}/${badges.length}`;
  if (!row) return;
  // Only rewrite (and re-trigger the pop animation) when the unlocked set or
  // language actually changed — avoids every badge popping on each refresh.
  const sig = badges.map(b => (b.unlocked ? "1" : "0")).join("") + "|" + (state.lang || "fr");
  if (row.dataset.sig === sig) return;
  row.dataset.sig = sig;
  row.innerHTML = badges.map(b =>
    `<span class="achieve-badge ${b.unlocked ? 'unlocked' : 'locked'}" title="${esc(b.unlocked ? b.label : T.achLocked + ' · ' + b.label)}">${b.emoji}</span>`
  ).join("");
}

/* ====================================================================
   LESSON MASTERY — confetti once when every exercise in a lesson is done
   ==================================================================== */
function isLessonMastered(lesson) {
  const exs = lesson.exercises || [];
  return exs.length > 0 && exs.every(e => state.exDone[lesson.id + "-" + e.num]);
}
function checkLessonMastery(lesson) {
  if (isLessonMastered(lesson)) {
    if (!state.masteredSeen[lesson.id]) {
      state.masteredSeen[lesson.id] = true;
      saveState();
      celebrate();
      toast(`${T.lessonMastered} ${t(lesson.title).replace(/^(Jour|Day) \d+ - /, "")}`);
    }
  } else if (state.masteredSeen[lesson.id]) {
    // un-completed an exercise — allow re-celebration later
    delete state.masteredSeen[lesson.id];
    saveState();
  }
}

/* ====================================================================
   DAILY GOAL — exercises completed today vs target
   ==================================================================== */
function todayExoCount() {
  const today = new Date().toDateString();
  let n = 0;
  Object.values(state.exDone).forEach(ts => { if (new Date(ts).toDateString() === today) n++; });
  return n;
}
function updateDailyGoal() {
  const el = document.getElementById("daily-goal");
  if (!el) return;
  const goal = state.dailyGoal || 10;
  const done = todayExoCount();
  const pct = Math.min(100, Math.round((done / goal) * 100));
  const reached = done >= goal;
  el.classList.toggle("reached", reached);
  el.innerHTML = `
    <div class="daily-head">
      <span class="daily-label">🎯 ${T.dailyGoal}</span>
      <button class="daily-edit" id="daily-edit" title="${T.editGoal}">✏️</button>
    </div>
    <div class="daily-ring-row">
      <span class="daily-count"><b>${done}</b><small>/${goal}</small></span>
      <span class="daily-bar"><span class="daily-fill" style="width:${pct}%"></span></span>
      ${reached ? `<span class="daily-check">✓</span>` : ""}
    </div>`;
  const editBtn = el.querySelector("#daily-edit");
  if (editBtn) editBtn.addEventListener("click", openGoalEditor);
}
function openGoalEditor() {
  const input = document.createElement("input");
  input.type = "number";
  input.min = "1";
  input.max = "200";
  input.value = String(state.dailyGoal || 10);
  input.className = "goal-input";
  showModal({
    title: T.setGoalTitle,
    body: `<p>${T.setGoalBody}</p>`,
    actions: [
      { label: T.resetCancel, variant: "secondary" },
      { label: T.save, variant: "primary", onClick: () => {
          const v = parseInt(input.value, 10);
          if (v >= 1 && v <= 200) { state.dailyGoal = v; saveState(); updateDailyGoal(); }
        }},
    ]
  });
  modalBodyEl.appendChild(input);
  setTimeout(() => { input.focus(); input.select(); }, 100);
}
function checkDailyGoal() {
  const goal = state.dailyGoal || 10;
  const today = new Date().toDateString();
  if (todayExoCount() >= goal && state.goalReachedDate !== today) {
    state.goalReachedDate = today;
    saveState();
    celebrate();
    toast(T.goalReached);
  }
  updateDailyGoal();
}

/* ====================================================================
   RANDOM PRACTICE — jump to a random not-yet-done exercise
   ==================================================================== */
function jumpToRandomExercise() {
  const pool = [];
  ALL_LESSONS.forEach(l => (l.exercises || []).forEach(e => {
    if (!state.exDone[l.id + "-" + e.num]) pool.push({ lessonId: l.id, key: l.id + "-" + e.num });
  }));
  if (!pool.length) { toast(T.allExosDone); return; }
  const pick = pool[Math.floor(Math.random() * pool.length)];
  const lesson = ALL_LESSONS.find(l => l.id === pick.lessonId);
  openLesson(pick.lessonId);
  currentTab = "exos";
  exFilter = "all";
  renderExArea(lesson);
  bindCopyButtons();
  document.body.classList.remove("drawer-open");
  setTimeout(() => {
    const card = document.getElementById("ex-" + pick.key);
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
      card.classList.remove("flash");
      void card.offsetWidth; // restart animation
      card.classList.add("flash");
    }
  }, 80);
}

/* ====================================================================
   SEARCH
   ==================================================================== */
const searchInput = document.getElementById("search");
if (searchInput) {
  searchInput.addEventListener("input", e => {
    const q = normalize(e.target.value.trim());
    if (!q) { renderSidebar(); return; }
    const filter = arr => arr.filter(l => {
      const hay = normalize(
        t(l.title) + " " + t(l.sub || "") + " " +
        (l.tags || []).map(t).join(" ") + " " +
        (l.sections || []).map(s => t(s.h) + " " + t(s.p || "")).join(" ") + " " +
        (l.exercises || []).map(x => t(x.title) + " " + t(x.desc || "")).join(" ")
      );
      return hay.includes(q);
    });
    const days = filter(DAYS);
    const basic = filter(GIO.filter(l => (l.level || "basic") === "basic"));
    const inter = filter(GIO.filter(l => l.level === "intermediate"));
    const adv = filter(GIO.filter(l => l.level === "advanced"));
    const fill = (id, list) =>
      document.getElementById(id).innerHTML = list.length
        ? list.map(navItem).join("")
        : `<div class="empty-search">${T.noLesson}</div>`;
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
    if (themeBtn) themeBtn.setAttribute("title", T.toDark);
  } else {
    document.documentElement.removeAttribute("data-theme");
    if (themeBtn) themeBtn.setAttribute("title", T.toLight);
  }
}
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    state.theme = state.theme === "light" ? "dark" : "light";
    saveState();
    applyTheme();
  });
}

/* ====================================================================
   LANGUAGE TOGGLE
   ==================================================================== */
const langBtn = document.getElementById("lang-btn");
const langLabel = document.getElementById("lang-label");
function applyLang() {
  document.documentElement.setAttribute("lang", state.lang === "en" ? "en" : "fr");
  if (langLabel) langLabel.textContent = state.lang === "en" ? "EN" : "FR";
  if (langBtn) langBtn.setAttribute("title", T.toggleLang);
  applyI18n();
  applyTheme();
  updateExamCountdown();
  renderSidebar();
  updateDayIndicator();
  // Re-render current view
  if (state.lastActive && ALL_LESSONS.find(l => l.id === state.lastActive)) {
    openLesson(state.lastActive);
  } else {
    renderWelcome();
  }
}
function applyI18n() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const k = el.dataset.i18n;
    if (T_DICT[k]) el.textContent = t(T_DICT[k]);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const k = el.dataset.i18nPlaceholder;
    if (T_DICT[k]) el.setAttribute("placeholder", t(T_DICT[k]));
  });
}
if (langBtn) {
  langBtn.addEventListener("click", () => {
    state.lang = state.lang === "en" ? "fr" : "en";
    saveState();
    applyLang();
  });
}

/* ====================================================================
   EXAM COUNTDOWN
   ==================================================================== */
function updateExamCountdown() {
  const el = document.getElementById("exam-countdown");
  const daysEl = document.getElementById("exam-days");
  const lblEl = document.getElementById("exam-lbl");
  if (!el || !daysEl) return;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const examDay = new Date(EXAM_DATE.getFullYear(), EXAM_DATE.getMonth(), EXAM_DATE.getDate());
  const ms = examDay - today;
  const days = Math.round(ms / 86400000);
  el.classList.remove("urgent", "passed");
  if (days > 0) {
    daysEl.textContent = days;
    if (lblEl) lblEl.textContent = t(T_DICT.daysShort);
    el.setAttribute("title", `${t(T_DICT.examIn)} ${days} ${t(T_DICT.daysShort)}`);
    if (days <= 14) el.classList.add("urgent");
  } else if (days === 0) {
    daysEl.textContent = "0";
    if (lblEl) lblEl.textContent = "";
    el.setAttribute("title", t(T_DICT.examToday));
    el.classList.add("urgent");
  } else {
    daysEl.textContent = "✓";
    if (lblEl) lblEl.textContent = "";
    el.setAttribute("title", t(T_DICT.examPassed));
    el.classList.add("passed");
  }
}

/* ====================================================================
   DAY-OF-PLAN INDICATOR
   ==================================================================== */
function updateDayIndicator() {
  const el = document.getElementById("day-indicator");
  if (!el) return;
  // Current day = first day-N lesson not yet completed; if all done, last day.
  let currentDayIdx = DAYS.findIndex(d => !state.completed[d.id]);
  if (currentDayIdx === -1) currentDayIdx = DAYS.length - 1;
  const bullets = DAYS.map((d, i) => {
    if (state.completed[d.id]) return `<span class="day-bullet done" title="${esc(t(d.title))}"></span>`;
    if (i === currentDayIdx) return `<span class="day-bullet current" title="${esc(t(d.title))}"></span>`;
    return `<span class="day-bullet" title="${esc(t(d.title))}"></span>`;
  }).join("");
  el.hidden = false;
  el.innerHTML = `${t(T_DICT.day)} <b>${currentDayIdx + 1}</b> / ${DAYS.length} ${bullets}`;
}

/* ====================================================================
   WELCOME PAGE
   ==================================================================== */
function renderWelcome() {
  const main = document.getElementById("main");
  if (!main) return;
  document.documentElement.classList.remove("has-active");
  // Data-driven so the same engine renders the correct curriculum for any tracker.
  const exWord = state.lang === "en" ? "exos" : "exos";
  const lessonWord = state.lang === "en" ? "lessons" : "leçons";
  const lastDayId = DAYS.length ? DAYS[DAYS.length - 1].id : null;
  const dayCards = DAYS.map((d, i) => {
    const exTotal = d.exercises ? d.exercises.length : 0;
    const topic = t(d.title).replace(/^(Jour|Day)\s*\d+\s*[-–]\s*/, "");
    return {
      id: d.id,
      big: `${d.id === lastDayId ? "🏁" : "📘"} ${t(T_DICT.day)} ${i + 1}`,
      sub: exTotal ? `${topic} · ${exTotal} ${exWord}` : topic,
    };
  });
  const levelDefs = [
    { key: "basic",        emoji: "🟢", label: { fr: "Basic",        en: "Basic" } },
    { key: "intermediate", emoji: "🟡", label: { fr: "Intermediate", en: "Intermediate" } },
    { key: "advanced",     emoji: "🔴", label: { fr: "Advanced",     en: "Advanced" } },
  ];
  const levelCards = levelDefs.map(lv => {
    const items = GIO.filter(l => (l.level || "basic") === lv.key);
    if (!items.length) return null;
    return { id: items[0].id, big: `${lv.emoji} ${t(lv.label)}`, sub: `W3Schools · ${items.length} ${lessonWord}` };
  }).filter(Boolean);
  const cards = [...dayCards, ...levelCards];
  const badges = computeBadges();
  const unlockedCount = badges.filter(b => b.unlocked).length;
  const badgesHtml = badges.map(b =>
    `<div class="wc-badge ${b.unlocked ? "unlocked" : "locked"}" title="${esc(b.label)}">
      <span class="wc-badge-emoji">${b.unlocked ? b.emoji : "🔒"}</span>
      <span class="wc-badge-label">${esc(b.label)}</span>
    </div>`
  ).join("");
  const examStr = `${String(EXAM_DATE.getDate()).padStart(2,"0")}/${String(EXAM_DATE.getMonth()+1).padStart(2,"0")}/${EXAM_DATE.getFullYear()}`;
  const subText = state.lang === "en"
    ? `${DAYS.length}-day plan · ${TOTAL_EXERCISES} exercises · ${GIO.length} W3Schools lessons · auto-tracked. Exam on ${examStr}.`
    : `Plan ${DAYS.length} jours · ${TOTAL_EXERCISES} exercices · ${GIO.length} leçons W3Schools · suivi automatique. Examen le ${examStr}.`;
  main.innerHTML = `
    <div class="welcome">
      <h1>${t(T_DICT.welcomeTitle)} <span class="accent">NFA042</span></h1>
      <p>${subText}</p>
      <div class="quick-grid">
        ${cards.map(c => `<button class="quick-card" data-jump="${c.id}"><div class="big">${c.big}</div><div class="sub">${t(c.sub)}</div></button>`).join("")}
      </div>
      <div class="wc-achievements">
        <div class="wc-ach-head">
          <span>${t(T_DICT.achievements)}</span>
          <span class="wc-ach-count">${unlockedCount}/${badges.length}</span>
        </div>
        <div class="wc-badges">${badgesHtml}</div>
      </div>
    </div>
  `;
  main.querySelectorAll(".quick-card").forEach(c => {
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
}

/* ====================================================================
   MODAL + TOAST
   ==================================================================== */
const modalBackdrop = document.getElementById("modal-backdrop");
const modalTitleEl = document.getElementById("modal-title");
const modalBodyEl = document.getElementById("modal-body");
const modalActionsEl = document.getElementById("modal-actions");
let modalLastFocus = null;

function showModal({ title, body, actions }) {
  if (!modalBackdrop) return;
  modalLastFocus = document.activeElement;
  modalTitleEl.textContent = title || "";
  modalBodyEl.innerHTML = "";
  if (typeof body === "string") modalBodyEl.innerHTML = body;
  else if (body instanceof Node) modalBodyEl.appendChild(body);
  modalActionsEl.innerHTML = "";
  (actions || []).forEach(a => {
    const btn = document.createElement("button");
    btn.className = "modal-btn " + (a.variant || "secondary");
    btn.textContent = a.label;
    btn.addEventListener("click", () => {
      try { a.onClick && a.onClick(); } finally {
        if (a.closeAfter !== false) hideModal();
      }
    });
    modalActionsEl.appendChild(btn);
  });
  modalBackdrop.classList.add("open");
  // Focus the first primary/danger button
  const primary = modalActionsEl.querySelector(".primary, .danger") || modalActionsEl.querySelector(".modal-btn");
  if (primary) setTimeout(() => primary.focus(), 50);
}
function hideModal() {
  if (!modalBackdrop) return;
  modalBackdrop.classList.remove("open");
  if (modalLastFocus && typeof modalLastFocus.focus === "function") modalLastFocus.focus();
}
if (modalBackdrop) {
  modalBackdrop.addEventListener("click", e => {
    if (e.target === modalBackdrop) hideModal();
  });
}
// ESC closes any open modal
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && modalBackdrop && modalBackdrop.classList.contains("open")) {
    e.stopPropagation();
    hideModal();
  }
}, true);

const toastEl = document.getElementById("toast");
let toastTimer = null;
function toast(msg) {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2600);
}

/* ====================================================================
   RESET (uses modal)
   ==================================================================== */
const resetBtn = document.getElementById("reset-btn");
if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    showModal({
      title: T.resetTitle,
      body: T.resetBody,
      actions: [
        { label: T.resetCancel, variant: "secondary" },
        { label: T.resetConfirm, variant: "danger", onClick: () => {
            state = Object.assign(defaultState(), { theme: state.theme, lang: state.lang });
            stopMockExam();
            saveState();
            renderSidebar();
            renderWelcome();
            toast(T.resetDone);
          }},
      ]
    });
  });
}

/* ====================================================================
   EXPORT / IMPORT
   ==================================================================== */
const exportBtn = document.getElementById("export-btn");
const importBtn = document.getElementById("import-btn");
if (exportBtn) {
  exportBtn.addEventListener("click", () => {
    const json = JSON.stringify(state, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const stamp = new Date().toISOString().slice(0, 10);
    a.href = url; a.download = `php-tracker-${stamp}.json`;
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
    // Also copy to clipboard for convenience
    if (navigator.clipboard) navigator.clipboard.writeText(json).catch(() => {});
    toast(T.exportDone);
  });
}
if (importBtn) {
  importBtn.addEventListener("click", () => {
    const ta = document.createElement("textarea");
    ta.placeholder = "{ ... }";
    showModal({
      title: T.importBtn,
      body: `<p>${T.importPrompt}</p>`,
      actions: [
        { label: T.resetCancel, variant: "secondary" },
        { label: T.importBtn, variant: "primary", onClick: () => {
            try {
              const parsed = JSON.parse(ta.value);
              if (!parsed || typeof parsed !== "object") throw new Error("bad");
              state = Object.assign(defaultState(), parsed);
              saveState();
              renderSidebar();
              if (state.lastActive && ALL_LESSONS.find(l => l.id === state.lastActive)) openLesson(state.lastActive);
              else renderWelcome();
              toast(T.importOk);
            } catch {
              toast(T.importBad);
            }
          }},
      ]
    });
    modalBodyEl.appendChild(ta);
    setTimeout(() => ta.focus(), 100);
  });
}

/* ====================================================================
   MOCK EXAM TIMER (Day 7)
   ==================================================================== */
let mockTimer = null;

function renderMockExamCard() {
  const endTs = parseInt(localStorage.getItem(MOCK_EXAM_KEY) || "0", 10);
  const running = endTs > Date.now();
  if (running) {
    return `<div class="mock-exam-card">
      <div class="mock-info">
        <div class="mock-title">${T.mockRunning}</div>
        <div class="mock-sub">${T.mockExam}</div>
      </div>
      <span class="mock-exam-countdown" id="mock-countdown">--:--</span>
      <button class="mock-exam-btn stop" id="mock-stop">${T.mockStop}</button>
    </div>`;
  }
  return `<div class="mock-exam-card">
    <div class="mock-info">
      <div class="mock-title">${T.mockExam}</div>
      <div class="mock-sub">${MOCK_EXAM_MINUTES} min</div>
    </div>
    <button class="mock-exam-btn" id="mock-start">${T.startMock}</button>
  </div>`;
}

function startMockExam() {
  const end = Date.now() + MOCK_EXAM_MINUTES * 60 * 1000;
  localStorage.setItem(MOCK_EXAM_KEY, String(end));
  document.body.classList.add("mock-running");
  if (state.lastActive) openLesson(state.lastActive);
  startMockTicker();
}
function stopMockExam() {
  localStorage.removeItem(MOCK_EXAM_KEY);
  document.body.classList.remove("mock-running");
  if (mockTimer) { clearInterval(mockTimer); mockTimer = null; }
}
function startMockTicker() {
  if (mockTimer) clearInterval(mockTimer);
  const tick = () => {
    const endTs = parseInt(localStorage.getItem(MOCK_EXAM_KEY) || "0", 10);
    if (!endTs) { stopMockExam(); return; }
    const remain = Math.max(0, endTs - Date.now());
    const el = document.getElementById("mock-countdown");
    if (el) {
      const mm = String(Math.floor(remain / 60000)).padStart(2, "0");
      const ss = String(Math.floor((remain % 60000) / 1000)).padStart(2, "0");
      el.textContent = `${mm}:${ss}`;
      el.classList.toggle("urgent", remain < 5 * 60 * 1000);
    }
    if (remain <= 0) {
      stopMockExam();
      toast(T.mockFinished);
      celebrate();
      if (state.lastActive) openLesson(state.lastActive);
    }
  };
  tick();
  mockTimer = setInterval(tick, 500);
}
// Bind mock buttons via event delegation (works each re-render)
document.body.addEventListener("click", e => {
  if (e.target && e.target.id === "mock-start") startMockExam();
  if (e.target && e.target.id === "mock-stop") {
    showModal({
      title: T.mockStop,
      body: t({ fr: "Arrêter l'examen blanc en cours ?", en: "Stop the mock exam in progress?" }),
      actions: [
        { label: T.resetCancel, variant: "secondary" },
        { label: T.mockStop, variant: "danger", onClick: () => { stopMockExam(); if (state.lastActive) openLesson(state.lastActive); }},
      ],
    });
  }
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
  if (e.key === "r" || e.key === "R") {
    jumpToRandomExercise();
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
  if (e.key === "d" || e.key === "D") {
    if (ALL_LESSONS[idx]) toggleDone(state.lastActive);
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
applyTheme();
applyI18n();
if (langLabel) langLabel.textContent = state.lang === "en" ? "EN" : "FR";
if (langBtn) langBtn.setAttribute("title", T.toggleLang);
document.documentElement.setAttribute("lang", state.lang === "en" ? "en" : "fr");
renderSidebar();
bindCollapseTitles();
updateExamCountdown();
updateDayIndicator();
// Refresh countdown once an hour (covers day rollover during long sessions)
setInterval(updateExamCountdown, 60 * 60 * 1000);

if (state.lastActive && ALL_LESSONS.find(l => l.id === state.lastActive)) {
  openLesson(state.lastActive);
} else {
  renderWelcome();
}

// Resume mock exam if one was in progress
if (parseInt(localStorage.getItem(MOCK_EXAM_KEY) || "0", 10) > Date.now()) {
  document.body.classList.add("mock-running");
  startMockTicker();
}

/* ====================================================================
   SCROLL PROGRESS BAR + JUMP TO TOP
   ==================================================================== */
const scrollBar = document.getElementById("scroll-progress");
const jumpTopBtn = document.getElementById("jump-top");
let scrollRaf = 0;
function onScroll() {
  if (scrollRaf) return;
  scrollRaf = requestAnimationFrame(() => {
    scrollRaf = 0;
    const doc = document.documentElement;
    const max = (doc.scrollHeight - doc.clientHeight) || 1;
    const pct = Math.min(100, Math.max(0, (window.scrollY / max) * 100));
    if (scrollBar) scrollBar.style.width = pct + "%";
    if (jumpTopBtn) jumpTopBtn.classList.toggle("show", window.scrollY > 400);
  });
}
window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll, { passive: true });
if (jumpTopBtn) jumpTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
onScroll();

