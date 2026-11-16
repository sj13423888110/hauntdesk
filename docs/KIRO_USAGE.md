# How Kiro was used to build HauntDesk

HauntDesk was built **spec-first** with Kiro, following the workflow Kiro is
designed around: steering files set the project's ground rules, a feature
spec turns the idea into requirements → design → tasks, and the
implementation follows the task list.

## 1. Steering files (`.kiro/steering/`)

Three steering documents were authored before any app code:

- **`product.md`** — what HauntDesk is: a Halloween-themed AI agent control
  room for Kiroween 2026; the product principles (playful but genuinely
  interactive, zero friction, legible at a glance).
- **`tech.md`** — hard constraints: a single static site in vanilla
  HTML/CSS/JS, no build step, no external assets, no network calls, works
  offline from `file://`, sound-free, responsive.
- **`structure.md`** — repo layout and conventions, including the rule that
  `.kiro/` is always committed and the app stays in three root files.

These files keep every later generation step inside the same guardrails:
any code Kiro produces has to fit the three-file, zero-dependency design.

## 2. Feature spec (`.kiro/specs/agent-dashboard/`)

The dashboard was specified as a Kiro spec before implementation:

- **`requirements.md`** — five requirements written as user stories with
  EARS-style acceptance criteria (roster, task creation/assignment, live
  execution + log stream, dashboard stats, theme/environment).
- **`design.md`** — architecture of the three files, component breakdown
  (stats header, roster, dispatch form, board, log panel), the
  `Agent`/`Task`/`Stats` data model, and the timer-based simulation engine
  design (dispatch → run ticks → finish, with keyword auto-assign).
- **`tasks.md`** — an eight-item implementation checklist mapping each task
  back to requirement numbers. The app was implemented by working through
  this list top to bottom; all items are checked off.

## 3. Implementation approach

- The three app files (`index.html`, `styles.css`, `app.js`) implement the
  spec directly: roster data and role-specific log/result pools, the
  dispatch/auto-assign engine, the board state machine
  (Queued → Haunting → Completed), and the stats/candy-meter/house visuals.
- Constraints from `tech.md` were treated as acceptance tests: no external
  requests, no audio, works from `file://`, JS passes a syntax check.

## 4. Session details

> [To be completed after the Kiro IDE session: which tasks from `tasks.md`
> were executed inside Kiro, which models were used, and how many credits
> were spent. This section is intentionally left as a placeholder so the
> write-up only states what actually happened in the Kiro session.]
