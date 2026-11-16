'use strict';
/* HauntDesk — AI Agent Control Room
   Vanilla JS simulation engine: roster, dispatch, live runs, board, stats.
   Sections: DATA -> STATE -> ENGINE -> RENDER -> INIT */

/* ============================== DATA ============================== */

const AVATARS = {
  ghost: '<svg viewBox="0 0 60 70"><path d="M30 2C16 2 8 14 8 28v34l7-6 7 6 8-6 8 6 7-6 7 6V28C52 14 44 2 30 2Z" fill="#eef4ff"/><circle cx="21" cy="26" r="3.6" fill="#17102b"/><circle cx="39" cy="26" r="3.6" fill="#17102b"/><ellipse cx="30" cy="38" rx="4.2" ry="5.6" fill="#17102b"/></svg>',
  pumpkin: '<svg viewBox="0 0 64 60"><path d="M32 8c2-4 6-6 10-6-1 3-3 6-6 8 12 1 22 10 22 24S48 58 32 58 6 50 6 34 16 11 28 10c1 0 2 1 4-2Z" fill="#ff8c1a"/><path d="M30 4c3 0 5 3 5 6l-3 4-3-4c0-3 1-6 1-6Z" fill="#4da312"/><path d="M20 28l7 6-8 2zM44 28l-7 6 8 2z" fill="#17102b"/><path d="M18 44c4 5 9 7 14 7s10-2 14-7l-4-3c-3 3-6 4-10 4s-7-1-10-4z" fill="#17102b"/></svg>',
  vampire: '<svg viewBox="0 0 64 64"><path d="M6 10c8 2 12 8 14 14V54c0 3-4 4-6 2C8 50 4 30 6 10Z" fill="#5b1a24"/><path d="M58 10c-8 2-12 8-14 14V54c0 3 4 4 6 2 6-6 10-26 8-46Z" fill="#5b1a24"/><circle cx="32" cy="30" r="15" fill="#f3e2c7"/><path d="M17 28c2-9 8-14 15-14s13 5 15 14c-4-5-9-8-15-8s-11 3-15 8Z" fill="#17102b"/><circle cx="26" cy="30" r="2.2" fill="#e5484d"/><circle cx="38" cy="30" r="2.2" fill="#e5484d"/><path d="M25 40h14l-3 5-2-4-2 4-2-4-2 4-3-5Z" fill="#fff"/><path d="M28 45l2 6 2-6M34 45l2 6 2-6" fill="#fff"/></svg>',
  witch: '<svg viewBox="0 0 64 64"><circle cx="32" cy="42" r="13" fill="#f3e2c7"/><path d="M32 2 12 36c6-3 13-4 20-4s14 1 20 4L32 2Z" fill="#3a2a5e"/><path d="M6 40c8-4 17-6 26-6s18 2 26 6c-8 4-17 6-26 6s-18-2-26-6Z" fill="#241743"/><rect x="26" y="30" width="12" height="6" fill="#ff8c1a"/><circle cx="27" cy="42" r="2" fill="#17102b"/><circle cx="37" cy="42" r="2" fill="#17102b"/><path d="M27 50c3 2 7 2 10 0" stroke="#17102b" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
  skeleton: '<svg viewBox="0 0 64 64"><path d="M32 4c13 0 22 9 22 21 0 8-4 13-9 16v7H19v-7c-5-3-9-8-9-16C10 13 19 4 32 4Z" fill="#eef4ff"/><circle cx="23" cy="27" r="5.5" fill="#17102b"/><circle cx="41" cy="27" r="5.5" fill="#17102b"/><path d="M32 33l-3 7h6z" fill="#17102b"/><path d="M24 48v8M30 48v9M36 48v9M42 48v8" stroke="#c9d4ea" stroke-width="2.4"/></svg>',
  zombie: '<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="24" fill="#8fce62"/><path d="M12 22c6-8 14-12 24-11l-3 6c-7 0-13 2-18 7z" fill="#5da23c"/><circle cx="24" cy="30" r="3.4" fill="#17102b"/><circle cx="41" cy="27" r="2.6" fill="#17102b"/><circle cx="24" cy="30" r="1.2" fill="#eef4ff"/><path d="M22 45c4 3 8 4 12 3l6-1-2 5c-6 2-12 1-17-3z" fill="#3d6b24"/><path d="M44 14l6 8M50 12l-2 9" stroke="#5da23c" stroke-width="3" stroke-linecap="round"/></svg>'
};

