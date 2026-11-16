# Tech: HauntDesk

## Stack

- Single static site: `index.html` + `styles.css` + `app.js` at repo root.
- Vanilla HTML/CSS/JavaScript only. No frameworks, no bundler, no build
  step, no package dependencies.
- No external assets: no web fonts, no images, no CDN links. Avatars and
  decorations are inline SVG or pure CSS shapes.
- No network calls and no API keys. The app must work fully offline by
  opening `index.html` from disk (file://) as well as from any static host.

## Constraints

- Sound-free: no audio elements or WebAudio.
- State is in-memory only (no localStorage), so a refresh resets the shift.
- Animations are CSS-driven (float, flicker, pulse) and must respect
  `prefers-reduced-motion`.
- Layout must be responsive: board columns stack on narrow screens.
- JavaScript must be plain ES2020, single file, no modules (so file://
  works without CORS issues).

## Simulation model

- Agent work is simulated client-side: each agent role owns a pool of log
  step templates and result summaries in `app.js`.
- A run is driven by timers; each tick appends a log line and advances
  progress. Durations are short (roughly 6–10 seconds) so demos stay snappy.
