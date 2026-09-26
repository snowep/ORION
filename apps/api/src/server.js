import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { createSQLiteAdapter } from '@orion/core/adapters';
import { createSystemFilesystemAdapter, createWorkspaceFilesystemAdapter } from '@orion/core/adapters';

const app = express();
const PORT = process.env.API_PORT || 4000;
const HOST = process.env.API_HOST || 'localhost';

// Env configuration
const ORION_HOME = process.env.ORION_HOME || './storage/system';
const ORION_WORKSPACE_ROOT = process.env.ORION_WORKSPACE_ROOT || './storage/workspace';
const DATABASE_PATH = process.env.DATABASE_PATH || `${ORION_HOME}/orion.db`;

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Initialize adapters
let sqliteAdapter = null;
let systemFsAdapter = null;
let workspaceFsAdapter = null;

async function initAdapters() {
  try {
    // Initialize SQLite adapter
    sqliteAdapter = await createSQLiteAdapter(DATABASE_PATH);
    console.log('[ORION API] SQLite adapter connected');

    // Initialize filesystem adapters
    systemFsAdapter = createSystemFilesystemAdapter(ORION_HOME);
    workspaceFsAdapter = createWorkspaceFilesystemAdapter(ORION_WORKSPACE_ROOT);
    console.log('[ORION API] Filesystem adapters initialized');

    // Make adapters available on app for route handlers
    app.locals.sqliteAdapter = sqliteAdapter;
    app.locals.systemFsAdapter = systemFsAdapter;
    app.locals.workspaceFsAdapter = workspaceFsAdapter;
  } catch (error) {
    console.error('[ORION API] Adapter initialization failed:', error);
    throw error;
  }
}

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), service: 'orion-api' });
});

app.get('/api/health', (_req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(), 
    service: 'orion-api', 
    version: '0.1.0',
    adapters: {
      sqlite: !!sqliteAdapter,
      systemFs: !!systemFsAdapter,
      workspaceFs: !!workspaceFsAdapter
    }
  });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('[ORION API] Shutting down...');
  if (sqliteAdapter) {
    await sqliteAdapter.disconnect();
  }
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('[ORION API] Shutting down...');
  if (sqliteAdapter) {
    await sqliteAdapter.disconnect();
  }
  process.exit(0);
});

app.use((err, _req, res, _next) => {
  console.error('[API Error]', err);
  const status = err.statusCode || 500;
  const message = status === 500 ? 'Internal server error' : err.message;
  res.status(status).json({
    error: { message, status, timestamp: new Date().toISOString() }
  });
});

// Initialize adapters then start server
initAdapters().then(() => {
  app.listen(PORT, HOST, () => {
    console.log(`[ORION API] Running on http://${HOST}:${PORT}`);
    console.log(`[ORION API] Health: http://${HOST}:${PORT}/health`);
  });
}).catch(err => {
  console.error('[ORION API] Failed to start:', err);
  process.exit(1);
});

export { app };