# ORION — ROADMAP

Version: 1.0
Status: Canonical

## Phase rule

Build one phase at a time.

A phase is complete only when the required behavior works, errors are handled, tests exist, and obsolete behavior is removed.

# PHASE 0 — FOUNDATION

## P0.1 — Constitution + project skeleton

Create:

- repository structure
- docs
- basic workspace
- environment example
- naming rules
- testing rules
- developer rules

Do not build product features.

Exit:
A clean empty project exists.

## P0.2 — Web + API

Build:

- Next.js web
- React
- MUI
- Express API
- health endpoint
- error handling
- development scripts

Exit:

```text
web starts
API starts
web can reach API
health works
```

## P0.3 — SQLite + filesystem

Build:

- SQLite
- migrations
- database adapter
- filesystem adapter
- ORION_HOME
- ORION_WORKSPACE_ROOT
- safe path resolver
- Markdown reader/writer
- atomic writes

Exit:
A test can create a project record and a readable project Markdown file.

## P0.4 — Synchronization

Build:

- file watcher/reconciliation
- database change detection
- hashes/versions
- conflict objects
- sync events
- recovery

Exit:
Manual Markdown edits are detected safely.

## P0.5 — Domain model

Build:

- Project
- Conversation
- Message
- Memory
- Knowledge
- Experience
- Source
- Person
- Persona
- Manager
- Council
- CouncilSession
- Decision
- Task
- Action
- Proposal
- Approval
- Artifact
- Event
- Conflict

Exit:
Domain exists without React or model-specific code.

## P0.6 — Context engine

Build:

- ContextService
- unified retrieval interface
- entity lookup
- source selection
- provenance
- project filtering
- recent events

Exit:
"Continue DROP 002" can generate a useful structured context package.

## P0.7 — Memory lifecycle

Build:

- short-term capture
- candidate memory
- promotion
- provenance
- contradiction
- correction
- expiry
- forgetting
- experience capture

Exit:
ORION can decide whether a candidate memory should persist.

## P0.8 — Model provider

Build:

- ModelProvider
- Nemotron adapter
- generation
- streaming
- timeout
- failure handling

Exit:
The model is replaceable behind one interface.

## P0.9 — Proposal + approval

Build:

- Intent
- Plan
- Proposal
- Approval
- audit events
- expiry
- scope

Exit:
The model can propose a mutation but cannot execute it without approval.

## P0.10 — Execution + verification

Build:

- create file
- edit file
- rename file
- create project
- update project
- safe command
- verification
- checkpoint/rollback

Exit:
Approved file changes really happen and are verified.

# PHASE 1 — MVP

## P1.1 — Projects + tasks

Build:
Projects, tasks, dependencies, artifacts, decisions, timeline.

## P1.2 — Personas

Build:
Reusable specialists with roles, memory, knowledge, capabilities, and conversations.

## P1.3 — Managers

Build:
Persistent domain specialists with monitoring and approved maintenance.

## P1.4 — Chat

Build:
Full-page chat, conversations, context, citations, tasks, proposals, approvals, results.

## P1.5 — File context

Build:
File search, preview, citation, diff, approved edit, verification.

## P1.6 — Home

Build:
Dynamic personal dashboard.

## P1.7 — Unified search

Build:
One search over the ORION world.

# PHASE 2 — COUNCILS

## P2.1 — Council core

Build:
Permanent/rotating councils, members, rules, chairs, sessions.

## P2.2 — Council chamber

Build:
Briefing, independent positions, group discussion, disagreement, synthesis, user participation.

## P2.3 — Council decision

Build:
Proposal, approval, actions, project writeback, session artifact.

## P2.4 — Council membership

Support:
4 permanent councils + 7 rotating councils.

# PHASE 3 — AUTOMATION

## P3.1 — Durable jobs

Build:
Queue, retries, timeouts, cancellation, progress events.

## P3.2 — Natural-language automation

Build:
Describe → review → approve → activate.

## P3.3 — Telegram notifications

Build:
Approval and task notifications.

## P3.4 — Manager monitoring

Build:
Approved monitoring rules and attention requests.

# PHASE 4 — ADVANCED INTELLIGENCE

## P4.1 — Better context

Add:
temporal reasoning, causality, authority, uncertainty, relationship inference.

## P4.2 — Better memory

Add:
repeated evidence, inferred preferences, stale information, reusable lessons.

## P4.3 — Advanced graph

Only after relationships are trustworthy.

# PHASE 5 — SELF-IMPROVEMENT

## P5.1
Detect improvement opportunities.

## P5.2
Prepare evidence and change proposals.

## P5.3
Test changes in isolation.

## P5.4
Approval → apply → verify → commit → rollback.

# PHASE 6 — CONTROLLED AUTONOMY

Only after prior phases are stable.

Add:

- permission policies
- bounded autonomy
- time limits
- action budgets
- cancellation
- safe retries
- audit

The goal is useful work with retained trust and control.