const AGENTS = [
  {
    id: 'ghost', name: 'Ghost Coder', role: 'Software Engineer', skill: 'Code conjuring',
    color: '#a5c8ff', avatar: 'ghost',
    keywords: ['code', 'function', 'bug', 'script', 'app', 'build', 'write', 'program', 'refactor', 'api'],
    steps: [
      'Phasing through the codebase, reading the haunted modules…',
      'Sketching a spectral design for "{title}"…',
      'Typing with translucent fingers — first draft materialised.',
      'Chasing edge cases into the attic and cornering them.',
      'Polishing the code until it stops rattling its chains.'
    ],
    results: [
      'Done — code delivered and it passes the séance (all checks green).',
      'Finished — clean implementation, documented like a proper spellbook.',
      'Complete — shipped with zero haunted regressions.'
    ]
  },
  {
    id: 'pumpkin', name: 'Pumpkin Planner', role: 'Project Planner', skill: 'Sprint carving',
    color: '#ffb35c', avatar: 'pumpkin',
    keywords: ['plan', 'sprint', 'roadmap', 'schedule', 'organize', 'milestone', 'week', 'prioritise', 'prioritize'],
    steps: [
      'Carving the big goal into bite-sized pumpkin chunks…',
      'Lining up milestones along the haunted roadmap for "{title}"…',
      'Weighing risks — some of these vines are trip hazards.',
      'Sequencing tasks so nothing collides at midnight.',
      'Lighting the plan from inside so the whole team can see it.'
    ],
    results: [
      'Plan carved — milestones, owners and deadlines all in a row.',
      'Done — a glowing roadmap the team can actually follow.',
      'Finished — sprint plan ready, risks flagged with little skull markers.'
    ]
  },
  {
    id: 'vampire', name: 'Vampire Reviewer', role: 'Code Reviewer', skill: 'Flaw sniffing',
    color: '#ff8f96', avatar: 'vampire',
    keywords: ['review', 'check', 'audit', 'inspect', 'look over', 'approve', 'feedback'],
    steps: [
      'Rising from the crypt to inspect "{title}"…',
      'Sniffing for flaws — something here smells like a null pointer.',
      'Reading every line twice; vampires are thorough after dark.',
      'Marking the weak spots with tiny, polite fang bites.',
      'Drafting the verdict before sunrise forces a retreat.'
    ],
    results: [
      'Review complete — 2 nits, 1 real flaw, all listed with fixes.',
      'Verdict in — solid work, minor comments, no blood spilled.',
      'Done — approved with notes; the flaw never stood a chance.'
    ]
  },
  {
    id: 'witch', name: 'Witch Researcher', role: 'Researcher', skill: 'Potion brewing (data)',
    color: '#c4a5ff', avatar: 'witch',
    keywords: ['research', 'why', 'investigate', 'find', 'compare', 'analyse', 'analyze', 'data', 'flaky', 'study'],
    steps: [
      'Stirring the cauldron and consulting the old grimoires…',
      'Gathering ingredients: sources, logs and prior incidents for "{title}"…',
      'The potion is bubbling — patterns are rising to the surface.',
      'Cross-checking the findings against a second, independent brew.',
      'Bottling the conclusion with a neatly labelled cork.'
    ],
    results: [
      'Research bottled — root cause identified, evidence attached.',
      'Done — comparison finished; recommendation is clear and sourced.',
      'Findings ready — the data points one way, and it is not the spooky way.'
    ]
  },
  {
    id: 'skeleton', name: 'Skeleton QA', role: 'QA Engineer', skill: 'Bone-rattling tests',
    color: '#e8ecf7', avatar: 'skeleton',
    keywords: ['test', 'qa', 'verify', 'checkout', 'flow', 'regression', 'validate', 'end to end'],
    steps: [
      'Assembling the test skeleton for "{title}" — every bone labelled…',
      'Rattling through the happy path first. So far, so solid.',
      'Shaking the edge cases until something falls off.',
      'Re-running the failures to make sure they fail honestly.',
      'Writing up the bone report, joint by joint.'
    ],
    results: [
      'QA passed — all flows hold together, no bones about it.',
      'Testing done — 1 edge case found, logged with reproduction steps.',
      'Complete — regression suite green; the skeleton approves.'
    ]
  },
  {
    id: 'zombie', name: 'Zombie DevOps', role: 'DevOps Engineer', skill: 'Relentless deploys',
    color: '#a5e884', avatar: 'zombie',
    keywords: ['deploy', 'server', 'release', 'pipeline', 'midnight', 'ship', 'infra', 'restart', 'ci'],
    steps: [
      'Shambling toward the servers — slowly, but unstoppably…',
      'Checking the pipeline vitals for "{title}". Still twitching. Good.',
      'Rolling the deploy out, one grave at a time.',
      'Watching the health checks rise from their plots.',
      'Moaning softly at the green dashboard. (That is a happy moan.)'
    ],
    results: [
      'Deployed — service is alive. ALIVE.',
      'Release complete — zero downtime, one happy zombie.',
      'Done — pipeline green end to end; rollback plan buried just in case.'
    ]
  }
];

