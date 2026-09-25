# ORION — Personal Operating System

> A personal operating system that connects the user's knowledge, work, files, people, tools, and AI agents.

**Status:** P0.1 (Constitution + Skeleton) and P0.2 (Web + API) complete. Later phases are not started yet — see the phase status table.

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Start development servers (API + Web)
npm run dev
```

- **Web**: http://localhost:3000
- **API**: http://localhost:4000
- **API Health**: http://localhost:4000/api/health

Note: `db:migrate` and `db:seed` are **not implemented yet** — they arrive with P0.3 (SQLite + Filesystem). The README previously listed them as working; that was incorrect and has been removed.

## Project Structure

```text
orion/
├── apps/
│   ├── web/          # Next.js + React + MUI frontend
│   └── api/          # Express + Node.js backend
├── packages/
│   ├── core/         # Domain, services, events, adapters
│   ├── contracts/    # Shared Zod schemas, API types
│   └── ui/           # Shared React components, theme
├── storage/
│   ├── system/       # SQLite, system files (created by P0.3)
│   └── workspace/    # User projects, Markdown files (created by P0.3)
├── tests/            # Integration, e2e tests
└── docs/             # Canonical documentation
```

## Phase Status

| Phase | Description | Status |
|-------|-------------|--------|
| P0.1 | Constitution + Skeleton | ✅ Done |
| P0.2 | Web + API | ✅ Done |
| P0.3 | SQLite + Filesystem | ⬜ Not started |
| P0.4 | Bidirectional Sync | ⬜ Not started |
| P0.5 | Domain Model | 🟡 Types only (entities documented in JSDoc; migrations/tests arrive with P0.3+) |
| P0.6–P0.10 | Context, Memory, Model, Approval, Execution | ⬜ Not started |

## Workspace Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both web and API in development |
| `npm run dev:web` | Start only Next.js dev server |
| `npm run dev:api` | Start only Express dev server |
| `npm run build` | Build the web app |
| `npm run lint` | Lint all packages |
| `npm run lint:fix` | Auto-fix lint issues |
| `npm run test` | Run all tests |
| `npm run clean` | Clean build artifacts |

## Environment Variables

See `.env.example` for all configuration options.

Key variables:
- `ORION_HOME` — System storage root (default: `./storage/system`)
- `ORION_WORKSPACE_ROOT` — User workspace root (default: `./storage/workspace`)
- `DATABASE_PATH` — SQLite database path (used from P0.3 onward)
- `NEXT_PUBLIC_API_URL` — API base URL for web
- `MODEL_PROVIDER` — Model provider (nemotron, etc.; used from P0.8 onward)

## Architecture Principles

1. **Single responsibility** — Each domain concept has one clear owner
2. **Adapter pattern** — External tech behind interfaces (DB, FS, Model, Git, Search)
3. **Proposal → Approval → Execution** — No mutation without approval
4. **Verification** — Every action verified, not assumed
5. **Human-readable storage** — Markdown files stay Obsidian-compatible
6. **No technical UI** — Normal users see intent, not internals

## Documentation

- `docs/00_START_HERE.md` — Start here (constitution)
- `docs/ORION_PRD.md` — Product requirements
- `docs/ORION_ARCHITECTURE.md` — Architecture specification
- `docs/ORION_UI.md` — UI design system
- `docs/07_ORION_PHASE_PROMPTS.md` — Implementation phases

## Tech Stack

- **Language**: JavaScript/JSX (no TypeScript — see `00_START_HERE.md` §4)
- **Frontend**: Next.js 14, React 18, MUI 6
- **Backend**: Node.js 20+, Express 4
- **Database**: SQLite (from P0.3)
- **Validation**: Zod
- **Testing**: Jest, React Testing Library

## License

Private project.
