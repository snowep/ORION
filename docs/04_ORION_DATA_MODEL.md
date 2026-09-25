# ORION — DATA MODEL

Version: 1.0
Status: Canonical

## 1. Purpose

The data model stores the user's world.

It must remain understandable even if the UI changes later.

## 2. Identity

Every important entity has:

- stable ID
- readable name when useful
- created time
- updated time
- history/version information when appropriate

Recommended ID: UUID.

## 3. Core entities

```text
User
Workspace
Project
Conversation
Message
Memory
Knowledge
Experience
Source
Person
Persona
Manager
Council
CouncilSession
CouncilMember
CouncilPosition
Decision
Objective
Task
TaskDependency
Action
Proposal
Approval
Artifact
Automation
Tool
Permission
Event
Conflict
Notification
```

## 4. Project

Core fields:

```text
id
name
slug
description
status
goal
createdAt
updatedAt
```

A project links to:

- conversations
- memories
- knowledge
- experience
- tasks
- decisions
- personas
- councils
- artifacts
- sources
- events

## 5. Conversation

A conversation may link to:

- project
- messages
- participants
- sources
- tasks
- decisions
- events

It can also exist without a project.

## 6. Message

```text
id
conversationId
senderType
senderId
content
createdAt
metadata
```

Sender types:

- user
- ORION
- persona
- system

## 7. Memory

Possible fields:

```text
id
content
type
scope
status
confidence
importance
sourceId
projectId
personaId
councilId
createdAt
updatedAt
expiresAt
supersedesMemoryId
```

## 8. Memory states

```text
short-term
candidate
durable
superseded
expired
forgotten
```

Do not expose storage names directly to normal users.

## 9. Knowledge

Knowledge is durable useful information.

It may come from:

- user
- document
- web
- conversation
- persona research
- council
- experience

## 10. Experience

Experience records:

```text
what happened
what was attempted
what result occurred
what was learned
where the lesson applies
```

## 11. Source

Source types include:

```text
conversation
file
web
database
council
user
external-service
```

Fields:

```text
id
type
title
locator
retrievedAt
hash/version
```

## 12. Persona

Possible fields:

```text
id
name
description
role
personality
instructions
capabilities
knowledgeSources
memoryScope
```

## 13. Manager

A manager references a Persona and adds:

```text
managedDomain
monitoringRules
allowedCapabilities
offlineExecutionPolicy
```

Current offline policy:

```text
No unattended execution while user is offline.
```

## 14. Council

```text
id
name
type
purpose
rules
chairPolicy
active
createdAt
updatedAt
```

Types:

```text
permanent
rotating
```

Current desired counts:

```text
4 permanent
7 rotating
```

## 15. Council Member

```text
councilId
personaId
membershipType
joinedAt
leftAt
role
active
```

## 16. Council Session

```text
id
councilId
topic
briefing
startedAt
endedAt
status
artifactId
decisionId
```

## 17. Council Position

```text
sessionId
personaId
position
evidence
changedMind
```

Do not store private chain-of-thought.

Store conclusions and evidence.

## 18. Decision

```text
id
projectId
title
statement
rationale
evidence
participants
approval
createdAt
supersedesDecisionId
status
```

## 19. Task

```text
id
projectId
objectiveId
title
description
status
priority
assignee
personaId
deadline
createdAt
updatedAt
```

Statuses:

```text
backlog
planned
waiting-approval
ready
running
blocked
completed
failed
cancelled
```

## 20. Action

An Action is an executable step.

Example:

> Update the production quantity in the DROP 002 project file.

## 21. Proposal

```text
id
requestedBy
target
operation
reason
scope
riskLevel
reversible
expiresAt
status
createdAt
```

## 22. Approval

```text
id
proposalId
userId
approvedAt
expiresAt
approvedScope
approvedVersion
```

If the proposal changes, the approval becomes invalid.

## 23. Artifact

Examples:

- report
- file
- design
- code patch
- export
- council session record

Fields:

```text
id
type
title
locator
hash/version
createdAt
projectId
taskId
```

## 24. Event

Example:

```javascript
{
  id: "...",
  type: "decision.approved",
  entityType: "decision",
  entityId: "...",
  createdAt: "...",
  actorType: "user",
  actorId: "...",
  data: {}
}
```

## 25. Conflict

A conflict stores competing versions.

```text
id
entity
sourceA
sourceB
state
detectedAt
resolution
resolvedAt
resolvedBy
```

## 26. Relationships

Examples:

```text
PROJECT --contains--> TASK
PROJECT --contains--> DECISION
PROJECT --contains--> CONVERSATION

DECISION --came-from--> COUNCIL_SESSION
DECISION --affects--> PROJECT
DECISION --creates--> TASK

TASK --produces--> ARTIFACT
TASK --uses--> SOURCE

PERSONA --member-of--> COUNCIL
COUNCIL --has--> COUNCIL_SESSION
```

## 27. History

Important entities retain:

- current state
- historical events
- supersession links

This allows questions like:

> "What did we believe before we changed our mind?"

## 28. Obsidian format

Example:

```markdown
---
id: project-drop-002
type: project
status: active
created: 2026-09-25
---

# DROP 002

## Goal

...

## Current State

...

## Decisions

- ...

## Tasks

- ...
```

Keep the body readable.

## 29. Indexes

Search indexes are derived data.

If an index disappears, it must be rebuildable from source data.
