# ORION — PRODUCT REQUIREMENTS DOCUMENT

Version: 1.0
Status: Canonical

## 1. Product mission

ORION exists to become the user's personal assistant.

Its most important job is to understand the user's context so the user does not repeatedly explain the same projects, people, files, decisions, preferences, and history.

ORION should help the user move work forward.

## 2. Product identity

> A personal operating system that connects the user's knowledge, work, files, people, tools, and AI agents.

The visible experience is a personal assistant.

The hidden foundation is:

- context
- memory
- relationships
- permissions
- execution
- verification
- history

## 3. Core user promise

The system should make these possible:

```text
"Continue DROP 002."
"What happened with the project this week?"
"Why did we reject the original design?"
"Ask the design council what they think."
"Prepare the changes, but don't apply them yet."
"Update the approved files."
"Remember that lesson for future projects."
```

## 4. Main capabilities

- Conversation
- Context reconstruction
- Memory
- Knowledge
- Experience
- Projects
- Tasks
- Files
- Personas
- Managers
- Councils
- Decisions
- Tools
- Automations
- Notifications
- Self-improvement later

## 5. Human control

Default control model:

```text
ORION proposes.
USER approves.
ORION executes.
```

ORION may reason, retrieve, research, compare, and prepare proposals without approval.

Consequential execution requires the appropriate permission.

## 6. Context

Context may include:

- current conversation
- older relevant conversations
- project state
- tasks
- decisions
- files
- memory
- experience
- people
- personas
- councils
- events
- artifacts
- user preferences
- current time
- recent changes
- external sources

ORION must assemble context dynamically.

It should not send the entire world to the model for every request.

## 7. Context continuity acceptance test

Given a project called DROP 002 with files, conversations, decisions, tasks, people, and council sessions:

User:

> "Continue DROP 002."

ORION should identify:

- the intended project
- current state
- recent activity
- recent decisions
- important files
- unfinished work
- relevant people/personas
- known conflicts
- likely next actions

If important ambiguity remains, ORION asks.

## 8. Memory

Everything encountered may enter short-term/context memory.

ORION decides what deserves longer life.

Lifecycle:

```text
short-term
    ↓
candidate
    ↓
durable memory
    ↓
experience / project knowledge
    ↓
superseded / expired / forgotten
```

Memory retains provenance and history.

## 9. Knowledge types

At minimum distinguish internally:

- fact
- opinion
- decision
- assumption
- preference
- goal
- experience
- observation
- relationship
- instruction

## 10. Current truth and history

Support:

- current truth
- previous truth
- superseded information
- uncertainty
- provenance
- timestamps

Never erase history merely because the latest value changed.

## 11. Conflict behavior

When important sources disagree:

1. detect conflict
2. preserve competing information
3. evaluate authority
4. explain the conflict
5. involve the user when necessary

Do not silently pick a value and hide the conflict.

## 12. Projects

Projects are first-class objects.

A project may contain:

- identity
- description
- goals
- files
- conversations
- tasks
- decisions
- memories
- experience
- people
- personas
- councils
- artifacts
- timeline
- current status

A project is not just a folder.

## 13. Tasks

Tasks may contain:

- objective
- project
- status
- subtasks
- dependencies
- assignees
- personas
- deadline
- artifacts
- evidence
- approvals
- execution history

## 14. Persona

A persona is a specialist intelligence.

It may have:

- identity
- role
- personality
- knowledge
- memory
- skills
- capabilities
- permissions
- temporary objectives

Real-person-inspired personas must use documented sources and must not invent quotations or pretend the real person is literally participating.

## 15. Manager

A manager is a persistent specialist persona responsible for a domain.

Examples:

- Vault Manager
- Memory Manager
- Project Manager
- Knowledge Manager

Managers may monitor, detect, analyze, propose, and execute approved maintenance.

Current rule: managers do not run unattended while the user is offline.

## 16. Council

A council is a reusable group of personas.

It has:

- name
- purpose
- members
- permanent/rotating membership rules
- rules
- chair
- permissions
- history
- sessions

Current desired structure:

- 4 permanent councils
- 7 rotating councils

## 17. Council behavior

A council may:

1. gather context
2. let members think independently
3. discuss
4. disagree
5. challenge assumptions
6. request evidence
7. change positions
8. synthesize
9. make a recommendation
10. create a decision proposal
11. wait for approval
12. create approved actions
13. write the result back to the relevant project

The user may participate directly.

Personas may have free will inside the chamber, but they cannot leave the chamber without permission.

Private chain-of-thought must not be exposed.

## 18. Decisions

A decision includes:

- what was decided
- why
- evidence
- participants
- date
- project
- approval
- affected entities
- previous decisions it supersedes
- resulting tasks

## 19. Files

ORION can:

- read
- understand
- create
- propose edits
- show diffs
- execute approved edits
- verify
- version
- synchronize

Important content must remain readable outside the web UI.

## 20. Web/file synchronization

Both web state and files matter.

Rules:

- manual file edits are detected
- ORION changes are recorded
- conflicts are preserved
- no silent destructive overwrite
- sync is recoverable
- Markdown remains Obsidian-readable

## 21. Search

Unified search across:

- conversations
- projects
- files
- memory
- knowledge
- experience
- people
- personas
- councils
- decisions
- tasks
- artifacts

## 22. Web knowledge

External web information is clearly different from the user's own information.

Preserve:

- source
- URL
- time
- relevant excerpt
- relationship to current work

## 23. Tools

Tools are replaceable capabilities.

Every invocation has:

- tool
- input
- permission
- requester
- approval state
- result
- evidence

## 24. Model

Nemotron is the current preferred model.

It is replaceable through a model-provider interface.

## 25. Long-running work

Long tasks can continue without the browser.

States:

```text
queued
running
waiting-for-approval
paused
completed
failed
cancelled
```

## 26. Multi-user

Future multi-user means separate ORION instances.

Default separation:

- memory
- workspace
- personas
- councils
- credentials
- settings
- state

## 27. Self-improvement

Later ORION can:

- find weaknesses
- propose improvements
- gather evidence
- prepare a change
- test it
- request approval
- apply
- verify
- commit
- roll back

It must not start as an unrestricted self-modifying system.

## 28. MVP

MVP includes:

- Chat
- Context
- Memory
- Projects
- Personas
- Tasks
- Files
- Approval
- basic tool execution
- verification

## 29. Success test

The user should stop thinking about ORION's internal machinery and simply ask for help.

The assistant experience is the product.
