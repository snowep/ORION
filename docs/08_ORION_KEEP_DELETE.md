# ORION — KEEP / DELETE / REBUILD

Version: 1.0
Status: Canonical

## KEEP

Keep something when:

- it solves a required problem
- it has one clear owner
- it is real implementation
- it is used
- it is tested
- it matches architecture
- it is not duplicated

## DELETE

Delete:

- dead code
- fake features
- placeholders pretending to work
- generated files
- scratch files
- duplicate services
- duplicate retrieval
- duplicate navigation systems
- UI abstractions that add no real value
- direct model-to-filesystem mutation
- obsolete provider assumptions
- stale docs claiming nonexistent capabilities

## REBUILD

Rebuild instead of wrapping when:

- two systems compete
- responsibilities are mixed
- security is unclear
- sync is unsafe
- UI leaks internals
- behavior is mostly keyword/regex hacks
- a feature exists only as a giant prompt

## NO TWO OWNERS

Bad:

```text
OldMemoryService
NewMemoryService
```

Choose one.

Bad:

```text
OldRetrieval
NewRetrieval
```

Choose one.

Bad:

```text
Sidebar
MissionControlRail
```

Choose one.

## NO FAKE BUTTONS

"Approve" must actually create approval.

"Run" must actually run.

"Sync" must actually synchronize.

"Health" must measure health.

"Complete" must mean complete.

## NO DEAD CODE "JUST IN CASE"

Git is the safety net.

Delete obsolete code after verifying it is not required.

## DELETION CHECK

Before deleting:

1. search imports
2. search API use
3. search tests
4. search scripts
5. search documentation

If obsolete and unused, delete it.

If live but wrong, replace it first.

## UI DELETION TEST

Delete UI elements that:

- show implementation details
- duplicate actions
- exist only because developers have the data
- look impressive but do not help
- make ORION look like an admin console
