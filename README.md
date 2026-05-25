# SQL

Single-page study tracker for SQL. Same design as PHP tracker, content
focused on SQL only.

## Usage

Open `index.html` in a browser. It redirects to `web/study_tracker.html`.

State (progress, theme, bookmarks) is saved in localStorage under
`sql_tracker_v1`.

## Structure

- `web/study_tracker.html` — page shell
- `web/css/style.css` — design system
- `web/js/app.js` — rendering + state
- `web/js/data.js` — lessons, exercises, quizzes (starter — extend it)
- `web/image/logo.svg` — logo

## Extending the curriculum

Edit `web/js/data.js`. Two arrays:

- `DAYS` — numbered \"plan 7 jours\" lessons (with quizzes + exercises)
- `GIO` — W3Schools-style reference lessons (level: basic / intermediate / advanced)

Each lesson is an object with `{ id, code, title, sub, tags, sections, quiz, exercises }`.
Look at PHP_COURS for a complete reference (1500+ lines of content).

## Bump cache

When you edit CSS or JS, increment the `?v=N` query string in
`study_tracker.html` so browsers reload.
