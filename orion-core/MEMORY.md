# MEMORY.md - Durable Workspace Facts

## ORION Architecture (from docs/ORION_ARCHITECTURE.md)

**Stack:** Next.js/React/MUI frontend → Node/Express API → ORION Core (packages/core) → SQLite + Files/MD + Tools → Sync/Events → Model Provider (Nemotron)

**Key principle:** Each important responsibility has one clear owner.

**Package structure:**
- `apps/web` — Next.js frontend (no DB, no FS, no secrets, no business logic)
- `apps/api` — Express backend (owns domain ops, auth, DB, FS, tools, model calls, orchestration)
- `packages/core` — Domain, services, events (no React/HTML deps)
- `packages/contracts` — API schemas, validation
- `packages/ui` — Shared MUI components

**Storage:** SQLite for structured operational state; Markdown/files for human-readable content (Obsidian-compatible)

**Major services (single ownership each):**
ContextService, MemoryService, ProjectService, TaskService, PersonaService, CouncilService, DecisionService, ProposalService, ApprovalService, ExecutionService, VerificationService, SyncService, SearchService, NotificationService, AutomationService

**Adapters (outside tech behind interfaces):**
ModelProvider, FilesystemAdapter, SQLiteAdapter, GitAdapter, ToolAdapter, WebSearchAdapter

**Governance loop:** Proposal → Approval → Execution → Verification (every action produces evidence, verify results not exit codes)

**Councils:** 4 permanent + 7 rotating (configured as data, not hardcoded)

---

## ORION UI (from docs/ORION_UI.md)

**Mission:** Premium personal assistant — JARVIS feel via intelligence/context/memory/proactivity, not sci-fi HUD

**Navigation:** Home, Chat, Work, Vault, Memory, People, Automations | Advanced: Self-improvement, Review, Evaluation, System

**Chat:** Full page (not popup). Message flow: Answer → Source cards → Next actions | Proposal → Approve/Edit/Reject | Progress → Result → Verification

**Progressive disclosure:** Normal users see simple info; advanced details (tokens, vectors, cron, raw DB) hidden in Advanced/System

**Components:** AppShell, PageHeader, Section, Card, Status, EmptyState, LoadingState, ErrorState, ApprovalCard, SourceCard, ActivityItem, ChatComposer — minimal hierarchy, MUI for primitives

**Visual language:** Calm, premium, precise, spacious, readable, modern. 8px base rhythm. No scanlines, excessive glow, game HUD styling.

**Global command:** `Ctrl/Cmd + K` for Search, Open, Ask, Create, Continue, Approve, Navigate

---

## ORION PRD (from docs/ORION_PRD.md)

**Product mission:** Personal OS connecting knowledge, work, files, people, tools, agents. Core job: understand user context so they don't repeatedly explain.

**Core promise:** "Continue DROP 002" / "What happened this week?" / "Ask the design council" / "Prepare changes, don't apply" / "Update approved files" / "Remember for future"

**Control model:** ORION proposes → User approves → ORION executes (ORION may reason/retrieve/research/prepare without approval)

**Context:** Dynamic assembly from conversation, project, tasks, decisions, files, memory, experience, people, personas, councils, events, artifacts, preferences, time, recent changes, external sources

**Memory lifecycle:** short-term → candidate → durable → experience/project knowledge → superseded/expired/forgotten (with provenance)

**Knowledge types (internal distinction):** fact, opinion, decision, assumption, preference, goal, experience, observation, relationship, instruction

**Conflict handling:** Detect → Preserve competing info → Evaluate authority → Explain → Involve user (never silently pick)

**Projects:** First-class objects with identity, goals, files, conversations, tasks, decisions, memories, experience, people, personas, councils, artifacts, timeline, status

**Personas:** Specialist intelligences with identity, role, personality, knowledge, memory, skills, capabilities, permissions, temp objectives

**Managers:** Persistent personas for domains (Vault, Memory, Project, Knowledge) — monitor, detect, analyze, propose, execute approved maintenance

**Councils:** Reusable groups with permanent/rotating members, chair, rules, sessions, synthesis → decision proposals → user participation allowed

**MVP:** Chat, Context, Memory, Projects, Personas, Tasks, Files, Approval, basic tool execution, verification

---

## Workspace State (observed 2025-01-25)

- Workspace: ORION at `D:\Project\ORION`
- Docs folder contains 12 markdown files (architecture, UI, PRD, data model, security, roadmap, phase prompts, keep/delete, build rules, stack, bootstrap)
- Apps: `apps/api/`, `apps/web/` exist
- Packages: `packages/contracts/`, `packages/core/`, `packages/ui/` exist
- Storage: `storage/system/`, `storage/workspace/` exist
- No MEMORY.md existed before this write
- USER.md and IDENTITY.md are still templates (unfilled)
- One prior chat: "read all files in docs folder, especially 00_START_HERE"