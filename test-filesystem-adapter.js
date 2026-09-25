import { createWorkspaceFilesystemAdapter, createSystemFilesystemAdapter } from './packages/core/src/adapters/FilesystemAdapter.js';

async function test() {
  console.log('Testing FilesystemAdapter...');
  
  // Test system adapter
  const systemFs = createSystemFilesystemAdapter('storage/system');
  await systemFs.mkdir('test-dir');
  await systemFs.writeFile('test-dir/test.md', '# Test File\n\nThis is a test of the FilesystemAdapter.');
  const content = await systemFs.readFile('test-dir/test.md');
  console.log('System FS - Read content:', content.substring(0, 50) + '...');
  
  const exists = await systemFs.exists('test-dir/test.md');
  console.log('System FS - File exists:', exists);
  
  const stat = await systemFs.stat('test-dir/test.md');
  console.log('System FS - File stat:', stat);
  
  const files = await systemFs.listFiles('test-dir');
  console.log('System FS - Files in test-dir:', files);
  
  // Test workspace adapter
  const workspaceFs = createWorkspaceFilesystemAdapter('storage/workspace');
  await workspaceFs.mkdir('project-test');
  await workspaceFs.writeFile('project-test/project.md', '# Project Test\n\nProject markdown file.');
  const wsContent = await workspaceFs.readFile('project-test/project.md');
  console.log('Workspace FS - Read content:', wsContent.substring(0, 50) + '...');
  
  // Test path traversal protection
  try {
    await systemFs.readFile('../../etc/passwd');
    console.log('ERROR: Path traversal NOT blocked!');
  } catch (err) {
    console.log('Path traversal correctly blocked:', err.message);
  }
  
  // Test atomic write
  await systemFs.writeFile('test-dir/atomic.md', 'First write');
  await systemFs.writeFile('test-dir/atomic.md', 'Second write (atomic)');
  const atomicContent = await systemFs.readFile('test-dir/atomic.md');
  console.log('Atomic write test:', atomicContent);
  
  console.log('\nFilesystemAdapter works!');
}

test().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});