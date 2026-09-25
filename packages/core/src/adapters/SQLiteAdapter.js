import sqlite3 from 'sqlite3';
import { promisify } from 'util';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * SQLiteAdapter - Implements DatabaseAdapter interface
 * Uses sqlite3 package (callback-based, promisified) for Windows compatibility
 */
export class SQLiteAdapter {
  /**
   * @param {string} dbPath - Path to SQLite database file
   */
  constructor(dbPath) {
    this.dbPath = dbPath;
    this.db = null;
    this._run = null;
    this._get = null;
    this._all = null;
    this._exec = null;
  }

  /**
   * Connect to the database
   */
  async connect() {
    if (this.db) return;

    // Ensure parent directory exists
    const dir = path.dirname(this.dbPath);
    await fs.mkdir(dir, { recursive: true });

    this.db = new sqlite3.Database(this.dbPath);

    // Promisify database methods with proper context handling
    this._run = (sql, ...params) => new Promise((resolve, reject) => {
      this.db.run(sql, ...params, function(err) {
        if (err) reject(err);
        else resolve({ changes: this.changes, lastInsertRowid: this.lastInsertRowid });
      });
    });

    this._get = promisify(this.db.get.bind(this.db));
    this._all = promisify(this.db.all.bind(this.db));
    this._exec = promisify(this.db.exec.bind(this.db));

    // Enable WAL mode for better concurrency
    await this._exec('PRAGMA journal_mode = WAL;');

    // Enable foreign keys
    await this._exec('PRAGMA foreign_keys = ON;');
  }

  /**
   * Disconnect from the database
   */
  async disconnect() {
    if (this.db) {
      await new Promise((resolve, reject) => {
        this.db.close((err) => err ? reject(err) : resolve());
      });
      this.db = null;
      this._run = null;
      this._get = null;
      this._all = null;
      this._exec = null;
    }
  }

  /**
   * Execute a statement with parameters
   * @param {string} sql
   * @param {unknown[]} params
   * @returns {{changes: number, lastInsertRowid: number|bigint}}
   */
  async run(sql, params = []) {
    this._ensureConnected();
    return this._run(sql, ...params);
  }

  /**
   * Get a single row
   * @param {string} sql
   * @param {unknown[]} params
   * @returns {unknown|undefined}
   */
  async get(sql, params = []) {
    this._ensureConnected();
    return this._get(sql, ...params);
  }

  /**
   * Get all matching rows
   * @param {string} sql
   * @param {unknown[]} params
   * @returns {unknown[]}
   */
  async all(sql, params = []) {
    this._ensureConnected();
    return this._all(sql, ...params);
  }

  /**
   * Execute a transaction
   * @template T
   * @param {() => Promise<T>} fn
   * @returns {Promise<T>}
   */
  async transaction(fn) {
    this._ensureConnected();
    await this._exec('BEGIN TRANSACTION;');
    try {
      const result = await fn();
      await this._exec('COMMIT;');
      return result;
    } catch (error) {
      await this._exec('ROLLBACK;');
      throw error;
    }
  }

  /**
   * Run migrations
   * @param {Migration[]} migrations
   */
  async migrate(migrations) {
    this._ensureConnected();

    // Ensure migrations table exists
    await this._exec(`
      CREATE TABLE IF NOT EXISTS _migrations (
        version INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        applied_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `);

    // Get applied migrations
    const applied = await this.all('SELECT version FROM _migrations ORDER BY version');
    const appliedVersions = new Set(applied.map(r => r.version));

    // Run pending migrations
    for (const migration of migrations) {
      if (appliedVersions.has(migration.version)) continue;

      await this.transaction(async () => {
        await this._exec(migration.up);
        await this._run('INSERT INTO _migrations (version, name) VALUES (?, ?)', [
          migration.version,
          migration.name
        ]);
      });
    }
  }

  _ensureConnected() {
    if (!this.db) {
      throw new Error('Database not connected. Call connect() first.');
    }
  }
}

/**
 * Create and connect a SQLiteAdapter
 * @param {string} dbPath
 * @returns {Promise<SQLiteAdapter>}
 */
export async function createSQLiteAdapter(dbPath) {
  const adapter = new SQLiteAdapter(dbPath);
  await adapter.connect();
  return adapter;
}