/* ============================== STATE ============================== */

const state = {
  agents: {},        // id -> runtime agent object
  tasks: [],         // all tasks, newest first within renders
  completedCount: 0,
  nextTaskId: 1
};

AGENTS.forEach(function (a) {
  state.agents[a.id] = Object.assign({}, a, {
    status: 'idle', currentTaskId: null, completed: 0, stepIdx: 0
  });
});

/* ============================== HELPERS ============================== */

function $(id) { return document.getElementById(id); }

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

function nowTime() {
  return new Date().toLocaleTimeString('en-GB', { hour12: false });
}

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

/* ============================== LOG ============================== */

function addLog(html, cls) {
  const stream = $('logStream');
  const line = document.createElement('div');
  line.className = 'log-line' + (cls ? ' ' + cls : '');
  line.innerHTML = '<span class="log-time">' + nowTime() + '</span>' + html;
  stream.appendChild(line);
  while (stream.children.length > 120) stream.removeChild(stream.firstChild);
  stream.scrollTop = stream.scrollHeight;
}

function agentLog(agent, text, cls) {
  addLog('<span class="log-agent" style="color:' + agent.color + '">' +
    escapeHtml(agent.name) + ':</span> ' + escapeHtml(text), cls);
}

/* ============================== ENGINE ============================== */

function autoAssign(title) {
  const t = title.toLowerCase();
  let best = null, bestScore = 0;
  AGENTS.forEach(function (a) {
    const agent = state.agents[a.id];
    let score = 0;
    a.keywords.forEach(function (k) { if (t.indexOf(k) !== -1) score++; });
    if (agent.status === 'idle' && score > bestScore) { best = agent; bestScore = score; }
  });
  if (best) return best;
  const idle = AGENTS.map(function (a) { return state.agents[a.id]; })
    .filter(function (a) { return a.status === 'idle'; });
  return idle.length ? pick(idle) : null;
}

function createTask(title, requestedAgentId) {
  const task = {
    id: state.nextTaskId++,
    title: title,
    agentId: null,
    preferredAgentId: requestedAgentId !== 'auto' ? requestedAgentId : null,
    state: 'queued',
    progress: 0,
    result: null,
    timer: null
  };
  state.tasks.push(task);
  addLog('Task queued: <strong>' + escapeHtml(title) + '</strong>', 'log-system');
  tryStart(task);
  renderAll();
  return task;
}

function tryStart(task) {
  if (task.state !== 'queued') return;
  let agent = null;
  if (task.preferredAgentId) {
    const pref = state.agents[task.preferredAgentId];
    if (pref.status === 'idle') agent = pref;
  } else {
    agent = autoAssign(task.title);
  }
  if (!agent) return; // stays queued; pumpQueue retries when an agent frees up
  startRun(task, agent);
}

function pumpQueue() {
  state.tasks
    .filter(function (t) { return t.state === 'queued'; })
    .forEach(tryStart);
}

function startRun(task, agent) {
  task.state = 'running';
  task.agentId = agent.id;
  task.progress = 0;
  agent.status = 'working';
  agent.currentTaskId = task.id;
  agent.stepIdx = 0;
  agentLog(agent, 'Picked up "' + task.title + '". On it.');
  renderAll();

  task.timer = setInterval(function () { tick(task, agent); }, 700);
}

function tick(task, agent) {
  const steps = agent.steps;
  if (agent.stepIdx < steps.length) {
    agentLog(agent, steps[agent.stepIdx].replace('{title}', task.title));
    agent.stepIdx++;
  }
  task.progress = Math.min(100, task.progress + 10 + Math.random() * 12);
  if (task.progress >= 100) {
    finishRun(task, agent);
  } else {
    renderBoard();
    renderRoster();
  }
}

function finishRun(task, agent) {
  clearInterval(task.timer);
  task.timer = null;
  task.progress = 100;
  task.state = 'done';
  task.result = pick(agent.results);
  agent.completed++;
  agent.status = 'done';
  agent.currentTaskId = null;
  state.completedCount++;
  agentLog(agent, task.result, 'log-done');
  renderAll();
  setTimeout(function () {
    if (agent.status === 'done') {
      agent.status = 'idle';
      renderRoster();
      pumpQueue();
      renderAll();
    }
  }, 2500);
}

