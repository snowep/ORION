import { createSQLiteAdapter } from './packages/core/src/adapters/SQLiteAdapter.js';

async function test() {
  const adapter = await createSQLiteAdapter('storage/system/orion.db');
  const tables = await adapter.all("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name");
  console.log('Tables:', tables.map(t => t.name).join(', '));
  
  // Test a simple insert/read with unique ID
  const testId = 'test-' + Date.now();
  await adapter.run("INSERT INTO projects (id, name, status) VALUES (?, ?, ?)", [testId, 'Test Project', 'active']);
  const project = await adapter.get("SELECT * FROM projects WHERE id = ?", [testId]);
  console.log('Inserted project:', project);
  
  // Test read all
  const allProjects = await adapter.all("SELECT * FROM projects");
  console.log('All projects count:', allProjects.length);
  
  await adapter.disconnect();
  console.log('SQLiteAdapter works!');
}

test().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});