# ORION — START HERE

Version: 1.0
Status: Canonical project bootstrap guide

## 0. What this document is

This is the first page for a new ORION project.

ORION is being rebuilt from zero.

Do not copy architecture, assumptions, code, folder names, UI patterns, or implementation decisions from the old ORION project unless this new documentation explicitly asks for them.

The old project is a reference for lessons learned, not a foundation.

---

# 1. The one-sentence mission

> ORION exists to become my personal assistant, understand the context of my work, and help me execute it correctly.

The most important user experience is:

> I can say "continue DROP 002" and ORION already knows what DROP 002 is, what happened, what changed, which files matter, which decisions were made, who was involved, what is unfinished, and what the next useful step is.

Helping the user is the core.

---

# 2. Mandatory reading rule for every coding conversation

At the beginning of EVERY new coding-agent conversation, before changing any file, read these three files in full:

1. `docs/ORION_PRD.md`
2. `docs/ORION_ARCHITECTURE.md`
3. `docs/ORION_UI.md`

Then read the phase prompt being worked on:

4. `docs/ORION_PHASE_PROMPTS.md`

After reading them, inspect the repository.

Never start editing first.

---

# 3. Who is the authority?

When documents and old code disagree:

1. The current user-approved requirements.
2. `ORION_PRD.md`
3. `ORION_ARCHITECTURE.md`
4. `ORION_UI.md`
5. The current phase prompt.
6. Tests and current implementation.
7. Old code, old comments, old screenshots, old reports.

Old code is NOT the authority.

---

# 4. Technology rules

Use JavaScript only.

Do NOT introduce Python.

Use:

- React.js
- Next.js
- Node.js
- Express.js
- Material UI (MUI) latest stable release
- SQLite
- Markdown/filesystem
- standard web technologies
- free and open-source software where practical

The product is one system with a clear frontend/backend boundary.

---

# 5. Model provider rule

Nemotron is the current preferred model, but it is NOT ORION.

OpenClaw is NOT ORION.

Open WebUI is NOT ORION.

They are external tools used by the developer or user.

ORION must have its own model-provider interface so another model can be connected later.

---

# 6. The approval rule

The default execution law is:

```text
USER REQUEST
     ↓
UNDERSTAND
     ↓
PLAN
     ↓
PROPOSE
     ↓
USER APPROVES
     ↓
EXECUTE
     ↓
VERIFY
     ↓
REPORT
     ↓
REMEMBER RESULT
```

The model must never skip approval for a consequential action just because it thinks the action is good.

---

# 7. What ORION is

ORION is a personal operating system.

It connects:

- knowledge
- memory
- projects
- tasks
- conversations
- files
- people
- personas
- managers
- councils
- decisions
- artifacts
- tools
- automations

ORION should reconstruct useful context instead of forcing the user to repeat it.

---

# 8. What ORION is not

Do not accidentally turn ORION into:

- a chatbot with a database
- a fancy task manager
- an Obsidian clone
- a graph visualization product
- a sci-fi dashboard
- an unrestricted autonomous coding agent
- a personality simulator
- a cron control panel

These things can exist as parts of the system, but they are not the product definition.

---

# 9. The first MVP

The first useful end-to-end system must support:

```text
Chat
  ↓
Context
  ↓
Memory
  ↓
Projects
  ↓
Personas
  ↓
Tasks
  ↓
Files
  ↓
Proposal
  ↓
Approval
  ↓
Execution
  ↓
Verification
  ↓
Remember result
```

If a feature does not help this loop, it is probably not MVP work.

---

# 10. Simple words

- Memory = something ORION remembers.
- Knowledge = useful information that lasts.
- Experience = what happened and what was learned.
- Project = a long-running piece of work.
- Task = a piece of work that moves a project forward.
- Persona = a specialist intelligence.
- Manager = a persistent specialist responsible for one domain.
- Council = a reusable group of personas.
- Decision = a deliberate choice with a reason and history.
- Proposal = something ORION wants permission to do.
- Approval = the user's permission for a specific proposal.
- Artifact = a meaningful result.
- Source = where information came from.
- Event = something that happened and should be recorded.
- Context = the useful pieces of the user's world assembled for the current request.

---

# 11. Beginner rule

Write documentation so a capable fourth grader can understand the purpose.

Bad:

```text
hydrate the contextual retrieval graph through the semantic adapter
```

Better:

```text
Find the project information ORION needs before answering.
```

The code may still be sophisticated. Explanations should remain simple.

---

# 12. What every coding agent must report

At the end of each phase:

1. What changed.
2. What was deleted.
3. What was kept.
4. Why those choices were made.
5. What tests were actually run.
6. What failed.
7. What remains unfinished.
8. What the next phase can safely build.
9. Whether the canonical documents were changed.

Never claim success without evidence.

Never claim a feature works when it is a placeholder.

Never claim "production ready" without proof.
