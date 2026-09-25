# ORION — SECURITY + PERMISSIONS

Version: 1.0
Status: Canonical

## 1. Simple rule

The browser asks.

The server decides.

The model suggests.

The filesystem is protected.

## 2. Model trust

Never treat model output as automatically safe.

Validate:

- paths
- commands
- IDs
- URLs
- tool inputs
- action scope

## 3. Permission levels

Initial categories:

```text
READ
ANALYZE
PROPOSE
LOCAL_WRITE
DESTRUCTIVE
EXTERNAL_MESSAGE
FINANCIAL
SYSTEM
```

A tool may require one or more.

## 4. Approval

Consequential work follows:

```text
proposal
→ approval
→ execution
```

Changing a proposal invalidates its previous approval.

## 5. Path security

For every filesystem operation:

1. resolve allowed root
2. normalize requested path
3. block `..`
4. block absolute escape
5. block sibling-prefix tricks
6. resolve symlinks where possible
7. verify final path is still inside allowed root
8. enforce operation permission

## 6. Roots

Use:

```text
ORION_HOME
ORION_WORKSPACE_ROOT
```

ORION_HOME stores system state.

WORKSPACE_ROOT stores user workspace content.

Do not mix them accidentally.

## 7. Process execution

Do not execute unrestricted shell strings built from user/model text.

Represent a command with:

```text
executable
arguments
working directory
timeout
permission
allowed command policy
```

Prefer direct executable invocation.

## 8. Browser

Never place secrets or filesystem authority in frontend code.

## 9. External models

Send only the minimum context needed.

Respect privacy/data rules.

Do not send secrets simply because they exist in the workspace.

## 10. File changes

Prefer:

```text
request
→ proposal
→ approval
→ checkpoint
→ change
→ verify
```

for consequential mutations.

## 11. External messages

Sending Telegram/email/etc. is externally visible.

Show:

- who
- what
- why
- when

and require proper authorization.

## 12. Audit trail

Record:

- requester
- proposal
- approval
- execution
- changes
- verification
- result

## 13. Authentication

Local-only development may start with localhost.

Before LAN exposure, enable authentication.

Future options:

- local password
- passkey
- OAuth/OIDC
- API keys

## 14. Secrets

Initial approach:

`.env`

Do not commit it.

Never put secret values in:

- Markdown
- browser local storage
- client bundles
- logs

## 15. Failure

When something fails:

1. stop unsafe work
2. preserve evidence
3. explain
4. preserve old state when possible
5. propose recovery
6. ask the user when needed

## 16. Minimum security tests

Test:

- path traversal
- symlink escape
- unauthorized writes
- approval bypass
- changed proposal after approval
- expired approval
- scope mismatch
- command injection
- secret leakage
- conflict handling
- failed verification
- rollback
