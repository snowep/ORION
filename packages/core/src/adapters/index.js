// Adapters barrel export
export * from './interfaces';
export { SQLiteAdapter, createSQLiteAdapter } from './SQLiteAdapter';
export { FilesystemAdapter, createSystemFilesystemAdapter, createWorkspaceFilesystemAdapter } from './FilesystemAdapter';

// Individual adapters will be added here as they are implemented
// export { ModelProvider } from './ModelProvider';
// export { SearchAdapter } from './SearchAdapter';
// export { GitAdapter } from './GitAdapter';