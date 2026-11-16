# Design: Agent Dashboard (HauntDesk)

## Overview

HauntDesk is a single-page static web app. All behaviour lives in one
JavaScript file (`app.js`); presentation in `styles.css`; structure in
`index.html`. Agent work is simulated with timers — there is no backend
and no network activity.

## Architecture

```
index.html                styles.css                 app.js
┌──────────────────┐     ┌──────────────────┐       ┌────────────────────┐
│ header + stats   │     │ theme tokens     │       │ DATA: agents,      │
│ haunted house    │◄────│ layout, cards,   │       │   step pools,      │
│ roster section   │     │ board, log panel │       │   result pools     │
│ dispatch form    │     │ animations       │       │ STATE: tasks,      │
│ board (3 columns)│     └──────────────────┘       │   stats, timers    │
│ log panel        │                                │ ENGINE: assign,    │
│ footer           │                                │   run, tick, done  │
└──────────────────┘                                │ RENDER: roster,    │
        ▲                                           │   board, log,      │
        └──────────── DOM updates ──────────────────┤   stats, house     │
                                                    └────────────────────┘
```

Rendering is direct DOM manipulation (no framework). Every state change
calls the relevant render function; the log panel is append-only with
auto-scroll.

## Components

- **Stats header** — completed count, active agent count, candy meter bar,
  haunted-house SVG whose windows light up with progress.
- **Roster** — one card per agent: SVG avatar, name, role, skill tag,
  status pill, "current task" line, per-agent completed counter.
- **Dispatch form** — title input, agent `<select>` (with auto-assign),
  submit button.
- **Board** — three columns (Queued / Haunting / Completed). Task cards
  show title, agent, progress bar (while running), result (when done).
- **Log panel** — monospace stream of timestamped lines, colour-coded by
  agent, capped and auto-scrolling.

## Data model

```js
Agent = {
  id, name, role, skill, keywords: [..], color,
  status: 'idle' | 'working' | 'done',
  currentTaskId: null | taskId,
  completed: number
}

Task = {
  id, title, agentId,            // agentId resolved at dispatch time
  state: 'queued' | 'running' | 'done',
  progress: 0..100,
  result: null | string,
  createdAt, startedAt, finishedAt
}

Stats = { completed: number, candy: 0..100 }
```

## Simulation engine

- `dispatch(task)`: resolves assignment (explicit agent, or auto-assign by
  keyword score against agent `keywords`; falls back to any idle agent).
  If the chosen agent is busy, the task stays `queued` with a preferred
  agent and is retried whenever an agent frees up.
- `startRun(task)`: agent → `working`; a `setInterval` tick (~700 ms)
  appends the next step from the agent's step pool to the log and advances
  progress by a randomised increment. Steps are role-specific strings with
  the task title interpolated.
- `finishRun(task)`: progress = 100; task → `done` with a result summary
  drawn from the agent's result pool; agent shows `done`, then returns to
  `idle` after ~2.5 s and pulls the next queued task; stats and candy
  meter update; house windows light proportionally.
- Concurrency: each agent runs at most one task; up to six agents can work
  simultaneously.

## Error handling

- Empty task titles are rejected inline (input shakes, no task created).
- All timers are tracked per task and cleared on completion; no external
  failure modes exist (no network, no storage).

## Testing notes

- Manual checks: create tasks for each agent, auto-assign with keyword
  titles (e.g. "review", "test", "deploy"), run 3+ tasks concurrently,
  verify board movement, log stream, stats, and candy meter; resize to a
  narrow viewport; open via `file://`.
