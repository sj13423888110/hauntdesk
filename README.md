# HauntDesk — AI Agent Control Room

A Halloween-themed AI agent dashboard, built for **Kiroween 2026** (Devpost).
You are the night-shift operator of a haunted control room: a roster of spooky
AI agents waits for orders, you dispatch tasks, watch them work in real time,
and collect the candy when the job is done.

**Live app:** https://sj13423888110.github.io/hauntdesk/
**Demo video (<3 min):** TBD (to be added before submission)

## What it is

HauntDesk is a single-page, zero-dependency web app that simulates an AI
agent operations desk:

- **Agent roster** — six themed agents (Ghost Coder, Pumpkin Planner,
  Vampire Reviewer, Witch Researcher, Skeleton QA, Zombie DevOps), each with
  a specialty skill, an animated avatar, and a live status (idle / working /
  done).
- **Task dispatch** — create a task, assign it to a specific agent or let the
  desk auto-assign by matching the task title to an agent's specialty.
- **Live work simulation** — a working agent streams a step-by-step log
  written for its role, with an animated progress bar; the task card travels
  across the board: **Queued → Haunting (in progress) → Completed**, ending
  with a result summary.
- **Control-room stats** — tasks completed, agents currently active, and a
  **candy meter** that fills as work completes, lighting up the windows of a
  haunted house as your shift gets more productive.
- **Halloween atmosphere** — deep-purple night theme, floating ghosts,
  flickering candles, a full moon, and slime-green / pumpkin-orange accents.
  Sound-free, emoji-light (decorations are CSS/SVG).

## How to run

No build step, no server, no API keys. Pick one:

1. Just open `index.html` in any modern browser, **or**
2. Serve the folder with any static server, e.g.:

   ```bash
   python3 -m http.server 8000
   # then visit http://localhost:8000
   ```

Everything runs locally in the browser and works offline.

## Tech

- Vanilla HTML / CSS / JavaScript (single static site: `index.html`,
  `styles.css`, `app.js`)
- No frameworks, no external assets, no network calls
- State lives in memory in `app.js` (roster, task queue, stats)

## How it was built (Kiro)

This project was developed spec-first with **Kiro**:

- Steering files in [`.kiro/steering/`](.kiro/steering/) define the product,
  tech constraints, and repo structure.
- The feature spec in [`.kiro/specs/agent-dashboard/`](.kiro/specs/agent-dashboard/)
  contains `requirements.md` (EARS-style user stories and acceptance
  criteria), `design.md` (architecture, components, data model), and
  `tasks.md` (the implementation checklist the app was built from).
- Full write-up: [docs/KIRO_USAGE.md](docs/KIRO_USAGE.md).

## Project layout

```
.
├── index.html                  # the app (single page)
├── styles.css                  # Halloween theme + animations
├── app.js                      # roster, task engine, log simulation, stats
├── .kiro/
│   ├── steering/               # product.md, tech.md, structure.md
│   └── specs/agent-dashboard/  # requirements.md, design.md, tasks.md
├── docs/KIRO_USAGE.md          # how Kiro was used to build this
├── LICENSE                     # MIT
└── README.md
```

## License

MIT — see [LICENSE](LICENSE). Copyright (c) 2026 Songbai Ceng.
