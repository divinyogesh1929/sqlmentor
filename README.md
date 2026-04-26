# SQLMentor — SQL Learning Platform

## Files
- `index.html`    — App shell
- `style.css`     — Design system (dark + light theme)  
- `app.js`        — All lessons, SQL engine wrapper, progress tracking
- `alasql.min.js` — Bundled SQL engine (NO internet needed)

## Quick Start (Local)
1. Unzip the folder
2. Open `index.html` in Chrome, Firefox, or Edge
3. Works fully offline — no server, no setup

## GitHub Pages Deployment
1. Create a new GitHub repo
2. Upload ALL 4 files (including alasql.min.js)
3. Settings → Pages → main branch, root /
4. URL: https://yourusername.github.io/sqlmentor

## Keyboard Shortcuts
- Ctrl+Enter  → Run query
- Escape      → Close modals

## Why alasql.min.js is bundled
Browsers block CDN requests when opening local files (file:// protocol).
Bundling the library makes the app work offline without any setup.
