import sqlite3 from 'sqlite3';
import { promisify } from 'util';
import { promises as fs } from 'fs';
import path from 'path';

const DB_PATH = path.resolve('storage/system/orion.db');

const migrations = [
  {
    version: 1,
    name: 'create_projects_table',
    up: `
      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        goals TEXT, -- JSON array
        status TEXT NOT NULL DEFAULT 'active',
        workspace_path TEXT,
        metadata TEXT, -- JSON object
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        version INTEGER NOT NULL DEFAULT 1
      )
    `,
    down: 'DROP TABLE IF EXISTS projects'
  },
  {
    version: 2,
    name: 'create_tasks_table',
    up: `
      CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY,
        project_id TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        status TEXT NOT NULL DEFAULT 'backlog',
        priority TEXT NOT NULL DEFAULT 'medium',
        assignee_ids TEXT, -- JSON array
        depends_on TEXT, -- JSON array
        due_date TEXT,
        artifacts TEXT, -- JSON array
        metadata TEXT, -- JSON object
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        version INTEGER NOT NULL DEFAULT 1,
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
      )
    `,
    down: 'DROP TABLE IF EXISTS tasks'
  },
  {
    version: 3,
    name: 'create_actions_table',
    up: `
      CREATE TABLE IF NOT EXISTS actions (
        id TEXT PRIMARY KEY,
        task_id TEXT,
        type TEXT NOT NULL,
        payload TEXT, -- JSON object
        status TEXT NOT NULL DEFAULT 'pending',
        result TEXT, -- JSON object
        approved_proposal_id TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        version INTEGER NOT NULL DEFAULT 1,
        FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE SET NULL
      )
    `,
    down: 'DROP TABLE IF EXISTS actions'
  },
  {
    version: 4,
    name: 'create_proposals_table',
    up: `
      CREATE TABLE IF NOT EXISTS proposals (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        action_type TEXT NOT NULL,
        target TEXT, -- JSON object
        scope TEXT, -- JSON object
        reason TEXT,
        risk TEXT NOT NULL DEFAULT 'medium',
        reversibility TEXT NOT NULL DEFAULT 'easy',
        expires_at TEXT,
        evidence TEXT, -- JSON array
        status TEXT NOT NULL DEFAULT 'draft',
        approved_version INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        version INTEGER NOT NULL DEFAULT 1
      )
    `,
    down: 'DROP TABLE IF EXISTS proposals'
  },
  {
    version: 5,
    name: 'create_approvals_table',
    up: `
      CREATE TABLE IF NOT EXISTS approvals (
        id TEXT PRIMARY KEY,
        proposal_id TEXT NOT NULL,
        proposal_version INTEGER NOT NULL,
        approver_id TEXT,
        decision TEXT NOT NULL,
        reason TEXT,
        expires_at TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        FOREIGN KEY (proposal_id) REFERENCES proposals(id) ON DELETE CASCADE
      )
    `,
    down: 'DROP TABLE IF EXISTS approvals'
  },
  {
    version: 6,
    name: 'create_memories_table',
    up: `
      CREATE TABLE IF NOT EXISTS memories (
        id TEXT PRIMARY KEY,
        content TEXT NOT NULL,
        type TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'short-term',
        source TEXT, -- JSON object
        provenance TEXT, -- JSON object
        tags TEXT, -- JSON array
        project_id TEXT,
        related_entities TEXT, -- JSON array
        confidence REAL NOT NULL DEFAULT 1.0,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        version INTEGER NOT NULL DEFAULT 1,
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL
      )
    `,
    down: 'DROP TABLE IF EXISTS memories'
  },
  {
    version: 7,
    name: 'create_personas_table',
    up: `
      CREATE TABLE IF NOT EXISTS personas (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        role TEXT,
        personality TEXT,
        expertise TEXT, -- JSON array
        knowledge TEXT, -- JSON array
        capabilities TEXT, -- JSON array
        permissions TEXT, -- JSON array
        memory_ids TEXT, -- JSON array
        council_ids TEXT, -- JSON array
        is_real_person_inspired INTEGER NOT NULL DEFAULT 0,
        source_references TEXT, -- JSON array
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        version INTEGER NOT NULL DEFAULT 1
      )
    `,
    down: 'DROP TABLE IF EXISTS personas'
  },
  {
    version: 8,
    name: 'create_councils_table',
    up: `
      CREATE TABLE IF NOT EXISTS councils (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        purpose TEXT,
        type TEXT NOT NULL DEFAULT 'permanent',
        permanent_member_ids TEXT, -- JSON array
        rotating_member_ids TEXT, -- JSON array
        rules TEXT, -- JSON object
        chair_id TEXT,
        permissions TEXT, -- JSON array
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        version INTEGER NOT NULL DEFAULT 1
      )
    `,
    down: 'DROP TABLE IF EXISTS councils'
  },
  {
    version: 9,
    name: 'create_council_sessions_table',
    up: `
      CREATE TABLE IF NOT EXISTS council_sessions (
        id TEXT PRIMARY KEY,
        council_id TEXT NOT NULL,
        topic TEXT NOT NULL,
        briefing TEXT,
        status TEXT NOT NULL DEFAULT 'briefing',
        participant_ids TEXT, -- JSON array
        positions TEXT, -- JSON array
        disagreements TEXT, -- JSON array
        synthesis TEXT,
        proposal_id TEXT,
        started_at TEXT NOT NULL DEFAULT (datetime('now')),
        ended_at TEXT,
        FOREIGN KEY (council_id) REFERENCES councils(id) ON DELETE CASCADE,
        FOREIGN KEY (proposal_id) REFERENCES proposals(id) ON DELETE SET NULL
      )
    `,
    down: 'DROP TABLE IF EXISTS council_sessions'
  },
  {
    version: 10,
    name: 'create_decisions_table',
    up: `
      CREATE TABLE IF NOT EXISTS decisions (
        id TEXT PRIMARY KEY,
        project_id TEXT,
        council_session_id TEXT,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        reasoning TEXT,
        evidence TEXT, -- JSON array
        participants TEXT, -- JSON array
        approval_id TEXT,
        supersedes TEXT, -- JSON array
        affected_entities TEXT, -- JSON array
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        version INTEGER NOT NULL DEFAULT 1,
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL,
        FOREIGN KEY (council_session_id) REFERENCES council_sessions(id) ON DELETE SET NULL,
        FOREIGN KEY (approval_id) REFERENCES approvals(id) ON DELETE SET NULL
      )
    `,
    down: 'DROP TABLE IF EXISTS decisions'
  },
  {
    version: 11,
    name: 'create_conversations_table',
    up: `
      CREATE TABLE IF NOT EXISTS conversations (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        project_id TEXT,
        participant_ids TEXT, -- JSON array
        message_ids TEXT, -- JSON array
        metadata TEXT, -- JSON object
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        version INTEGER NOT NULL DEFAULT 1,
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL
      )
    `,
    down: 'DROP TABLE IF EXISTS conversations'
  },
  {
    version: 12,
    name: 'create_messages_table',
    up: `
      CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY,
        conversation_id TEXT NOT NULL,
        role TEXT NOT NULL,
        content TEXT NOT NULL,
        citations TEXT, -- JSON array
        tool_calls TEXT, -- JSON array
        metadata TEXT, -- JSON object
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE
      )
    `,
    down: 'DROP TABLE IF EXISTS messages'
  },
  {
    version: 13,
    name: 'create_artifacts_table',
    up: `
      CREATE TABLE IF NOT EXISTS artifacts (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        content TEXT,
        format TEXT,
        project_id TEXT,
        source_entity_id TEXT,
        metadata TEXT, -- JSON object
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        version INTEGER NOT NULL DEFAULT 1,
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL
      )
    `,
    down: 'DROP TABLE IF EXISTS artifacts'
  },
  {
    version: 14,
    name: 'create_events_table',
    up: `
      CREATE TABLE IF NOT EXISTS events (
        id TEXT PRIMARY KEY,
        type TEXT NOT NULL,
        aggregate_id TEXT NOT NULL,
        aggregate_type TEXT NOT NULL,
        payload TEXT, -- JSON object
        metadata TEXT, -- JSON object
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `,
    down: 'DROP TABLE IF EXISTS events'
  },
  {
    version: 15,
    name: 'create_notifications_table',
    up: `
      CREATE TABLE IF NOT EXISTS notifications (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        type TEXT NOT NULL,
        title TEXT NOT NULL,
        message TEXT,
        priority TEXT NOT NULL DEFAULT 'medium',
        read INTEGER NOT NULL DEFAULT 0,
        action_url TEXT,
        metadata TEXT, -- JSON object
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `,
    down: 'DROP TABLE IF EXISTS notifications'
  },
  {
    version: 16,
    name: 'create_automations_table',
    up: `
      CREATE TABLE IF NOT EXISTS automations (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        trigger TEXT, -- JSON object
        action TEXT, -- JSON object
        enabled INTEGER NOT NULL DEFAULT 1,
        last_run TEXT,
        next_run TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        version INTEGER NOT NULL DEFAULT 1
      )
    `,
    down: 'DROP TABLE IF EXISTS automations'
  },
  {
    version: 17,
    name: 'create_tools_table',
    up: `
      CREATE TABLE IF NOT EXISTS tools (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        input_schema TEXT, -- JSON object
        output_schema TEXT, -- JSON object
        adapter TEXT,
        permissions TEXT, -- JSON array
        requires_approval INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        version INTEGER NOT NULL DEFAULT 1
      )
    `,
    down: 'DROP TABLE IF EXISTS tools'
  },
  {
    version: 18,
    name: 'create_permissions_table',
    up: `
      CREATE TABLE IF NOT EXISTS permissions (
        id TEXT PRIMARY KEY,
        subject_id TEXT NOT NULL,
        subject_type TEXT NOT NULL,
        resource TEXT NOT NULL,
        actions TEXT, -- JSON array
        conditions TEXT, -- JSON object
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        version INTEGER NOT NULL DEFAULT 1
      )
    `,
    down: 'DROP TABLE IF EXISTS permissions'
  },
  {
    version: 19,
    name: 'create_conflicts_table',
    up: `
      CREATE TABLE IF NOT EXISTS conflicts (
        id TEXT PRIMARY KEY,
        entity_type TEXT NOT NULL,
        entity_id TEXT NOT NULL,
        field TEXT NOT NULL,
        conflict_values TEXT, -- JSON array
        status TEXT NOT NULL DEFAULT 'detected',
        resolution TEXT, -- JSON object
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        version INTEGER NOT NULL DEFAULT 1
      )
    `,
    down: 'DROP TABLE IF EXISTS conflicts'
  },
  {
    version: 20,
    name: 'create_migrations_table',
    up: `
      CREATE TABLE IF NOT EXISTS _migrations (
        version INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        applied_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `,
    down: 'DROP TABLE IF EXISTS _migrations'
  }
];

