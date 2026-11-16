# Requirements: Agent Dashboard (HauntDesk)

## Introduction

HauntDesk is a Halloween-themed AI agent control room. The operator (user)
supervises a roster of themed AI agents, dispatches tasks to them, watches
their work live, and tracks shift productivity. The system is a single
static web page with a client-side simulation engine; there is no backend.

## Glossary

- **Operator**: the user running the control room.
- **Agent**: a themed simulated worker with a role, specialty skill, and
  status (`idle`, `working`, `done`).
- **Task**: a unit of work created by the operator, assigned to one agent.
- **Board**: the three-column task view — Queued, Haunting (in progress),
  Completed.
- **Log stream**: the timestamped lines an agent emits while working.
- **Candy meter**: the shift productivity gauge, filled per completed task.

## Requirements

### Requirement 1: Agent roster

**User story:** As an operator, I want to see the whole agent roster at a
glance, so that I know who is available and what each agent is good at.

#### Acceptance Criteria

1. THE System SHALL display six agents, each with a name, an avatar, a
   role, a specialty skill, and a status indicator.
2. THE System SHALL visually distinguish the statuses `idle`, `working`,
   and `done` on each agent card.
3. WHEN an agent starts a task, THE System SHALL set that agent's status
   to `working` within one second.
4. WHEN an agent finishes a task, THE System SHALL show the status `done`
   briefly and then return the agent to `idle`.

### Requirement 2: Task creation and assignment

**User story:** As an operator, I want to create tasks and assign them, so
that work flows to the right agent without me micromanaging.

#### Acceptance Criteria

1. THE System SHALL provide a form with a task title field and an agent
   selector that includes an "auto-assign" option.
2. WHEN the operator submits a task with a non-empty title, THE System
   SHALL add the task to the Queued column.
3. IF the title is empty, THEN THE System SHALL refuse the submission and
   keep the form open.
4. WHEN auto-assign is selected, THE System SHALL assign the task to an
   idle agent whose specialty keywords best match the title; IF no idle
   agent matches, THEN THE System SHALL pick any idle agent; IF no agent
   is idle, THEN THE System SHALL keep the task queued until one frees up.
5. WHEN a task is assigned to a specific agent who is busy, THE System
   SHALL queue the task for that agent.

### Requirement 3: Task execution and live log

**User story:** As an operator, I want to watch an agent work in real
time, so that the desk feels alive and I can follow what is happening.

#### Acceptance Criteria

1. WHEN a task starts, THE System SHALL move its card to the Haunting
   column and show an animated progress bar on the card.
2. WHILE a task is running, THE System SHALL append log lines to the log
   stream at regular intervals; each line SHALL be plausible for the
   assigned agent's role.
3. THE System SHALL complete a task within 15 seconds of its start.
4. WHEN a task completes, THE System SHALL move its card to the Completed
   column and attach a result summary written for the agent's role.
5. THE System SHALL allow at least three tasks to run concurrently on
   different agents.

### Requirement 4: Dashboard stats

**User story:** As an operator, I want shift-level stats, so that I can
see productivity at a glance.

#### Acceptance Criteria

1. THE System SHALL display the number of completed tasks and the number
   of currently active agents in the header.
2. WHEN a task completes, THE System SHALL increase the candy meter by a
   visible step and update the completed count within one second.
3. THE System SHALL light up haunted-house windows progressively as the
   candy meter fills.

### Requirement 5: Theme and environment

**User story:** As a visitor, I want a convincing Halloween atmosphere, so
that the project fits the Kiroween theme.

#### Acceptance Criteria

1. THE System SHALL render a dark spooky theme (deep purple/black base,
   pumpkin orange, ghost white, slime green accents) with animated
   decorations such as floating ghosts and flickering candles.
2. THE System SHALL NOT play any sound.
3. THE System SHALL NOT load any external assets or make network calls,
   and SHALL run from a plain `file://` open.
4. THE System SHALL remain usable on a narrow (mobile-width) viewport,
   stacking board columns vertically.
