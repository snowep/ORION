# ORION — COPY/PASTE PHASE PROMPTS

Use one prompt at a time.

At the start of EVERY coding conversation the agent must first read:

- `docs/ORION_PRD.md`
- `docs/ORION_ARCHITECTURE.md`
- `docs/ORION_UI.md`

Then read the requested phase.

## UNIVERSAL PROMPT

You are implementing one ORION phase.

Before editing anything:

1. Read the three canonical documents in full.
2. Read the phase prompt.
3. Inspect the repository.
4. Inspect package versions.
5. Inspect current tests.
6. Search for an existing implementation before creating another one.

Rules:

- JavaScript/JSX only.
- No Python.
- React + Next.js + Node.js + Express + MUI.
- Prefer free/open-source/self-hostable dependencies.
- OpenClaw is not ORION.
- Open WebUI is not ORION.
- Nemotron is a provider, not the core.
- Do not let model output directly mutate files.
- Do not fake features.
- Do not expose technical internals in normal UI.
- Add tests for new behavior.
- Delete obsolete duplicate behavior instead of leaving two systems alive.

After implementation:

1. run real checks
2. report exact results
3. report changed files
4. report deleted files
5. report known limitations
6. report deviations
7. stop at the requested phase

---

# P0.1 — CONSTITUTION + SKELETON

Read the three canonical docs first.

Task:
Create the new ORION project from zero.

Do not build product functionality yet.

Create:

```text
apps/web
apps/api
packages/core
packages/contracts
packages/ui
storage
tests
docs
```

Establish:

- JavaScript/JSX
- workspace scripts
- environment example
- lint/test structure
- README
- developer rules

Inspect before overwriting anything.

If old code exists, classify it before reuse.

Exit:
A clean project skeleton exists and both applications have clear ownership.

---

# P0.2 — WEB + API

Read canonical docs.

Build:

- Next.js web
- React
- MUI latest stable
- Express API
- `/health`
- `/api/health`
- API error handling
- environment loading

The web should call the API health endpoint.

Do not build the final UI.

Exit:
Web and API run separately and communicate.

---

# P0.3 — SQLITE + FILESYSTEM

Read canonical docs.

Build:

- SQLite connection
- migrations
- data access
- filesystem adapter
- safe path resolution
- Markdown read/write
- ORION_HOME
- ORION_WORKSPACE_ROOT
- atomic writes

Test:

- create project
- write `project.md`
- read it back
- block traversal

Exit:
Database and Markdown storage both work.

---

# P0.4 — BIDIRECTIONAL SYNC

Read canonical docs.

Build:

- file change detection
- reconciliation
- database-to-file changes
- file-to-database changes
- hashes
- versions
- conflicts
- events
- recovery

Scenario:

1. ORION creates `project.md`.
2. User manually edits it.
3. ORION detects it.
4. ORION updates the structured record.
5. History is preserved.

Conflict scenario:

1. ORION has a change ready.
2. User edits the same file.
3. ORION detects conflict.
4. ORION does not overwrite the user's change silently.

---

# P0.5 — DOMAIN MODEL

Read canonical docs.

Create the required domain entities.

Separate:

```text
Project
Task
Action
Proposal
Approval
```

Do not place everything inside one giant object.

Add migrations and meaningful tests.

---

# P0.6 — CONTEXT ENGINE

Read canonical docs.

Build:

```text
ContextService
```

Input:

- user request
- current conversation
- optional project

Output:

- relevant entities
- relevant memories
- relevant files
- relevant decisions
- relevant events
- citations
- inclusion reasons

Test:

```text
"Continue DROP 002."
```

The result should identify DROP 002 and its useful context.

---

# P0.7 — MEMORY LIFECYCLE

Read canonical docs.

Implement:

```text
short-term
→ candidate
→ durable
→ experience/project knowledge
→ superseded/expired/forgotten
```

Test:

- candidate creation
- promotion
- contradiction
- correction
- expiration
- forgetting
- provenance

Do not require the user to manually classify every memory.

---

# P0.8 — MODEL PROVIDER

Read canonical docs.

Create:

```text
ModelProvider
```

Implement the current Nemotron adapter.

Support:

- generation
- streaming
- timeout
- error
- health check

Do not spread provider-specific logic through the application.

---

# P0.9 — INTENT + PROPOSAL + APPROVAL

Read canonical docs.

Implement:

```text
request
→ intent
→ plan
→ proposal
→ approval
```

Do not execute yet.

Proposal must contain:

- action
- target
- reason
- scope
- risk
- reversibility
- expiration
- evidence

Tests:

- no approval blocks mutation
- expired approval blocks mutation
- changed proposal invalidates old approval
- wrong scope blocks mutation

---

# P0.10 — EXECUTION + VERIFICATION

Read canonical docs.

Implement:

```text
ExecutionService
VerificationService
```

First operations:

- create file
- edit file
- rename file
- create project
- update project
- safe command

Every mutation requires the correct approved proposal.

Every mutation is verified.

Every result is recorded.

---

# P1.1 — PROJECTS + TASKS

Build:

- projects
- tasks
- subtasks
- dependencies
- deadlines
- artifacts
- decisions
- timeline

Use the canonical UI rules.

---

# P1.2 — PERSONAS

Build:

- persona creation
- role
- personality
- expertise
- knowledge
- memory
- capabilities
- conversation

Real-person-inspired personas must be grounded in documented sources.

Do not invent quotes.

---

# P1.3 — MANAGERS

Build persistent manager personas.

Managers can:

- monitor
- detect
- analyze
- propose
- execute approved maintenance

They cannot run unattended while the user is offline under the current policy.

---

# P1.4 — CHAT

Build full-page Chat.

Support:

- conversation list
- context
- citations
- project selection
- task creation
- proposals
- approvals
- action results

Test:

```text
Continue DROP 002.
```

ORION should load useful context automatically.

---

# P1.5 — FILE CONTEXT

Build:

- file search
- preview
- source card
- diff
- approval
- execution
- verification

Test real file modification from a natural-language request.

---

# P1.6 — HOME

Build the dynamic dashboard.

Prioritize:

- important projects
- pending approvals
- unfinished work
- recent decisions
- useful observations
- results
- next actions

Do not show engineering telemetry.

---

# P1.7 — UNIFIED SEARCH

Build one search over:

- projects
- conversations
- files
- memories
- decisions
- tasks
- personas
- councils
- artifacts

Normal UI shows useful matches.

Do not expose retrieval mathematics.

---

# P2.1 — COUNCIL CORE

Build:

- council
- permanent/rotating type
- members
- rules
- chair
- session

Support current target:

- 4 permanent councils
- 7 rotating councils

Do not hardcode these numbers into business logic.

---

# P2.2 — COUNCIL CHAMBER

Build:

```text
briefing
→ independent positions
→ discussion
→ disagreement
→ synthesis
→ proposal
```

Allow the user to participate.

Do not expose private chain-of-thought.

---

# P2.3 — COUNCIL DECISIONS

Connect:

```text
council
→ proposal
→ user approval
→ actions
→ project update
→ session artifact
```

Use a real project example.

---

# P2.4 — COUNCIL MEMBERSHIP

Support:

- permanent members
- rotating members
- adding members
- removing members
- replacing members
- chair rotation
- council rules

Membership changes require the council's configured authority.

---

# P3.1 — DURABLE JOBS

Build a durable local queue.

Support:

- queued
- running
- paused
- waiting-for-approval
- completed
- failed
- cancelled
- retry
- timeout
- cancellation

Browser closure must not destroy durable job state.

---

# P3.2 — AUTOMATION

Build natural-language automation.

Example:

> Every weekday morning, review unfinished projects.

Flow:

```text
describe
→ proposal
→ approval
→ schedule
→ execute
→ result
```

Hide cron/JSON from normal users.

---

# P3.3 — TELEGRAM

Build Telegram notification adapter.

Support:

- approval needed
- task finished
- task failed
- important observation

Follow permission rules.

---

# P3.4 — MANAGER MONITORING

Build manager monitoring rules.

Managers can identify problems and propose work.

Do not enable unattended execution outside the existing policy.

---

# P4.1 — CONTEXT INTELLIGENCE

Improve:

- temporal reasoning
- current vs historical state
- cause/effect
- authority
- uncertainty
- relationships

Test historical questions such as:

> What did we decide before we changed our mind?

---

# P4.2 — MEMORY INTELLIGENCE

Improve:

- repeated evidence
- inferred preferences
- stale information
- project lessons
- reusable experience

Do not turn guesses into facts silently.

---

# P4.3 — ADVANCED GRAPH

Build the knowledge graph only after trusted relationships exist.

Graph belongs in Advanced.

It is not the home screen.

---

# P5.1 — SELF-IMPROVEMENT DETECTION

Find:

- repeated failures
- missing capabilities
- confusing workflows
- bad retrieval
- slow work

Produce proposals.

Do not modify code yet.

---

# P5.2 — SELF-IMPROVEMENT PROPOSAL

Show:

- problem
- evidence
- expected benefit
- risks
- affected files
- diff
- tests
- rollback plan

---

# P5.3 — SAFE TEST

Run the proposed change in isolation.

Collect evidence.

Do not change production without approval.

---

# P5.4 — APPLY + COMMIT + ROLLBACK

After approval:

```text
checkpoint
→ apply
→ verify
→ commit
→ report
```

Rollback must remain possible.

---

# P6.1 — CONTROLLED AUTONOMY

Only now add:

- permission policies
- action budgets
- time limits
- cancellation
- retry rules
- bounded background work

Autonomy must remain inside explicit permissions.
