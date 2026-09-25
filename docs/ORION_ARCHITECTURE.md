# ORION — ARCHITECTURE

Version: 1.0
Status: Canonical

## 1. Architecture goal

Build a system that can grow for years without becoming a pile of special cases.

Main rule:

> Each important responsibility has one clear owner.

## 2. High-level picture

```text
                 WEB UI
       Next.js + React + MUI
                    |
               Product API
                    |
               ORION CORE
                    |
      +-------------+-------------+
      |             |             |
   SQLite       Files/MD       Tools
      |             |             |
      +-------------+-------------+
                    |
             Sync + Events
                    |
              Model Provider
                    |
              Nemotron adapter
```

## 3. Frontend

Technology:

- Next.js
- React
- JavaScript/JSX
- MUI latest stable

The frontend must not:

- access SQLite directly
- access arbitrary filesystem paths
- execute commands
- hold secrets
- decide permissions
- contain core business rules

## 4. Backend

Technology:

- Node.js
- Express
- JavaScript

Backend owns:

- domain operations
- authorization
- database
- filesystem
- tools
- model calls
- task orchestration
- events
- synchronization

## 5. Suggested project tree

```text
orion/
├── apps/
│   ├── web/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   └── package.json
│   └── api/
│       ├── routes/
│       ├── middleware/
│       ├── services/
│       ├── adapters/
│       ├── server.js
│       └── package.json
├── packages/
│   ├── core/
│   │   ├── domain/
│   │   ├── services/
│   │   └── events/
│   ├── contracts/
│   │   ├── api/
│   │   └── validation/
│   └── ui/
│       └── shared/
├── storage/
│   ├── system/
│   └── workspace/
├── tests/
└── docs/
```

Responsibilities matter more than exact folder names.

## 6. Domain

Core concepts:

- User
- Workspace
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
- Objective
- Task
- Action
- Proposal
- Approval
- Artifact
- Automation
- Tool
- Permission
- Event
- Conflict
- Notification

Domain code must not depend on React or HTML.

## 7. Service layer

Major services:

```text
ContextService
MemoryService
ProjectService
TaskService
PersonaService
CouncilService
DecisionService
ProposalService
ApprovalService
ExecutionService
VerificationService
SyncService
SearchService
NotificationService
AutomationService
```

Do not create two competing owners for one responsibility.

## 8. Adapters

Outside technology belongs behind adapters:

```text
ModelProvider
FilesystemAdapter
SQLiteAdapter
GitAdapter
TelegramAdapter
WebSearchAdapter
ToolAdapter
```

## 9. Storage

Use:

- SQLite for structured operational state
- Markdown/files for human-readable content

Important information should remain understandable without the web UI.

## 10. Obsidian

Project and knowledge Markdown should be safe and pleasant to open in Obsidian.

Use:

- normal Markdown
- YAML frontmatter where useful
- stable IDs
- readable file names
- timestamps
- normal links

Do not create giant machine-only documents.

## 11. Synchronization

Both SQLite and files may change.

Sync records:

- source of change
- old version
- new version
- timestamp
- hash
- conflict status

Never silently destroy a user edit.

## 12. Context engine

ContextService answers:

> What does ORION need to know for this request?

It can use:

- conversation
- project
- memory
- knowledge
- experience
- decisions
- tasks
- people
- personas
- files
- events
- external sources

It must preserve provenance.

## 13. Retrieval

One canonical retrieval service.

Support:

- text search
- semantic search when configured
- entity lookup
- project filtering
- date filtering
- path filtering
- source filtering
- provenance

No separate retrieval engines for chat and tasks.

## 14. Memory

MemoryService owns:

- capture
- candidate creation
- promotion
- demotion
- expiration
- forgetting
- correction
- contradiction detection
- provenance

## 15. Project and task separation

A project answers:

> What long-running work is this?

A task answers:

> What work must happen next?

An action answers:

> What should the computer actually do?

Keep these separate.

## 16. Proposal and approval

A Proposal contains:

- operation
- target
- scope
- reason
- expected outcome
- risk
- reversibility
- expiry
- evidence

Approval is tied to a specific proposal and approved version.

Changed proposal = old approval invalid.

## 17. Execution

ExecutionService performs approved actions.

Every action produces evidence.

## 18. Verification

Do not assume success because a command returned 0.

Verify the requested result.

Examples:

- intended file exists
- expected content is present
- test passes
- database row exists
- artifact version changed

## 19. Personas, Managers, Councils

Persona = specialist intelligence.

Manager = persistent specialist responsible for a domain.

Council = reusable group of personas.

These are separate concepts.

## 20. Council structure

Councils support:

- permanent members
- rotating members
- rules
- chair rotation
- sessions
- positions
- disagreements
- synthesis
- proposals
- user-approved actions

Current desired count:

- 4 permanent councils
- 7 rotating councils

Counts must be data/configuration, not hardcoded control flow.

## 21. Long-running jobs

The browser is not the worker.

Use a durable task state and simple local queue first.

A SQLite-backed queue is acceptable.

Do not add Redis/distributed infrastructure without evidence of need.

## 22. API

Use HTTP for normal operations.

Use SSE for live high-level progress.

Frontend never receives database credentials or secret values.

## 23. Security

The server decides:

- permissions
- paths
- tools
- command execution
- model data policy

The model is not a security boundary.

## 24. Model

The core uses:

```text
ModelProvider
    |
    +-- Nemotron
    +-- future providers
```

Do not spread Nemotron-specific assumptions throughout the code.

## 25. Git

Use Git for workspace history/checkpoints.

Hide Git details from normal UI.

Create meaningful checkpoints; avoid noisy commits for every tiny UI change.

## 26. Architectural test

For every feature, answer:

1. Which entity owns it?
2. Which service owns the behavior?
3. Which adapter touches the outside world?
4. What data is stored?
5. What event is emitted?
6. What permission is needed?
7. How is it tested?
8. How is it presented simply?

If nobody can answer these, the feature is not ready.
