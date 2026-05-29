<div align="center">

# SQL Tracker

**A clean, drawer-based study tracker for SQL (MySQL / PostgreSQL) — built as a teaching reference.**

[![Made by Chadi Khoder](https://img.shields.io/badge/made_by-Chadi_Khoder-14b8a6?style=for-the-badge)](https://github.com/chadikoder)
[![No build](https://img.shields.io/badge/no_build-static-14b8a6?style=for-the-badge)](https://github.com/chadikoder/SQL)
[![License](https://img.shields.io/badge/license-PolyForm_NC-14b8a6?style=for-the-badge)](#license)

[**Open the tracker →**](https://chadikoder.github.io/SQL/)

</div>

---

## What is this

A single-page study tracker for **SQL**, built as a teaching reference. Same UI/UX as my other trackers (PHP / HTML / CSS / JS / SQL), retuned per language with its own accent color. Zero build, zero dependency — open `index.html` and you are in.

```
7 days   · 7-day attack plan
40+      · exercises with full solutions
16       · W3Schools-style reference lessons
1        · clickable progress cube per lesson
∞        · re-readable until the exam
```

## Features

- **7-day plan** — one focused day at a time, exam-style
- **Real exercises** — every exercise has a worked solution you can reveal
- **Quizzes** — short MCQ per day to check what stuck
- **W3Schools references** — every lesson links to the matching W3 page
- **Drawer sidebar** — same on desktop and mobile, burger toggle, ESC closes
- **Click-to-complete** — the cube in the sidebar marks a lesson done
- **Per-day progress bar** — visual feedback as you advance
- **Dark / Light theme** — saved across sessions
- **Search** — `/` shortcut, fuzzy match across all lessons
- **Bookmarks** — pin tricky exercises to revisit
- **SQL-aware syntax highlighter** — SELECT / FROM / WHERE / JOIN colored
- **Keyboard shortcuts** — `←` `→` navigate, `T` toggle course/exos, `Esc` close
- **localStorage persistence** — your progress survives reloads
- **SEO meta** — Open Graph + Twitter Cards configured

## Curriculum

1. **SELECT & WHERE** — basic filtering, all operators, LIKE wildcards, NULL handling
2. **ORDER, LIMIT, DISTINCT** — sorting, pagination, dedup
3. **JOINs** — INNER, LEFT, RIGHT, FULL, self-join, multi-table joins
4. **GROUP BY & aggregates** — COUNT, SUM, AVG, MIN, MAX, HAVING vs WHERE
5. **Subqueries & CTE** — WITH, EXISTS / NOT EXISTS, correlated subqueries
6. **INSERT, UPDATE, DELETE** — safe writes, transactions, rollback
7. **Indexes & projet** — B-tree, EXPLAIN, schema design (blog mini)

Plus a separate **W3Schools reference section** (Basic / Intermediate / Advanced) with 16 reference lessons.

## Quick start

```bash
git clone https://github.com/chadikoder/SQL.git
cd SQL
# Open index.html in any browser.
```

Or visit **https://chadikoder.github.io/SQL/** (enable GitHub Pages first).

## Project structure

```
SQL/
├── index.html
├── README.md
├── web/
│   ├── study_tracker.html
│   ├── css/style.css
│   ├── js/
│   │   ├── app.js          ← rendering + state + SQL syntax highlight
│   │   └── data.js         ← curriculum
│   └── image/logo.svg
└── .nojekyll
```

## Extending the curriculum

Edit `web/js/data.js`. Two arrays: `DAYS` and `GIO`. After editing, bump the `?v=N` cache-bust in `web/study_tracker.html`.

## Tech stack

| | |
|---|---|
| Markup | HTML5 |
| Style | CSS3 |
| Logic | Vanilla JavaScript |
| State | localStorage |
| Build | None |

## Related trackers

By the same author, same design system:

- [chadikoder/PHP](https://github.com/chadikoder/PHP) — PHP + NFA042 exam prep
- [chadikoder/HTML](https://github.com/chadikoder/HTML) — HTML5
- [chadikoder/CSS](https://github.com/chadikoder/CSS) — CSS3
- [chadikoder/JS](https://github.com/chadikoder/JS) — Modern JavaScript
- [chadikoder/SQL](https://github.com/chadikoder/SQL) — SQL

## Author

**Chadi Khoder** — [@chadikoder](https://github.com/chadikoder)

## License

**PolyForm Noncommercial License 1.0.0** — Copyright © 2026 Chadi Ikhoder. All rights reserved.

You may read, study, and use this for personal, educational, and non-commercial purposes. You may **not** sell it or use it for any commercial purpose. See [`LICENSE`](./LICENSE) for the full text.
