{
  "name": "orion-dev-rules",
  "version": "1.1.0",
  "description": "ORION Developer Rules and Conventions",
  "rules": {
    "general": [
      "JavaScript/JSX only. No TypeScript. No Python.",
      "React + Next.js + Node.js + Express + MUI.",
      "Prefer free/open-source/self-hostable dependencies.",
      "OpenClaw is not ORION. Open WebUI is not ORION.",
      "Nemotron is a provider, not the core.",
      "Do not let model output directly mutate files.",
      "Do not fake features.",
      "Do not expose technical internals in normal UI.",
      "Add tests for new behavior.",
      "Delete obsolete duplicate behavior instead of leaving two systems alive."
    ],
    "architecture": [
      "Each important responsibility has one clear owner.",
      "Domain code must not depend on React or HTML.",
      "Outside technology belongs behind adapters.",
      "Use SQLite for structured operational state (from P0.3).",
      "Markdown/files for human-readable content (from P0.3).",
      "Important information should remain understandable without the web UI.",
      "Frontend never receives database credentials or secret values.",
      "The model is not a security boundary.",
      "Packages must not import from apps (dependency direction: apps -> packages)."
    ],
    "codeStyle": [
      "Use JSDoc for type documentation; no .ts/.tsx files.",
      "Consistent 8px spacing base rhythm.",
      "Use MUI as main component library.",
      "Build only useful application-level components.",
      "Use MUI directly for ordinary primitives.",
      "Do not invent a huge component hierarchy.",
      "Motion should explain change, avoid continuous decorative animation.",
      "Require keyboard use, visible focus, semantic controls.",
      "Normal UI shows useful matches, not retrieval mathematics."
    ],
    "git": [
      "Use Git for workspace history/checkpoints.",
      "Hide Git details from normal UI.",
      "Create meaningful checkpoints; avoid noisy commits for every tiny UI change.",
      "Format: short imperative summary line (e.g. 'Add Steve Jobs profile').",
      "Capitalize first word; no trailing period.",
      "Keep under ~50 characters when possible.",
      "Scope prefix optional (e.g. 'docs: ...', 'feat: ...') once convention emerges."
    ],
    "testing": [
      "Unit tests for domain logic.",
      "Integration tests for services.",
      "Component tests for UI.",
      "Test: create project, write project.md, read it back, block traversal (P0.3).",
      "Test: no approval blocks mutation, expired approval blocks mutation (P0.9).",
      "Test: changed proposal invalidates old approval (P0.9).",
      "Test: wrong scope blocks mutation (P0.9).",
      "Never claim success without evidence - run the real checks."
    ],
    "workflow": [
      "Before editing: read canonical docs, read phase prompt, inspect repository, inspect package versions, inspect current tests, search for existing implementation.",
      "After implementation: run real checks, report exact results, report changed files, report deleted files, report known limitations, report deviations, stop at requested phase.",
      "If tools misbehave mid-task, stop writing and verify state before continuing."
    ]
  }
}
