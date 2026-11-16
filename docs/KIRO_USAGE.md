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

## 4. Session details (actual Kiro session, 2026-11-16)

The seventh agent was added in a real Kiro session, end to end:

- **Surface / mode:** Kiro Web (app.kiro.dev), Spec Mode, working directly
  on this GitHub repository.
- **Model:** GPT 5.6 Sol (the 4.4x-credit model). Session run time ≈ 5 min.
- **What the session did, in order:** read the steering docs and the
  `agent-dashboard` spec → added a new requirement to `requirements.md` →
  recorded the change in `design.md` → added task 9 to `tasks.md` and
  checked it off → implemented the "Mummy Moderator" agent (documentation &
  summaries) in `app.js`, `index.html`, and `styles.css` (SVG avatar, roster
  entry, keyword-based auto-assign, role-specific log lines and result
  summaries, seven-card layout fix) → updated `product.md` and `README.md`
  → self-verified (JS syntax check, layout and queueing behaviour).
- **Commit:** pushed by the Kiro agent as commit `1fc523a`
  ("Add Mummy Moderator: seventh agent via Kiro spec session",
  8 files changed, +47/−14).
- **Credits:** measured on the account page, the Kiroween reward pool
  (4,000 credits) went from 9.18 used before the session to 50.57 used
  after it, i.e. ≈ 41.4 credits for the main session; the follow-up
  commit/push step was estimated at 2.75 credits by the session footer.
  (The main session's own footer estimate was 16.08 — the account-page
  figure is the one we trust.)