async function runMigrations() {
  // Ensure storage directory exists
  await fs.mkdir(path.dirname(DB_PATH), { recursive: true });

  const db = new sqlite3.Database(DB_PATH);
  
  // Promisify database methods
  const run = promisify(db.run.bind(db));
  const get = promisify(db.get.bind(db));
  const all = promisify(db.all.bind(db));
  const exec = promisify(db.exec.bind(db));
  
  // Enable WAL mode and foreign keys
  await exec('PRAGMA journal_mode = WAL;');
  await exec('PRAGMA foreign_keys = ON;');

  // Create migrations table if not exists
  await exec(`
    CREATE TABLE IF NOT EXISTS _migrations (
      version INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // Get applied migrations
  const applied = await all('SELECT version FROM _migrations ORDER BY version');
  const appliedVersions = new Set(applied.map(r => r.version));

  // Run pending migrations
  for (const migration of migrations) {
    if (appliedVersions.has(migration.version)) {
      console.log(`[Migration] Skipping v${migration.version}: ${migration.name} (already applied)`);
      continue;
    }

    console.log(`[Migration] Applying v${migration.version}: ${migration.name}...`);
    
    try {
      await exec('BEGIN TRANSACTION;');
      await exec(migration.up);
      await run('INSERT INTO _migrations (version, name) VALUES (?, ?)', [
        migration.version,
        migration.name
      ]);
      await exec('COMMIT;');
      console.log(`[Migration] ✓ v${migration.version}: ${migration.name}`);
    } catch (error) {
      await exec('ROLLBACK;');
      console.error(`[Migration] ✗ v${migration.version}: ${migration.name} failed:`, error.message);
      throw error;
    }
  }

  await new Promise((resolve, reject) => {
    db.close((err) => err ? reject(err) : resolve());
  });
  console.log('[Migration] All migrations applied successfully');
}

async function rollbackMigration(version) {
  const db = new sqlite3.Database(DB_PATH);
  
  const run = promisify(db.run.bind(db));
  const get = promisify(db.get.bind(db));
  const exec = promisify(db.exec.bind(db));
  
  const migration = migrations.find(m => m.version === version);
  if (!migration) {
    throw new Error(`Migration v${version} not found`);
  }

  const applied = await get('SELECT version FROM _migrations WHERE version = ?', version);
  if (!applied) {
    console.log(`[Migration] v${version} not applied, nothing to rollback`);
    await new Promise((resolve, reject) => {
      db.close((err) => err ? reject(err) : resolve());
    });
    return;
  }

  console.log(`[Migration] Rolling back v${version}: ${migration.name}...`);
  
  try {
    await exec('BEGIN TRANSACTION;');
    await exec(migration.down);
    await run('DELETE FROM _migrations WHERE version = ?', version);
    await exec('COMMIT;');
    console.log(`[Migration] ✓ v${version} rolled back`);
  } catch (error) {
    await exec('ROLLBACK;');
    console.error(`[Migration] ✗ v${version} rollback failed:`, error.message);
    throw error;
  }

  await new Promise((resolve, reject) => {
    db.close((err) => err ? reject(err) : resolve());
  });
}

async function status() {
  const db = new sqlite3.Database(DB_PATH);
  
  const all = promisify(db.all.bind(db));
  
  const applied = await all('SELECT * FROM _migrations ORDER BY version');
  const pending = migrations.filter(m => !applied.some(a => a.version === m.version));
  
  console.log('[Migration] Status:');
  console.log(`  Applied: ${applied.length}`);
  console.log(`  Pending: ${pending.length}`);
  console.log('');
  
  for (const m of migrations) {
    const isApplied = applied.some(a => a.version === m.version);
    console.log(`  ${isApplied ? '✓' : '○'} v${m.version}: ${m.name}`);
  }
  
  await new Promise((resolve, reject) => {
    db.close((err) => err ? reject(err) : resolve());
  });
}

// CLI
const command = process.argv[2];

switch (command) {
  case 'up':
    runMigrations().catch(err => {
      console.error('[Migration] Failed:', err.message);
      process.exit(1);
    });
    break;
  case 'down':
    const version = parseInt(process.argv[3], 10);
    if (!version) {
      console.error('Usage: node migrate.js down <version>');
      process.exit(1);
    }
    rollbackMigration(version).catch(err => {
      console.error('[Migration] Rollback failed:', err.message);
      process.exit(1);
    });
    break;
  case 'status':
    status().catch(err => {
      console.error('[Migration] Status failed:', err.message);
      process.exit(1);
    });
    break;
  default:
    console.log('Usage: node migrate.js [up|down <version>|status]');
    process.exit(1);
}