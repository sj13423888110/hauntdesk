# Structure: HauntDesk repo

```
.
├── index.html                  # App shell: header stats, roster, board, log panel
├── styles.css                  # Theme tokens, layout, agent/board components, animations
├── app.js                      # Agent roster data, task engine, simulation, rendering
├── .kiro/
│   ├── steering/               # product.md, tech.md, structure.md (this file)
│   └── specs/
│       └── agent-dashboard/    # requirements.md, design.md, tasks.md
├── docs/
│   └── KIRO_USAGE.md           # Kiro usage write-up for the submission
├── LICENSE                     # MIT
├── README.md
└── .gitignore                  # Never ignores .kiro/ — steering/specs are committed
```

## Conventions

- The `.kiro/` directory lives at the repo root and is always committed.
- App code stays in the three root files; do not introduce subfolders or a
  build pipeline without updating `tech.md` and this file.
- `app.js` is organised in sections: DATA (roster, step pools), STATE,
  ENGINE (dispatch/run/complete), RENDER (roster, board, log, stats).
- All user-visible strings live in the HTML/JS directly; no i18n layer.
