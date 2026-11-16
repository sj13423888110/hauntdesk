# Tasks: Agent Dashboard (HauntDesk)

Implementation plan derived from `requirements.md` and `design.md`.
All items below were implemented in the three root app files
(`index.html`, `styles.css`, `app.js`).

- [x] 1. Create the static app shell in `index.html`
  - Header with title, stats (completed / active), candy meter, haunted-house visual
  - Roster section, dispatch form, three-column board, log panel, footer
  - _Requirements: 1.1, 4.1, 5.1_

- [x] 2. Implement the Halloween theme in `styles.css`
  - Deep purple/black theme tokens with pumpkin orange, ghost white, slime green
  - Floating ghost and flickering candle CSS animations; reduced-motion support
  - Responsive layout: board columns stack on narrow screens
  - _Requirements: 5.1, 5.4_

- [x] 3. Define the agent roster data in `app.js`
  - Initial six agents (Ghost Coder, Pumpkin Planner, Vampire Reviewer, Witch
    Researcher, Skeleton QA, Zombie DevOps) with role, skill, keywords,
    colour, SVG avatar key
  - Role-specific log step pools and result summary pools
  - _Requirements: 1.1, 3.2, 3.4_

- [x] 4. Render the roster with live status
  - Status pill (idle / working / done), current-task line, per-agent completed count
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 5. Implement task creation and assignment
  - Dispatch form with title validation and agent selector incl. auto-assign
  - Keyword-based auto-assign with idle-agent fallback; per-agent queueing when busy
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [x] 6. Implement the run engine and live log stream
  - Timer ticks append role-plausible log lines and advance the progress bar
  - Task completes within 15 s with a result summary; board card moves
    Queued → Haunting → Completed
  - At least three concurrent runs on different agents supported
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [x] 7. Implement dashboard stats and the candy meter
  - Completed count, active count, candy meter steps, haunted-house windows
    lighting up with progress
  - _Requirements: 4.1, 4.2, 4.3_

- [x] 8. Final polish and verification
  - Hover states, card transitions, log auto-scroll and cap
  - Verified: no external assets, no sound, works from `file://`, JS syntax checked
  - _Requirements: 5.2, 5.3_

- [x] 9. Add Mummy Moderator to the agent roster
  - Add the seventh agent with a mummy avatar and the specialty
    "documentation and summaries"
  - Add documentation-focused assignment keywords, log step templates,
    result summaries, and a matching quick-dispatch prompt
  - Keep the roster layout and visual treatment consistent with the other agents
  - Verify explicit dispatch, keyword auto-assignment, live logs, completion,
    responsive layout, offline operation, and JavaScript syntax
  - _Requirements: 1.1, 2.4, 3.2, 3.3, 3.4, 3.5, 5.3, 5.4_