/* ============================== RENDER ============================== */

function renderRoster() {
  $('roster').innerHTML = AGENTS.map(function (a) {
    const agent = state.agents[a.id];
    const current = agent.currentTaskId
      ? state.tasks.filter(function (t) { return t.id === agent.currentTaskId; })[0]
      : null;
    return '<div class="agent-card status-' + agent.status + (agent.status === 'working' ? ' working' : '') +
      '" style="--agent-color:' + agent.color + '">' +
      '<div class="agent-avatar">' + AVATARS[agent.avatar] + '</div>' +
      '<div class="agent-name">' + escapeHtml(agent.name) + '</div>' +
      '<div class="agent-role">' + escapeHtml(agent.role) + '</div>' +
      '<span class="skill-tag">' + escapeHtml(agent.skill) + '</span>' +
      '<div class="status-pill status-' + agent.status + '"><span class="status-dot"></span>' + agent.status + '</div>' +
      '<div class="agent-current">' + (current ? 'Working on: ' + escapeHtml(current.title) : '&nbsp;') + '</div>' +
      '<div class="agent-done-count">' + agent.completed + ' task' + (agent.completed === 1 ? '' : 's') + ' completed</div>' +
      '</div>';
  }).join('');
}

function taskCard(task) {
  const agent = task.agentId ? state.agents[task.agentId] : null;
  const color = agent ? agent.color : '#8b5cf6';
  let html = '<div class="task-card" style="--agent-color:' + color + '">' +
    '<div class="task-title">' + escapeHtml(task.title) + '</div>' +
    '<div class="task-meta">' + (agent ? escapeHtml(agent.name) + ' · ' + escapeHtml(agent.role) : 'Unassigned') + '</div>';
  if (task.state === 'running') {
    html += '<div class="task-progress"><div style="width:' + Math.round(task.progress) + '%"></div></div>';
  }
  if (task.state === 'queued') {
    html += '<div class="task-waiting">' +
      (task.preferredAgentId
        ? 'Waiting for ' + escapeHtml(state.agents[task.preferredAgentId].name) + ' to free up…'
        : 'Waiting for a free agent…') + '</div>';
  }
  if (task.state === 'done') {
    html += '<div class="task-result">' + escapeHtml(task.result) + '</div>';
  }
  return html + '</div>';
}

function renderBoard() {
  const queued = state.tasks.filter(function (t) { return t.state === 'queued'; });
  const running = state.tasks.filter(function (t) { return t.state === 'running'; });
  const done = state.tasks.filter(function (t) { return t.state === 'done'; });
  $('colQueued').innerHTML = queued.map(taskCard).join('') || '';
  $('colRunning').innerHTML = running.map(taskCard).join('') || '';
  $('colDone').innerHTML = done.slice().reverse().map(taskCard).join('') || '';
  $('countQueued').textContent = queued.length;
  $('countRunning').textContent = running.length;
  $('countDone').textContent = done.length;
}

function renderStats() {
  const active = AGENTS.filter(function (a) { return state.agents[a.id].status === 'working'; }).length;
  $('statCompleted').textContent = state.completedCount;
  $('statActive').textContent = active;
  const pct = Math.min(100, state.completedCount * 20);
  $('candyFill').style.width = pct + '%';
  $('candyPct').textContent = pct + '%';
  const litCount = Math.round(pct / 100 * 5);
  document.querySelectorAll('.house-window').forEach(function (w, i) {
    w.classList.toggle('lit', i < litCount);
  });
}

function renderAll() {
  renderRoster();
  renderBoard();
  renderStats();
}

/* ============================== INIT ============================== */

function init() {
  const select = $('agentSelect');
  AGENTS.forEach(function (a) {
    const opt = document.createElement('option');
    opt.value = a.id;
    opt.textContent = a.name + ' — ' + a.role;
    select.appendChild(opt);
  });

  $('taskForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const input = $('taskTitle');
    const title = input.value.trim();
    if (!title) {
      input.classList.remove('shake');
      void input.offsetWidth; // restart the shake animation
      input.classList.add('shake');
      input.focus();
      return;
    }
    createTask(title, select.value);
    input.value = '';
    input.focus();
  });

  document.querySelectorAll('.chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      const input = $('taskTitle');
      input.value = chip.getAttribute('data-title');
      input.focus();
    });
  });

  renderAll();

  // Seed the board so the desk never opens empty.
  createTask('Review the graveyard deploy script', 'auto');
  setTimeout(function () { createTask('Research why the moon API is flaky', 'auto'); }, 1200);
}

document.addEventListener('DOMContentLoaded', init);
