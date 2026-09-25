# ORION — UI PRD + DESIGN

Version: 1.0
Status: Canonical

## 1. UI mission

ORION should feel like a premium personal assistant.

Not:

- a developer dashboard
- a sci-fi game HUD
- a monitoring console
- a database viewer

The JARVIS feeling comes from intelligence, context, memory, proactivity, conversation, and execution.

## 2. Primary navigation

```text
Home
Chat
Work
Vault
Memory
People
Automations
```

Advanced:

```text
Self-improvement
Review
Evaluation
System
```

## 3. Home

Home is a dynamic personal dashboard.

It may show:

- what matters today
- active projects
- unfinished work
- pending approvals
- recent decisions
- useful observations
- finished work
- suggested next actions
- upcoming automation

The layout can change based on importance.

## 4. Chat

Chat is a full page.

It can:

- ask
- continue projects
- search context
- use personas
- request councils
- create tasks
- create proposals
- approve/reject
- open sources
- open artifacts

It must not be only a popup.

## 5. Normal message

A message can show:

```text
Answer
↓
source cards
↓
useful next actions
```

For a consequential action:

```text
proposal
↓
approve / edit / reject
```

After execution:

```text
progress
↓
result
↓
verification
```

## 6. Progressive disclosure

Normal users see simple information.

Advanced details appear only when requested.

Normal:

> I found three sources supporting this decision.

Expanded:

> Sources:
> - pricing.md
> - council-session-014.md
> - vendor-note.md

Advanced:

> retrieval score
> embedding model
> event ID
> context token count

## 7. Never show these in normal UI

- token counts
- vector IDs
- embeddings
- rerank scores
- TF-IDF
- raw model parameters
- pipeline stages
- correlation IDs
- cron expressions
- JSON scheduling data
- raw database tables
- runtime telemetry
- build metadata
- raw evaluation scores
- graph diagnostics

Put technical details in Advanced/System.

## 8. Work

Work contains:

```text
Today
Projects
Tasks
Decisions
Approvals
Artifacts
```

## 9. Project page

Combine:

- summary
- current state
- next action
- tasks
- decisions
- files
- people
- councils
- conversations
- timeline

Example:

```text
DROP 002
---------------------------------
Goal
Current state
Next action
---------------------------------
Tasks
---------------------------------
Decisions
---------------------------------
Files
---------------------------------
Timeline
```

## 10. Memory

Human-facing categories:

```text
Recent
Important
Projects
People
Decisions
Things to forget
```

Also allow:

> "What do you remember about DROP 002?"

Do not expose storage bucket names.

## 11. People

People is mainly:

- Personas
- Managers
- Councils

Real human contacts may be added later and must be clearly distinguished.

## 12. Persona page

Show:

- name
- role
- personality
- expertise
- capabilities
- memory/context
- councils
- activity
- use persona

## 13. Council page

The council can be theatrical.

Structure:

```text
Council
↓
Topic
↓
Participants
↓
Briefing
↓
Discussion
↓
Disagreement
↓
Synthesis
↓
Decision proposal
↓
Approval
↓
Actions
```

The user may participate directly.

Do not expose private chain-of-thought.

Show conclusions, evidence, disagreements, and outcomes.

## 14. Automations

Normal interface:

```text
What should ORION do regularly?

[ Describe an automation... ]

Example:
"Every weekday morning, review unfinished projects
and tell me what needs attention."
```

Cron and raw parameters stay Advanced.

## 15. Approval card

Every approval card answers:

### What?
What will happen?

### Why?
Why does ORION want to do it?

### What changes?
Which files/data/tools are affected?

### Risk?
What could go wrong?

### Reversible?
Can it be undone?

### Actions
Approve
Edit
Reject

## 16. Status words

Good:

- Working
- Waiting for approval
- Needs attention
- Completed
- Could not finish
- Found a conflict
- Ready to review

Avoid technical status labels.

## 17. Visual language

Use MUI as the main component library.

Feel:

- calm
- premium
- precise
- spacious
- readable
- modern

Avoid:

- scanlines
- excessive glow
- endless gradients
- glass everywhere
- game HUD styling
- decorative telemetry

## 18. Components

Build only useful application-level components:

```text
AppShell
PageHeader
Section
Card
Status
EmptyState
LoadingState
ErrorState
ApprovalCard
SourceCard
ActivityItem
ChatComposer
```

Use MUI directly for ordinary primitives.

Do not invent a huge component hierarchy.

## 19. Spacing

Use a consistent 8px base rhythm.

## 20. Motion

Motion should explain change.

Allowed:

- page transitions
- loading
- message arrival
- expansion
- approval changes

Avoid continuous decorative animation.

## 21. Accessibility

Require:

- keyboard use
- visible focus
- semantic controls
- readable contrast
- reduced-motion support
- touch-friendly controls
- useful labels
- status not dependent on color alone

## 22. Global search/command

Support:

```text
Ctrl/Cmd + K
```

with:

```text
Search
Open
Ask
Create
Continue
Approve
Navigate
```

Examples:

```text
Continue DROP 002
Find the pricing decision
Open the latest design file
Create a council
What did we decide about pricing?
```

## 23. Contextual command

Major screens may accept natural-language commands.

Project:

> "What changed this week?"

Memory:

> "Forget the old preference."

Council:

> "Add a finance specialist."

## 24. Source cards

Normal citation:

```text
Source title
Short useful excerpt
Open source
```

Expand for deeper provenance.

## 25. UI consistency test

Any new screen must answer:

1. Where does it belong?
2. What user problem does it solve?
3. Normal or Advanced?
4. Which existing patterns does it reuse?
5. What technical complexity is intentionally hidden?
6. What happens during loading, empty, error, and success?
